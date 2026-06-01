// ======================== DATA STORE ========================
let DB = {
  staff: [
    {id:1,name:'篠',fullname:'篠 裕介',email:'y.shino@shinotecs.onmicrosoft.com',role:'社長',area:'',canEditOrder:true,canEditUser:true,canAdmin:true,created:'2026-01-01'},
    {id:2,name:'小林',fullname:'小林 裕明',email:'h.kobayashi@shinotecs.onmicrosoft.com',role:'所長',area:'',canEditOrder:true,canEditUser:true,canAdmin:true,created:'2026-01-01'},
    {id:3,name:'青池',fullname:'青池 良太',email:'r.aoike@shinotecs.onmicrosoft.com',role:'営業',area:'',canEditOrder:true,canEditUser:true,canAdmin:false,created:'2026-01-01'},
    {id:4,name:'茂木',fullname:'茂木 はるな',email:'h.moteki@shinotecs.onmicrosoft.com',role:'営業',area:'',canEditOrder:true,canEditUser:true,canAdmin:false,created:'2026-01-01'},
    {id:5,name:'杉山',fullname:'杉山 郁美',email:'i.sugiyama@shinotecs.onmicrosoft.com',role:'総務',area:'',canEditOrder:true,canEditUser:true,canAdmin:true,created:'2026-01-01'},
    {id:6,name:'小森谷',fullname:'小森谷 恵',email:'m.komoriya@shinotecs.onmicrosoft.com',role:'総務',area:'',canEditOrder:true,canEditUser:true,canAdmin:false,created:'2026-01-01'},
  ],
  masters: {
    statuses: ['レンタル','デモ中','デモ返却','終了','入院中','【新規】利用中'],
    statuses2: ['介保販売','住宅改修','一般販売'],
    processes: ['対応中','完了','要確認'],
    facilities: ['鶴ヶ島 ほほえみの郷','イリーゼ入間','イリーゼ新所沢','イリーゼ狭山','イリーゼ狭山入曽はなれ','イリーゼ所沢西','イリーゼ武蔵藤沢','福寿の里','イリーゼ狭山富士見'],
    kyotaku: ['ピオ','さわやかケアプラン','ニチイケアセンター','居宅A','居宅B'],
    products: ['ｾｰﾌﾃｨｰｱｰﾑｳｫｰｶｰ Cﾀｲﾌﾟ SAWCR','室内用歩行器 アヴァンス PAセット','アルコー１Ｓ R100415','ｽﾃｲﾔｰ自走SY22-40SB','ｴｱﾏｽﾀｰ ﾈｸｻｽR 91cm RCR-663','ｼﾝﾌｫﾆｰｽﾘﾑ RSMA4-0040','グレイスコアマルチ自走42幅 RGRC-31B-42','ﾍﾞｯﾄﾞｻｲﾄﾞﾃｰﾌﾞﾙ RKF-1920','車ｲｽ 介助式 スキット7 RSKT-7','ｴｱﾏｯﾄ標準','電動ベッド','サイドレール'],
  },
  users: [
    {id:1,category:'在宅',name:'齊藤 京子',org:'ピオ',status:'利用中',staff:'篠',tantou:'完了',jimu:'対応中',keiyaku:'完了',furikae:'要確認',start:'2026-05-01',memo:'娘さん同居？別居？\nマンション横にP可能。\n本人訪問されるのが好きじゃない',family:'',biko:''},
    {id:2,category:'施設',name:'吉田 松枝',org:'イリーゼ入間',status:'利用中',staff:'篠',tantou:'対応中',jimu:'対応中',keiyaku:'****',furikae:'****',start:'2025-11-17',memo:'',family:'吉田健一(ヨシダケンイチ) 様\n359-1161 所沢市狭山ヶ丘1-32-17\n090-4621-0574',biko:''},
    {id:3,category:'施設',name:'渡邊 洋子',org:'イリーゼ入間',status:'利用中',staff:'篠',tantou:'対応中',jimu:'対応中',keiyaku:'****',furikae:'****',start:'2025-11-17',memo:'',family:'日野真由美(ヒノマユミ)様\n357-0041 飯能市美杉台5-2-9-301\n090-9677-7656',biko:''},
    {id:4,category:'施設',name:'前田 喜久',org:'イリーゼ新所沢',status:'利用中',staff:'篠',tantou:'対応中',jimu:'対応中',keiyaku:'****',furikae:'****',start:'',memo:'',family:'',biko:''},
    {id:5,category:'施設',name:'福村 京子',org:'イリーゼ入間',status:'利用中',staff:'篠',tantou:'対応中',jimu:'対応中',keiyaku:'完了',furikae:'完了',start:'',memo:'',family:'福村　陽子\n東京都市区町村杉並区高円寺南2-10-12 マグノリア201\n090-9016-8777',biko:''},
    {id:6,category:'施設',name:'時枝 不二子',org:'イリーゼ武蔵藤沢',status:'利用中',staff:'篠',tantou:'対応中',jimu:'対応中',keiyaku:'完了',furikae:'完了',start:'',memo:'',family:'谷島　美由紀様\n東京都世田谷区玉川台2-39-16-403\n03-3708-5070',biko:''},
    {id:7,category:'施設',name:'山田　光男',org:'イリーゼ入間',status:'利用中',staff:'篠',tantou:'対応中',jimu:'対応中',keiyaku:'****',furikae:'****',start:'2025-11-11',memo:'',family:'山田由紀(ヤマダユキ) 様\n東京都西東京市東町6-4-3 グランドメゾン保谷204\n090 7416 0116',biko:''},
    {id:8,category:'施設',name:'岡村　光代',org:'イリーゼ狭山入曽はなれ',status:'入院中',staff:'篠',tantou:'対応中',jimu:'対応中',keiyaku:'完了',furikae:'完了',start:'',memo:'',family:'小野 美恵子 様（従姉妹）\n〒178-0062　東京都練馬区大泉町4-35-2\n℡090-8854-8756',biko:''},
  ],
  memos: [
    {id:1,userId:1,category:'在宅',staff:'篠',tantou:'対応中',jimu:'対応中',date:'2026-05-27',content:'【歩行器依頼】\n26/5/25 1.アヴァンス 742765　もしかしたらPLになるかも。大きいタイプ\n26/5/26 プライムケアに直接受け取り。病院指定の歩行器納品。深井さん立会あり\n26/5/27 1.室内用歩行器 アヴァンス PAセット アヴァンスL-PA KZ-327210 742764　返却する。'},
    {id:2,userId:2,category:'施設',staff:'篠',tantou:'対応中',jimu:'対応中',date:'2025-09-20',content:'【デモ依頼】\n25/ 9/28。歩行器は9/27までに納品希望。要家屋内段差確認。\n25/11/17 車いすNEO-1のみレンタル決定'},
    {id:3,userId:3,category:'施設',staff:'篠',tantou:'完了',jimu:'対応中',date:'2025-10-27',content:'【レンタル依頼】\n2025/11/14　レンタル開始'},
    {id:4,userId:5,category:'施設',staff:'篠',tantou:'対応中',jimu:'対応中',date:'2025-11-11',content:'【レンタル依頼】\n介助式スキット7を優先。姿勢保持クッション追加検討。\nリクライニングは欠品。11/18再案内、代替候補提示要。\n25/11/19　シータスデモ納品'},
    {id:5,userId:6,category:'施設',staff:'篠',tantou:'完了',jimu:'完了',date:'2025-10-02',content:'エアマスター導入後の褥瘡状態フォロー、2週間後確認。'},
    {id:6,userId:7,category:'施設',staff:'篠',tantou:'完了',jimu:'完了',date:'2025-11-13',content:'25/11/12　シンフォニスリムピンク決定'},
    {id:7,userId:8,category:'施設',staff:'篠',tantou:'完了',jimu:'対応中',date:'2025-11-11',content:'25/11/1　アルコー１Sレンタル決定'},
  ],
  orders: [
    {id:1,userId:1,category:'在宅',staff:'篠',status:'レンタル',product:'ｾｰﾌﾃｨｰｱｰﾑｳｫｰｶｰ Cﾀｲﾌﾟ SAWCR',unit:'250',start:'2026-05-26',end:'',tantou:'完了',jimu:'完了',deliver:'完了',collect:'****',biko:''},
    {id:2,userId:1,category:'在宅',staff:'篠',status:'デモ返却',product:'室内用歩行器 アヴァンス PBセット KZ-327120',unit:'250',start:'デモ返却',end:'デモ返却',tantou:'完了',jimu:'完了',deliver:'完了',collect:'完了',biko:''},
    {id:3,userId:2,category:'施設',staff:'篠',status:'レンタル',product:'アルコー１Ｓ R100415',unit:'2800',start:'****',end:'****',tantou:'完了',jimu:'完了',deliver:'完了',collect:'****',biko:''},
    {id:4,userId:3,category:'施設',staff:'篠',status:'レンタル',product:'ｽﾃｲﾔｰ自走SY22-40SB',unit:'1400',start:'2025-11-14',end:'****',tantou:'完了',jimu:'完了',deliver:'****',collect:'****',biko:''},
    {id:5,userId:5,category:'施設',staff:'篠',status:'レンタル',product:'ｴｱﾏｽﾀｰ ﾈｸｻｽR 91cm RCR-663',unit:'4400',start:'2025-10-01',end:'****',tantou:'完了',jimu:'完了',deliver:'****',collect:'****',biko:''},
    {id:6,userId:6,category:'施設',staff:'篠',status:'レンタル',product:'ｼﾝﾌｫﾆｰｽﾘﾑ RSMA4-0040',unit:'2320',start:'2025-11-15',end:'****',tantou:'完了',jimu:'完了',deliver:'****',collect:'****',biko:''},
    {id:7,userId:7,category:'施設',staff:'篠',status:'レンタル',product:'アルコー１Ｓ R100415',unit:'2800',start:'2025-11-01',end:'****',tantou:'完了',jimu:'完了',deliver:'****',collect:'****',biko:''},
    {id:8,userId:8,category:'施設',staff:'篠',status:'入院中',product:'グレイスコアマルチ自走42幅 RGRC-31B-42',unit:'4800',start:'2024-02-01',end:'2025-11-13',tantou:'完了',jimu:'完了',deliver:'****',collect:'****',biko:''},
    {id:9,userId:4,category:'施設',staff:'篠',status:'デモ中',product:'車ｲｽ ﾘｸﾗｲﾆﾝｸﾞ式 ｼｰﾀｽ STS-1',unit:'7440',start:'****',end:'****',tantou:'完了',jimu:'完了',deliver:'****',collect:'****',biko:'欠品中、未納品'},
  ],
  sales: [
    {id:1,userId:1,category:'在宅',staff:'篠',status:'住宅改修',product:'手摺の取り付け　3ヶ所',amount:35000,start:'2026-02-12',end:'2026-02-15',check:'****',biko:''},
  ],
  nextIds: {user:9,memo:8,order:10,sale:2},
  trash: [], // ゴミ箱（削除済みデータ、90日保存）
  updateLogs: [], // 更新履歴（誰がいつ更新したか）
};

// ======================== STATE ========================
let currentUser = null;
let currentRole = null;
let currentPerms = { canEditOrder: false, canEditUser: false, canAdmin: false };
let editingId = null;
let editingType = null;
let currentFilters = {home:{search:'',status:'',staff:''},facility:{search:'',status:'',staff:''},corporate:{search:'',status:'',staff:''},orders:{search:'',category:'',staff:'',tab:'all'},memos:{search:'',category:'',staff:''},sales:{search:'',status:''}};
let currentPages = {home:1,facility:1,corporate:1,orders:1,memos:1,sales:1};
const PAGE_SIZE = 15;
let sortState = {};

// ======================== INIT ========================
// ======================== PERMISSION UI ========================
function applyPermissionUI() {
  // 利用者追加ボタン（canEditUser が必要）
  ['btn-add-user-dash','btn-add-home','btn-add-facility','btn-add-corporate'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = currentPerms.canEditUser ? '' : 'none';
  });
}

// 権限を保存（ローカルのDBを更新）
function saveStaffPerms(staffId, field, value) {
  const s = DB.staff.find(x => x.id === staffId);
  if (!s) return;
  s[field] = value;
  // 自分自身の権限が変わった場合はcurrentPermsも更新
  if (s.email && s.email.toLowerCase() === (msalInstance.getAllAccounts()[0]?.username||'').toLowerCase()) {
    currentPerms.canEditOrder = s.canEditOrder;
    currentPerms.canEditUser  = s.canEditUser;
    currentPerms.canAdmin     = s.canAdmin;
    applyPermissionUI();
    document.getElementById('admin-menu').style.display = currentPerms.canAdmin ? 'block' : 'none';
  }
  showToast('権限を更新しました', 'success');
}

// Microsoftアカウント → システム社員マスタ のマッピング
function getStaffByEmail(email) {
  if (!email) return null;
  return DB.staff.find(s => s.email && s.email.toLowerCase() === email.toLowerCase()) || null;
}

// 🔧【v7】セッションクリア機能（詰まり時の救済策）
// localStorage/sessionStorageからMSAL関連データを全部消してリロード
function clearSessionAndReload() {
  try {
    // MSAL関連のキーを削除
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('msal.') || k.includes('login.microsoftonline') || k.includes(SP_CONFIG.clientId))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    sessionStorage.clear();
    console.log('[セッションクリア] 削除キー数:', keysToRemove.length);
  } catch(e) { console.warn('clearSessionAndReload error:', e); }
  // 完全リロード
  window.location.reload();
}

// Microsoftサインインボタン押下
// 🔧【v7】PC・スマホとも「リダイレクト方式」に統一
//   - PCのポップアップ方式はGitHub PagesのCOOPで「認証中...」のまま固まる問題が多発
//   - リダイレクト方式は最も確実
async function doMSLogin() {
  const errEl = document.getElementById('login-error');
  errEl.style.display = 'none';
  const btn = document.querySelector('#login-screen button');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Microsoftへ移動中...'; }
  try {
    // 🔧 file:// チェック
    if (IS_FILE_PROTOCOL) {
      throw new Error('ローカルファイルからは認証できません。https:// で開いてください。');
    }
    // 🔧 MSALダミーチェック
    if (msalInstance === noopMsal) {
      throw new Error('MSAL未読込（ネットワーク・CDN障害の可能性）。ページを再読込してください。');
    }
    // 🔧 MSAL初期化が未着手なら今ここで開始
    if (!msalReady) {
      console.log('[Login] MSAL未初期化、ここで初期化');
      msalReady = initMSALBackground();
    }
    await msalReady;

    // 🔧 全クライアントでリダイレクト方式（COOP問題を回避）
    console.log('[Login] loginRedirectで認証開始');
    await msalInstance.loginRedirect({
      scopes: SP_SCOPES,
      prompt: 'select_account',
    });
    // この後ページ遷移するためここには戻ってこない
  } catch(e) {
    console.error('Login error:', e);
    if (e.errorCode !== 'user_cancelled') {
      errEl.textContent = 'サインインに失敗: ' + (e.errorMessage || e.message || e.errorCode || '不明なエラー');
      errEl.style.display = 'block';
    }
    if (btn) { btn.disabled = false; btn.textContent = '🔑 Microsoftでサインイン'; }
  }
}

// 認証成功後の処理
async function onMSAuthSuccess(account) {
  const email = account.username;
  const staff = getStaffByEmail(email);
  if (!staff) {
    const errEl = document.getElementById('login-error');
    errEl.textContent = 'このアカウント（' + email + '）はシステムに登録されていません。管理者に連絡してください。';
    errEl.style.display = 'block';
    const btn = document.querySelector('#login-screen button');
    if (btn) { btn.disabled = false; btn.textContent = '🔑 Microsoftでサインイン'; }
    return;
  }
  // 🔧【v8】ログイン成功フラグを立てて、ブートストラップタイマーをキャンセル
  // （これをやらないと5秒/8秒後にブートストラップが「未ログイン」と誤判断して login画面を強制表示してしまう）
  window.__loggedIn = true;
  if (window.__cancelBootstrapTimers) window.__cancelBootstrapTimers();

  currentUser = staff.name;
  currentRole = staff.role;
  currentPerms = {
    canEditOrder: staff.canEditOrder || false,
    canEditUser:  staff.canEditUser  || false,
    canAdmin:     staff.canAdmin     || false,
  };
  document.getElementById('current-user').textContent = staff.fullname || staff.name;
  document.getElementById('current-role').textContent = currentRole;
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('loading-screen').style.display = 'none'; // 念のため
  document.getElementById('admin-menu').style.display = currentPerms.canAdmin ? 'block' : 'none';
  console.log('[Auth] ログイン完了:', staff.name);
  await initApp();
}

// 🔧 早期ブートストラップ（ヘッダー側のスクリプト）と協調動作
// DOMContentLoaded で動かす（window.onload より早い）
document.addEventListener('DOMContentLoaded', function() {
  console.log('[記録管理システム] build: v12-savefix / protocol:', window.location.protocol, '/ MSAL ready:', typeof msal);

  // 🔧 file://ならエラー画面が出ている → 以降何もしない
  if (IS_FILE_PROTOCOL) return;

  // 🔧 MSAL初期化を非同期で開始（例外は内部で吸収）
  try {
    msalReady = initMSALBackground();
  } catch(e) {
    console.error('initMSALBackground呼び出し失敗:', e);
    msalReady = Promise.resolve();
  }
  // ローディング消去・ログイン表示は早期ブートストラップが800ms後に必ず実行するので、
  // ここでは何もしなくてOK
});

async function initMSALBackground() {
  try {
    console.log('[MSAL] initialize開始');
    await msalInstance.initialize();
    console.log('[MSAL] initialize完了');

    // 🔧 リダイレクトからの戻りを最優先で処理（スマホ・PCリダイレクト両対応）
    let redirectResult = null;
    try {
      redirectResult = await msalInstance.handleRedirectPromise();
      console.log('[MSAL] handleRedirectPromise:', redirectResult ? 'account取得' : '通常起動');
    } catch(e) {
      console.warn('handleRedirectPromise error:', e);
    }

    if (redirectResult && redirectResult.account) {
      spToken = redirectResult.accessToken;
      const ls = document.getElementById('loading-screen');
      if (ls) ls.style.display = 'none';
      await onMSAuthSuccess(redirectResult.account);
      return;
    }

    // 既存セッションがあればサイレント自動ログイン
    const accounts = msalInstance.getAllAccounts();
    console.log('[MSAL] 既存アカウント:', accounts.length, '件');
    if (accounts.length > 0) {
      try {
        const result = await msalInstance.acquireTokenSilent({
          scopes: SP_SCOPES,
          account: accounts[0],
          forceRefresh: false,
        });
        spToken = result.accessToken;
        if (!currentUser) {
          await onMSAuthSuccess(accounts[0]);
        }
      } catch(e) {
        console.warn('自動ログイン失敗（手動サインインが必要）:', e);
      }
    }
  } catch(e) {
    console.warn('MSAL初期化失敗:', e);
  }
}


// ======================== 更新履歴 ========================
function addUpdateLog(type, targetId, targetName, action) {
  DB.updateLogs.unshift({
    type,       // 'user'|'memo'|'order'|'sale'
    targetId,
    targetName,
    action,     // '新規登録'|'更新'|'削除'
    updatedBy: currentUser || '-',
    updatedByFull: DB.staff.find(s=>s.name===currentUser)?.fullname || currentUser || '-',
    updatedAt: new Date().toISOString(),
  });
  // 最新500件のみ保持
  if (DB.updateLogs.length > 500) DB.updateLogs = DB.updateLogs.slice(0, 500);
}

function renderUpdateLogs(userId) {
  const logs = DB.updateLogs.filter(l => l.targetId === userId);
  if (logs.length === 0) {
    return '<div style="padding:16px;color:var(--gray-500);font-size:13px;">更新履歴がありません</div>';
  }
  return logs.map(l => {
    const dt = new Date(l.updatedAt);
    const dateStr = dt.getFullYear() + '/' + String(dt.getMonth()+1).padStart(2,'0') + '/' +
      String(dt.getDate()).padStart(2,'0') + ' ' +
      String(dt.getHours()).padStart(2,'0') + ':' + String(dt.getMinutes()).padStart(2,'0');
    const actionColor = l.action==='新規登録'?'badge-green':l.action==='削除'?'badge-red':'badge-blue';
    const typeLabel = {user:'利用者',memo:'メモ',order:'受注',sale:'販売'}[l.type]||l.type;
    return `
      <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 14px;border-bottom:1px solid var(--gray-100);font-size:12px;">
        <div style="min-width:120px;color:var(--gray-600);">${dateStr}</div>
        <div style="min-width:70px;font-weight:500;">${l.updatedByFull}</div>
        <div><span class="badge ${actionColor}" style="font-size:10px;">${typeLabel}${l.action}</span></div>
      </div>`;
  }).join('');
}


// ======================== ゴミ箱 ========================
function moveToTrash(type, data) {
  const deletedAt = new Date().toISOString();
  const expireAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
  DB.trash.push({ type, data, deletedAt, expireAt });
  // 90日過ぎたものを自動削除
  DB.trash = DB.trash.filter(t => new Date(t.expireAt) > new Date());
}

function restoreFromTrash(idx) {
  const item = DB.trash[idx];
  if (!item) return;
  if (item.type === 'user') {
    DB.users.push(item.data);
    showToast('利用者を復元しました', 'success');
  } else if (item.type === 'memo') {
    DB.memos.push(item.data);
    showToast('メモを復元しました', 'success');
  } else if (item.type === 'order') {
    DB.orders.push(item.data);
    showToast('受注を復元しました', 'success');
  } else if (item.type === 'sale') {
    DB.sales.push(item.data);
    showToast('販売データを復元しました', 'success');
  }
  DB.trash.splice(idx, 1);
  renderTrash();
  renderDashboard();
}

function deleteFromTrash(idx) {
  if (!confirm('完全に削除します。この操作は取り消せません。')) return;
  DB.trash.splice(idx, 1);
  renderTrash();
  showToast('完全に削除しました', 'success');
}

function renderTrash() {
  const el = document.getElementById('trash-list');
  if (!el) return;
  const typeLabel = {user:'利用者', memo:'メモ', order:'受注', sale:'販売'};
  const active = DB.trash.filter(t => new Date(t.expireAt) > new Date());
  if (active.length === 0) {
    el.innerHTML = '<div style="padding:32px;text-align:center;color:var(--gray-500);">ゴミ箱は空です</div>';
    return;
  }
  el.innerHTML = active.map((t, i) => {
    const daysLeft = Math.ceil((new Date(t.expireAt) - new Date()) / (1000*60*60*24));
    const name = t.data.name || t.data.product || t.data.content?.slice(0,20) || '-';
    const userName = t.type !== 'user' ? (DB.users.find(u=>u.id===t.data.userId)?.name || t.data.userId || '') : '';
    return `
      <div style="display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--gray-100);">
        <span class="badge badge-gray">${typeLabel[t.type]||t.type}</span>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:500;">${userName ? userName+'　' : ''}${name}</div>
          <div style="font-size:11px;color:var(--gray-500);">削除日：${t.deletedAt.slice(0,10)}　残り${daysLeft}日</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="restoreFromTrash(${i})">↩ 復元</button>
        <button class="btn btn-danger btn-sm" onclick="deleteFromTrash(${i})">完全削除</button>
      </div>
    `;
  }).join('');
}


// ======================== GLOBAL SEARCH ========================
function globalSearch(query) {
  const resultsEl = document.getElementById('global-search-results');
  if (!query || query.trim().length < 2) {
    resultsEl.style.display = 'none';
    return;
  }
  const q = query.trim().toLowerCase();
  const results = [];

  DB.users.forEach(u => {
    const fields = [
      {label:'利用者名', val: u.name},
      {label:'居宅・施設名', val: u.org},
      {label:'担当者', val: u.staff},
      {label:'ステータス', val: u.status},
      {label:'メモ・伝達事項', val: u.memo},
      {label:'家族情報', val: u.family},
      {label:'備考', val: u.biko},
      {label:'開始年月', val: u.start},
    ];
    fields.forEach(f => {
      if (f.val && f.val.toLowerCase().includes(q)) {
        results.push({
          type: 'user', userId: u.id,
          userName: u.name, category: u.category, org: u.org||'',
          matchField: f.label,
          matchVal: highlight(f.val, q),
        });
      }
    });

    // メモ検索
    DB.memos.filter(m => m.userId === u.id).forEach(m => {
      if (m.content && m.content.toLowerCase().includes(q)) {
        results.push({
          type: 'memo', userId: u.id,
          userName: u.name, category: u.category, org: u.org||'',
          matchField: '営業メモ (' + (m.date||'') + ')',
          matchVal: highlight(m.content, q),
        });
      }
    });

    // 受注・商品検索
    DB.orders.filter(o => o.userId === u.id).forEach(o => {
      const oFields = [
        {label:'商品名', val: o.product},
        {label:'受注備考', val: o.biko},
      ];
      oFields.forEach(f => {
        if (f.val && f.val.toLowerCase().includes(q)) {
          results.push({
            type: 'order', userId: u.id,
            userName: u.name, category: u.category, org: u.org||'',
            matchField: f.label,
            matchVal: highlight(f.val, q),
          });
        }
      });
    });

    // 販売検索
    DB.sales.filter(s => s.userId === u.id).forEach(s => {
      const sFields = [
        {label:'販売商品', val: s.product},
        {label:'販売備考', val: s.biko},
      ];
      sFields.forEach(f => {
        if (f.val && f.val.toLowerCase().includes(q)) {
          results.push({
            type: 'sale', userId: u.id,
            userName: u.name, category: u.category, org: u.org||'',
            matchField: f.label,
            matchVal: highlight(f.val, q),
          });
        }
      });
    });
  });

  // 重複を除去（同じuser+fieldの組み合わせ）
  const seen = new Set();
  const unique = results.filter(r => {
    const key = r.userId + '_' + r.matchField;
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });

  if (unique.length === 0) {
    resultsEl.innerHTML = '<div style="padding:16px;text-align:center;color:#9aa0a6;font-size:13px;">「' + query + '」に一致する結果がありません</div>';
  } else {
    const catBadge = c => c==='在宅'?'badge-blue':c==='施設'?'badge-green':'badge-gray';
    resultsEl.innerHTML =
      '<div style="padding:8px 14px;font-size:11px;color:#9aa0a6;border-bottom:1px solid #e8eaed;font-weight:700;">検索結果 ' + unique.length + '件</div>' +
      unique.map(r => `
        <div onclick="openDetail(${r.userId});closeGlobalSearch();"
          style="padding:10px 14px;border-bottom:1px solid #f1f3f4;cursor:pointer;transition:background 0.1s;"
          onmouseover="this.style.background='#f1f3f4'" onmouseout="this.style.background=''">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
            <strong style="font-size:13px;">${r.userName}</strong>
            <span class="badge ${catBadge(r.category)}" style="font-size:10px;">${r.category}</span>
            <span style="font-size:12px;color:#80868b;">${r.org}</span>
          </div>
          <div style="font-size:11px;color:#5f6368;margin-bottom:2px;">📌 ${r.matchField}</div>
          <div style="font-size:12px;color:#3c4043;white-space:pre-wrap;max-height:48px;overflow:hidden;">${r.matchVal}</div>
        </div>
      `).join('');
  }
  resultsEl.style.display = 'block';
}

function highlight(text, query) {
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp('(' + escaped + ')', 'gi'),
    '<mark style="background:#fff3cd;padding:0 2px;border-radius:2px;">$1</mark>');
}

function closeGlobalSearch() {
  document.getElementById('global-search-input').value = '';
  document.getElementById('global-search-results').style.display = 'none';
}

// 検索結果以外クリックで閉じる
document.addEventListener('click', function(e) {
  const input = document.getElementById('global-search-input');
  const results = document.getElementById('global-search-results');
  if (input && results && !input.contains(e.target) && !results.contains(e.target)) {
    results.style.display = 'none';
  }
});


// ======================== 担当者別チェックリスト印刷 ========================
function printChecklist() {
  const today = new Date();
  const dateStr = today.getFullYear() + '年' + (today.getMonth()+1) + '月' + today.getDate() + '日（' + ['日','月','火','水','木','金','土'][today.getDay()] + '）';

  const staffList = DB.staff.filter(s => s.role === '営業' || s.role === '所長' || s.role === '社長');

  let html = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
  <title>作業チェックリスト ${dateStr}</title>
  <style>
    @page { size: A4 landscape; margin: 10mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Meiryo', 'Yu Gothic', sans-serif; }
    body { font-size: 10pt; color: #111; }
    .page { width: 100%; page-break-after: always; padding: 4mm; }
    .page:last-child { page-break-after: avoid; }
    .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #1a6b8a; padding-bottom: 3mm; margin-bottom: 4mm; }
    .header-left h1 { font-size: 14pt; color: #1a6b8a; font-weight: bold; }
    .header-left p { font-size: 9pt; color: #555; margin-top: 1mm; }
    .header-right { font-size: 9pt; color: #555; text-align: right; }
    table { width: 100%; border-collapse: collapse; font-size: 8.5pt; }
    th { background: #1a6b8a; color: white; padding: 2mm 2mm; text-align: center; font-weight: bold; border: 1px solid #ccc; white-space: nowrap; }
    td { padding: 2mm 2mm; border: 1px solid #ddd; vertical-align: middle; }
    tr:nth-child(even) td { background: #f4f8fb; }
    .cat-home { background: #dbeafe; color: #1e40af; padding: 1px 4px; border-radius: 3px; font-size: 7.5pt; font-weight: bold; }
    .cat-facility { background: #dcfce7; color: #166534; padding: 1px 4px; border-radius: 3px; font-size: 7.5pt; font-weight: bold; }
    .cat-corp { background: #ede9fe; color: #5b21b6; padding: 1px 4px; border-radius: 3px; font-size: 7.5pt; font-weight: bold; }
    .st-pending { background: #dbeafe; color: #1e40af; padding: 1px 5px; border-radius: 3px; font-size: 7.5pt; }
    .st-urgent { background: #fee2e2; color: #991b1b; padding: 1px 5px; border-radius: 3px; font-size: 7.5pt; font-weight: bold; }
    .st-done { background: #dcfce7; color: #166534; padding: 1px 5px; border-radius: 3px; font-size: 7.5pt; }
    .check-col { width: 6mm; text-align: center; font-size: 12pt; }
    .memo-line { border-bottom: 1px solid #aaa; height: 5mm; display: inline-block; width: 90%; }
    .section-title { font-size: 9pt; font-weight: bold; color: #1a6b8a; margin: 3mm 0 1mm 0; }
    .footer { margin-top: 4mm; font-size: 7.5pt; color: #888; text-align: right; border-top: 1px solid #ddd; padding-top: 2mm; }
    .no-data { color: #aaa; font-size: 8pt; padding: 3mm; text-align: center; }
  </style></head><body>`;

  staffList.forEach(staff => {
    const targets = DB.users.filter(u =>
      u.staff === staff.name &&
      (u.tantou === '対応中' || u.tantou === '要確認' || u.jimu === '対応中' || u.jimu === '要確認') &&
      u.status !== '終了'
    );

    const homeUsers = targets.filter(u => u.category === '在宅');
    const facilityUsers = targets.filter(u => u.category === '施設');
    const corpUsers = targets.filter(u => u.category === '法人' || u.category === '法人・業者');

    const renderRows = (users) => users.map(u => {
      const orders = DB.orders.filter(o => o.userId === u.id && o.status !== '終了' && o.status !== 'デモ返却');
      const latestMemo = DB.memos.filter(m => m.userId === u.id).sort((a,b)=>b.date.localeCompare(a.date))[0];
      const orderText = orders.map(o => o.product).join('　/　') || '－';
      const catClass = u.category==='在宅'?'cat-home':u.category==='施設'?'cat-facility':'cat-corp';
      const tantouClass = u.tantou==='要確認'?'st-urgent':u.tantou==='完了'?'st-done':'st-pending';
      const jimuClass = u.jimu==='要確認'?'st-urgent':u.jimu==='完了'?'st-done':'st-pending';
      return `<tr>
        <td class="check-col">□</td>
        <td><span class="${catClass}">${u.category}</span></td>
        <td style="font-weight:bold;">${u.name}</td>
        <td>${u.org||'－'}</td>
        <td style="font-size:7.5pt;max-width:80mm;">${orderText}</td>
        <td style="text-align:center;"><span class="${tantouClass}">${u.tantou||'－'}</span></td>
        <td style="text-align:center;"><span class="${jimuClass}">${u.jimu||'－'}</span></td>
        <td style="font-size:7.5pt;color:#555;">${latestMemo ? latestMemo.date+'　'+latestMemo.content.slice(0,25).replace(/\n/g,' ')+'…' : '－'}</td>
        <td><span class="memo-line"></span></td>
      </tr>`;
    }).join('');

    html += `<div class="page">
      <div class="header">
        <div class="header-left">
          <h1>🏥 シノテクス株式会社　福祉用具　作業チェックリスト</h1>
          <p>担当：<strong>${staff.fullname||staff.name}</strong>　（${staff.role}）</p>
        </div>
        <div class="header-right">${dateStr}<br>対応中・要確認 ${targets.length}件</div>
      </div>`;

    if (targets.length === 0) {
      html += '<div class="no-data">本日の対応中・要確認案件はありません ✅</div>';
    } else {
      html += `<table>
        <thead><tr>
          <th>✓</th><th>区分</th><th>利用者名</th><th>居宅・施設</th>
          <th>商品・レンタル</th><th>担当処理</th><th>事務処理</th>
          <th>最新メモ（抜粋）</th><th>メモ欄</th>
        </tr></thead><tbody>`;

      if (homeUsers.length > 0) {
        html += `<tr><td colspan="9" style="background:#eff6ff;padding:1mm 2mm;font-weight:bold;font-size:8pt;color:#1e40af;">🏠 在宅（${homeUsers.length}件）</td></tr>`;
        html += renderRows(homeUsers);
      }
      if (facilityUsers.length > 0) {
        html += `<tr><td colspan="9" style="background:#f0fdf4;padding:1mm 2mm;font-weight:bold;font-size:8pt;color:#166534;">🏢 施設（${facilityUsers.length}件）</td></tr>`;
        html += renderRows(facilityUsers);
      }
      if (corpUsers.length > 0) {
        html += `<tr><td colspan="9" style="background:#faf5ff;padding:1mm 2mm;font-weight:bold;font-size:8pt;color:#5b21b6;">🏭 法人・業者（${corpUsers.length}件）</td></tr>`;
        html += renderRows(corpUsers);
      }
      html += '</tbody></table>';
    }

    html += `<div class="footer">シノテクス株式会社　福祉用具部門　${dateStr}　印刷日時：${new Date().toLocaleString('ja-JP')}</div>
    </div>`;
  });

  html += '</body></html>';

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  win.onload = () => win.print();
}

function logout() {
  // Microsoftアカウントからもサインアウト
  const accounts = msalInstance.getAllAccounts();
  currentUser = null; currentRole = null; spToken = null;
  window.__loggedIn = false; // 🔧【v8】ログイン状態フラグもクリア
  if (accounts.length > 0) {
    // 🔧【v7】全クライアントでリダイレクト方式（COOP問題回避）
    msalInstance.logoutRedirect({ account: accounts[0] }).catch(() => {});
    return;
  }
  document.getElementById('login-screen').style.display = 'block';
  showToast('ログアウトしました', 'success');
}

async function initApp() {
  populateStaffDatalist();
  populateProductDatalist();
  applyPermissionUI();
  showPage('dashboard');
  renderDashboard();
  renderStaffTable();
  // SharePoint接続を試みる（失敗時はローカルデータで続行）
  try {
    // MSALが初期化済みかチェック
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0 || spToken) {
      // 既に認証済み or リダイレクトでトークン取得済みの場合は即ロード
      await loadFromSharePoint();
    } else {
      // 未認証時はポップアップを出してSharePoint接続
      const token = await getSPToken();
      if (token) {
        await loadFromSharePoint();
      } else {
        showToast('ローカルデータで動作中', 'error');
      }
    }
    if (document.getElementById('dash-stats')) renderDashboard();
    if (document.getElementById('staff-table-body')) renderStaffTable();
  } catch(e) {
    console.warn('SharePoint接続スキップ:', e);
    showToast('ローカルデータで動作中', 'error');
    if (document.getElementById('dash-stats')) renderDashboard();
    if (document.getElementById('staff-table-body')) renderStaffTable();
  }
}

// ======================== NAVIGATION ========================
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick') === `showPage('${name}')`) n.classList.add('active');
  });
  if (name === 'dashboard') renderDashboard();
  if (name === 'board') { populateBoardFilters(); renderBoard(); }
  if (name === 'home-users') renderUsers('home');
  if (name === 'facility-users') { populateStaffFilter('facility'); renderUsers('facility'); }
  if (name === 'corporate-users') renderUsers('corporate');
  if (name === 'orders') renderOrders();
  if (name === 'memos') renderMemos();
  if (name === 'sales') renderSales();
  if (name === 'settings') renderSettings();
  if (name === 'users-admin') renderStaffTable();
  if (name === 'trash') { renderTrash(); }
  if (window.innerWidth <= 768) document.getElementById('sidebar').classList.remove('open');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ======================== DASHBOARD ========================
function renderDashboard() {
  const users = DB.users;
  const active = users.filter(u => u.status === '利用中' || u.status === '【新規】利用中');
  const urgent = users.filter(u => u.tantou === '要確認' || u.jimu === '要確認');
  const orders = DB.orders.filter(o => o.status === 'レンタル');
  const demos = DB.orders.filter(o => o.status === 'デモ中');

  document.getElementById('dash-stats').innerHTML = `
    <div class="stat-card blue"><div class="label">👥 利用者総数</div><div class="value">${users.length}</div><div class="sub">全カテゴリ合計</div></div>
    <div class="stat-card green"><div class="label">✅ 利用中</div><div class="value">${active.length}</div><div class="sub">現在契約中</div></div>
    <div class="stat-card red"><div class="label">⚠️ 要確認</div><div class="value">${urgent.length}</div><div class="sub">対応が必要</div></div>
    <div class="stat-card blue"><div class="label">📦 レンタル中</div><div class="value">${orders.length}</div><div class="sub">商品数</div></div>
    <div class="stat-card orange"><div class="label">🔄 デモ中</div><div class="value">${demos.length}</div><div class="sub">デモ対応中</div></div>
    <div class="stat-card blue"><div class="label">📝 メモ総数</div><div class="value">${DB.memos.length}</div><div class="sub">営業メモ</div></div>
  `;
  document.getElementById('urgent-count').textContent = urgent.length;

  const urgentHTML = urgent.length === 0 ? '<div style="padding:16px;text-align:center;color:var(--gray-500);font-size:13px;">要確認案件はありません</div>' :
    urgent.map(u => `
      <div style="padding:10px 14px;border-bottom:1px solid var(--gray-100);cursor:pointer;" onclick="openDetail(${u.id})">
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px;">
          <strong style="font-size:13px;">${u.name}</strong>
          <span class="badge badge-orange">${u.category}</span>
          ${u.tantou==='要確認'?'<span class="badge badge-red">担当:要確認</span>':''}
          ${u.jimu==='要確認'?'<span class="badge badge-red">事務:要確認</span>':''}
        </div>
        <div style="font-size:12px;color:var(--gray-600);">${u.org||''} / ${u.staff||''} / ${u.status}</div>
      </div>
    `).join('');
  document.getElementById('urgent-list').innerHTML = urgentHTML;

  const recent = [...DB.memos].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,7);
  const memosHTML = recent.map(m => {
    const u = DB.users.find(u=>u.id===m.userId);
    return `
      <div class="memo-item" style="margin:8px;border-radius:6px;">
        <div class="memo-meta">
          <strong>${u?u.name:'不明'}</strong>
          ${getCategoryBadge(m.category)}
          <span>${m.date}</span>
          <span>${m.staff}</span>
        </div>
        <div class="memo-text" style="font-size:12px;">${(m.content||'').slice(0,80)}${(m.content||'').length>80?'…':''}</div>
      </div>
    `;
  }).join('');
  document.getElementById('recent-memos').innerHTML = memosHTML;
  // ゴミ箱件数更新
  const tc = document.getElementById('trash-count');
  if (tc) tc.textContent = DB.trash.filter(t=>new Date(t.expireAt)>new Date()).length || '';
}

// ======================== BOARD ========================
function populateBoardFilters() {
  const sel = document.getElementById('board-staff-filter');
  const names = [...new Set(DB.staff.map(s=>s.name))];
  sel.innerHTML = '<option value="">全担当者</option>' + names.map(n=>`<option>${n}</option>`).join('');
}

function renderBoard() {
  const catFilter = document.getElementById('board-category-filter').value;
  const staffFilter = document.getElementById('board-staff-filter').value;
  const statuses = ['利用中','【新規】利用中','デモ中','入院中','終了'];
  const colors = {'利用中':'badge-green','【新規】利用中':'badge-blue','デモ中':'badge-orange','入院中':'badge-yellow','終了':'badge-gray'};
  let users = DB.users.filter(u => (!catFilter||u.category===catFilter) && (!staffFilter||u.staff===staffFilter));
  const cols = statuses.map(st => {
    const usersInCol = users.filter(u=>u.status===st);
    return `
      <div class="board-col">
        <div class="board-col-header">${st} <span class="badge badge-gray">${usersInCol.length}</span></div>
        ${usersInCol.map(u=>`
          <div class="board-card" onclick="openDetail(${u.id})">
            <div class="card-name">${u.name}</div>
            <div class="card-sub">${u.org||''} / ${u.staff||''}</div>
            <div class="card-meta">
              ${getCategoryBadge(u.category)}
              ${u.tantou==='要確認'?'<span class="badge badge-red">担当:要確認</span>':''}
              ${u.jimu==='要確認'?'<span class="badge badge-red">事務:要確認</span>':''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  });
  document.getElementById('board-cols').innerHTML = cols.join('');
}

// ======================== USERS ========================
function getStatusBadge(status) {
  const map = {
    '利用中':'badge-green','【新規】利用中':'badge-blue',
    'デモ中':'badge-orange','入院中':'badge-yellow',
    '終了':'badge-gray','要確認':'badge-red',
    '対応中':'badge-blue','完了':'badge-green',
    'レンタル':'badge-green','デモ返却':'badge-gray',
    '介保販売':'badge-purple','住宅改修':'badge-blue','一般販売':'badge-orange',
  };
  return `<span class="badge ${map[status]||'badge-gray'}">${status||'-'}</span>`;
}

function getCategoryBadge(category) {
  const map = {'在宅':'badge-blue','施設':'badge-green','法人':'badge-purple','法人・業者':'badge-purple'};
  return `<span class="badge ${map[category]||'badge-gray'}">${category||'-'}</span>`;
}

function getCategoryUsers(cat) {
  if (cat==='home') return DB.users.filter(u=>u.category==='在宅');
  if (cat==='facility') return DB.users.filter(u=>u.category==='施設');
  if (cat==='corporate') return DB.users.filter(u=>u.category==='法人');
  return DB.users;
}

function filterUsers(cat, key, val) {
  currentFilters[cat][key] = val;
  currentPages[cat] = 1;
  renderUsers(cat);
}

function sortTable(cat, key) {
  const sk = cat+'_'+key;
  sortState[sk] = sortState[sk]==='asc'?'desc':'asc';
  renderUsers(cat);
}

function renderUsers(cat) {
  let data = getCategoryUsers(cat);
  const f = currentFilters[cat];
  if (f.search) data = data.filter(u=>(u.name+u.org+u.org).toLowerCase().includes(f.search.toLowerCase()));
  if (f.status) data = data.filter(u=>u.status===f.status);
  if (f.staff) data = data.filter(u=>u.staff===f.staff);

  const bodyId = cat==='home'?'home-users-body':cat==='facility'?'facility-users-body':'corporate-users-body';
  const orgLabel = cat==='home'?'居宅名':cat==='facility'?'施設名':'法人名';
  const total = data.length;
  const start = (currentPages[cat]-1)*PAGE_SIZE;
  const pageData = data.slice(start, start+PAGE_SIZE);

  const canEdit = currentPerms.canEditUser;
  document.getElementById(bodyId).innerHTML = pageData.map(u=>`
    <tr>
      <td>${u.id}</td>
      <td><a href="#" onclick="openDetail(${u.id});return false;" style="color:var(--primary);font-weight:500;">${u.name}</a></td>
      <td>${u.org||'-'}</td>
      <td>${getStatusBadge(u.status)}</td>
      <td>${u.staff||'-'}</td>
      <td>${getStatusBadge(u.tantou)}</td>
      <td>${getStatusBadge(u.jimu)}</td>
      <td class="td-actions">
        <button class="btn btn-outline btn-sm btn-icon" onclick="openDetail(${u.id})" title="詳細">👁</button>
        ${canEdit?`<button class="btn btn-outline btn-sm btn-icon" onclick="openEditUser(${u.id})" title="編集">✏️</button>
        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteUser(${u.id})" title="削除">🗑</button>`:''}
      </td>
    </tr>
  `).join('');

  const pgEl = document.getElementById(cat+'-pagination');
  if (pgEl) pgEl.innerHTML = renderPagination(total, currentPages[cat], cat);
}

function populateStaffFilter(cat) {
  const names = [...new Set(DB.staff.map(s=>s.name))];
  const sel = document.getElementById(cat+'-staff-filter');
  if (sel) sel.innerHTML = '<option value="">全担当者</option>' + names.map(n=>`<option>${n}</option>`).join('');
}

function renderPagination(total, current, key) {
  const pages = Math.ceil(total/PAGE_SIZE);
  if (pages <= 1) return `<div class="page-info">全 ${total} 件</div>`;
  let btns = `<div class="page-info">全 ${total} 件</div>
    <button class="pg-btn" onclick="setPage('${key}',${current-1})" ${current===1?'disabled':''}>‹</button>`;
  for (let p=Math.max(1,current-2);p<=Math.min(pages,current+2);p++) {
    btns += `<button class="pg-btn ${p===current?'active':''}" onclick="setPage('${key}',${p})">${p}</button>`;
  }
  btns += `<button class="pg-btn" onclick="setPage('${key}',${current+1})" ${current===pages?'disabled':''}>›</button>`;
  return btns;
}

function setPage(key, page) {
  currentPages[key] = page;
  if (key==='home') renderUsers('home');
  else if (key==='facility') renderUsers('facility');
  else if (key==='corporate') renderUsers('corporate');
  else if (key==='orders') renderOrders();
  else if (key==='memos') renderMemos();
  else if (key==='sales') renderSales();
}

// ======================== ORDERS ========================
function switchOrderTab(tab, el) {
  currentFilters.orders.tab = tab;
  currentPages.orders = 1;
  document.querySelectorAll('#page-orders .tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  renderOrders();
}

function filterOrders(key, val) {
  currentFilters.orders[key] = val;
  currentPages.orders = 1;
  renderOrders();
}

function renderOrders() {
  let data = [...DB.orders];
  const f = currentFilters.orders;
  const tabMap = {rental:'レンタル',demo:'デモ中',end:'終了'};
  if (f.tab !== 'all' && tabMap[f.tab]) data = data.filter(o=>o.status===tabMap[f.tab]);
  if (f.search) data = data.filter(o=>{
    const u = DB.users.find(u=>u.id===o.userId);
    return (u?u.name+u.org:'').toLowerCase().includes(f.search.toLowerCase()) || (o.product||'').toLowerCase().includes(f.search.toLowerCase());
  });
  if (f.category) data = data.filter(o=>o.category===f.category);
  if (f.staff) data = data.filter(o=>o.staff===f.staff);

  // Update tab counts
  document.getElementById('tc-all').textContent = DB.orders.length;
  document.getElementById('tc-rental').textContent = DB.orders.filter(o=>o.status==='レンタル').length;
  document.getElementById('tc-demo').textContent = DB.orders.filter(o=>o.status==='デモ中').length;
  document.getElementById('tc-end').textContent = DB.orders.filter(o=>o.status==='終了'||o.status==='デモ返却').length;

  const total = data.length;
  const start = (currentPages.orders-1)*PAGE_SIZE;
  const pageData = data.slice(start, start+PAGE_SIZE);
  const canEdit = currentPerms.canEditOrder;

  document.getElementById('orders-body').innerHTML = pageData.map(o=>{
    const u = DB.users.find(u=>u.id===o.userId);
    return `<tr>
      <td>${o.id}</td>
      <td>${u?`<a href="#" onclick="openDetail(${u.id});return false;" style="color:var(--primary);">${u.name}</a>`:'-'}</td>
      <td>${u?u.org||'-':'-'}</td>
      <td>${getCategoryBadge(o.category)}</td>
      <td style="max-width:220px;font-size:12px;">${o.product||'-'}</td>
      <td>${getStatusBadge(o.status)}</td>
      <td>${o.unit?'¥'+Number(o.unit).toLocaleString():'-'}</td>
      <td>${o.start||'-'}</td>
      <td>${o.staff||'-'}</td>
      <td class="td-actions">
        ${canEdit?`<button class="btn btn-outline btn-sm btn-icon" onclick="openEditOrder(${o.id})" title="編集">✏️</button>
        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteOrder(${o.id})" title="削除">🗑</button>`:''}
      </td>
    </tr>`;
  }).join('');
  document.getElementById('orders-pagination').innerHTML = renderPagination(total, currentPages.orders, 'orders');
}

// ======================== MEMOS ========================
function filterMemos(key, val) {
  currentFilters.memos[key] = val;
  currentPages.memos = 1;
  renderMemos();
}

function renderMemos() {
  let data = [...DB.memos];
  const f = currentFilters.memos;
  if (f.search) data = data.filter(m=>{
    const u = DB.users.find(u=>u.id===m.userId);
    return (m.content||'').includes(f.search) || (u?u.name:'').includes(f.search);
  });
  if (f.category) data = data.filter(m=>m.category===f.category);
  if (f.staff) data = data.filter(m=>m.staff===f.staff);
  data.sort((a,b)=>b.date.localeCompare(a.date));

  const total = data.length;
  const start = (currentPages.memos-1)*PAGE_SIZE;
  const pageData = data.slice(start, start+PAGE_SIZE);
  const canEdit = currentPerms.canEditOrder;

  document.getElementById('memos-body').innerHTML = pageData.map(m=>{
    const u = DB.users.find(u=>u.id===m.userId);
    return `<tr>
      <td>${u?`<a href="#" onclick="openDetail(${u.id});return false;" style="color:var(--primary);">${u.name}</a>`:'-'}</td>
      <td>${getCategoryBadge(m.category)}</td>
      <td>${u?u.org||'-':'-'}</td>
      <td>${m.staff||'-'}</td>
      <td>${m.date||'-'}</td>
      <td style="max-width:280px;font-size:12px;">${(m.content||'').slice(0,60).replace(/\n/g,' ')}${(m.content||'').length>60?'…':''}</td>
      <td class="td-actions">
        <button class="btn btn-outline btn-sm btn-icon" onclick="openMemoDetail(${m.id})" title="詳細">👁</button>
        ${canEdit?`<button class="btn btn-danger btn-sm btn-icon" onclick="deleteMemo(${m.id})" title="削除">🗑</button>`:''}
      </td>
    </tr>`;
  }).join('');
  document.getElementById('memos-pagination').innerHTML = renderPagination(total, currentPages.memos, 'memos');
}

// ======================== SALES ========================
function filterSales(key, val) {
  currentFilters.sales[key] = val;
  currentPages.sales = 1;
  renderSales();
}

function renderSales() {
  let data = [...DB.sales];
  const f = currentFilters.sales;
  if (f.search) data = data.filter(s=>{
    const u = DB.users.find(u=>u.id===s.userId);
    return (s.product||'').includes(f.search)||(u?u.name:'').includes(f.search);
  });
  if (f.status) data = data.filter(s=>s.status===f.status);

  const total = data.length;
  const start = (currentPages.sales-1)*PAGE_SIZE;
  const pageData = data.slice(start, start+PAGE_SIZE);
  const canEdit = currentPerms.canEditOrder;

  document.getElementById('sales-body').innerHTML = pageData.map(s=>{
    const u = DB.users.find(u=>u.id===s.userId);
    return `<tr>
      <td>${u?`<a href="#" onclick="openDetail(${u.id});return false;" style="color:var(--primary);font-weight:500;">${u.name}</a>`:'-'}</td>
      <td>${getCategoryBadge(s.category)}</td>
      <td>${u?u.org||'-':'-'}</td>
      <td>${getStatusBadge(s.status)}</td>
      <td>${s.product||'-'}</td>
      <td style="font-weight:700;color:var(--primary);">${s.amount?'¥'+Number(s.amount).toLocaleString():'-'}</td>
      <td>${s.start||'-'}</td>
      <td>${s.staff||'-'}</td>
      <td class="td-actions">
        ${canEdit?`<button class="btn btn-outline btn-sm btn-icon" onclick="openEditSale(${s.id})" title="編集">✏️</button>
        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteSale(${s.id})" title="削除">🗑</button>`:''}
      </td>
    </tr>`;
  }).join('');
  document.getElementById('sales-pagination').innerHTML = renderPagination(total, currentPages.sales, 'sales');
}

// ======================== DETAIL MODAL ========================
function openDetail(userId) {
  const u = DB.users.find(x=>x.id===userId);
  if (!u) return;
  const userOrders = DB.orders.filter(o=>o.userId===userId);
  const userMemos = DB.memos.filter(m=>m.userId===userId).sort((a,b)=>b.date.localeCompare(a.date));
  const userSales = DB.sales.filter(s=>s.userId===userId);
  const canEdit = currentPerms.canEditUser;

  document.getElementById('detail-title').textContent = `👤 ${u.name}（${u.category}・${u.status}）`;
  document.getElementById('detail-edit-btn').style.display = canEdit ? 'inline-flex':'none';
  editingId = userId; editingType = 'user';

  // 施設・居宅マスタ情報取得
  const orgInfo = u.category === '在宅'
    ? DB.masters.kyotaku.find(k => k === u.org)
    : DB.masters.facilities.find(f => f === u.org);

  // 商品フィルター関数（detail内で使用）
  window._detailUserId = userId;
  window._detailOrderFilter = 'all';

  function renderDetailOrders(filter) {
    window._detailOrderFilter = filter;
    const filtered = userOrders.filter(o => {
      if (filter === 'all') return true;
      if (filter === 'rental') return o.status === 'レンタル';
      if (filter === 'demo') return o.status === 'デモ中';
      if (filter === 'end') return o.status === '終了' || o.status === 'デモ返却' || o.status === '入院中';
      return true;
    });
    const el = document.getElementById('detail-orders-list');
    if (!el) return;
    const counts = {
      all: userOrders.length,
      rental: userOrders.filter(o=>o.status==='レンタル').length,
      demo: userOrders.filter(o=>o.status==='デモ中').length,
      end: userOrders.filter(o=>['終了','デモ返却','入院中'].includes(o.status)).length,
    };
    document.querySelectorAll('.order-filter-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.filter === filter);
    });
    el.innerHTML = filtered.length===0
      ? '<div style="color:var(--gray-500);font-size:13px;padding:8px;">該当なし</div>'
      : filtered.map(o=>`
          <div class="product-item" style="flex-wrap:wrap;gap:6px;">
            <div class="product-name" style="font-weight:500;">${o.product||'-'}</div>
            <div>${getStatusBadge(o.status)}</div>
            <div class="product-price">${o.unit?'¥'+Number(o.unit).toLocaleString()+'/月':''}</div>
            <div style="font-size:11px;color:var(--gray-500);">納品：${o.start||'-'}　${o.end&&o.end!='****'?'回収：'+o.end:''}</div>
            ${o.biko?`<div style="font-size:11px;color:var(--accent);width:100%;">⚠️ ${o.biko}</div>`:''}
          </div>`).join('');
  }

  document.getElementById('detail-body').innerHTML = `
    <div class="detail-wrap">
      <div>
        <div class="detail-card" style="margin-bottom:14px;">
          <div class="detail-card-header">👤 基本情報
            <span>${getStatusBadge(u.status)}</span>
          </div>
          <div class="detail-card-body">
            <div class="info-row"><span class="key">カテゴリ</span><span class="val">${getCategoryBadge(u.category)}</span></div>
            <div class="info-row"><span class="key">施設/居宅</span><span class="val" style="font-weight:600;">${u.org||'-'}</span></div>
            <div class="info-row"><span class="key">担当者</span><span class="val">${u.staff||'-'}</span></div>
            <div class="info-row"><span class="key">開始年月</span><span class="val">${u.start||'-'}</span></div>
            <div class="info-row"><span class="key">担当処理</span><span class="val">${getStatusBadge(u.tantou)}</span></div>
            <div class="info-row"><span class="key">事務処理</span><span class="val">${getStatusBadge(u.jimu)}</span></div>
            <div class="info-row"><span class="key">契約確認</span><span class="val">${u.keiyaku||'-'}</span></div>
            <div class="info-row"><span class="key">振替入力</span><span class="val">${u.furikae||'-'}</span></div>
            ${u.memo?`<div class="info-row" style="flex-direction:column;gap:4px;"><span class="key">メモ・伝達事項</span><span style="font-size:13px;white-space:pre-wrap;background:var(--gray-50);padding:8px;border-radius:6px;">${u.memo}</span></div>`:''}
            ${u.family?`<div class="info-row" style="flex-direction:column;gap:4px;"><span class="key">家族情報</span><span style="font-size:13px;white-space:pre-wrap;background:var(--gray-50);padding:8px;border-radius:6px;">${u.family}</span></div>`:''}
            ${u.biko?`<div class="info-row"><span class="key">備考</span><span class="val">${u.biko}</span></div>`:''}
          </div>
        </div>

        <div class="detail-card" style="margin-bottom:14px;">
          <div class="detail-card-header">📦 商品・レンタル（${userOrders.length}件）
            <button class="btn btn-outline btn-sm" onclick="openAddOrderModal(${userId})">＋追加</button>
          </div>
          <div style="display:flex;gap:4px;padding:8px 12px;border-bottom:1px solid var(--gray-200);flex-wrap:wrap;">
            <button class="tab order-filter-tab active" data-filter="all" onclick="renderDetailOrders('all')" style="padding:4px 10px;font-size:12px;">全て（${userOrders.length}）</button>
            <button class="tab order-filter-tab" data-filter="rental" onclick="renderDetailOrders('rental')" style="padding:4px 10px;font-size:12px;">🟢 レンタル（${userOrders.filter(o=>o.status==='レンタル').length}）</button>
            <button class="tab order-filter-tab" data-filter="demo" onclick="renderDetailOrders('demo')" style="padding:4px 10px;font-size:12px;">🟠 デモ中（${userOrders.filter(o=>o.status==='デモ中').length}）</button>
            <button class="tab order-filter-tab" data-filter="end" onclick="renderDetailOrders('end')" style="padding:4px 10px;font-size:12px;">⬜ 終了・回収（${userOrders.filter(o=>['終了','デモ返却','入院中'].includes(o.status)).length}）</button>
          </div>
          <div class="detail-card-body" id="detail-orders-list">
            <div style="color:var(--gray-500);font-size:13px;">読み込み中...</div>
          </div>
        </div>

        <div class="detail-card">
          <div class="detail-card-header">💰 販売・改修（${userSales.length}件）
            <button class="btn btn-outline btn-sm" onclick="openAddSaleModal(${userId})">＋追加</button>
          </div>
          <div class="detail-card-body">
            ${userSales.length===0?'<div style="color:var(--gray-500);font-size:13px;">販売記録なし</div>':
              userSales.map(s=>`
                <div class="product-item">
                  <div class="product-name">${s.product||'-'}</div>
                  <div>${getStatusBadge(s.status)}</div>
                  <div class="product-price">${s.amount?'¥'+Number(s.amount).toLocaleString():''}</div>
                  <div style="font-size:11px;color:var(--gray-500);">納品：${s.start||'-'}</div>
                </div>`).join('')
            }
          </div>
        </div>
      </div>

      <div>
        <div class="detail-card">
          <div class="detail-card-header">📝 営業メモ（${userMemos.length}件）
            <button class="btn btn-outline btn-sm" onclick="openAddMemoModal(${userId})">＋追加</button>
          </div>
          <div class="detail-card-body" style="max-height:480px;overflow-y:auto;">
            ${userMemos.length===0?'<div style="color:var(--gray-500);font-size:13px;">メモなし</div>':
              userMemos.map(m=>`
                <div class="memo-item">
                  <div class="memo-meta">
                    <span>${m.date}</span>
                    <span>${m.staff}</span>
                    ${getStatusBadge(m.tantou)}
                  </div>
                  <div class="memo-text">${m.content||''}</div>
                </div>`).join('')
            }
          </div>
        </div>
      </div>
    </div>
  `;
  openModal('modal-detail');
  // タブをデフォルト（詳細）に戻す
  switchDetailTab('info');
  // 初期表示
  setTimeout(() => renderDetailOrders('all'), 50);
}


function switchDetailTab(tab) {
  const infoBody = document.getElementById('detail-body');
  const logBody = document.getElementById('detail-log-body');
  const tabInfo = document.getElementById('detail-tab-info');
  const tabLog = document.getElementById('detail-tab-log');
  if (tab === 'info') {
    infoBody.style.display = ''; logBody.style.display = 'none';
    tabInfo.style.background = 'var(--primary)'; tabInfo.style.color = 'white';
    tabLog.style.background = 'white'; tabLog.style.color = 'var(--gray-600)';
  } else {
    infoBody.style.display = 'none'; logBody.style.display = '';
    tabLog.style.background = 'var(--primary)'; tabLog.style.color = 'white';
    tabInfo.style.background = 'white'; tabInfo.style.color = 'var(--gray-600)';
    // 履歴を描画
    const userId = window._detailUserId;
    logBody.innerHTML = renderUpdateLogs(userId);
  }
}

function editCurrentUser() {
  closeModal('modal-detail');
  openEditUser(editingId);
}

function openMemoDetail(memoId) {
  const m = DB.memos.find(x=>x.id===memoId);
  const u = DB.users.find(x=>x.id===m.userId);
  alert(`【${u?u.name:''}】${m.date}\n\n${m.content}`);
}

// ======================== ADD/EDIT MODALS ========================
function populateStaffDatalist() {
  const dl = document.getElementById('staff-list');
  if (!dl) return; // 🔧 datalistが存在しない場合はスキップ
  dl.innerHTML = DB.staff.map(s=>`<option value="${s.name}">`).join('');
}

function populateProductDatalist() {
  const dl = document.getElementById('product-list');
  if (!dl) return; // 🔧 datalistが存在しない場合はスキップ
  dl.innerHTML = DB.masters.products.map(p=>`<option value="${p}">`).join('');
}

function populateStaffSelects() {
  const names = DB.staff.map(s=>s.name);
  const opts = names.map(n=>`<option>${n}</option>`).join('');
  ['u-staff','m-staff','o-staff','s-staff'].forEach(id=>{
    const el = document.getElementById(id);
    if (el) el.innerHTML = opts;
  });
  // Export staff
  const expSel = document.getElementById('export-staff');
  if (expSel) expSel.innerHTML = '<option value="">全担当者</option>'+opts;
}

function onCategoryChange() {
  const cat = document.getElementById('u-category').value;
  const orgLabel = document.getElementById('u-org-label');
  const orgSel = document.getElementById('u-org');
  const familyWrap = document.getElementById('u-family-wrap');
  if (cat==='在宅') {
    orgLabel.textContent = '居宅名';
    orgSel.innerHTML = [''].concat(DB.masters.kyotaku).map(f=>`<option>${f}</option>`).join('');
    familyWrap.style.display = 'none';
  } else if (cat==='施設') {
    orgLabel.textContent = '施設名';
    orgSel.innerHTML = [''].concat(DB.masters.facilities).map(f=>`<option>${f}</option>`).join('');
    familyWrap.style.display = 'block';
  } else {
    orgLabel.textContent = '法人・業者名';
    orgSel.innerHTML = [''].concat(DB.masters.facilities).map(f=>`<option>${f}</option>`).join('');
    familyWrap.style.display = 'none';
  }
}

function openAddUserModal(cat) {
  editingId = null; editingType = 'user';
  document.getElementById('modal-user-title').textContent = '利用者追加';
  populateStaffSelects();
  if (cat) document.getElementById('u-category').value = cat;
  onCategoryChange();
  document.getElementById('u-name').value = '';
  document.getElementById('u-status').value = '利用中';
  document.getElementById('u-memo').value = '';
  document.getElementById('u-family').value = '';
  document.getElementById('u-biko').value = '';
  document.getElementById('u-start').value = new Date().toISOString().slice(0,7);
  openModal('modal-user');
}

function openEditUser(userId) {
  const u = DB.users.find(x=>x.id===userId);
  if (!u) return;
  editingId = userId; editingType = 'user';
  document.getElementById('modal-user-title').textContent = '利用者編集';
  populateStaffSelects();
  document.getElementById('u-category').value = u.category;
  onCategoryChange();
  document.getElementById('u-name').value = u.name;
  document.getElementById('u-org').value = u.org||'';
  document.getElementById('u-status').value = u.status;
  document.getElementById('u-staff').value = u.staff;
  document.getElementById('u-start').value = u.start||'';
  document.getElementById('u-tantou').value = u.tantou||'対応中';
  document.getElementById('u-jimu').value = u.jimu||'対応中';
  document.getElementById('u-keiyaku').value = u.keiyaku==='****'?'対応中':u.keiyaku||'対応中';
  document.getElementById('u-furikae').value = u.furikae==='****'?'対応中':u.furikae||'対応中';
  document.getElementById('u-memo').value = u.memo||'';
  document.getElementById('u-family').value = u.family||'';
  document.getElementById('u-biko').value = u.biko||'';
  openModal('modal-user');
}

async function saveUser() {
  const name = document.getElementById('u-name').value.trim();
  if (!name) { showToast('利用者名は必須です', 'error'); return; }
  const data = {
    category: document.getElementById('u-category').value,
    name, org: document.getElementById('u-org').value,
    status: document.getElementById('u-status').value,
    staff: document.getElementById('u-staff').value,
    start: document.getElementById('u-start').value,
    tantou: document.getElementById('u-tantou').value,
    jimu: document.getElementById('u-jimu').value,
    keiyaku: document.getElementById('u-keiyaku').value,
    furikae: document.getElementById('u-furikae').value,
    memo: document.getElementById('u-memo').value,
    family: document.getElementById('u-family').value,
    biko: document.getElementById('u-biko').value,
  };
  const spFields = {
    Title: data.name,
    カテゴリ: data.category,
    施設居宅名: data.org,
    ステータス: data.status,
    担当者: data.staff,
    開始年月: data.start,
    担当処理: data.tantou,
    事務処理: data.jimu,
    契約確認: data.keiyaku,
    振替入力: data.furikae,
    メモ伝達事項: data.memo,
    家族情報: data.family,
    備考: data.biko,
  };
  // 🔧【v12】保存ボタンを無効化＋二重送信防止
  const saveBtn = document.querySelector('#modal-user .btn-primary, #modal-user button[onclick*="saveUser"]');
  if (saveBtn) { saveBtn.disabled = true; }
  showToast('保存中...', 'success');
  try {
    if (editingId) {
      const u = DB.users.find(u=>u.id===editingId);
      if (u && u.spId) {
        await updateListItem('利用者マスタ', u.spId, spFields);
      }
      if (u) Object.assign(u, data);
      try { addUpdateLog('user', editingId, data.name, '更新'); } catch(e){ console.warn(e); }
      showToast('利用者情報を更新しました', 'success');
    } else {
      const result = await addListItem('利用者マスタ', spFields);
      if (result) {
        data.id = result.id; data.spId = result.id;
        DB.users.push(data);
        try { addUpdateLog('user', data.id, data.name, '新規登録'); } catch(e){ console.warn(e); }
        showToast('利用者を追加しました ✅', 'success');
      } else {
        data.id = DB.nextIds.user++;
        DB.users.push(data);
        try { addUpdateLog('user', data.id, data.name, '新規登録'); } catch(e){ console.warn(e); }
        // 🔧 ローカル保存は警告として目立たせる
        showToast('⚠️ SharePoint保存に失敗。ローカルのみ保存（SP診断で原因確認を）', 'error');
      }
    }
  } catch(e) {
    console.error('saveUser error:', e);
    showToast('保存エラー: ' + (e.message || e), 'error');
  } finally {
    // 🔧【v12】成功・失敗・エラーいずれでも必ずモーダルを閉じる
    if (saveBtn) saveBtn.disabled = false;
    closeModal('modal-user');
    try { renderDashboard(); } catch(e){ console.warn('renderDashboard:', e); }
    try {
      renderUsers(data.category==='在宅'?'home':data.category==='施設'?'facility':'corporate');
    } catch(e){ console.warn('renderUsers:', e); }
  }
}

function deleteUser(id) {
  if (!currentPerms.canEditUser) { showToast('権限がありません', 'error'); return; }
  if (!confirm('この利用者をゴミ箱に移動しますか？（90日以内に復元可能）')) return;
  const user = DB.users.find(u=>u.id===id);
  if (user) { moveToTrash('user', {...user}); addUpdateLog('user', user.id, user.name, '削除'); }
  DB.memos.filter(m=>m.userId===id).forEach(m=>moveToTrash('memo',{...m}));
  DB.orders.filter(o=>o.userId===id).forEach(o=>moveToTrash('order',{...o}));
  DB.users = DB.users.filter(u=>u.id!==id);
  DB.memos = DB.memos.filter(m=>m.userId!==id);
  DB.orders = DB.orders.filter(o=>o.userId!==id);
  DB.sales = DB.sales.filter(s=>s.userId!==id);
  showToast('利用者を削除しました', 'success');
  renderUsers('home'); renderUsers('facility'); renderUsers('corporate');
  renderDashboard();
}

// ======================== MEMO MODAL ========================
function openAddMemoModal(userId) {
  editingId = null;
  populateStaffSelects();
  const today = new Date().toISOString().slice(0,10);
  document.getElementById('m-date').value = today;
  document.getElementById('m-content').value = '';
  document.getElementById('m-tantou').value = '対応中';
  document.getElementById('m-jimu').value = '対応中';
  document.getElementById('m-staff').value = currentUser || '';
  updateMemoUserList(userId);
  openModal('modal-memo');
}

function updateMemoUserList(presetUserId) {
  const cat = document.getElementById('m-category').value;
  const users = DB.users.filter(u=>u.category===cat);
  const sel = document.getElementById('m-user');
  sel.innerHTML = users.map(u=>`<option value="${u.id}">${u.name}</option>`).join('');
  if (presetUserId) sel.value = presetUserId;
}

document.getElementById('m-category').addEventListener('change', ()=>updateMemoUserList());

async function saveMemo() {
  const content = document.getElementById('m-content').value.trim();
  if (!content) { showToast('メモ内容は必須です', 'error'); return; }
  const userId = document.getElementById('m-user').value;
  const u = DB.users.find(x=>x.id===userId||x.id===parseInt(userId));
  const data = {
    userId: userId,
    category: document.getElementById('m-category').value,
    staff: document.getElementById('m-staff').value,
    tantou: document.getElementById('m-tantou').value,
    jimu: document.getElementById('m-jimu').value,
    date: document.getElementById('m-date').value,
    content,
  };
  const spFields = {
    Title: u ? u.name : '利用者',
    利用者名: u ? u.name : '',
    カテゴリ: data.category,
    担当者: data.staff,
    担当処理: data.tantou,
    事務処理: data.jimu,
    日付: data.date,
    メモ内容: content,
  };
  showToast('保存中...', 'success');
  const memoBtn = document.querySelector('#modal-memo button[onclick*="saveMemo"]');
  if (memoBtn) memoBtn.disabled = true;
  try {
    const result = await addListItem('営業メモ', spFields);
    if (result) {
      data.id = result.id; data.spId = result.id;
      try { addUpdateLog('memo', data.userId, data.content?.slice(0,15)||'メモ', '新規登録'); } catch(e){}
      showToast('メモを追加しました ✅', 'success');
    } else {
      data.id = DB.nextIds.memo++;
      try { addUpdateLog('memo', data.userId, data.content?.slice(0,15)||'メモ', '新規登録'); } catch(e){}
      showToast('⚠️ SharePoint保存に失敗。ローカルのみ保存', 'error');
    }
    DB.memos.push(data);
  } catch(e) {
    console.error('saveMemo error:', e);
    showToast('保存エラー: ' + (e.message || e), 'error');
  } finally {
    if (memoBtn) memoBtn.disabled = false;
    closeModal('modal-memo');
    try { renderMemos(); renderDashboard(); } catch(e){ console.warn(e); }
  }
}

function deleteMemo(id) {
  if (!currentPerms.canEditUser) { showToast('権限がありません', 'error'); return; }
  if (!confirm('このメモをゴミ箱に移動しますか？（90日以内に復元可能）')) return;
  const memo = DB.memos.find(m=>m.id===id);
  if (memo) moveToTrash('memo', {...memo});
  DB.memos = DB.memos.filter(m=>m.id!==id);
  showToast('メモをゴミ箱に移動しました', 'success');
  renderMemos(); renderDashboard();
}

// ======================== ORDER MODAL ========================
function openAddOrderModal(userId) {
  editingId = null;
  populateStaffSelects();
  document.getElementById('o-staff').value = currentUser || '';
  updateOrderUserList(userId);
  document.getElementById('o-product').value = '';
  document.getElementById('o-price').value = '';
  document.getElementById('o-start').value = new Date().toISOString().slice(0,10);
  document.getElementById('o-end').value = '';
  openModal('modal-order');
}

function updateOrderUserList(presetUserId) {
  const cat = document.getElementById('o-category').value;
  const users = DB.users.filter(u=>u.category===cat);
  const sel = document.getElementById('o-user');
  sel.innerHTML = users.map(u=>`<option value="${u.id}">${u.name}</option>`).join('');
  if (presetUserId) sel.value = presetUserId;
}

document.getElementById('o-category').addEventListener('change', ()=>updateOrderUserList());

async function saveOrder() {
  const product = document.getElementById('o-product').value.trim();
  if (!product) { showToast('商品名は必須です', 'error'); return; }
  const userId = document.getElementById('o-user').value;
  const u = DB.users.find(x=>x.id===userId||x.id===parseInt(userId));
  const data = {
    userId,
    category: document.getElementById('o-category').value,
    staff: document.getElementById('o-staff').value,
    status: document.getElementById('o-status').value,
    product, unit: document.getElementById('o-price').value,
    start: document.getElementById('o-start').value,
    end: document.getElementById('o-end').value,
    tantou: document.getElementById('o-tantou').value,
    jimu: document.getElementById('o-jimu').value,
    deliver: document.getElementById('o-deliver').value,
    collect: document.getElementById('o-collect').value,
    biko: document.getElementById('o-biko').value,
  };
  const spFields = {
    Title: product,
    利用者名: u ? u.name : '',
    カテゴリ: data.category,
    担当者: data.staff,
    商品名型番: product,
    ステータス: data.status,
    単価: data.unit ? Number(data.unit) : null,
    納品日: data.start || null,
    回収日: data.end || null,
    担当処理: data.tantou,
    事務処理: data.jimu,
    納品確認: data.deliver,
    回収確認: data.collect,
    備考: data.biko,
  };
  showToast('保存中...', 'success');
  const orderBtn = document.querySelector('#modal-order button[onclick*="saveOrder"]');
  if (orderBtn) orderBtn.disabled = true;
  try {
    if (editingId) {
      const o = DB.orders.find(o=>o.id===editingId);
      if (o && o.spId) await updateListItem('商品レンタル', o.spId, spFields);
      if (o) Object.assign(o, data);
      try { addUpdateLog('order', data.userId, data.product||'受注', '更新'); } catch(e){}
      showToast('受注情報を更新しました', 'success');
    } else {
      const result = await addListItem('商品レンタル', spFields);
      if (result) {
        data.id = result.id; data.spId = result.id;
        try { addUpdateLog('order', data.userId, data.product||'受注', '新規登録'); } catch(e){}
        showToast('受注を追加しました ✅', 'success');
      } else {
        data.id = DB.nextIds.order++;
        try { addUpdateLog('order', data.userId, data.product||'受注', '新規登録'); } catch(e){}
        showToast('⚠️ SharePoint保存に失敗。ローカルのみ保存', 'error');
      }
      DB.orders.push(data);
    }
  } catch(e) {
    console.error('saveOrder error:', e);
    showToast('保存エラー: ' + (e.message || e), 'error');
  } finally {
    if (orderBtn) orderBtn.disabled = false;
    closeModal('modal-order');
    try { renderOrders(); renderDashboard(); } catch(e){ console.warn(e); }
  }
}

function openEditOrder(id) {
  const o = DB.orders.find(x=>x.id===id);
  if (!o) return;
  editingId = id;
  populateStaffSelects();
  document.getElementById('o-category').value = o.category;
  updateOrderUserList();
  document.getElementById('o-user').value = o.userId;
  document.getElementById('o-staff').value = o.staff;
  document.getElementById('o-status').value = o.status;
  document.getElementById('o-product').value = o.product;
  document.getElementById('o-price').value = o.unit;
  document.getElementById('o-start').value = o.start==='****'?'':o.start;
  document.getElementById('o-end').value = o.end==='****'?'':o.end;
  document.getElementById('o-tantou').value = o.tantou;
  document.getElementById('o-jimu').value = o.jimu;
  document.getElementById('o-deliver').value = o.deliver;
  document.getElementById('o-collect').value = o.collect;
  document.getElementById('o-biko').value = o.biko||'';
  openModal('modal-order');
}

function deleteOrder(id) {
  if (!currentPerms.canEditUser) { showToast('権限がありません', 'error'); return; }
  if (!confirm('この受注をゴミ箱に移動しますか？（90日以内に復元可能）')) return;
  const order = DB.orders.find(o=>o.id===id);
  if (order) moveToTrash('order', {...order});
  DB.orders = DB.orders.filter(o=>o.id!==id);
  showToast('受注をゴミ箱に移動しました', 'success');
  renderOrders(); renderDashboard();
}

// ======================== SALE MODAL ========================
function openAddSaleModal(userId) {
  editingId = null;
  populateStaffSelects();
  document.getElementById('s-staff').value = currentUser || '';
  updateSaleUserList(userId);
  document.getElementById('s-product').value = '';
  document.getElementById('s-amount').value = '';
  document.getElementById('s-start').value = new Date().toISOString().slice(0,10);
  openModal('modal-sale');
}

function updateSaleUserList(presetUserId) {
  const cat = document.getElementById('s-category').value;
  const users = DB.users.filter(u=>u.category===cat);
  const sel = document.getElementById('s-user');
  sel.innerHTML = users.map(u=>`<option value="${u.id}">${u.name}</option>`).join('');
  if (presetUserId) sel.value = presetUserId;
}

document.getElementById('s-category').addEventListener('change', ()=>updateSaleUserList());

async function saveSale() {
  const product = document.getElementById('s-product').value.trim();
  if (!product) { showToast('商品・内容は必須です', 'error'); return; }
  const u = DB.users.find(x=>x.id===parseInt(document.getElementById('s-user').value) || x.id===document.getElementById('s-user').value);
  const data = {
    userId: parseInt(document.getElementById('s-user').value),
    category: document.getElementById('s-category').value,
    staff: document.getElementById('s-staff').value,
    status: document.getElementById('s-status').value,
    product, amount: document.getElementById('s-amount').value,
    start: document.getElementById('s-start').value,
    end: document.getElementById('s-end').value,
    biko: document.getElementById('s-biko').value,
  };
  const spFields = {
    Title: product,
    利用者名: u ? u.name : '',
    カテゴリ: data.category,
    担当者: data.staff,
    ステータス: data.status,
    商品内容: product,
    金額税込: data.amount ? Number(data.amount) : null,
    納品日: data.start || null,
    確認日: data.end || null,
    備考: data.biko,
  };
  showToast('保存中...', 'success');
  const saleBtn = document.querySelector('#modal-sale button[onclick*="saveSale"]');
  if (saleBtn) saleBtn.disabled = true;
  try {
    if (editingId) {
      const s = DB.sales.find(x=>x.id===editingId);
      if (s && s.spId) await updateListItem('販売改修', s.spId, spFields);
      if (s) Object.assign(s, data);
      try { addUpdateLog('sale', data.userId, data.product||'販売', '更新'); } catch(e){}
      showToast('販売情報を更新しました', 'success');
    } else {
      const result = await addListItem('販売改修', spFields);
      if (result) {
        data.id = result.id; data.spId = result.id;
        try { addUpdateLog('sale', data.userId, data.product||'販売', '新規登録'); } catch(e){}
        showToast('販売を追加しました ✅', 'success');
      } else {
        data.id = DB.nextIds.sale++;
        try { addUpdateLog('sale', data.userId, data.product||'販売', '新規登録'); } catch(e){}
        showToast('⚠️ SharePoint保存に失敗。ローカルのみ保存', 'error');
      }
      DB.sales.push(data);
    }
  } catch(e) {
    console.error('saveSale error:', e);
    showToast('保存エラー: ' + (e.message || e), 'error');
  } finally {
    if (saleBtn) saleBtn.disabled = false;
    closeModal('modal-sale');
    try { renderSales(); renderDashboard(); } catch(e){ console.warn(e); }
  }
}

function openEditSale(id) {
  const s = DB.sales.find(x=>x.id===id);
  if (!s) return;
  editingId = id;
  populateStaffSelects();
  document.getElementById('s-category').value = s.category;
  updateSaleUserList();
  document.getElementById('s-user').value = s.userId;
  document.getElementById('s-staff').value = s.staff;
  document.getElementById('s-status').value = s.status;
  document.getElementById('s-product').value = s.product;
  document.getElementById('s-amount').value = s.amount;
  document.getElementById('s-start').value = s.start||'';
  document.getElementById('s-end').value = s.end||'';
  document.getElementById('s-biko').value = s.biko||'';
  openModal('modal-sale');
}

function deleteSale(id) {
  if (!currentPerms.canEditUser) { showToast('権限がありません', 'error'); return; }
  if (!confirm('この販売記録をゴミ箱に移動しますか？（90日以内に復元可能）')) return;
  const sale = DB.sales.find(s=>s.id===id);
  if (sale) moveToTrash('sale', {...sale});
  DB.sales = DB.sales.filter(s=>s.id!==id);
  showToast('販売記録をゴミ箱に移動しました', 'success');
  renderSales();
}

// ======================== SETTINGS ========================
function renderSettings() {
  const canEdit = currentPerms.canAdmin;
  const masterKeys = [
    {key:'facilities',label:'🏢 施設一覧'},
    {key:'kyotaku',label:'🏠 居宅一覧'},
    {key:'products',label:'📦 商品マスタ'},
    {key:'statuses',label:'📋 ステータス'},
    {key:'statuses2',label:'💰 販売ステータス'},
  ];

  document.getElementById('settings-content').innerHTML = masterKeys.map(mk=>`
    <div class="settings-card">
      <div class="settings-card-header">${mk.label}</div>
      <div class="settings-card-body">
        <div id="master-list-${mk.key}">
          ${DB.masters[mk.key].map((item,i)=>`
            <div class="settings-item">
              <span class="si-name">${item}</span>
              ${canEdit?`<div class="si-actions">
                <button class="btn btn-danger btn-sm btn-icon" onclick="removeMasterItem('${mk.key}',${i})">🗑</button>
              </div>`:''}
            </div>
          `).join('')}
        </div>
        ${canEdit?`<div class="tag-input-wrap" id="add-wrap-${mk.key}">
          <input type="text" placeholder="追加する項目名..." id="add-input-${mk.key}">
          <button class="btn btn-primary btn-sm" onclick="addMasterItem('${mk.key}')">追加</button>
        </div>`:''}
        ${!canEdit?'<div style="font-size:12px;color:var(--gray-500);margin-top:8px;">※ 管理者のみ編集可能</div>':''}
      </div>
    </div>
  `).join('');
}

function addMasterItem(key) {
  const inp = document.getElementById('add-input-'+key);
  const val = inp.value.trim();
  if (!val) return;
  if (DB.masters[key].includes(val)) { showToast('既に存在します', 'error'); return; }
  DB.masters[key].push(val);
  populateProductDatalist();
  inp.value = '';
  renderSettings();
  showToast('追加しました', 'success');
}

function removeMasterItem(key, idx) {
  if (!confirm('削除しますか？')) return;
  DB.masters[key].splice(idx, 1);
  renderSettings();
  showToast('削除しました', 'success');
}

// ======================== STAFF ========================
function renderStaffTable() {
  const canEdit = currentPerms.canAdmin;
  const roleColors = {'社長':'badge-purple','所長':'badge-purple','管理者':'badge-purple','総務':'badge-blue','営業':'badge-green','一般':'badge-gray'};

  document.getElementById('staff-table-body').innerHTML = DB.staff.map(s=>`
    <tr>
      <td><strong>${s.fullname||s.name}</strong></td>
      <td style="font-size:12px;color:var(--gray-600);">${s.email||'-'}</td>
      <td><span class="badge ${roleColors[s.role]||'badge-gray'}">${s.role}</span></td>
      <td>
        ${canEdit ? `
        <label style="display:inline-flex;align-items:center;gap:4px;margin-right:10px;font-size:12px;cursor:pointer;">
          <input type="checkbox" ${s.canEditOrder?'checked':''} onchange="saveStaffPerms(${s.id},'canEditOrder',this.checked)">
          受注編集
        </label>
        <label style="display:inline-flex;align-items:center;gap:4px;margin-right:10px;font-size:12px;cursor:pointer;">
          <input type="checkbox" ${s.canEditUser?'checked':''} onchange="saveStaffPerms(${s.id},'canEditUser',this.checked)">
          利用者編集
        </label>
        <label style="display:inline-flex;align-items:center;gap:4px;font-size:12px;cursor:pointer;">
          <input type="checkbox" ${s.canAdmin?'checked':''} onchange="saveStaffPerms(${s.id},'canAdmin',this.checked)">
          管理者
        </label>
        ` : `
        <span style="font-size:12px;color:var(--gray-500);">
          ${s.canEditOrder?'✅受注編集 ':''}${s.canEditUser?'✅利用者編集 ':''}${s.canAdmin?'✅管理者':''}
        </span>
        `}
      </td>
      <td>${s.created}</td>
      <td class="td-actions">
        ${canEdit?`<button class="btn btn-danger btn-sm btn-icon" onclick="deleteStaff(${s.id})" title="削除">🗑</button>`:''}
      </td>
    </tr>
  `).join('');
  populateStaffDatalist();
}

function openAddStaffModal() {
  document.getElementById('st-name').value = '';
  document.getElementById('st-role').value = '営業';
  // area removed
  document.getElementById('st-pass').value = '1234';
  openModal('modal-staff');
}

function saveStaff() {
  const fullname = document.getElementById('st-fullname').value.trim();
  const email = document.getElementById('st-email').value.trim().toLowerCase();
  if (!fullname) { showToast('氏名は必須です', 'error'); return; }
  if (!email) { showToast('メールアドレスは必須です', 'error'); return; }
  if (DB.staff.find(s=>s.email&&s.email.toLowerCase()===email)) { showToast('このメールアドレスは既に登録されています', 'error'); return; }
  // 表示名（姓のみ）を自動生成
  const name = fullname.split(/[　 ]/)[0];
  const role = document.getElementById('st-role').value;
  const isAdmin = ['社長','所長','管理者'].includes(role);
  DB.staff.push({
    id: Date.now(), name, fullname, email, role,
    area: '',
    canEditOrder: isAdmin,
    canEditUser: isAdmin,
    canAdmin: isAdmin,
    created: new Date().toISOString().slice(0,10),
  });
  closeModal('modal-staff');
  showToast('社員を追加しました', 'success');
  renderStaffTable();
}

function deleteStaff(id) {
  if (!currentPerms.canEditUser) { showToast('権限がありません', 'error'); return; }
  if (!confirm('この社員を削除しますか？')) return;
  DB.staff = DB.staff.filter(s=>s.id!==id);
  renderStaffTable();
  showToast('削除しました', 'success');
}

// ======================== EXPORT ========================
function openExportModal() {
  populateStaffSelects();
  openModal('modal-export');
}

function getExportData() {
  const target = document.getElementById('export-target').value;
  const staff = document.getElementById('export-staff').value;
  let rows = [], headers = [];

  if (target === 'all-users' || target === 'home-users' || target === 'facility-users') {
    let data = DB.users;
    if (target==='home-users') data = data.filter(u=>u.category==='在宅');
    if (target==='facility-users') data = data.filter(u=>u.category==='施設');
    if (staff) data = data.filter(u=>u.staff===staff);
    headers = ['ID','カテゴリ','利用者名','施設/居宅','ステータス','担当者','担当処理','事務処理','契約確認','振替入力','開始年月','備考'];
    rows = data.map(u=>[u.id,u.category,u.name,u.org||'',u.status,u.staff||'',u.tantou||'',u.jimu||'',u.keiyaku||'',u.furikae||'',u.start||'',u.biko||'']);
  } else if (target === 'orders') {
    let data = DB.orders;
    if (staff) data = data.filter(o=>o.staff===staff);
    headers = ['ID','カテゴリ','利用者名','施設/居宅','商品名','ステータス','単価','納品日','回収日','担当者','担当処理','事務処理','納品✓','回収✓','備考'];
    rows = data.map(o=>{
      const u = DB.users.find(x=>x.id===o.userId);
      return [o.id,o.category,u?u.name:'',u?u.org||'':'',o.product||'',o.status,o.unit||'',o.start||'',o.end||'',o.staff||'',o.tantou||'',o.jimu||'',o.deliver||'',o.collect||'',o.biko||''];
    });
  } else if (target === 'memos') {
    let data = DB.memos;
    if (staff) data = data.filter(m=>m.staff===staff);
    headers = ['カテゴリ','利用者名','施設/居宅','担当者','日付','メモ内容'];
    rows = data.map(m=>{
      const u = DB.users.find(x=>x.id===m.userId);
      return [m.category,u?u.name:'',u?u.org||'':'',m.staff||'',m.date||'',m.content||''];
    });
  } else if (target === 'sales') {
    let data = DB.sales;
    if (staff) data = data.filter(s=>s.staff===staff);
    headers = ['カテゴリ','利用者名','施設/居宅','ステータス','商品・内容','金額(税込)','納品日','確認日','担当者'];
    rows = data.map(s=>{
      const u = DB.users.find(x=>x.id===s.userId);
      return [s.category,u?u.name:'',u?u.org||'':'',s.status,s.product||'',s.amount||'',s.start||'',s.end||'',s.staff||''];
    });
  }
  return {headers, rows};
}

function exportCSV() {
  const {headers, rows} = getExportData();
  const BOM = '\uFEFF';
  const csv = BOM + [headers, ...rows].map(row => row.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `受注管理_${new Date().toISOString().slice(0,10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
  showToast('CSVをダウンロードしました', 'success');
}

function exportExcel() {
  exportCSV(); // CSV形式でExcel互換出力
  showToast('Excel互換CSVをダウンロードしました', 'success');
}

// ======================== MODAL HELPERS ========================
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  editingId = null;
}
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
});

// ======================== TOAST ========================
let toastTimer;
function showToast(msg, type='success') {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.className = type;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 3000);
}
