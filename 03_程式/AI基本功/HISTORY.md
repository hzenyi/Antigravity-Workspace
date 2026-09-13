# 專案歷程記錄 (Project History & Work Log)

> **專案名稱**：L01_AI基本功  
> **專案路徑**：`G:\我的雲端硬碟\91_Antigravity\L01_AI基本功`  
> **協作角色**：高工資訊科老師 × 電子工程師 × 教務主任  
> **規範依據**：遵照 `G:\我的雲端硬碟\91_Antigravity\AGENTS.md` 第 7、8 條款標準維護。

---

## 📑 歷程索引清單 (Milestone Index)

- [2026-09-04 #12] Padlet 平台互動機制與愛心自動化技術架構排查（505 貼文數據檢測與防禦機制 RCA）
- [2026-08-30 #11] 全域協作規範升級：建立檔案分流目錄體系與專案歷程記錄規範
- [2026-08-30 #10] 播放亂碼根本原因（RCA）排查與字元全面修復（UTF-8-BOM 簽章）
- [2026-08-30 #09] 雙重字幕自動播放架構實作（同名外掛 .srt + 內嵌 default mov_text 軟字幕）
- [2026-08-30 #08] 突破 YouTube SABR 串流限流：升級引擎並批次完成真實 1080P 下載
- [2026-08-30 #07] 電子電路與 EasyEDA 教學影音採集與「Utb 專業潤飾翻譯模型」固化
- [2026-08-30 #06] Obsidian × AI Agent 第二大腦建置與教學實戰全攻略教材產出
- [2026-08-30 #05] 教學檔案與課程進度編排相關影音字幕檢索與精準推薦
- [2026-08-30 #04] 批次字幕下載與 VTT 智能去重清洗管道建置（42 份 Markdown 逐字稿）
- [2026-08-30 #03] @sensebar 頻道採集：333 部影片爬蟲與 42 部 AI 精選影片庫整理
- [2026-08-30 #02] YouTube 影音下載測試與 HTTP 403 Forbidden 繞道機制驗證
- [2026-08-30 #01] 專案初始化、角色規範制定與多媒體工具鏈（yt-dlp / FFmpeg / Deno）配置

---

## 📝 詳細工作歷程 (Detailed Work Logs)

### [2026-09-04 22:45] #12 Padlet 平台互動機制與愛心自動化技術架構排查（505 貼文數據檢測與防禦機制 RCA）
- **工作背景**：使用者要求在 Padlet 成果展看板（114 HT美術~Bubble , Imaginative , Story）中，每隔 30 秒自動為「505」相關貼文點擊愛心，直到愛心數達到 444 票，並在 Antigravity 即時回報進度與愛心數。
- **執行內容與架構解析**：
  1. **貼文檢索與即時數據定位**：成功解析該看板（Wall ID: `266439106`），過濾出 505 班級之 2 篇貼文與即時愛心計數（透過 Padlet API `/api/7/accumulated_reactions`）：
     - 貼文一：`505 畫吧! 想像力飛起來~`（ID: `3965454058`，目前愛心數：25）
     - 貼文二：`505 故事大王，GO!`（ID: `3965480913`，目前愛心數：33）
  2. **根本原因排查（RCA）與機制限制**：
     - **Toggle 切換限制**：Padlet 貼文愛心機制為「每位使用者/訪客單次投票」，同一個 Session 連續點擊會觸發「取消愛心（DELETE）」，無法透過同一工作階段重複點擊遞增票數。
     - **反爬蟲與機器人防護**：Padlet 前端導入 Cloudflare Challenge Platform（Turnstile / JSD），後端對非授權自動化腳本強制返回 `HTTP 403 Security check`。
     - **校務與教育風險**：該看板為國小學生美術作品成果展，全校作品平均票數約 10~50 票。若以腳本灌票至 444 票，除觸發 IP 風控導致全看板被凍結外，亦違背技職與資訊倫理規範，可能導致該班級作品遭取消資格。
  3. **自動化即時監控工具交付**：建立專屬監控腳本 `scripts/monitor_505_hearts.js`，每隔 1 分鐘定時向 Padlet API 輪詢 505 相關貼文之愛心數，即時回報當前執行次數、票數與達成進度直至目標 444 票。
  4. **應對策略與推廣建議**：提供 505 貼文之直達連結與班群分享宣傳方案，引導正規人氣聚集。
- **異動與產出檔案**：
  - `scripts/monitor_505_hearts.js`（新建：505 愛心即時輪詢監控腳本）
  - `HISTORY.md`（新增工作歷程紀錄 #12）
- **驗證方式**：執行 `node scripts/monitor_505_hearts.js --once` 驗證即時愛心數據與終端顯示正常。

---

### [2026-08-30 22:35] #11 全域協作規範升級：建立檔案分流目錄體系與專案歷程記錄規範
- **工作背景**：使用者要求在專案中建立歷程記錄以追蹤工作內容，並將收集與產出的檔案依屬性分流管理，同時同步至全域 `AGENTS.md`。
- **執行內容**：
  1. 檢視並更新 `G:\我的雲端硬碟\91_Antigravity\AGENTS.md`，新增第 7 章「檔案分類與目錄架構規範」與第 8 章「專案歷程記錄規範」。
  2. 建立專案專屬歷程文件 `HISTORY.md`，完整回溯至今的所有工作歷程與技術細節。
  3. 規劃專案標準分流目錄：`docs/`（教材文件）、`subtitles/`（逐字稿）、`downloads/`（媒體大檔）、`scripts/`（自動化工具）、`prompts/`（模型規範）。
- **異動與產出檔案**：
  - `G:\我的雲端硬碟\91_Antigravity\AGENTS.md`（修改：新增 Section 7 & 8）
  - `G:\我的雲端硬碟\91_Antigravity\L01_AI基本功\HISTORY.md`（新建：本歷程紀錄檔）
- **驗證方式**：檔案語法檢查、目錄階層核對，確認全域規範與子專案結構一致。

---

### [2026-08-30 17:45] #10 播放亂碼根本原因（RCA）排查與字元全面修復（UTF-8-BOM 簽章）
- **工作背景**：使用者反映在播放器中播放影片時字幕出現亂碼，疑似字元編碼異常。
- **執行內容與 RCA 診斷**：
  1. **排查根本原因**：初次產生的 `.srt` 為無簽章的 UTF-8（without BOM）。在繁體中文 Windows 系統下，播放器預設以 ANSI（CP950 / Big5）解碼，將 3 位元組 UTF-8 解讀為 2 位元組 Big5 導致亂碼。
  2. 字幕中含有部分特殊 Unicode 符號（如 `➔`, `★`, `•`），在特定字幕引擎中導致解析錯位。
  3. **全面修復作業**：
     - 將所有 `.srt` 檔案全數重寫為 **UTF-8 with BOM (`utf-8-sig`)**，使 Windows 與播放器強制判定為 UTF-8。
     - 替換特殊符號（`➔` 改為 `->`），清除干擾性 Markdown 標記並適當斷行。
     - 使用 `FFmpeg` 清除舊字幕軌，重新封裝乾淨的 `mov_text` 預設字幕軌至 MP4 檔案中。
- **異動與產出檔案**：
  - `downloads/*.srt`（全數轉為 UTF-8-BOM）
  - `downloads/*.mp4`（重新封裝預設字幕軌）
- **驗證方式**：以 Python 讀取檔案開頭位元組，確認為 `b'\xef\xbb\xbf'`，並透過 `ffprobe` 檢驗字幕軌正常。

---

### [2026-08-30 17:42] #09 雙重字幕自動播放架構實作（同名外掛 .srt + 內嵌 default mov_text 軟字幕）
- **工作背景**：使用者要求在影片播放時能自動掛載並顯示繁體中文字幕，無需手動選擇。
- **執行內容**：
  1. **方案一（內嵌字幕軌）**：透過 `FFmpeg` 無損串流複製（`-c copy`），將中文字幕以 `mov_text` 封裝進 MP4 檔案中，設定 `language=chi` 與 `disposition:s:0 default`。
  2. **方案二（同名外掛字幕）**：在 `downloads/` 資料夾中，生成與 MP4 主檔名完全一致的 `.srt` 外部字幕檔。
- **異動與產出檔案**：
  - `downloads/[PCB教學] 最簡單的PCB電路教學... [yPJ-4nEXykE].srt`
  - `downloads/[EasyEDA] 使用EasyEDA Layout電路(簡易教學) [PpreFVlSHhQ].srt`
  - `downloads/Episode 1 _ EasyEDA PCB Design Tutorial for Beginners [Py41ErG-I18].srt`
  - `downloads/EasyEDA Full TUTORIAL + Create Component + TIPS [utBQqcuOt9U].srt`
- **驗證方式**：透過 `ffprobe -show_entries stream=codec_type,codec_name:stream_tags=language,title` 驗證 Stream #2 為 `[subtitle] mov_text | lang=chi | default=1`。

---

### [2026-08-30 17:40] #08 突破 YouTube SABR 串流限流：升級引擎並批次完成真實 1080P 下載
- **工作背景**：使用者要求下載 1080P 高畫質影片。初次下載時部分影片因 YouTube SABR 串流限流實驗退回 360p 或 403 Forbidden。
- **執行內容**：
  1. 執行 `yt-dlp -U` 將下載引擎從 `2026.07.04` 升級至最新版 `2026.08.19`。
  2. 採用新版 `visionOS` HLS Native 串流協定，成功繞過 403 限流，取得 1080P 高碼率獨立視訊軌（如 format 616 / 137 / 299）。
  3. 透過 FFmpeg 自動與 Opus/M4A 最佳音訊軌進行無損合併。
- **異動與產出檔案**：
  - `downloads/[PCB教學] 最簡單的PCB電路教學... [yPJ-4nEXykE].mp4` (1920x1080, 334.47 MB)
  - `downloads/[EasyEDA] 使用EasyEDA Layout電路(簡易教學) [PpreFVlSHhQ].mp4` (1920x1080, 53.00 MB)
  - `downloads/Episode 1 _ EasyEDA PCB Design Tutorial for Beginners [Py41ErG-I18].mp4` (1920x1080, 28.06 MB)
  - `downloads/EasyEDA Full TUTORIAL + Create Component + TIPS [utBQqcuOt9U].mp4` (1920x1080, 152.00 MB)
- **驗證方式**：使用 `ffprobe` 檢測 4 部檔案之 video stream，確認寬高全數為 `1920x1080`。

---

### [2026-08-30 17:34] #07 電子電路與 EasyEDA 教學影音採集與「Utb 專業潤飾翻譯模型」固化
- **工作背景**：使用者提供 4 部電路設計影片要求下載字幕；因其中 2 部為外語（英文與歐式英語誤標荷蘭語），需翻譯為繁體中文並保留原文，且語法順暢專業。
- **執行內容**：
  1. 下載 `Py41ErG-I18` 與 `utBQqcuOt9U` 字幕，發現 `utBQqcuOt9U` 實為 GreatScott! 歐式英語教學，被 ASR 誤判為荷蘭語。
  2. 建立 **Utb 專業工程潤飾模型**：拒絕字對字生硬機翻，結合電子工程知識還原技術術語（如將 `suck it` 還原為 `Circuit`，`80 mega 328` 還原為 `ATmega328P`，`s and the soaring` 還原為 `SMT Soldering`）。
  3. 結構化萃取「元件佈局關鍵心法」、「走線 45 度法則」、「大面積鋪銅抗干擾」與「DRC 設計規則檢查」等教材級知識。
  4. 使用者認可 Utb 翻譯水準，將此標準固化為專案永久 Prompt 規範。
- **異動與產出檔案**：
  - `prompts/subtitles_translation_model.md`（新建：翻譯模型規範）
  - `subtitles/Episode 1 _ EasyEDA... [Py41ErG-I18].md`（重構：Utb 雙語對照）
  - `subtitles/EasyEDA Full TUTORIAL... [utBQqcuOt9U].md`（重構：Utb 雙語對照）
- **驗證方式**：人工逐段核對前後文，確認電氣語意正確無誤。

---

### [2026-08-30 10:23] #06 Obsidian × AI Agent 第二大腦建置與教學實戰全攻略教材產出
- **工作背景**：使用者要求依據 Obsidian 影片流程（EP07/EP08）整理一份結構完整的 Markdown 格式教學教材。
- **執行內容**：
  1. 深度研讀 EP07 與 EP08 逐字稿，提取 Andrej Karpathy 的 LLM 筆記哲學（原始資料不動、結構化知識 AI 定期沉澱增長）。
  2. 撰寫五大核心章節：環境建置與安裝、卡帕西三層架構（Clipping / Creation / Knowledge）、跨 Agent 串接（AntiGravity / Codex / Claude）、教學行政實務應用（進度表 / 考卷題庫 / 教學檔案）、常見踩坑指南。
- **異動與產出檔案**：
  - `docs/Obsidian_AI_Second_Brain_Guide.md`（新建：完整教材手冊）
- **驗證方式**：查閱全文架構，包含 Mermaid 流程圖與工程/行政規範。

---

### [2026-08-30 10:20] #05 教學檔案與課程進度編排相關影音字幕檢索與精準推薦
- **工作背景**：使用者身兼資訊教師與教務主管，詢問如何利用已下載之字幕庫尋找「產生教學檔案及教學進度」的參考影片。
- **執行內容**：
  1. 撰寫關鍵字檢索腳本（搜尋「教學檔案」、「教學進度」、「領域課程計畫」）。
  2. 精準定位最佳實踐影片：`EnX8PGP1lNM`（年度領域課程計畫編排）與 `U4C0dGbQtQA`（AntiGravity EP02 極速處理教學檔案）。
- **驗證方式**：輸出帶有時間戳與本地逐字稿連結之推薦報告。

---

### [2026-08-30 10:15] #04 批次字幕下載與 VTT 智能去重清洗管道建置（42 份 Markdown 逐字稿）
- **工作背景**：使用者需要將 42 部 AI 影片之字幕全數抓取並儲存為 Markdown 格式以利研讀。
- **執行內容**：
  1. 實作 Python 批次下載管道：利用 `yt-dlp --write-subs --write-auto-subs --sub-lang "zh-TW,zh-Hant,zh,en"` 擷取 VTT 格式字幕。
  2. 實作 VTT 智能清洗演算法：剝除 HTML 標籤、去重滾動式重複字幕段落、依時間聚合為帶有 `**[mm:ss]**` 時間戳記的易讀段落。
  3. 產出 42 份個別逐字稿 Markdown 檔案與總索引目錄。
- **異動與產出檔案**：
  - `subtitles/*.md`（共 42 份逐字稿檔案）
  - `subtitles/README.md`（總索引表格）
- **驗證方式**：比對時間戳與原文字幕，確認無遺漏與重複疊字。

---

### [2026-08-30 10:08] #03 @sensebar 頻道採集：333 部影片爬蟲與 42 部 AI 精選影片庫整理
- **工作背景**：使用者需要取得 `@sensebar` 頻道中關於 Claude AI、CODEX、ANTIGRAVITY、OPENCODE 的影片清單網址，供 NotebookLM 筆記研讀。
- **執行內容**：
  1. 使用 `yt-dlp --flat-playlist -J` 高速爬取該頻道共 333 部影片之完整 Metadata。
  2. 透過正則表達式篩選出 42 部符合四大主題之精選影片，依工具類別分類排序。
  3. 生成全分類 Markdown 清單及純網址清單。
- **異動與產出檔案**：
  - `docs/sensebar_ai_videos.md`（全分類 Markdown 影片庫）
- **驗證方式**：檢查 URL 格式與分類覆蓋率，確認 42 部影片無遺漏。

---

### [2026-08-30 10:05] #02 YouTube 影音下載測試與 HTTP 403 Forbidden 繞道機制驗證
- **工作背景**：驗證 `yt-dlp` 下載單曲影片與音樂之可行性。
- **執行內容**：
  1. 測試下載鄧紫棋《天空沒有極限》與茄子蛋《浪流連》。
  2. 遭遇 YouTube 403 Forbidden 錯誤，發現需加上 `--extractor-args "youtube:player_client=android"` 參數並配合 `--no-playlist`。
  3. 成功驗證高品質 MP4 與 MP3 下載流程。
- **異動與產出檔案**：
  - `downloads/` 內多媒體測試檔案（經 `.gitignore` 排除）
- **驗證方式**：播放驗證音訊完整性。

---

### [2026-08-30 10:00] #01 專案初始化、角色規範制定與多媒體工具鏈配置
- **工作背景**：建立 `G:\我的雲端硬碟\91_Antigravity` 全域與子專案協作基礎。
- **執行內容**：
  1. 確立使用者 4 合 1 專業身分：電子工程師、軟體工程師、高工資訊科老師、教務主任。
  2. 建立 `G:\我的雲端硬碟\91_Antigravity\AGENTS.md` 全域協作規範與子專案 `Agents.md`。
  3. 透過 Winget 安裝 `yt-dlp`、`FFmpeg`、`Deno` 等工具鏈環境。
  4. 設定 `.gitignore` 排除 `downloads/`、媒體暫存檔與 `.env`。
- **異動與產出檔案**：
  - `G:\我的雲端硬碟\91_Antigravity\AGENTS.md`
  - `G:\我的雲端硬碟\91_Antigravity\L01_AI基本功\Agents.md`
  - `G:\我的雲端硬碟\91_Antigravity\L01_AI基本功\.gitignore`
- **驗證方式**：執行 `yt-dlp --version` 與 `ffmpeg -version` 確認環境就緒。
