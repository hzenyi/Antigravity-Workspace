# 專案歷程記錄檔 (Project History & Work Logging)

本文件依據全域協作規範，嚴謹記錄 `A02_教學工作` 專案之重大里程碑、教材生成、影片影音資源與重要產出。

---

## [2026-09-03] EasyEDA (嘉立創EDA) 線上教材、影音與文檔資源全面檢索與整理歸檔

- **任務背景**：
  使用者欲搜尋有關 PCB 線上繪圖製作工具 EasyEDA（嘉立創 EDA）之線上現有教材資源，包含影音教學、文章手冊與 PDF 講義，要求按網路熱門程度進行分類與排序列出。
- **執行內容與技術關鍵**：
  1. **全網資源多管道精準探勘**：
     - **國際 YouTube 影音**：爬查並篩選出播放量達 14 萬至 26 萬之頂尖實戰教學（如 Delali、Easy HomeMade Projects、Colin Hickey 與業界權威 Robert Feranec 之長篇教學）。
     - **華語影音平台 (Bilibili / YouTube)**：彙整嘉立創官方系列課程（播放量 50 萬+ 之核心入門課及單集 30 萬+ 之專業版全套實戰課程）。
     - **官方手冊與專題技術專文**：涵蓋標準版（Standard）與專業版（Professional）官方文檔、JLCPCB 官方技術指南、Schemalyzer 評測攻略與台灣創客打樣實戰文章（TsaiElectro、巴哈姆特創客專欄）。
     - **PDF 講義與離線規範**：整合官方精華手冊 PDF、封裝庫命名參考規範與實驗室新手操作講義。
  2. **Google NotebookLM 專用直連網址全面解析與驗證**：
     - 透過命令列工具解析重定向與取得各影音、文件、部落格之原始直連 URL（Direct URLs），並依 NotebookLM「網站」與「YouTube」支援格式規劃「一鍵批次複製專區」，方便直接貼入建立 AI 知識庫。
  3. **學科屬性分類歸檔遵循**：
     - 依據專案規範，自動歸檔至 `電路繪圖/參考資料/EasyEDA線上教材資源總覽.md`。
  4. **教學現場引導建議**：
     - 融入資訊科/電子科課堂教學視角，規劃「四階段學習路徑（原理圖 -> 封裝 -> 佈局DRC -> 打樣驗收）」與「標準版 vs 專業版」選型建議。
- **異動與產出檔案清單**：
  - [NEW] `電路繪圖/參考資料/EasyEDA線上教材資源總覽.md` (全網 EasyEDA 教材熱門排行與資源清單)
  - [MODIFY] `HISTORY.md` (新增本期歷程記錄)
- **驗證狀態**：
  - 所有各類資源點閱數與播放量均經網路即時核實，格式符合台灣技職教育與工程規範。

---

## [2026-09-02] Altium Designer 第零章〈電路設計 這檔事〉專業教學 Word 講義檔 (.docx) 製作

- **任務背景**：
  使用者提供《Altium Designer 新例說》第零章〈電路設計 這檔事〉教材掃描檔（全章 p. 0-2 ~ p. 0-22），需求製作一份排版精美、結構嚴謹且符合 108 課綱技術型高中（高職資訊科/電子科）實習課程之正式 Word 教學講義檔。
- **執行內容與技術關鍵**：
  1. **教材深度萃取與教學化轉譯 (Multi-Modal Textbook Ingestion)**：
     - 完整解析全書第零章 22 頁教材內容，涵蓋「專案建置、電路圖繪製 (2N3904/Res1/Cap/LED/Battery)、導線繪製與 45 度斜線模式 (Shift+Space)、零件自動編序 (ECO)、PCB 導入 (Room)、零件佈局與文字方向調整、Keep-Out Layer 板框切板 (Define Board Shape)、單層板規則 (Routing Layers) 與自動佈線 (Route All)」。
     - 保留並精準標註教材書本之對應頁碼（p. 0-2 ~ p. 0-21）與 29 幅圖號索引（圖 1 ~ 圖 29），方便學生對照紙本書閱讀。
  2. **高質感專業 Word 排版架構設計 (OpenXML / docx Engine)**：
     - 開發自動化產生腳本 `scripts/generate_ch0_docx.js`，採用教育界與工程界經典配色系統（海軍藍 `#1B365D`、鋼鐵藍 `#2E75B6`、琥珀警告橘 `#C55A11`、微軟正黑體繁體中文）。
     - 包含完整頁首（課程標題）與頁尾（動態頁碼 `第 X 頁，共 Y 頁` 及適用教材頁碼範圍）。
     - 內建 7 大重點區塊：
       - **課程基本資料表**（班級、座號、姓名、實習日期）。
       - **108 課綱素養導向三大面向學習指標**（認知知識、技能實作、專業態度）。
       - **章節與教材對應頁碼速查表**。
       - **核心觀念解析與全流程圖解**。
       - **步驟式動手做操作手冊**（步驟 1 ~ 步驟 6，附詳細快速鍵與屬性設定）。
       - **核心快捷鍵速查表與五大踩坑除錯錦囊**（紅色波浪線毛毛蟲排查、斜線切換、切板失敗排查等）。
       - **三大即時挑戰實作題**（ex00-1 橋式整流電源、ex00-2 繼電器控制、ex00-3 直流穩壓進階雙層板，均含完整零件資料表）。
       - **高工實習評量 Rubric 量規表**（四等級客觀評分指標）。
       - **學生反思問題填寫與課堂自由心得筆記區**（對照教材 p. 0-22 心得筆記格）。
  3. **依循學科分類規範歸檔**：
     - Word 講義產出至 `電路繪圖/教材講義/Altium_Designer_Chapter0_電路設計這檔事_教學手冊.docx`。
- **異動與產出檔案清單**：
  - [NEW] `電路繪圖/教材講義/Altium_Designer_Chapter0_電路設計這檔事_教學手冊.docx` (Word 實習教學手冊)
  - [NEW] `scripts/generate_ch0_docx.js` (Word 講義自動建置腳本)
  - [MODIFY] `HISTORY.md` (專案工作歷程記錄)
- **驗證狀態**：
  - 成功執行 Node.js 建置腳本，產出 29.6 KB 之標準 `.docx` 文件。
  - 內容 100% 完整涵蓋教材 p. 0-2 至 p. 0-22 實作細節與 3 大練習題庫。

---

## [2026-09-01] Antigravity 雙機同步機制建置與全域設定模組化 (Git 方案一)

- **任務背景**：
  為實現使用者在兩台電腦間無縫同步 Antigravity 工作區、教學資源、自訂規範與全域設定檔（`config.json`, `plugins/`, `skills/` 等），採用軟體工程標準做法「Git 私有倉庫 + 一鍵自動化腳本」進行架構升級。
- **執行內容與技術關鍵**：
  1. **全域安全與版本控制規則建立**：
     - 於根目錄 `D:\Antigravity` 建立完整的 `.gitignore`，嚴格排除敏感個資、金鑰密碼 (`.env`)、影音下載暫存 (`downloads/`)、Python 快取 (`__pycache__/`) 與編輯器暫存。
  2. **自動化備份與匯入工具開發**：
     - 於 `scripts/` 開發 PowerShell 自動化工具鏈（採用 UTF-8 BOM 編碼確保跨 Windows 環境相容）：
       - `export_config.ps1`：一鍵將本機 `~/.gemini/config/` 安全複製備份至專案目錄 `_antigravity_config/`。
       - `import_config.ps1`：在第二台電腦上一鍵將 `_antigravity_config/` 部署還原至 `~/.gemini/config/`，並自動建立舊設定之安全快照。
       - `sync_push.ps1`：整合匯出、狀態檢查、Git Commit 與 Git Push 的日常一鍵同步腳本。
  3. **儲存庫初始化與首度提交 (Initial Commit)**：
     - 初始化 `main` 主分支，完整納入 475 個專案檔案、行政規範、教學講義與 70 多項已安裝之外掛 Skills。
  4. **客製化對話技能建置 (Custom Skill)**：
     - 建立專屬技能 `antigravity-github-sync`，支援自然語言觸發（例如「我要同步到 GitHub」、「從 GitHub 取回設定」），實現一鍵雙向同步與自動還原。
  5. **導入台灣正式公文與文書撰寫技能 (`tw-formal-writing`)**：
     - 整合開源專案 [Imbad0202/tw-formal-writing](https://github.com/Imbad0202/tw-formal-writing)，完整部署台灣《文書處理手冊》規範之公文（簽、函、令、呈）、行政非公文（會議紀錄、開會通知、業務計畫）、法律文件（存證信函、契約）及陳情訴願書撰寫規則與品質檢核模組。
     - 同時配置至全域目錄、工作區 `.agents/skills/` 與雙機同步備份庫中，並自動推送到 GitHub 私有庫。
- **異動與產出檔案清單**：
  - [NEW] `.gitignore` (專案根目錄忽略清單)
  - [NEW] `.agents/skills/antigravity-github-sync/SKILL.md` (專案專屬同步技能)
  - [NEW] `C:\Users\User\.gemini\config\skills\antigravity-github-sync\SKILL.md` (全域專屬同步技能)
  - [NEW] `scripts/export_config.ps1` (全域設定與外掛匯出腳本)
  - [NEW] `scripts/import_config.ps1` (全域設定與外掛匯入還原腳本)
  - [NEW] `scripts/sync_push.ps1` (一鍵打包推送腳本)
  - [NEW] `_antigravity_config/` (存放 `config.json`, `mcp_config.json`, `plugins/`, `skills/`)
- **驗證狀態**：
  - 成功執行 `export_config.ps1`，順利同步 6 個主要外掛與 70+ 個 Skills 模組。
  - 完成 Git 初次提交 (Commit `feat: 初始化 Antigravity 工作區、規範與全域設定同步模組`)。

---

## [2026-08-31] YouTube 教學影片 1080P 下載與專業繁體中文字幕轉譯校對

- **任務背景**：
  使用者提供教學參考影片 URL (`https://www.youtube.com/watch?v=o6IozUt8LK0`)，主題為微控制器核心通訊技術《USB와 UART - MCU입문(개념편) 10화》（USB 與 UART - MCU 入門概念篇 第 10 集），要求下載 1080P 高畫質影片並生成流暢、專業且能自動掛載的繁體中文字幕檔。
- **執行內容與技術關鍵**：
  1. **影音與原始字幕擷取**：
     - 使用 `yt-dlp` 下載 1080P (AVC1) 視訊與最佳音質音訊，透過 `ffmpeg` 合併封裝為 `downloads/USB_and_UART_MCU_Intro_Ep10.mp4` (約 37.8 MB)。
     - 完整擷取原聲韓文字幕 `downloads/USB_and_UART_MCU_Intro_Ep10.ko.srt`（共 276 個時間軸片段）。
  2. **工程術語校對與繁體中文在地化 (Taiwan Electronic Engineering Standards)**：
     - 全面校正韓語語音辨識之諧音錯誤（如將 UART 誤識為 유어트/뉴어트/유아트、將 MCU 誤識為 임시유/MC6、將 D- 誤識為 D마 等）。
     - 統一台灣電子/資訊工程專有名詞：微控制器 (MCU)、通用序列匯流排 (USB)、虛擬序列埠 (Virtual COM Port)、非同步串列傳輸 (UART)、鮑率 (Baud rate)、資料訊框 (Data Frame)、起始/停止/同位檢查位元、差分訊號 (Differential Signaling)、共地 (Common Ground)、開機引導程式 (Bootloader)、序列埠監視器 (Serial Monitor)。
  3. **兩階段語意潤飾與流暢度檢查**：
     - 檢視全片 276 條時間軸，確保斷句自然、時間軸分秒對齊，消除機翻生硬贅字。
  4. **播放器自動掛載配置**：
     - 依據主流播放器（PotPlayer, VLC, Windows Media Player 等）之同名自動載入機制，產出與影片同名之 `.srt` 檔案於 `downloads/`。
     - 同時產出標準語系檔名與雙語對照檔備份至 `subtitles/`。
- **異動與產出檔案清單**：
  - [NEW] `downloads/USB_and_UART_MCU_Intro_Ep10.mp4` (1080P 影片主檔)
  - [NEW] `downloads/USB_and_UART_MCU_Intro_Ep10.srt` (**自動掛載字幕檔**)
  - [NEW] `downloads/USB_and_UART_MCU_Intro_Ep10.zh-TW.srt` (繁中字幕標準語系檔)
  - [NEW] `subtitles/USB_and_UART_MCU_Intro_Ep10.zh-TW.srt` (專案文檔歸檔)
  - [NEW] `subtitles/USB_and_UART_MCU_Intro_Ep10.bilingual.srt` (韓中雙語對照字幕)
  - [NEW] `scripts/build_accurate_subtitles.py` (高精度逐句翻譯與校對腳本)
  - [MODIFY] `.gitignore` (加入 `downloads/` 避免大型影音推送到 Git)
- **驗證狀態**：
  - 影片畫質確認為 1920x1080 24fps，音畫同步。
  - 字幕時間軸共 276 條，100% 完整無缺漏，格式為標準 UTF-8 SubRip (.srt)。

---

## [2026-08-30] 教學工作專案初始化與教案/教材建立

- **任務背景**：初始化 `A02_教學工作` 專案，確立教學全生命週期規範與科目分類架構。
- **執行內容**：
  1. 建立 `AGENTS.md` 確立「學科屬性分類歸檔原則 (Domain-First Classification Rule)」與 108 課綱教學指引。
  2. 建立通用範本庫 `_共用範本庫_Templates/`。
  3. 完成《Altium Designer 新例說》第零章與第一章實作教學講義，精準標註原教材頁碼 (p. 0-2 ~ p. 1-60) 與圖號索引。
  4. 依據高職優質化輔助方案規範，完成國立彰師附工資訊科二年級《電路設計工程師體驗營》10 節課完整教案，嚴格遵循「壹 > 一 > (一) > 1 > (1)」公文層次編號。
- **產出檔案**：
  - `電路繪圖/教材講義/Altium_Designer_Chapter0_電路設計這檔事_實作操作指引.md`
  - `電路繪圖/教材講義/Altium_Designer_Chapter1_快速穿越AltiumDesigner_實作操作指引.md`
  - `電路繪圖/教案規劃/115高職優質化_電路設計工程師體驗營_教案.md`
