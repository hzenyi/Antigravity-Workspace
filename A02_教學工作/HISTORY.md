# 專案歷程記錄檔 (Project History & Work Logging)

本文件依據全域協作規範，嚴謹記錄 `A02_教學工作` 專案之重大里程碑、教材生成、影片影音資源與重要產出。

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
- **異動與產出檔案清單**：
  - [NEW] `.gitignore` (專案根目錄忽略清單)
  - [NEW] `scripts/export_config.ps1` (全域設定與外掛匯出腳本)
  - [NEW] `scripts/import_config.ps1` (全域設定與外掛匯入還原腳本)
  - [NEW] `scripts/sync_push.ps1` (一鍵打包推送腳本)
  - [NEW] `_antigravity_config/` (存放 `config.json`, `mcp_config.json`, `plugins/`)
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
