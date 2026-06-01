// ======================== 環境判定（最重要） ========================
// 🔧 file:// プロトコル検知
//   → ローカルファイルから開かれた場合、Microsoft認証は絶対に動作しないため、
//     ユーザーに公開URLでのアクセスを促す画面を表示する。
const IS_FILE_PROTOCOL = window.location.protocol === 'file:';
const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const DEPLOYED_URL = 'https://shinotecs.github.io/rental-records/';

// 🔧 file://なら即座にエラー画面を出して以降の処理をスキップ
if (IS_FILE_PROTOCOL) {
  document.addEventListener('DOMContentLoaded', () => {
    const ls = document.getElementById('loading-screen');
    if (ls) ls.style.display = 'none';
    document.body.innerHTML = `
      <div style="position:fixed;inset:0;background:linear-gradient(135deg,#0f4f6b,#1a6b8a);display:flex;align-items:center;justify-content:center;padding:20px;font-family:'Noto Sans JP',sans-serif;">
        <div style="background:white;border-radius:12px;padding:32px;max-width:500px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.3);">
          <div style="font-size:48px;text-align:center;margin-bottom:12px;">⚠️</div>
          <div style="font-size:18px;font-weight:700;color:#c0392b;text-align:center;margin-bottom:16px;">
            ローカルファイルからは動作しません
          </div>
          <div style="font-size:14px;color:#3c4043;line-height:1.7;margin-bottom:20px;">
            このアプリは <b>Microsoftアカウント認証</b> を使用するため、
            <code style="background:#f1f3f4;padding:2px 6px;border-radius:4px;font-size:12px;">file://</code>
            （ダブルクリックで開いた状態）では動作しません。<br><br>
            下記の <b>公開URL（HTTPS）</b> からアクセスしてください：
          </div>
          <a href="${DEPLOYED_URL}" target="_blank" rel="noopener" style="display:block;background:#1a6b8a;color:white;text-decoration:none;text-align:center;padding:14px;border-radius:8px;font-weight:700;margin-bottom:12px;">
            🌐 公開ページを開く
          </a>
          <div style="font-size:11px;color:#80868b;line-height:1.6;background:#f8f9fa;padding:10px 12px;border-radius:6px;border-left:3px solid #1a6b8a;">
            <b>なぜ動かないのか：</b><br>
            Microsoft Azure ADはセキュリティ上、HTTPS環境からの認証のみ許可しています。
            <code>file://</code> はオリジンが <code>null</code> 扱いになり、認証トークンが返ってきません。<br><br>
            <b>もしGitHub Pagesがまだ公開されていない場合：</b><br>
            ローカル開発用に <code>python -m http.server</code> 等で <code>http://localhost</code> 経由で開けば動作します
            （ただし <code>http://localhost</code> もAzure ADアプリの「リダイレクトURI」に登録が必要）。
          </div>
        </div>
      </div>
    `;
  });
}

// ======================== SHAREPOINT設定 ========================
const SP_CONFIG = {
  clientId: 'ca06b6ae-562a-48ab-bc55-5bbbe1487147',
  tenantId: 'a8d72d1d-0a0b-4de2-968b-43f9f27ffbc3',
  siteUrl: 'https://shinotecs.sharepoint.com/sites/snt002',
  authority: 'https://login.microsoftonline.com/a8d72d1d-0a0b-4de2-968b-43f9f27ffbc3',
};

// 🔧 redirectUri を安全に計算（file://でも構築は失敗しない）
function computeRedirectUri() {
  if (IS_FILE_PROTOCOL) return DEPLOYED_URL; // 構築失敗回避のためのダミー
  return window.location.origin + window.location.pathname;
}

const msalConfig = {
  auth: {
    clientId: SP_CONFIG.clientId,
    authority: SP_CONFIG.authority,
    // ※Azure ADアプリ登録の「認証」→「シングルページアプリケーション(SPA)」に
    //   このURIと完全一致するエントリが必要です:
    //   https://shinotecs.github.io/rental-records/
    redirectUri: computeRedirectUri(),
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false, // iOS Safari ITP対策（trueだと逆効果）
  },
  system: {
    tokenRenewalOffsetSeconds: 300,
    loggerOptions: {
      loggerCallback: (level, message) => {
        if (level <= 1) console.warn('[MSAL]', message);
      },
    },
  },
};

// 🔧 MSAL構築失敗時のダミー実装（スクリプト全体停止を防止）
const noopMsal = {
  initialize: () => Promise.resolve(),
  handleRedirectPromise: () => Promise.resolve(null),
  getAllAccounts: () => [],
  acquireTokenSilent: () => Promise.reject(new Error('MSAL未初期化')),
  acquireTokenPopup: () => Promise.reject(new Error('MSAL未初期化')),
  acquireTokenRedirect: () => Promise.reject(new Error('MSAL未初期化')),
  loginRedirect: () => Promise.reject(new Error('MSAL未初期化')),
  loginPopup: () => Promise.reject(new Error('MSAL未初期化')),
  logoutPopup: () => Promise.resolve(),
  logoutRedirect: () => Promise.resolve(),
};

// 🔧 try-catchで構築（例外が出てもスクリプト続行）
let msalInstance;
try {
  msalInstance = new msal.PublicClientApplication(msalConfig);
} catch(e) {
  console.error('MSAL構築エラー（ダミーで継続）:', e);
  msalInstance = noopMsal;
}

// 🔧【最重要修正】Microsoft Graph API用のスコープ
// ※Azure ADアプリの「APIのアクセス許可」に
//   「Microsoft Graph > 委任 > Sites.ReadWrite.All」を追加し、
//   「[テナント] に管理者の同意を与えます」をクリックしてください。
const SP_SCOPES = ['Sites.ReadWrite.All'];

// MSAL初期化完了Promise（ボタンクリック前に必ず完了させる）
let msalReady = null;

let spToken = null;
let spSiteId = null;

async function getSPToken() {
  // MSAL初期化完了を待つ
  if (msalReady) {
    try { await msalReady; } catch(e) {}
  }
  // サイレント取得を試みる（ログイン直後はトークンキャッシュ済み）
  try {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      const result = await msalInstance.acquireTokenSilent({
        scopes: SP_SCOPES,
        account: accounts[0],
        forceRefresh: false,
      });
      spToken = result.accessToken;
      return spToken;
    }
  } catch(e) {
    console.warn('Silent token acquisition failed:', e);
  }
  // 🔧【v7】サイレント失敗時は全クライアントでリダイレクト（COOP問題回避）
  try {
    await msalInstance.acquireTokenRedirect({
      scopes: SP_SCOPES,
      prompt: 'select_account',
    });
    return null; // この後ページ遷移
  } catch(e) {
    console.error('Token acquisition failed:', e);
    if (e.errorCode !== 'user_cancelled') {
      showToast('認証エラー: ' + (e.errorMessage || e.message || e.errorCode || '不明'), 'error');
    }
    return null;
  }
}

async function spGet(path) {
  const token = await getSPToken();
  if (!token) return null;
  try {
    const res = await fetch(`https://graph.microsoft.com/v1.0${path}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
    });
    if (!res.ok) {
      const body = await res.text().catch(()=>'');
      console.error(`[SP GET ${path}] ${res.status}`, body);
      return null;
    }
    return await res.json();
  } catch(e) {
    console.error(`[SP GET ${path}] network error`, e);
    return null;
  }
}

async function spPost(path, body) {
  const token = await getSPToken();
  if (!token) { showToast('未認証のため保存できません', 'error'); return null; }
  try {
    const res = await fetch(`https://graph.microsoft.com/v1.0${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const errText = await res.text().catch(()=>'');
      console.error(`[SP POST ${path}] ${res.status}`, errText);
      // ユーザーに具体的なエラーを表示
      let msg = `保存失敗 (${res.status})`;
      try {
        const errJson = JSON.parse(errText);
        if (errJson.error && errJson.error.message) msg += ': ' + errJson.error.message;
      } catch(_) {}
      showToast(msg, 'error');
      return null;
    }
    return await res.json();
  } catch(e) {
    console.error(`[SP POST ${path}] network error`, e);
    showToast('ネットワークエラー: ' + (e.message || ''), 'error');
    return null;
  }
}

async function spPatch(path, body) {
  const token = await getSPToken();
  if (!token) { showToast('未認証のため更新できません', 'error'); return null; }
  try {
    const res = await fetch(`https://graph.microsoft.com/v1.0${path}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const errText = await res.text().catch(()=>'');
      console.error(`[SP PATCH ${path}] ${res.status}`, errText);
      let msg = `更新失敗 (${res.status})`;
      try {
        const errJson = JSON.parse(errText);
        if (errJson.error && errJson.error.message) msg += ': ' + errJson.error.message;
      } catch(_) {}
      showToast(msg, 'error');
      return null;
    }
    return await res.json();
  } catch(e) {
    console.error(`[SP PATCH ${path}] network error`, e);
    showToast('ネットワークエラー: ' + (e.message || ''), 'error');
    return null;
  }
}

async function spDelete(path) {
  const token = await getSPToken();
  if (!token) return false;
  try {
    const res = await fetch(`https://graph.microsoft.com/v1.0${path}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      const errText = await res.text().catch(()=>'');
      console.error(`[SP DELETE ${path}] ${res.status}`, errText);
    }
    return res.ok;
  } catch(e) {
    console.error(`[SP DELETE ${path}] network error`, e);
    return false;
  }
}

// 🔧 リストIDキャッシュ（毎回API叩かない）
const spListIdCache = {};
// 🔧 詳細診断情報を蓄積（最終エラーの表示用）
let spLastError = null;

async function getSiteId() {
  if (spSiteId) return spSiteId;
  const data = await spGet('/sites/shinotecs.sharepoint.com:/sites/snt002');
  if (data && data.id) {
    spSiteId = data.id;
    console.log('[SP] サイトID取得成功:', spSiteId);
    return spSiteId;
  }
  spLastError = 'SharePointサイト「shinotecs.sharepoint.com/sites/snt002」が見つかりません。サイトURL確認 or 権限不足の可能性。';
  showToast(spLastError, 'error');
  return null;
}

async function getListId(listName) {
  // 🔧 キャッシュ確認
  if (spListIdCache[listName]) return spListIdCache[listName];
  const siteId = await getSiteId();
  if (!siteId) return null;
  // 🔧 リスト名をURLエンコード（日本語対応）
  const encodedName = encodeURIComponent(listName).replace(/'/g, "''");
  const data = await spGet(`/sites/${siteId}/lists?$filter=displayName eq '${encodedName}'`);
  if (data && data.value && data.value.length > 0) {
    spListIdCache[listName] = data.value[0].id;
    console.log(`[SP] リスト「${listName}」ID取得:`, data.value[0].id);
    return spListIdCache[listName];
  }
  spLastError = `SharePointリスト「${listName}」が見つかりません。SharePointサイトに表示名「${listName}」のリストを作成してください。`;
  showToast(spLastError, 'error');
  return null;
}

async function getListItems(listName) {
  const siteId = await getSiteId();
  const listId = await getListId(listName);
  if (!siteId || !listId) return [];
  const data = await spGet(`/sites/${siteId}/lists/${listId}/items?$expand=fields&$top=999`);
  return data ? data.value : [];
}

async function addListItem(listName, fields) {
  spLastError = null;
  const siteId = await getSiteId();
  if (!siteId) return null;
  const listId = await getListId(listName);
  if (!listId) return null;
  // 🔧【v10】表示名→内部名に自動翻訳してから書き込む
  const translated = await translateFields(listName, fields);
  console.log(`[SP] addListItem ${listName}:`, translated);
  const result = await spPost(`/sites/${siteId}/lists/${listId}/items`, { fields: translated });
  if (!result) {
    console.error(`[SP] addListItem失敗 list=${listName}`);
  }
  return result;
}

async function updateListItem(listName, itemId, fields) {
  spLastError = null;
  const siteId = await getSiteId();
  const listId = await getListId(listName);
  if (!siteId || !listId) return null;
  // 🔧【v10】表示名→内部名に自動翻訳してから更新
  const translated = await translateFields(listName, fields);
  return await spPatch(`/sites/${siteId}/lists/${listId}/items/${itemId}/fields`, translated);
}

// 🔧【v10】列マッピング機能（日本語列名対応）
// SharePointで日本語の列名を作ると内部名はエンコードされる（カテゴリ→OData_x30AB_x30C6_x30B4_x30EA_など）
// Graph APIは内部名を要求するため、表示名→内部名の対応表を取得しておく
const spColumnMaps = {}; // {listName: {displayName: internalName}}

async function getListColumns(listName) {
  if (spColumnMaps[listName]) return spColumnMaps[listName];
  const siteId = await getSiteId();
  const listId = await getListId(listName);
  if (!siteId || !listId) return null;
  const data = await spGet(`/sites/${siteId}/lists/${listId}/columns?$top=200`);
  if (!data || !data.value) {
    console.warn(`[SP] ${listName} 列定義取得失敗`);
    return null;
  }
  const map = {};
  for (const col of data.value) {
    if (col.displayName && col.name) {
      map[col.displayName] = col.name;
      // 内部名→内部名も登録（既に内部名で渡されてもOKにする）
      map[col.name] = col.name;
    }
  }
  spColumnMaps[listName] = map;
  console.log(`[SP] ${listName} 列マッピング構築:`, map);
  return map;
}

async function translateFields(listName, fields) {
  const map = await getListColumns(listName);
  if (!map) {
    console.warn(`[SP] ${listName} のマッピング無し、フィールド名そのまま使用`);
    return fields;
  }
  const translated = {};
  for (const key of Object.keys(fields)) {
    // 表示名でヒットすれば内部名に翻訳、ヒットしなければそのまま（システムフィールドのため）
    const internal = map[key] || key;
    translated[internal] = fields[key];
    if (internal !== key) {
      console.log(`[SP翻訳] ${key} → ${internal}`);
    }
  }
  return translated;
}

// 🔧【v9】SharePoint診断機能（リダイレクトを絶対に起こさない安全版）
async function diagnoseSp() {
  console.log('[SP診断] 開始');
  // 🔧 最初にローディングモーダルを表示（クリック反応の確認も兼ねる）
  showSpDiagnosisLoading();

  const results = [];
  function add(label, ok, detail) {
    results.push({ label, ok, detail });
    console.log(`[SP診断] ${ok?'✅':'❌'} ${label}: ${detail}`);
  }

  try {
    // 1. アカウント確認（リダイレクトを起こさない）
    let accounts = [];
    try {
      accounts = msalInstance.getAllAccounts();
    } catch(e) {
      add('1. MSALアカウント取得', false, 'getAllAccounts例外: ' + e.message);
      return showSpDiagnosis(results);
    }
    add('1. MSALアカウント', accounts.length > 0,
      accounts.length > 0 ? `✅ ${accounts[0].username}` : '❌ ログイン情報なし');
    if (accounts.length === 0) return showSpDiagnosis(results);

    // 2. トークン取得（サイレントのみ、絶対にリダイレクトしない）
    let token = null;
    try {
      const result = await msalInstance.acquireTokenSilent({
        scopes: SP_SCOPES,
        account: accounts[0],
        forceRefresh: false,
      });
      token = result.accessToken;
      add('2. アクセストークン取得', true, '✅ サイレント取得成功');
    } catch(e) {
      add('2. アクセストークン取得', false,
        `❌ サイレント失敗: ${e.errorCode||e.message}. 一度ログアウト→再ログインで Sites.ReadWrite.All の同意が必要`);
      return showSpDiagnosis(results);
    }

    // 3. トークンスコープ解析
    try {
      // 🔧【v10】base64url → base64 変換してから atob
      let b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      const raw = atob(b64);
      // UTF-8対応
      let jsonStr;
      try { jsonStr = decodeURIComponent(escape(raw)); } catch(_) { jsonStr = raw; }
      const payload = JSON.parse(jsonStr);
      const scopes = payload.scp || '(なし)';
      const aud = payload.aud || '(不明)';
      const hasGraphSites = /Sites\.\w+\.All/i.test(scopes);
      add('3. トークン権限 (scp)', hasGraphSites,
        `aud=${aud} / scp=${scopes}`);
    } catch(e) { add('3. トークン解析', false, e.message); }

    // 4. サイト取得
    spSiteId = null;
    let siteData = null;
    try {
      const res = await fetch('https://graph.microsoft.com/v1.0/sites/shinotecs.sharepoint.com:/sites/snt002', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        siteData = await res.json();
        add('4. SharePointサイト取得', true, `✅ ID=${siteData.id?.slice(0,50)}`);
      } else {
        const errText = await res.text().catch(()=>'');
        add('4. SharePointサイト取得', false, `❌ ${res.status}: ${errText.slice(0,200)}`);
        return showSpDiagnosis(results);
      }
    } catch(e) {
      add('4. SharePointサイト取得', false, '❌ ネットワークエラー: ' + e.message);
      return showSpDiagnosis(results);
    }

    // 5. 全リスト一覧
    let allLists = null;
    try {
      const res = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteData.id}/lists?$top=100`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        allLists = await res.json();
        const names = allLists.value?.map(l => l.displayName) || [];
        add('5. サイト内リスト一覧', names.length > 0,
          names.length ? `(${names.length}件) ${names.join(' / ')}` : '❌ リストが0件');
      } else {
        const errText = await res.text().catch(()=>'');
        add('5. サイト内リスト一覧', false, `❌ ${res.status}: ${errText.slice(0,200)}`);
        return showSpDiagnosis(results);
      }
    } catch(e) {
      add('5. サイト内リスト一覧', false, '❌ ' + e.message);
      return showSpDiagnosis(results);
    }

    // 6. 期待するリスト4つの有無
    const listNames = allLists.value.map(l => l.displayName);
    const expected = ['利用者マスタ', '営業メモ', '商品レンタル', '販売改修'];
    for (const name of expected) {
      const found = listNames.includes(name);
      add(`6. リスト「${name}」`, found,
        found ? '✅ 存在する' : '❌ なし。SharePointサイトにこの名前でリストを作成してください');
    }

    // 7. テスト書き込み（利用者マスタがある場合のみ）
    if (listNames.includes('利用者マスタ')) {
      const targetList = allLists.value.find(l => l.displayName === '利用者マスタ');

      // 🔧【v10】列定義の取得・表示
      try {
        const colRes = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteData.id}/lists/${targetList.id}/columns?$top=200`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (colRes.ok) {
          const colData = await colRes.json();
          const userCols = colData.value.filter(c => !c.readOnly && !c.hidden && c.name !== 'Title' && !['ID','Modified','Created','ContentType','Attachments','Edit','LinkTitle','LinkTitleNoMenu','DocIcon','ItemChildCount','FolderChildCount','_UIVersionString','_ComplianceFlags','_ComplianceTag','_ComplianceTagWrittenTime','_ComplianceTagUserId','AppAuthor','AppEditor'].includes(c.name));
          const colList = userCols.map(c => `${c.displayName} → ${c.name}`).join('\n');
          add('7. 利用者マスタの列定義', userCols.length > 0,
            `(${userCols.length}個のユーザー列)\n${colList || '(列なし)'}`);

          // 期待するフィールドが存在するかチェック
          const expectedDisplays = ['カテゴリ', '施設居宅名', 'ステータス', '担当者', '開始年月', '担当処理', '事務処理', '契約確認', '振替入力', 'メモ伝達事項', '家族情報', '備考'];
          const actualDisplays = colData.value.map(c => c.displayName);
          const missing = expectedDisplays.filter(n => !actualDisplays.includes(n));
          add('8. 必要な列の存在チェック', missing.length === 0,
            missing.length === 0 ? '✅ 全列存在'
            : `❌ 不足: ${missing.join(', ')}\n→ SharePoint「利用者マスタ」にこれらの列を作成してください`);
        } else {
          add('7. 列定義の取得', false, `${colRes.status}: 失敗`);
        }
      } catch(e) {
        add('7. 列定義の取得', false, e.message);
      }

      // テスト書き込み（最小限のTitleのみ）
      try {
        const res = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteData.id}/lists/${targetList.id}/items`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ fields: { Title: '__診断テスト__' + Date.now() } })
        });
        if (res.ok) {
          const data = await res.json();
          add('9. テスト書き込み', true,
            `✅ 書込成功 ID=${data.id}（SharePointから手動削除してください）`);
        } else {
          const errText = await res.text().catch(()=>'');
          add('9. テスト書き込み', false,
            `❌ ${res.status}: ${errText.slice(0,300)}`);
        }
      } catch(e) {
        add('9. テスト書き込み', false, '❌ ' + e.message);
      }
    }
  } catch(e) {
    console.error('[SP診断] 予期せぬエラー:', e);
    results.push({ label: '予期せぬエラー', ok: false, detail: e.message + '\n' + e.stack });
  }

  showSpDiagnosis(results);
}

function showSpDiagnosisLoading() {
  const existing = document.getElementById('sp-diag-modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'sp-diag-modal';
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;';
  modal.innerHTML = '<div style="background:white;border-radius:12px;padding:32px;text-align:center;font-family:sans-serif;"><div style="font-size:18px;font-weight:700;margin-bottom:8px;">🔧 SharePoint診断中...</div><div style="color:#666;font-size:13px;">数秒お待ちください</div></div>';
  document.body.appendChild(modal);
  console.log('[SP診断] ローディング表示 OK');
}

// 🔧【v9】モーダル表示。CSS変数依存を全削除し、確実に表示される実装
function showSpDiagnosis(results) {
  console.log('[SP診断] モーダル表示開始 / 結果件数:', results.length);

  // CSS変数に依存しないハードコード色
  const C_OK_BG = '#d1fae5', C_OK_BORDER = '#10b981', C_OK_TEXT = '#065f46';
  const C_NG_BG = '#fee2e2', C_NG_BORDER = '#dc2626', C_NG_TEXT = '#991b1b';

  let html = '<div style="font-family:Meiryo,sans-serif;font-size:12px;line-height:1.6;">';
  for (const r of results) {
    const icon = r.ok ? '✅' : '❌';
    const bg = r.ok ? C_OK_BG : C_NG_BG;
    const bd = r.ok ? C_OK_BORDER : C_NG_BORDER;
    const tc = r.ok ? C_OK_TEXT : C_NG_TEXT;
    const safeDetail = String(r.detail || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    html += `<div style="margin-bottom:8px;padding:10px;background:${bg};border-radius:6px;border-left:4px solid ${bd};">`;
    html += `<div style="font-weight:700;color:${tc};margin-bottom:4px;">${icon} ${r.label}</div>`;
    html += `<div style="font-size:11px;color:#444;word-break:break-all;white-space:pre-wrap;">${safeDetail}</div>`;
    html += '</div>';
  }
  html += '</div>';

  const existing = document.getElementById('sp-diag-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'sp-diag-modal';
  // 🔧 z-index 99999、inset の代わりに個別指定（古いブラウザ対応）
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;font-family:Meiryo,sans-serif;';

  modal.innerHTML = `
    <div style="background:white;border-radius:12px;padding:24px;max-width:780px;width:100%;max-height:85vh;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,0,0.4);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #e5e7eb;">
        <div style="font-size:18px;font-weight:700;color:#1a6b8a;">📋 SharePoint 接続診断結果</div>
        <button id="sp-diag-close-x" style="background:none;border:none;font-size:24px;cursor:pointer;color:#666;padding:0 8px;">✕</button>
      </div>
      ${html}
      <div style="margin-top:16px;padding:12px;background:#eff6ff;border-radius:6px;font-size:12px;color:#1e40af;border-left:4px solid #3b82f6;">
        <b>使い方：</b><br>
        ❌ の項目を順番に修正してください。詳細は F12 → Console タブにも出力されています。
      </div>
      <button id="sp-diag-close-btn" style="margin-top:16px;width:100%;padding:12px;background:#1a6b8a;color:white;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px;">閉じる</button>
    </div>
  `;
  document.body.appendChild(modal);

  // 🔧 イベントリスナーを直接アタッチ（onclick属性より確実）
  const closeBtn = document.getElementById('sp-diag-close-btn');
  const closeX = document.getElementById('sp-diag-close-x');
  if (closeBtn) closeBtn.onclick = () => modal.remove();
  if (closeX) closeX.onclick = () => modal.remove();

  console.log('[SP診断] モーダル表示完了');
}

async function deleteListItem(listName, itemId) {
  const siteId = await getSiteId();
  const listId = await getListId(listName);
  if (!siteId || !listId) return false;
  return await spDelete(`/sites/${siteId}/lists/${listId}/items/${itemId}`);
}

// SP → ローカルDB変換
// 🔧【v11】列マッピングを使ったフィールド読み取りヘルパー
// SharePointの内部名がfield_1等の場合でも、表示名でアクセス可能にする
function spReadField(listName, item, displayName) {
  const map = spColumnMaps[listName];
  const internal = map ? (map[displayName] || displayName) : displayName;
  return item.fields[internal] || '';
}

function spUserToLocal(item) {
  const get = (n) => spReadField('利用者マスタ', item, n);
  return {
    id: item.id,
    spId: item.id,
    category: get('カテゴリ'),
    name: item.fields.Title || '',
    org: get('施設居宅名'),
    status: get('ステータス'),
    staff: get('担当者'),
    tantou: get('担当処理'),
    jimu: get('事務処理'),
    keiyaku: get('契約確認'),
    furikae: get('振替入力'),
    start: get('開始年月'),
    memo: get('メモ伝達事項'),
    family: get('家族情報'),
    biko: get('備考'),
  };
}

function spMemoToLocal(item) {
  const get = (n) => spReadField('営業メモ', item, n);
  const dateRaw = get('日付');
  return {
    id: item.id, spId: item.id,
    userId: get('利用者名'),
    category: get('カテゴリ'),
    staff: get('担当者'),
    tantou: get('担当処理'),
    jimu: get('事務処理'),
    date: dateRaw ? String(dateRaw).slice(0,10) : '',
    content: get('メモ内容'),
  };
}

function spOrderToLocal(item) {
  const get = (n) => spReadField('商品レンタル', item, n);
  const startRaw = get('納品日');
  const endRaw = get('回収日');
  return {
    id: item.id, spId: item.id,
    userId: get('利用者名'),
    category: get('カテゴリ'),
    staff: get('担当者'),
    status: get('ステータス'),
    product: get('商品名型番'),
    unit: get('単価'),
    start: startRaw ? String(startRaw).slice(0,10) : '',
    end: endRaw ? String(endRaw).slice(0,10) : '',
    tantou: get('担当処理'),
    jimu: get('事務処理'),
    deliver: get('納品確認'),
    collect: get('回収確認'),
    biko: get('備考'),
  };
}

function spSaleToLocal(item) {
  const get = (n) => spReadField('販売改修', item, n);
  const startRaw = get('納品日');
  const endRaw = get('確認日');
  return {
    id: item.id, spId: item.id,
    userId: get('利用者名'),
    category: get('カテゴリ'),
    staff: get('担当者'),
    status: get('ステータス'),
    product: get('商品内容'),
    amount: get('金額税込'),
    start: startRaw ? String(startRaw).slice(0,10) : '',
    end: endRaw ? String(endRaw).slice(0,10) : '',
    biko: get('備考'),
  };
}

// SharePointからデータを全件ロード
async function loadFromSharePoint() {
  showToast('SharePointからデータを読み込み中...', 'success');
  try {
    // 🔧【v11】まず4リストの列マッピングを取得してキャッシュに入れる
    // （sp*ToLocal が同期的にマッピング参照するため）
    await Promise.all([
      getListColumns('利用者マスタ'),
      getListColumns('営業メモ'),
      getListColumns('商品レンタル'),
      getListColumns('販売改修'),
    ]);
    const [users, memos, orders, sales] = await Promise.all([
      getListItems('利用者マスタ'),
      getListItems('営業メモ'),
      getListItems('商品レンタル'),
      getListItems('販売改修'),
    ]);
    if (users.length > 0) DB.users = users.map(spUserToLocal);
    if (memos.length > 0) DB.memos = memos.map(spMemoToLocal);
    if (orders.length > 0) DB.orders = orders.map(spOrderToLocal);
    if (sales.length > 0) DB.sales = sales.map(spSaleToLocal);
    updateSPStatus(true);
    showToast('SharePointからデータを読み込みました ✅', 'success');
  } catch(e) {
    console.error('loadFromSharePoint error:', e);
    showToast('データ読み込みエラー: ' + (e.message || '不明なエラー'), 'error');
    throw e;
  }
}

// 手動でSharePoint接続を試みる（ヘッダーボタンから呼ばれる）
async function connectSharePoint() {
  const btn = document.getElementById('sp-login-btn');
  if (btn) { btn.textContent = '⏳ 接続中...'; btn.disabled = true; }
  try {
    const token = await getSPToken();
    if (token) {
      await loadFromSharePoint();
      // 現在表示中のページのみ再描画（存在する要素のみ）
      if (document.getElementById('dash-stats')) renderDashboard();
      if (document.getElementById('staff-table-body')) renderStaffTable();
    }
  } catch(e) {
    showToast('SharePoint接続失敗: ' + (e.message || e), 'error');
  } finally {
    if (btn) { btn.textContent = '☁️ SP接続'; btn.disabled = false; }
  }
}

// SP接続状態をヘッダーに反映
function updateSPStatus(connected) {
  const btn = document.getElementById('sp-login-btn');
  if (!btn) return;
  if (connected) {
    btn.textContent = '☁️ SP接続済';
    btn.style.background = 'rgba(46,125,79,0.6)';
  } else {
    btn.textContent = '☁️ SP接続';
    btn.style.background = 'rgba(255,255,255,0.2)';
  }
}
