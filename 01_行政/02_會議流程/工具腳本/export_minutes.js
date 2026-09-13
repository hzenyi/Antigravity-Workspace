const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = 'G:\\我的雲端硬碟\\91_Antigravity\\A01_學校工作\\02_會議流程';
const outputDir = path.join(baseDir, '會議紀錄');
const outputDir2 = path.join(baseDir, '產出');

const htmlPath = path.join(outputDir, 'temp_minutes.html');
const docxPath1 = path.join(outputDir, '115學年度彰化區高級中等學校免試入學工作小組第1次籌備會議紀錄.docx');
const pdfPath1 = path.join(outputDir, '115學年度彰化區高級中等學校免試入學工作小組第1次籌備會議紀錄.pdf');
const docxPath2 = path.join(outputDir2, '115學年度彰化區免試入學第1次籌備會議紀錄.docx');
const pdfPath2 = path.join(outputDir2, '115學年度彰化區免試入學第1次籌備會議紀錄.pdf');

const htmlContent = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<title>彰化區 115 學年度高級中等學校免試入學工作小組 第一次籌備會議紀錄</title>
<style>
  @page {
    size: A4 portrait;
    margin: 1.5cm 1.5cm 1.5cm 1.5cm;
  }
  body {
    font-family: "微軟正黑體", "Microsoft JhengHei", sans-serif;
    font-size: 13pt;
    line-height: 1.5;
    color: #1a202c;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
  }
  .doc-header {
    text-align: center;
    border-bottom: 2.5pt solid #1e3a8a;
    padding-bottom: 12px;
    margin-bottom: 20px;
  }
  .doc-title {
    font-size: 20pt;
    font-weight: bold;
    color: #1e3a8a;
    letter-spacing: 1px;
    margin: 0 0 6px 0;
  }
  .doc-subtitle {
    font-size: 14pt;
    color: #4b5563;
    margin: 0;
  }
  .meta-box {
    background-color: #f8fafc;
    border: 1pt solid #cbd5e1;
    border-left: 4pt solid #2563eb;
    padding: 10px 14px;
    margin-bottom: 20px;
    font-size: 12pt;
    line-height: 1.6;
  }
  .meta-box p {
    margin: 4px 0;
  }
  h2.sec-title {
    font-size: 15pt;
    font-weight: bold;
    color: #1e3a8a;
    background-color: #eff6ff;
    padding: 6px 10px;
    border-left: 4.5pt solid #1d4ed8;
    margin-top: 24px;
    margin-bottom: 12px;
  }
  h3.sub-title {
    font-size: 13.5pt;
    font-weight: bold;
    color: #1f2937;
    margin-top: 14px;
    margin-bottom: 6px;
    padding-left: 4px;
    border-left: 3pt solid #60a5fa;
  }
  p {
    margin: 6px 0;
    text-align: justify;
    text-justify: inter-ideograph;
  }
  .content-list {
    margin: 4px 0 8px 0;
    padding-left: 20px;
  }
  .proposal-card {
    background-color: #ffffff;
    border: 1pt solid #e2e8f0;
    border-top: 3pt solid #3b82f6;
    padding: 12px 16px;
    margin-bottom: 18px;
    border-radius: 4px;
  }
  .proposal-header {
    font-size: 13.5pt;
    font-weight: bold;
    color: #1e40af;
    margin-bottom: 6px;
  }
  .item-label {
    font-weight: bold;
    color: #374151;
  }
  .decision-box {
    background-color: #f0fdf4;
    border: 1pt solid #bbf7d0;
    border-left: 4pt solid #16a34a;
    padding: 8px 12px;
    margin-top: 8px;
    font-weight: bold;
    color: #15803d;
  }
  table.tracker-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
    margin-bottom: 20px;
    font-size: 10.5pt;
    line-height: 1.4;
  }
  table.tracker-table th {
    background-color: #1e3a8a;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    padding: 8px 6px;
    border: 1pt solid #1e3a8a;
  }
  table.tracker-table td {
    border: 1pt solid #cbd5e1;
    padding: 7px 6px;
    vertical-align: middle;
  }
  table.tracker-table tr:nth-child(even) {
    background-color: #f8fafc;
  }
  .text-center {
    text-align: center;
  }
  .status-badge {
    display: inline-block;
    padding: 2px 8px;
    font-size: 9.5pt;
    font-weight: bold;
    color: #b45309;
    background-color: #fef3c7;
    border: 1pt solid #fde68a;
    border-radius: 3px;
  }
  .footer-sign {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1pt dashed #94a3b8;
    display: flex;
    justify-content: space-between;
    font-size: 12pt;
    font-weight: bold;
    color: #334155;
  }
</style>
</head>
<body>

<div class="doc-header">
  <div class="doc-title">彰化區高級中等學校免試入學工作小組</div>
  <div class="doc-subtitle">115 學年度 第一次籌備會議紀錄</div>
</div>

<div class="meta-box">
  <p><span class="item-label">開會時間：</span>中華民國 115 年 9 月 11 日（星期五）中午 12 時 30 分</p>
  <p><span class="item-label">開會地點：</span>本校二樓會議室</p>
  <p><span class="item-label">會議主席：</span>校長（引言）、建峰主任（接續主持）</p>
  <p><span class="item-label">出席人員：</span></p>
  <p style="padding-left: 24px; margin: 2px 0;">
    <strong>主任委員：</strong>建峰主任 ｜ 
    <strong>總幹事：</strong>繁意主任（進修部主任） ｜ 
    <strong>諮詢顧問：</strong>弘毅主任（前總幹事）<br>
    <strong>行政組：</strong>威東組長（紀錄） ｜ 
    <strong>總務組：</strong>佳德組長 ｜ 
    <strong>報名組：</strong>自軒組長、任儀、家純<br>
    <strong>資訊／分發組：</strong>儀成組長、志豪、子恆、嘉信 ｜ 
    <strong>主計室：</strong>美智主任、斐涵、佩芸<br>
    <strong>教務處：</strong>正毅主任
  </p>
  <p><span class="item-label">列席指導：</span>彰化縣政府教育處張科督（專案督學）、南華大學王信行教授、芳苑國中退休劉自賢主任</p>
  <p><span class="item-label">會議記錄：</span>威東組長</p>
</div>

<h2 class="sec-title">壹、主席致詞</h2>

<h3 class="sub-title">一、校長致詞摘要</h3>
<p>（一）本校承辦 115 學年度彰化區高級中等學校免試入學試務工作（前一屆由秀水高工承辦，下一屆由員林家商接辦）。本屆適逢龍年考生人數高峰，全區報名人數規模龐大；同時校內亦有多位同仁因子女或直系親屬參加升學考試，必須嚴格落實利益迴避。</p>
<p>（二）人事託付部分，特別感謝建峰主任承擔「主任委員」重任，以及進修部繁意主任接任「總幹事」。為澈底落實利益迴避，校長本人及教務處正毅主任於未來正式對外之全區免試入學委員會議中將一律不出席，全權委由建峰主委與繁意總幹事統籌主持。</p>
<p>（三）外部專家顧問部分，感謝縣府教育處指導推薦，特別延聘具備豐富實務經驗之弘毅主任、南華大學王信行教授、芳苑國中退休劉自賢主任入校指導協助。</p>
<p>（四）工作經費期前說明：專案補助經費目前尚未核撥到位，初期請同仁共體時艱；待款項核定撥付後，將比照秀水高工往例與公務會計法規核實編列發放工作津貼及出席費。</p>

<h3 class="sub-title">二、建峰主委主持宣示要點</h3>
<p>（一）<strong>通訊群組規範：</strong>會後立即成立校內專屬工作 LINE 群組，僅納入本校工作小組核心成員（主任、組長及主要承辦人員），以提升行政溝通效率並落實資訊保密；同時提醒同仁注意身分區隔，切勿將訊息錯發至縣府官方群組（僅校長、主委、總幹事等人加入）。</p>
<p>（二）<strong>對外名冊合規 vs. 校內團隊協作：</strong>
  <br>1、正式呈報教育部、縣府及印製於免試入學手冊之工作名冊，<strong>必須嚴格合法合規落實迴避</strong>；凡子女跨區考共同就學區（如中投區）具爭議疑慮者，對外名冊一律除名，絕不留任何法律程序瑕疵。
  <br>2、校內實質行政工作全體動員補位，尤其工作負荷最繁重之「報名組」（積分收件涵蓋全縣國中集體報名），後續啟動時視收件量機動自全校增派人力支援，絕不讓特定組別孤立承受。
</p>
<p>（三）<strong>學生權益最大化原則：</strong>凡涉及學生升學權益與資格爭議之裁決（如報名表學生簽名不全之補正等），非個人職權得逕行決定者，一律列入正式提案提報委員會審議定案。</p>

<h2 class="sec-title">貳、諮詢委員（弘毅主任）行政指導重點</h2>
<p>（一）<strong>場地與物流規劃：</strong>國中端集體報名送件時紙箱與表件極為厚重，<strong>若試務場地無電梯設備，一律嚴格要求設於一樓</strong>；且須全盤考量送件學校開車前來之卸貨、交車與停車便利動線。</p>
<p>（二）<strong>資安規範與主從伺服器架構：</strong>本校為資安 B 級學校，依法不得自建免試分發伺服器。分發系統主力部署於「中華電信雲端機房」，備援系統部署於「彰化縣網中心」（由教育處張科督協助對接），遇雲端網路中斷時即時切換。</p>
<p>（三）<strong>設備標準化：</strong>報名收件無須租用大型昂貴影印機，採購或配置具備掃描、影印、列印功能之高階多功能噴墨事務機即可（專門印發簽收回執單給國中端）；電腦設備必須使用專用閒置機台，嚴禁臨時搬動辦公電腦以避免衝突。</p>
<p>（四）<strong>招生名額核對：</strong>簡章各校招生名額應直接自心測中心系統撈取，並由免試主辦學校邀集各招生學校召開「名額確認會議」反覆審核；過去曾有簡章印製後因各校數據出錯而重印換本之慘痛經驗，務必戒慎核對。</p>

<h2 class="sec-title">參、提案討論與決議</h2>

<div class="proposal-card">
  <div class="proposal-header">【提案一】推派彰化區 115 學年度高級中等學校免試入學委員會主任委員及總幹事案。</div>
  <p><span class="item-label">說明：</span>依高級中等學校免試入學委員會組織相關法規，推派本校人員負責統籌全般試務工作。</p>
  <p><span class="item-label">推派名單：</span>主任委員：建峰主任 ｜ 總幹事：繁意主任。</p>
  <div class="decision-box">決議：全體與會人員一致同意，照案通過。</div>
</div>

<div class="proposal-card">
  <div class="proposal-header">【提案二】檢陳彰化區 115 學年度免試入學工作小組人力配置與任務編組名單案。</div>
  <p><span class="item-label">說明：</span>落實公職人員利益衝突迴避法及試務公平公正原則，全面檢核各組成員利益迴避資格並修訂名冊。</p>
  <p><span class="item-label">名單調整重點：</span>
    <br>1、<strong>諮詢委員：</strong>王信行教授、劉自賢顧問、弘毅主任。
    <br>2、<strong>副總幹事：</strong>秀水高工教務主任、員林家商教務主任（下屆承辦校）。
    <br>3、<strong>行政組：</strong>威東組長主責；原正毅主任、益儀等因利益迴避考量予以移除。
    <br>4、<strong>報名組：</strong>自軒組長負責，組員任儀、家純。每組配置 2 人，正式收件啟動時由全校增派人力。
    <br>5、<strong>資訊／分發組：</strong>儀成組長負責，組員志豪、子恆、嘉信。現場全數確認承諾配合入闈分發作業。
    <br>6、<strong>機動組：</strong>原列人員涉利益迴避，對外名冊整組刪除不列，改於內部工作群組機動協作。
    <br>7、<strong>總務組：</strong>由佳德組長接任組長；原益勇主任名單移除避嫌。
    <br>8、<strong>主計室：</strong>美智主任、斐涵、佩芸。子女年幼無升學迴避問題，照常列入。
  </p>
  <div class="decision-box">決議：修正後通過。對外正式名冊依原則全面修正除名後定稿陳核；校內內部工作本團隊精神協同分工。</div>
</div>

<div class="proposal-card">
  <div class="proposal-header">【提案三】彰化區免試入學試務場地配置與人流、物流動線規劃原則案。</div>
  <p><span class="item-label">說明：</span>因應國中端集體報名送件之大量表件與人員進出，妥適規劃報名、收件、查驗與資料保管場地。</p>
  <p><span class="item-label">規劃重點：</span>
    <br>1、圖書館自主學習教室因維持常態自習教學使用，予以排除。
    <br>2、原則選定三樓多元空間／創發中心，優點為收件後表件資料可原地妥善上鎖保密；但須確認電梯運作正常。
    <br>3、<strong>硬性安全原則：若電梯無法使用，報名場地一律改設於一樓</strong>，以確保搬運安全。
    <br>4、動線統籌由繁意總幹事、建峰主委、正毅主任共同定案後，交由總務組落實執行佈置與車輛動線標示。
  </p>
  <div class="decision-box">決議：照案通過，請總務組依規劃原則配合實地勘查並辦理會場佈置。</div>
</div>

<div class="proposal-card">
  <div class="proposal-header">【提案四】試務資訊系統架構與關鍵硬體設備採購／租用規劃案。</div>
  <p><span class="item-label">說明：</span>依資安法規及免試分發系統穩定度需求，建置主從備援機制並籌備現場資訊設備。</p>
  <p><span class="item-label">設備與架構清單：</span>
    <br>1、<strong>資訊架構：</strong>本校為資安 B 級學校，免試伺服器主力建置於中華電信雲端，備援主機建置於彰化縣網中心（對接張科督窗口），構成主從即時備援。
    <br>2、<strong>工作站電腦（2 台）：</strong>大記憶體高規格機型。1 台進駐縣網中心備份；1 台進駐闈場分發作業。
    <br>3、<strong>報名現場電腦（6 台）：</strong>採便當盒迷你主機、AIO 或筆電，<strong>必須全數為閒置專用機</strong>，嚴禁臨時搬移辦公電腦。
    <br>4、<strong>條碼掃描器（4～6 支）：</strong>現場刷讀報名文件條碼。
    <br>5、<strong>多功能複合事務機（備 2 台，常態啟用 1 台）：</strong>噴墨多功能事務機（掃描/影印/列印），即時印發簽收回執單。若設備費不足得由業務費或物品費勻支。
  </p>
  <div class="decision-box">決議：照案通過，請資訊組會同總務組於期程內完成設備調度與備料。</div>
</div>

<div class="proposal-card">
  <div class="proposal-header">【提案五】彰化區免試入學組織要點檢討修訂暨簡章編印減磅原則案。</div>
  <p><span class="item-label">說明：</span>因應全委會委員意見及防範試務爭議，檢討修訂組織要點並精簡簡章內容。</p>
  <p><span class="item-label">決議重點：</span>
    <br>1、<strong>組織要點修訂：</strong>參考台中區（中投區）範本，儘速啟動修訂本區組織要點，明確界定「免試入學委員會」與「工作小組」之法定職權。
    <br>2、<strong>簡章編印減磅：全面刪除各招生學校簡介與 QR Code</strong>，維持簡章每本 50 元工本費，並杜絕 QR Code 連結失效風險與主辦校逐頁審查校對負擔；簡章僅保留「日程、程序、名額」三大核心。
    <br>3、<strong>簽名爭議防範：</strong>國中端報名表簽名補正爭議，研擬實施要點正式提案送免試委員會審議定案，貫徹「學生權益最大化原則」。
    <br>4、<strong>行政催促事項：</strong>請張科督促請縣府教育處儘速核定縣立高中班級數；專案查證「大慶商工」招生現況。
  </p>
  <div class="decision-box">決議：照案通過，依上述原則推動簡章編印與法規修訂工作。</div>
</div>

<div class="proposal-card">
  <div class="proposal-header">【提案六】試務行事曆重要期程規劃與會議召開原則案。</div>
  <p><span class="item-label">說明：</span>為利各高中職校長、教務主任排定課務與行程，預先排定重要會議時程。</p>
  <p><span class="item-label">期程安排：</span>
    <br>1、<strong>開會固定週三原則：</strong>彰化區專屬會議原則上<strong>固定於星期三召開</strong>，以利各校排課調課並避開週一/週五連假。
    <br>2、<strong>第一次委員會議：</strong>預計排定於 10 月 14 日（星期三）召開。
    <br>3、<strong>第一次工作小組會議：</strong>排定於委員會後間隔一日（10 月 16 日星期五）召開，以利消化吸收決議。
    <br>4、<strong>第二次委員會議（簡章審查關鍵）：</strong>配合 11 月 4 日全國簡章審查會議（10 月底須交簡章），排定於 10 月 21 日或 22 日召開（會期 2 小時，審查四本簡章），務必於 10 月 25 日光復節連假前完成審查送印。
    <br>5、<strong>招生名額核對：</strong>待繁意總幹事下週取得全區行事曆電子檔後排定名額確認會議。名額由心測中心撈取並比對各管道回流（特招缺額不回流、外加名額不佔內含名額）。
  </p>
  <div class="decision-box">決議：照案通過，行事曆細部期程由繁意總幹事彙整後正式公告全體委員。</div>
</div>

<h2 class="sec-title">肆、臨時動議</h2>

<div class="proposal-card">
  <div class="proposal-header">【動議一】本校 115 學年度運動績優生甄選運動種類調整案。</div>
  <p><span class="item-label">提案人：</span>體育組／與會同仁</p>
  <p><span class="item-label">說明：</span>本校原提報運動種類為男籃與女籃，因實際組訓考量，擬臨時取消女籃，改為提報「游泳」種類。</p>
  <p><span class="item-label">研議意見：</span>學校得依發展狀況調整，但須研擬正式提案提報本區免試入學委員會審查核備；帶訓教練鼓勵取得教練證，由體育組落實輔導與訓練管理。</p>
  <div class="decision-box">決議：同意調整，由體育組備妥修正計畫書及名額表件，循程序提送第一次免試入學委員會審查核備。</div>
</div>

<p style="margin-top: 18px;"><strong>散會：</strong>下午 13 時 45 分。</p>

<h2 class="sec-title">伍、會議決議事項追蹤列管表 (Action Items Tracker)</h2>

<table class="tracker-table">
  <thead>
    <tr>
      <th style="width: 6%;">編號</th>
      <th style="width: 10%;">開會日期</th>
      <th style="width: 38%;">決議案由與具體裁示內容</th>
      <th style="width: 12%;">主辦單位</th>
      <th style="width: 10%;">協辦單位</th>
      <th style="width: 12%;">預定時限</th>
      <th style="width: 12%;">列管狀態</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center">1</td>
      <td class="text-center">115.09.11</td>
      <td><strong>【名冊與通訊】</strong>修正工作小組正式手冊名冊（落實利益迴避：移除正毅主任、益勇主任、整組機動組，改佳德組長接總務），建置校內工作 LINE 群組。</td>
      <td class="text-center">行政組<br>(威東組長)</td>
      <td class="text-center">各工作組</td>
      <td class="text-center">115.09.18</td>
      <td class="text-center"><span class="status-badge">繼續列管</span></td>
    </tr>
    <tr>
      <td class="text-center">2</td>
      <td class="text-center">115.09.11</td>
      <td><strong>【場地動線】</strong>規劃報名試務場地動線與卸貨動線，確認三樓多元空間電梯運行；若無電梯嚴格要求啟動一樓場地備案，並規劃車輛交車動線。</td>
      <td class="text-center">總幹事<br>(繁意主任)</td>
      <td class="text-center">總務組<br>行政組</td>
      <td class="text-center">115.09.25</td>
      <td class="text-center"><span class="status-badge">繼續列管</span></td>
    </tr>
    <tr>
      <td class="text-center">3</td>
      <td class="text-center">115.09.11</td>
      <td><strong>【資安與設備】</strong>配置主從備援伺服器（中華電信雲端＋縣網中心），協調張科督對接縣網；調配 2 台工作站（縣網、闈場）、6 台專用閒置電腦、4~6 支條碼槍及 2 台噴墨多功能事務機。</td>
      <td class="text-center">資訊／分發組</td>
      <td class="text-center">總務組<br>主計室</td>
      <td class="text-center">115.10.05</td>
      <td class="text-center"><span class="status-badge">繼續列管</span></td>
    </tr>
    <tr>
      <td class="text-center">4</td>
      <td class="text-center">115.09.11</td>
      <td><strong>【法規要點】</strong>參考台中區範本修訂「彰化區免試入學組織要點」；研擬「報名表學生簽名不全補正處理實施要點」（採學生權益最大化），送第一次委員會審議。</td>
      <td class="text-center">試務行政組</td>
      <td class="text-center">弘毅顧問<br>各組</td>
      <td class="text-center">115.10.10</td>
      <td class="text-center"><span class="status-badge">繼續列管</span></td>
    </tr>
    <tr>
      <td class="text-center">5</td>
      <td class="text-center">115.09.11</td>
      <td><strong>【行政催促】</strong>洽請縣府張科督促請教育處儘速核定縣立高中班級數；專案向國教署與縣府查證「大慶商工」招生狀況。</td>
      <td class="text-center">總幹事<br>(繁意主任)</td>
      <td class="text-center">縣府教育處</td>
      <td class="text-center">115.10.05</td>
      <td class="text-center"><span class="status-badge">繼續列管</span></td>
    </tr>
    <tr>
      <td class="text-center">6</td>
      <td class="text-center">115.09.11</td>
      <td><strong>【簡章減磅】</strong>簡章內容全面瘦身，刪除各校簡介與 QR Code，僅保留日程、程序與名額三大核心；排定 10 月 21/22 日召開第二次委員會完成四本簡章審查（避開 10/25 光復節連假）。</td>
      <td class="text-center">試務行政組</td>
      <td class="text-center">全體工作小組</td>
      <td class="text-center">115.10.22</td>
      <td class="text-center"><span class="status-badge">繼續列管</span></td>
    </tr>
    <tr>
      <td class="text-center">7</td>
      <td class="text-center">115.09.11</td>
      <td><strong>【運動績優調整】</strong>體育組運動績優生甄選種類由女籃調整為「游泳」，備妥修正計畫書及名額表件送第一次免試入學委員會核備。</td>
      <td class="text-center">體育組</td>
      <td class="text-center">教務處</td>
      <td class="text-center">115.10.10</td>
      <td class="text-center"><span class="status-badge">繼續列管</span></td>
    </tr>
  </tbody>
</table>

<div class="footer-sign">
  <div>會議記錄：____________________</div>
  <div>總幹事：____________________</div>
  <div>主任委員：____________________</div>
</div>

</body>
</html>
`;

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('HTML generated successfully at:', htmlPath);

const psScript = `
$htmlPath = "${htmlPath.replace(/\\/g, '\\\\')}"
$docxPath1 = "${docxPath1.replace(/\\/g, '\\\\')}"
$pdfPath1 = "${pdfPath1.replace(/\\/g, '\\\\')}"
$docxPath2 = "${docxPath2.replace(/\\/g, '\\\\')}"
$pdfPath2 = "${pdfPath2.replace(/\\/g, '\\\\')}"

$word = $null
$doc = $null

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $doc = $word.Documents.Open($htmlPath)

    # 另存為標準 Word 2016+ DOCX (代碼 16)
    $doc.SaveAs([ref]$docxPath1, [ref]16)
    Write-Host "DOCX 1 Exported: $docxPath1"

    # 匯出為標準 PDF (代碼 17)
    $doc.ExportAsFixedFormat($pdfPath1, 17)
    Write-Host "PDF 1 Exported: $pdfPath1"

    # 複製至產出目錄
    Copy-Item $docxPath1 $docxPath2 -Force
    Copy-Item $pdfPath1 $pdfPath2 -Force
    Write-Host "Files copied to output directory successfully!"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
} finally {
    if ($doc -ne $null) {
        $doc.Close([ref]0)
    }
    if ($word -ne $null) {
        $word.Quit()
    }
}
`;

const psPath = path.join(baseDir, 'scripts', 'run_word_export.ps1');
fs.writeFileSync(psPath, psScript, 'utf8');

console.log('Executing Word COM conversion...');
try {
  const result = execSync(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, { encoding: 'utf8' });
  console.log(result);
} catch (e) {
  console.error('Conversion error:', e.stdout || e.message);
} finally {
  if (fs.existsSync(psPath)) fs.unlinkSync(psPath);
  if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath);
}
