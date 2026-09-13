const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const gBaseDir = 'G:\\我的雲端硬碟\\91_Antigravity\\A01_學校工作\\02_會議流程';
const dBaseDir = 'D:\\91_Antigravity\\A01_學校工作\\02_會議流程';

const docxPathG1 = path.join(gBaseDir, '會議紀錄', '115學年度彰化區高級中等學校免試入學工作小組第1次籌備會議紀錄.docx');
const pdfPathG1 = path.join(gBaseDir, '會議紀錄', '115學年度彰化區高級中等學校免試入學工作小組第1次籌備會議紀錄.pdf');
const docxPathG2 = path.join(gBaseDir, '產出', '115學年度彰化區免試入學第1次籌備會議紀錄.docx');
const pdfPathG2 = path.join(gBaseDir, '產出', '115學年度彰化區免試入學第1次籌備會議紀錄.pdf');

const docxPathD1 = path.join(dBaseDir, '會議紀錄', '115學年度彰化區高級中等學校免試入學工作小組第1次籌備會議紀錄.docx');
const pdfPathD1 = path.join(dBaseDir, '會議紀錄', '115學年度彰化區高級中等學校免試入學工作小組第1次籌備會議紀錄.pdf');
const docxPathD2 = path.join(dBaseDir, '產出', '115學年度彰化區免試入學第1次籌備會議紀錄.docx');
const pdfPathD2 = path.join(dBaseDir, '產出', '115學年度彰化區免試入學第1次籌備會議紀錄.pdf');

const ps1Script = `\uFEFF
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$docxPathG1 = @'
${docxPathG1}
'@
$pdfPathG1 = @'
${pdfPathG1}
'@
$docxPathG2 = @'
${docxPathG2}
'@
$pdfPathG2 = @'
${pdfPathG2}
'@

$docxPathD1 = @'
${docxPathD1}
'@
$pdfPathD1 = @'
${pdfPathD1}
'@
$docxPathD2 = @'
${docxPathD2}
'@
$pdfPathD2 = @'
${pdfPathD2}
'@

$word = $null
$doc = $null

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $doc = $word.Documents.Add()

    # 頁面邊界 1.5 cm
    $cm = 28.3465
    $doc.PageSetup.TopMargin = 1.5 * $cm
    $doc.PageSetup.BottomMargin = 1.5 * $cm
    $doc.PageSetup.LeftMargin = 1.5 * $cm
    $doc.PageSetup.RightMargin = 1.5 * $cm
    $doc.PageSetup.Orientation = 0

    # 建立 5 層多層次清單範本 (OutlineNumbered = $true)
    $lt = $doc.ListTemplates.Add($true, "FiveLevelStandardHierarchy")

    # 第一層：壹、 (Style 34 繁中大寫數字「壹、貳、參」)
    $lvl1 = $lt.ListLevels.Item(1)
    $lvl1.NumberStyle = 34
    $lvl1.NumberFormat = "%1、"
    $lvl1.TrailingCharacter = 2
    $lvl1.NumberPosition = 0
    $lvl1.TextPosition = 28.35
    $lvl1.TabPosition = 28.35
    $lvl1.Font.NameFarEast = "微軟正黑體"
    $lvl1.Font.NameAscii = "Microsoft JhengHei"
    $lvl1.Font.Size = 14
    $lvl1.Font.Bold = 1

    # 第二層：一、 (Style 35 繁中小寫數字「一、二、三」)
    $lvl2 = $lt.ListLevels.Item(2)
    $lvl2.NumberStyle = 35
    $lvl2.NumberFormat = "%2、"
    $lvl2.TrailingCharacter = 2
    $lvl2.ResetOnHigher = 1
    $lvl2.NumberPosition = 28.35
    $lvl2.TextPosition = 56.7
    $lvl2.TabPosition = 56.7
    $lvl2.Font.NameFarEast = "微軟正黑體"
    $lvl2.Font.NameAscii = "Microsoft JhengHei"
    $lvl2.Font.Size = 13
    $lvl2.Font.Bold = 1

    # 第三層：（一） (Style 35 括弧繁中「（一）、（二）」)
    $lvl3 = $lt.ListLevels.Item(3)
    $lvl3.NumberStyle = 35
    $lvl3.NumberFormat = "（%3）"
    $lvl3.TrailingCharacter = 2
    $lvl3.ResetOnHigher = 2
    $lvl3.NumberPosition = 56.7
    $lvl3.TextPosition = 85.05
    $lvl3.TabPosition = 85.05
    $lvl3.Font.NameFarEast = "微軟正黑體"
    $lvl3.Font.NameAscii = "Microsoft JhengHei"
    $lvl3.Font.Size = 12
    $lvl3.Font.Bold = 0

    # 第四層：1、 (Style 0 阿拉伯數字「1、2、3」)
    $lvl4 = $lt.ListLevels.Item(4)
    $lvl4.NumberStyle = 0
    $lvl4.NumberFormat = "%4、"
    $lvl4.TrailingCharacter = 2
    $lvl4.ResetOnHigher = 3
    $lvl4.NumberPosition = 85.05
    $lvl4.TextPosition = 113.4
    $lvl4.TabPosition = 113.4
    $lvl4.Font.NameFarEast = "微軟正黑體"
    $lvl4.Font.NameAscii = "Microsoft JhengHei"
    $lvl4.Font.Size = 12
    $lvl4.Font.Bold = 0

    # 第五層：（1） (Style 0 括弧阿拉伯數字「（1）、（2）」)
    $lvl5 = $lt.ListLevels.Item(5)
    $lvl5.NumberStyle = 0
    $lvl5.NumberFormat = "（%5）"
    $lvl5.TrailingCharacter = 2
    $lvl5.ResetOnHigher = 4
    $lvl5.NumberPosition = 113.4
    $lvl5.TextPosition = 141.75
    $lvl5.TabPosition = 141.75
    $lvl5.Font.NameFarEast = "微軟正黑體"
    $lvl5.Font.NameAscii = "Microsoft JhengHei"
    $lvl5.Font.Size = 12
    $lvl5.Font.Bold = 0

    $sel = $word.Selection
    $script:isFirstItem = $true

    function Write-DocTitle($text) {
        $sel.Range.ListFormat.RemoveNumbers()
        $sel.ParagraphFormat.Alignment = 1
        $sel.ParagraphFormat.SpaceBefore = 4
        $sel.ParagraphFormat.SpaceAfter = 4
        $sel.ParagraphFormat.LineSpacingRule = 0
        $sel.ParagraphFormat.LeftIndent = 0
        $sel.ParagraphFormat.FirstLineIndent = 0
        $sel.Font.NameFarEast = "微軟正黑體"
        $sel.Font.NameAscii = "Microsoft JhengHei"
        $sel.Font.Size = 18
        $sel.Font.Bold = 1
        $sel.Font.ColorIndex = 9 # wdDarkBlue
        $sel.TypeText($text)
        $sel.TypeParagraph()
    }

    function Write-Meta($label, $val) {
        $sel.Range.ListFormat.RemoveNumbers()
        $sel.ParagraphFormat.Alignment = 3
        $sel.ParagraphFormat.SpaceBefore = 0
        $sel.ParagraphFormat.SpaceAfter = 2
        $sel.ParagraphFormat.LineSpacingRule = 0
        $sel.ParagraphFormat.LeftIndent = 0
        $sel.ParagraphFormat.FirstLineIndent = 0
        $sel.Font.NameFarEast = "微軟正黑體"
        $sel.Font.NameAscii = "Microsoft JhengHei"
        $sel.Font.Size = 12
        $sel.Font.Bold = 1
        $sel.Font.ColorIndex = 1
        $sel.TypeText($label)
        $sel.Font.Bold = 0
        $sel.TypeText($val)
        $sel.TypeParagraph()
    }

    function Write-Item($lvl, $text, $spaceBefore, $spaceAfter, $leftIndent, $fontSize, $bold, $colorIndex = 1) {
        if ($script:isFirstItem) {
            $sel.Range.ListFormat.ApplyListTemplateWithLevel($lt, $false, 0, $lvl)
            $script:isFirstItem = $false
        } else {
            $sel.Range.ListFormat.ApplyListTemplateWithLevel($lt, $true, 0, $lvl)
        }
        $sel.Range.ListFormat.ListLevelNumber = $lvl
        $sel.ParagraphFormat.Alignment = 3 # Justify
        $sel.ParagraphFormat.SpaceBefore = $spaceBefore
        $sel.ParagraphFormat.SpaceAfter = $spaceAfter
        $sel.ParagraphFormat.LineSpacingRule = 0
        $sel.ParagraphFormat.LeftIndent = $leftIndent
        $sel.ParagraphFormat.FirstLineIndent = -28.35
        $sel.Font.NameFarEast = "微軟正黑體"
        $sel.Font.NameAscii = "Microsoft JhengHei"
        $sel.Font.Size = $fontSize
        $sel.Font.Bold = $bold
        $sel.Font.ColorIndex = $colorIndex
        $sel.TypeText($text)
        $sel.TypeParagraph()
    }

    # 自動編號函式 (壹、) - LeftIndent 28.35, FirstLineIndent -28.35 (縮行/凸排)
    function Write-L1($text) {
        Write-Item 1 $text 8 3 28.35 14 1 9
    }

    # 自動編號函式 (一、) - LeftIndent 56.7, FirstLineIndent -28.35 (縮行/凸排)
    function Write-L2($text) {
        Write-Item 2 $text 5 2 56.7 13 1 1
    }

    # 自動編號函式 (（一）) - LeftIndent 85.05, FirstLineIndent -28.35 (縮行/凸排)
    function Write-L3($text, $bold = 0) {
        Write-Item 3 $text 3 2 85.05 12 $bold 1
    }

    # 自動編號函式 (1、) - LeftIndent 113.4, FirstLineIndent -28.35 (縮行/凸排)
    function Write-L4($text) {
        Write-Item 4 $text 2 1 113.4 12 0 1
    }

    # 自動編號函式 (（1）) - LeftIndent 141.75, FirstLineIndent -28.35 (縮行/凸排)
    function Write-L5($text) {
        Write-Item 5 $text 1 1 141.75 12 0 1
    }

    # 大標題
    Write-DocTitle "彰化區高級中等學校免試入學工作小組"
    Write-DocTitle "115 學年度 第一次籌備會議紀錄"

    # 基本資訊區
    Write-Meta "【開會時間】" "中華民國 115 年 9 月 11 日（星期五）中午 12 時 30 分"
    Write-Meta "【開會地點】" "本校二樓會議室"
    Write-Meta "【會議主席】" "校長（引言）、吳建鋒主任（接續主持）"
    Write-Meta "【出席人員】" ""
    Write-Meta "  主任委員：" "吳建鋒主任 ｜ 總幹事：施凡昱主任（進修部主任） ｜ 諮詢顧問：林泓毅主任"
    Write-Meta "  行政組：" "賴威東組長（記錄） ｜ 總務組：林嘉德組長 ｜ 報名組：潘志軒組長、任儀、家純"
    Write-Meta "  資訊／分發組：" "陳怡誠組長、志豪、子恆、盧佳信 ｜ 主計室：王美智主任、斐涵、佩芸"
    Write-Meta "  教務處：" "黃正誼主任"
    Write-Meta "【列席指導】" "彰化縣政府教育處張科督（專案督學）、南華大學王信行教授、芳苑國中退休劉自賢主任"
    Write-Meta "【會議記錄】" "賴威東組長"

    $sel.TypeParagraph()

    # 第一層：壹、主席致詞
    Write-L1 "主席致詞"

    # 第二層：一、校長致詞摘要
    Write-L2 "校長致詞摘要"
    Write-L3 "115 學年度免試入學試務承辦背景與利益迴避原則：本校承辦 115 學年度彰化區高級中等學校免試入學試務工作（前一屆由秀水高工承辦，下一屆由員林家商接辦）。本屆適逢龍年考生人數高峰，全區報名人數規模龐大；同時校內亦有多位同仁因子女或直系親屬參加升學考試，必須嚴格依公職人員利益衝突迴避法及試務規定落實利益迴避。"
    Write-L3 "校內人事託付與主持權限授權：特別感謝吳建鋒主任臨危受命承擔「主任委員」重任，以及進修部施凡昱主任接任「總幹事」。為澈底落實利益迴避，校長本人及教務處黃正誼主任於未來正式對外之全區免試入學委員會議中將一律不出席，全權委由吳建鋒主委與施凡昱總幹事統籌主持。"
    Write-L3 "外部諮詢專家指導：感謝縣府教育處全力支持，聘請具備豐富試務實戰經驗之林泓毅主任、南華大學王信行教授、芳苑國中退休劉自賢主任入校全程指導協助。"
    Write-L3 "專案補助經費核撥說明：專案補助經費目前尚未核撥到位，初期請同仁共體時艱；待款項核定撥付後，將比照秀水高工往例與公務會計法規核實編列發放工作津貼及出席費。"

    # 第二層：二、吳建鋒主委主持宣示要點
    Write-L2 "吳建鋒主委主持宣示要點"
    Write-L3 "校內專屬工作群組通訊保密與身分區隔：會後立即成立校內專屬工作 LINE 群組，僅納入本校工作小組核心成員（主任、組長及主要承辦人員），以提升行政溝通效率並落實資訊保密；同時提醒同仁注意身分區隔，切勿將訊息錯發至縣府官方群組（僅校長、主委、總幹事等人加入）。"
    Write-L3 "對外正式名冊合規與校內全員動員原則："
    Write-L4 "正式呈報教育部、縣府及印製於免試入學手冊之工作名冊，必須嚴格合法合規落實迴避；凡子女跨區考共同就學區（如中投區）具爭議疑慮者，對外名冊一律除名，絕不留任何法律程序瑕疵。"
    Write-L4 "校內實質行政工作全體動員補位，尤其工作負荷最繁重之「報名組」（積分收件涵蓋全縣國中集體報名），後續啟動時視收件量機動自全校增派人力支援，絕不讓特定組別孤立承受。"
    Write-L3 "學生權益最大化原則：凡涉及學生升學權益與資格爭議之裁決（如報名表學生簽名不全之補正等），非個人職權得逕行決定者，一律列入正式提案提報委員會審議定案。"

    # 第一層：貳、諮詢委員指導重點
    Write-L1 "諮詢委員（林泓毅主任）行政指導重點"
    Write-L2 "場地與物流規劃：國中端集體報名送件時紙箱與表件極為厚重，若試務場地無電梯設備，一律嚴格要求設於一樓；且須全盤考量送件學校開車前來之卸貨、交車與停車便利動線。"
    Write-L2 "資安規範與主從伺服器架構：本校為資安 B 級學校，依法不得自建免試分發伺服器。分發系統主力部署於「中華電信雲端機房」，備援系統部署於「彰化縣網中心」（由教育處張科督協助對接），遇雲端網路中斷時即時切換。"
    Write-L2 "試務設備標準化：報名收件無須租用大型昂貴影印機，採購或配置具備掃描、影印、列印功能之高階多功能噴墨事務機即可（專門印發簽收回執單給國中端）；電腦設備必須使用專用閒置機台，嚴禁臨時搬動辦公電腦以避免衝突。"
    Write-L2 "招生名額核對與回流機制：簡章各校招生名額應直接自心測中心系統撈取，並由免試主辦學校邀集各招生學校召開「名額確認會議」反覆審核。各入學管道名額依比例分配後，未報到名額將回流至免試入學，外加名額不佔內含名額，特招缺額不回流；過去曾有簡章印製後因各校數據出錯而重印換本之慘痛經驗，務必戒慎核對。"

    # 第一層：參、提案討論與決議
    Write-L1 "提案討論與決議"

    # 提案一
    Write-L2 "提案一：推派彰化區 115 學年度高級中等學校免試入學委員會主任委員及總幹事案。"
    Write-L3 "案由：推派彰化區 115 學年度高級中等學校免試入學委員會主任委員及總幹事案，提請 審議。" 1
    Write-L3 "說明：依高級中等學校免試入學委員會組織相關法規，推派本校人員負責統籌全般試務工作。推派名單：主任委員由吳建鋒主任擔任，總幹事由施凡昱主任擔任。" 0
    Write-L3 "決議：全體與會人員一致同意，照案通過。" 1

    # 提案二
    Write-L2 "提案二：檢陳彰化區 115 學年度免試入學工作小組人力配置與任務編組名單案。"
    Write-L3 "案由：檢陳彰化區 115 學年度免試入學工作小組人力配置與任務編組名單，提請 審核。" 1
    Write-L3 "說明：為落實公職人員利益衝突迴避法及試務公平公正原則，全面檢核各組工作人員利益迴避資格，並修訂工作名冊。" 0
    Write-L4 "諮詢委員：聘請王信行教授、劉自賢顧問、林泓毅主任擔任。"
    Write-L4 "副總幹事：由秀水高工教務主任、員林家商教務主任（下屆承辦校）擔任。"
    Write-L4 "行政組：由賴威東組長主責；原列名之黃正誼主任、益儀等因利益迴避考量予以移除。"
    Write-L4 "報名組：由潘志軒組長負責，組員任儀、家純。每組至少配置 2 名組員，後續正式收件啟動時由全校增派人力。"
    Write-L4 "資訊／分發組：由陳怡誠組長負責，組員志豪、子恆、盧佳信。現場全數確認承諾配合入闈作業。"
    Write-L4 "機動組：原名單同仁因涉利益迴避，對外正式名冊整組刪除不列，改於內部工作群組機動協作。"
    Write-L4 "總務組：組長改由林嘉德組長接任；原黃宜弘主任名單予以移除以符利益迴避。"
    Write-L4 "主計室：王美智主任、斐涵、佩芸。子女年幼無升學利益迴避問題，照常列入。"
    Write-L3 "決議：修正後通過。對外正式名冊依上述原則全面修正除名後定稿陳核；校內內部工作則本團隊協作精神分工。" 1

    # 提案三
    Write-L2 "提案三：彰化區免試入學試務場地配置與人流、物流動線規劃原則案。"
    Write-L3 "案由：彰化區免試入學試務場地配置與人流、物流動線規劃原則案，提請 研議。" 1
    Write-L3 "說明：因應國中端集體報名送件之大量表件與人員進出，妥適規劃報名、收件、查驗與資料保管場地。" 0
    Write-L4 "場地選定：圖書館自主學習教室因常態學生自習教學使用，予以排除；原則選定三樓多元空間／創發中心，優點為收件後表件資料可原地妥善上鎖保密；但必須確認電梯運作正常。若電梯無法使用，報名場地一律改設於一樓，以維護搬運安全。"
    Write-L4 "動線統籌：由施凡昱總幹事、吳建鋒主委、黃正誼主任共同定案人流、物流與金流動線後，交由總務組林嘉德組長落實執行佈置與車輛引導標示。"
    Write-L3 "決議：照案通過，請總務組依規劃原則配合實地勘查並辦理會場佈置。" 1

    # 提案四
    Write-L2 "提案四：試務資訊系統架構與關鍵硬體設備採購／租用規劃案。"
    Write-L3 "案由：試務資訊系統架構與關鍵硬體設備採購／租用規劃案，提請 審議。" 1
    Write-L3 "說明：依資安法規及免試分發系統穩定度需求，建置主從備援機制並籌備現場資訊設備。" 0
    Write-L4 "資訊架構：本校為資安 B 級學校，免試伺服器主力建置於中華電信雲端機房，備援主機建置於彰化縣網中心（對接張科督窗口），構成主從即時備援。"
    Write-L4 "硬體設備配置規劃："
    Write-L5 "工作站電腦（2 台）：大記憶體規格。1 台配置於縣網中心做備份主機；1 台配置於闈場供分發作業使用。"
    Write-L5 "報名現場電腦（6 台）：建議採用便當盒迷你主機、AIO 或筆電；必須全數為閒置專用機，嚴禁臨時搬移辦公電腦。"
    Write-L5 "條碼掃描器（4～6 支）：現場快速刷讀報名文件與條碼核件。"
    Write-L5 "多功能複合事務機（備 2 台，常態啟用 1 台）：採購噴墨多功能事務機（掃描/影印/列印），即時印發簽收回執單給國中端。若設備費不足得由業務費或物品費勻支。"
    Write-L3 "決議：照案通過，請資訊組陳怡誠組長會同總務組於期程內完成設備調度與採購備料。" 1

    # 提案五
    Write-L2 "提案五：彰化區免試入學組織要點檢討修訂暨簡章編印減磅原則案。"
    Write-L3 "案由：彰化區免試入學組織要點檢討修訂暨簡章編印減磅原則案，提請 研議。" 1
    Write-L3 "說明：因應全委會委員意見及防範試務爭議，檢討修訂組織要點並精簡簡章內容。" 0
    Write-L4 "組織要點修訂：參考台中區（中投區）範本，儘速啟動修訂本區組織要點，明確界定「免試入學委員會」與「工作小組」之法定職權。"
    Write-L4 "簡章編印減磅與風險防範：全面刪除各招生學校簡介與 QR Code，維持簡章每本 50 元工本費，並杜絕 QR Code 連結失效風險與主辦校逐頁審查校對負擔；簡章僅保留「日程、程序、名額」三大核心規範。"
    Write-L4 "學生簽名不全爭議防範：國中端報名表簽名補正爭議，研擬實施要點正式提案送免試委員會審議定案，貫徹「學生權益最大化原則」。"
    Write-L4 "行政催促事項：請張科督促請縣府教育處儘速核定縣立高中班級數；專案向國教署與縣府查證「大慶商工」招生現況。"
    Write-L3 "決議：照案通過，依上述原則推動簡章編印與法規修訂工作。" 1

    # 提案六
    Write-L2 "提案六：試務行事曆重要期程規劃與會議召開原則案。"
    Write-L3 "案由：試務行事曆重要期程規劃與會議召開原則案，提請 審核。" 1
    Write-L3 "說明：為利各高中職校長、教務主任排定課務與行程，預先排定重要會議時程。" 0
    Write-L4 "開會固定週三原則：彰化區專屬會議原則上固定排在星期三召開，以利各校排調課並避開週一/週五連假。"
    Write-L4 "第一次委員會議：預計排定於 10 月 14 日（星期三）召開。"
    Write-L4 "第一次工作小組會議：建議排定於委員會後間隔一天（10 月 16 日星期五）召開，以利消化吸收決議。"
    Write-L4 "第二次委員會議（簡章審查關鍵）：配合 11 月 4 日全國簡章審查共識會議（10 月底須繳交簡章），排定於 10 月 21 日或 22 日召開（會期 2 小時，審查四本簡章），務必於 10 月 25 日光復節連假前審查完畢送印。"
    Write-L4 "招生名額核對時程：待施凡昱總幹事下週取得全區行事曆電子檔後排定名額確認會議。名額由心測中心撈取並比對各管道回流。"
    Write-L3 "決議：照案通過，行事曆細部期程由施凡昱總幹事彙整後正式公告全體委員。" 1

    # 第一層：肆、臨時動議
    Write-L1 "臨時動議"
    Write-L2 "動議一：本校 115 學年度運動績優生甄選運動種類調整案。"
    Write-L3 "提案人：體育組／與會同仁" 1
    Write-L3 "案由：本校 115 學年度運動績優生甄選運動種類調整案，提請 討論。" 1
    Write-L3 "說明：本校原提報運動種類為男籃與女籃，因實際組訓考量，擬臨時取消女籃，改為提報「游泳」種類。" 0
    Write-L3 "研議意見：學校得依發展狀況調整，但須研擬正式提案提報本區免試入學委員會審查核備；帶訓教練鼓勵具備教練證，未來由體育組落實選手輔導與訓練管理。" 0
    Write-L3 "決議：同意調整，由體育組備妥修正計畫書及名額表件，循程序提送第一次免試入學委員會審查核備。" 1

    # 第一層：伍、散會
    Write-L1 "散會：下午 13 時 45 分。"

    # 第一層：陸、決議事項追蹤列管表
    Write-L1 "會議決議事項追蹤列管表 (Action Items Tracker)"

    # 取消清單樣式準備插入表格
    $sel.Range.ListFormat.RemoveNumbers()
    $sel.ParagraphFormat.LeftIndent = 0
    $sel.ParagraphFormat.FirstLineIndent = 0

    $table = $doc.Tables.Add($sel.Range, 8, 7)
    $table.Borders.Enable = $true
    $table.AllowAutoFit = $true

    $table.Columns.Item(1).Width = 32
    $table.Columns.Item(2).Width = 60
    $table.Columns.Item(3).Width = 190
    $table.Columns.Item(4).Width = 65
    $table.Columns.Item(5).Width = 55
    $table.Columns.Item(6).Width = 55
    $table.Columns.Item(7).Width = 50

    $headers = @("編號", "開會日期", "決議案由與具體裁示內容", "主辦單位", "協辦單位", "預定時限", "列管狀態")
    for ($c = 1; $c -le 7; $c++) {
        $cell = $table.Cell(1, $c)
        $cell.Range.Text = $headers[$c - 1]
        $cell.Range.Font.NameFarEast = "微軟正黑體"
        $cell.Range.Font.NameAscii = "Microsoft JhengHei"
        $cell.Range.Font.Size = 10
        $cell.Range.Font.Bold = 1
        $cell.Range.ParagraphFormat.Alignment = 1
        $cell.Shading.BackgroundPatternColor = 0x8A3A1E
        $cell.Range.Font.Color = 16777215
    }

    $dList = @(
        @("1", "115.09.11", "【名冊與通訊】修正工作小組正式手冊名冊（嚴格落實利益迴避：移除黃正誼主任、黃宜弘主任、整組機動組，改林嘉德組長接總務），建置校內工作 LINE 群組。", "行政組(賴威東)", "各工作組", "115.09.18", "繼續列管"),
        @("2", "115.09.11", "【場地動線】規劃報名試務場地動線與卸貨動線，確認三樓多元空間電梯運行；若無電梯嚴格要求啟動一樓場地備案，並規劃車輛交車動線。", "總幹事(施凡昱)", "總務組(林嘉德) 行政組(賴威東)", "115.09.25", "繼續列管"),
        @("3", "115.09.11", "【資安與設備】配置主從備援伺服器（中華電信雲端＋縣網中心），協調張科督對接縣網；調配 2 台工作站、6 台專用閒置電腦、4~6 支條碼槍及 2 台噴墨多功能事務機。", "資訊組(陳怡誠)", "總務組 主計室(王美智)", "115.10.05", "繼續列管"),
        @("4", "115.09.11", "【法規要點】參考台中區範本修訂「彰化區免試入學組織要點」；研擬「報名表學生簽名不全補正處理實施要點」（採學生權益最大化），送第一次委員會審議。", "行政組(賴威東)", "林泓毅顧問 各工作組", "115.10.10", "繼續列管"),
        @("5", "115.09.11", "【行政催促】洽請縣府張科督促請教育處儘速核定縣立高中班級數；專案向國教署與縣府查證「大慶商工」招生狀況。", "總幹事(施凡昱)", "縣府教育處", "115.10.05", "繼續列管"),
        @("6", "115.09.11", "【簡章減磅】簡章內容全面瘦身，刪除各校簡介與 QR Code，僅保留日程、程序與名額三大核心；排定 10 月 21/22 日召開第二次委員會完成四本簡章審查（避開 10/25 光復節連假）。", "行政組(賴威東)", "全體工作小組", "115.10.22", "繼續列管"),
        @("7", "115.09.11", "【運動績優調整】體育組運動績優生甄選種類由女籃調整為「游泳」，備妥修正計畫書及名額表件送第一次免試入學委員會核備。", "體育組", "教務處(黃正誼)", "115.10.10", "繼續列管")
    )

    for ($r = 0; $r -lt 7; $r++) {
        $rowIdx = $r + 2
        for ($c = 1; $c -le 7; $c++) {
            $cell = $table.Cell($rowIdx, $c)
            $cell.Range.Text = $dList[$r][$c - 1]
            $cell.Range.Font.NameFarEast = "微軟正黑體"
            $cell.Range.Font.NameAscii = "Microsoft JhengHei"
            $cell.Range.Font.Size = 9.5
            $cell.Range.Font.ColorIndex = 1
            if ($c -ne 3) {
                $cell.Range.ParagraphFormat.Alignment = 1
            } else {
                $cell.Range.ParagraphFormat.Alignment = 0
            }
            if ($rowIdx % 2 -eq 1) {
                $cell.Shading.BackgroundPatternColor = 0xF8FAFC
            }
        }
    }

    $sel.SetRange($table.Range.End, $table.Range.End)
    $sel.TypeParagraph()
    $sel.TypeParagraph()

    # 簽核欄位
    $sel.Range.ListFormat.RemoveNumbers()
    $sel.ParagraphFormat.Alignment = 0
    $sel.ParagraphFormat.LeftIndent = 0
    $sel.ParagraphFormat.FirstLineIndent = 0
    $sel.Font.NameFarEast = "微軟正黑體"
    $sel.Font.NameAscii = "Microsoft JhengHei"
    $sel.Font.Size = 12
    $sel.Font.Bold = 1
    $sel.TypeText("會議記錄：____________________        總幹事：____________________        主任委員：____________________")
    $sel.TypeParagraph()

    # 存檔至 G 槽
    if (Test-Path $docxPathG1) { Remove-Item $docxPathG1 -Force }
    if (Test-Path $pdfPathG1) { Remove-Item $pdfPathG1 -Force }
    $doc.SaveAs([ref]$docxPathG1, [ref]16)
    Write-Host "DOCX G1 Exported: $docxPathG1"

    $doc.ExportAsFixedFormat($pdfPathG1, 17)
    Write-Host "PDF G1 Exported: $pdfPathG1"

    Copy-Item $docxPathG1 $docxPathG2 -Force
    Copy-Item $pdfPathG1 $pdfPathG2 -Force
    Write-Host "Copied to G2 (output folder) successfully!"

    # 同步備份至 D 槽
    Copy-Item $docxPathG1 $docxPathD1 -Force
    Copy-Item $pdfPathG1 $pdfPathD1 -Force
    Copy-Item $docxPathG1 $docxPathD2 -Force
    Copy-Item $pdfPathG1 $pdfPathD2 -Force
    Write-Host "Copied to D: drive successfully!"

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

const psPath = path.join(gBaseDir, 'scripts', 'run_build_word_5levels.ps1');
fs.writeFileSync(psPath, ps1Script, 'utf8');

console.log('Running Word COM 5-level build script with continuous outline chain...');
try {
    const out = execSync(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, { encoding: 'utf8' });
    console.log('Output:\n', out);
} catch (e) {
    console.error('Execution Failed:', e.stdout || e.message);
} finally {
    if (fs.existsSync(psPath)) fs.unlinkSync(psPath);
}
