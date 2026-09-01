# 📚 Obsidian × AI Agent 第二大腦建置與教學實戰全攻略教材

> **課程編號**：EP-OBS-01  
> **編撰角色**：高工資訊科老師 × 電子工程師 × 教務主任  
> **適用工具**：Obsidian、Google AntiGravity 2.0、ChatGPT Codex、Claude Code、NotebookLM  
> **教材定位**：從軟體安裝、第二大腦架構規劃，到跨 AI Agent 自動化筆記流的完整實戰指引。

---

## 📑 教材目錄

1. [導論：為什麼 AI 時代每位教育者與工程師都需要「第二大腦」？](#1-導論為什麼-ai-時代每位教育者與工程師都需要第二大腦)
2. [第一章：環境建置與 Obsidian 從零安裝指南 (對齊 EP07)](#2-第一章環境建置與-obsidian-從零安裝指南-對齊-ep07)
3. [第二章：卡帕西架構——三層筆記流與知識庫規劃 (對齊 EP08)](#3-第二章卡帕西架構三層筆記流與知識庫規劃-對齊-ep08)
4. [第三章：跨 AI Agent 工具串接實戰 (AntiGravity / Codex / Claude)](#4-第三章跨-ai-agent-工具串接實戰-antigravity--codex--claude)
5. [第四章：教務行政與教學實務應用工作流](#5-第四章教務行政與教學實務應用工作流)
6. [第五章：常見踩坑防範與除錯指南 (Troubleshooting & FAQ)](#6-第五章常見踩坑防範與除錯指南-troubleshooting--faq)

---

## 1. 導論：為什麼 AI 時代每位教育者與工程師都需要「第二大腦」？

在過去，筆記工具（如 Notion、Evernote、OneNote）多半是靜態的文字倉庫，面臨三大痛點：
1. **封閉與雲端綁定**：資料格式專屬，無法簡單批次備份，且常受限於廠商 API 呼叫配額。
2. **AI 無法深度直接介入**：傳統雲端軟體難以讓本機端 AI Agent（如 AntiGravity、Claude Code、Codex）進行無障礙的高速讀寫。
3. **資訊過載卻缺乏沉澱**：網路上收集的素材與文章愈堆愈多，卻從未真正轉化為個人可用、可檢索的結構化知識。

### 核心解方：Obsidian 本地 Markdown 庫 + AI Agent
- **純本地純文字 (Pure Local Markdown)**：所有筆記都是標準 `.md` 檔案，即使斷網或軟體停止維護，資料永久屬於自己。
- **Agentic 友善**：LLM 原生最擅長讀寫 Markdown 格式，讀取零延遲、無傳輸成本。
- **Andrej Karpathy（前 OpenAI 首席科學家）筆記哲學**：
  > **「原始資料（Raw Data）絕對不改動，結構化知識（Knowledge）交由 AI 定期消化、沉澱與成長。」**

---

## 2. 第一章：環境建置與 Obsidian 從零安裝指南 (對齊 EP07)

本章帶領讀者從完全乾淨的 Windows 系統開始，完成個人第二大腦的基礎骨架建置。

### 2.1 安裝前環境檢查
- **作業系統**：Windows 10 / 11 64-bit。
- **基礎依賴**：
  - Node.js 環境（建議 LTS 版本，供後續 MCP 伺服器與自動化工具運作）。
  - Google Chrome 瀏覽器（安裝剪藏外掛）。

### 2.2 下載並安裝 Obsidian
1. 前往官方網站 [https://obsidian.md/](https://obsidian.md/) 下載 Windows 版安裝檔。
2. 執行安裝程式，安裝完成後**先不要急著開啟**。
3. 建議將 Obsidian 圖示固定至工作列，方便日常快速呼叫。

### 2.3 配置 Google Drive 電腦版（免費多裝置同步）
為了實現免付費、無感且安全的跨裝置筆記同步：
1. 下載並安裝 **Google 雲端硬碟電腦版 (Google Drive for Desktop)**。
2. 登入個人的 Google 帳號，確認 Windows 檔案總管左側出現 `Google Drive` 磁碟機代號（例如 `G:\我的雲端硬碟` 或虛擬掛載路徑）。
3. 在雲端硬碟內建立專屬資料夾，命名為 `second-brain`。

### 2.4 在 Obsidian 中掛載儲存庫 (Vault)
1. 開啟 Obsidian 應用程式。
2. 選擇「**開啟資料夾為儲存庫 (Open folder as vault)**」。
3. 瀏覽並選擇剛才在 Google 雲端硬碟建立的 `second-brain` 目錄。
4. 命名儲存庫為 `SecondBrain`，進入主操作介面。

### 2.5 配置瀏覽器剪藏外掛：Obsidian Web Clipper
1. 開啟 Google Chrome，進入 Chrome 線上應用程式商店。
2. 搜尋並安裝 **Obsidian Web Clipper**。
3. 安裝完成後釘選至瀏覽器右上角工具列。
4. 點擊設定圖示（Settings）：
   - **Vault 名稱**：填寫 `SecondBrain`。
   - **預設儲存路徑**：設定為 `01_Clipping/`。
5. **實戰測試**：
   - 在任何優質網頁或教學文章上反白文字，按滑鼠右鍵選擇 `Obsidian Web Clipper -> Save Selection`。
   - 在 YouTube 影片頁面下方開啟「**顯示轉錄稿**」，在字幕區右鍵剪藏，即可瞬間將完整逐字稿存入第二大腦！

---

## 3. 第二章：卡帕西架構——三層筆記流與知識庫規劃 (對齊 EP08)

如何避免筆記庫變成雜亂無章的垃圾場？核心在於確立清晰的「三層資料架構」與「職責邊界」。

```text
SecondBrain/ (Obsidian Vault 根目錄)
├── AGENTS.md            # 全域協作規範與第二大腦導引規則
├── INDEX.md             # 知識庫總導覽與各領域索引
├── LOG.md               # AI 每週整理日誌與操作紀錄
├── 01_Clipping/         # 【原始外部資料】網頁剪藏、論文摘要、YouTube 逐字稿 (AI 唯讀)
├── 02_Creation/         # 【原始創作資料】教學講義草稿、考卷原始題庫、個人心得 (AI 唯讀)
└── 03_Knowledge/        # 【AI 結構化知識庫】卡片盒筆記、單元核心觀念、跨學科主題 (AI 定期增修)
```

### 3.1 三層架構職責解析

| 目錄層級 | 名稱 | 性質 | AI 存取權限 | 內容範例 |
| :--- | :--- | :--- | :---: | :--- |
| **`01_Clipping/`** | 外部剪藏庫 | 原始外部靈感 | **唯讀 (Read-Only)** | 科技新聞、教學部落格文章、YouTube 轉錄稿、演講逐字稿 |
| **`02_Creation/`** | 個人創作庫 | 原始自主創作 | **唯讀 (Read-Only)** | 教案雛形、個人研究筆記、教學反思、課綱試寫草稿 |
| **`03_Knowledge/`** | 核心知識庫 | 提煉後卡片知識 | **讀寫 (Read/Write)** | 原子化筆記 (Atomic Notes)、概念定義、教學策略、公式彙整 |

> [!IMPORTANT]
> **鐵律原則**：AI 在進行任何整理與關聯時，**嚴禁修改或刪除** `01_Clipping/` 與 `02_Creation/` 內的任何原始檔案！所有統整、提煉出的新知識，一律輸出至 `03_Knowledge/`。

### 3.2 系統導引檔：建立第二大腦的 `AGENTS.md`
在 Obsidian Vault 根目錄建立 `AGENTS.md`，讓接入的 AI Agent 隨時遵循以下整理準則：

```markdown
# Second Brain AI 協作指引 (AGENTS.md)

你是我第二大腦的專業知識管理代理人 (Knowledge Librarian)。

## 1. 核心職責
- 讀取 `01_Clipping/` 與 `02_Creation/` 中的新檔案。
- 提取關鍵概念，撰寫模組化、原子化的 Markdown 筆記存入 `03_Knowledge/`。
- 自動建立雙向連結 `[[概念名稱]]`，串聯新舊知識。
- 每次維護後更新 `LOG.md`，記錄本次新增的關聯與摘要。

## 2. 嚴格限制
- 絕不更動或覆蓋 `01_Clipping/` 與 `02_Creation/` 原始檔案內容。
- 語言使用繁體中文（台灣教育與工程習慣用語）。
```

### 3.3 自動化知識重整機制 (Weekly Knowledge Sweep)
藉由定時排程（Windows 工作排程器、Cron 或 AI Agent 的 Schedule 功能）：
1. **觸發頻率**：每週一次（例如每週日晚間）。
2. **執行動作**：
   - 掃描過去 7 天新增的 `Clipping` 與 `Creation` 檔案。
   - 找出跨文章的共通主題（如「AI 評量」、「Prompt 技巧」、「ESP32 溫濕度傳感」）。
   - 在 `03_Knowledge/` 生成統整卡片，並更新 `INDEX.md` 目錄。

---

## 4. 第三章：跨 AI Agent 工具串接實戰 (AntiGravity / Codex / Claude)

Obsidian 本地庫最大的威力在於：**任何 AI 工具都能隨時掛載它作為外接硬碟！**

### 4.1 核心溝通橋樑：MCP (Model Context Protocol)
MCP 是現代 AI Agent（包括 AntiGravity、Claude Code 等）存取本地檔案系統與外部服務的標準協定。透過 `filesystem MCP` 或專屬的 `obsidian MCP`，Agent 可以直接穿透對話視窗，調閱整個 Vault。

---

### 4.2 Google AntiGravity 2.0 串接配置 (對齊 AntiGravity EP01)
Google AntiGravity 2.0 擁有極高的本機控制能力，串接 Obsidian 的標準步驟如下：

1. **開啟 AntiGravity 設定**：
   - 進入左側選單 `Settings` ➔ `Customizations` / `Permissions`。
2. **掛載 Obsidian 工作目錄**：
   - 在專案或全域工作區中，將路徑指向 Google Drive 的 `second-brain` 目錄。
3. **驗證指令測試**：
   在 AntiGravity 對話框中輸入：
   > *"請讀取我的 Obsidian 第二大腦中 01_Clipping/ 資料夾最新的三篇文章，並為我總結它們的共同重點。"*
4. **全自動產出**：
   AntiGravity 會自動呼叫檔案讀取工具，並將結果呈現在對話或生成在 `03_Knowledge/`。

---

### 4.3 ChatGPT Codex / GPT-CodeX 串接實戰 (對齊 Codex EP03 & EP04)
在 Codex 中，可以將第二大腦作為常駐的外部參考資料庫：
1. **專案初始化**：
   在 Codex 終端機或 GUI 介面中新增專案時，執行專案初始化引導。
2. **註冊全域第二大腦路徑**：
   將 `second-brain` 的路徑宣告在 Codex 的設定或 Context 指引中。
3. **搭配 GitHub 進行版本控制**：
   建議將 `second-brain` 本地庫設定為私有 Git 倉庫，透過 GitHub 進行版本追蹤，防止誤刪並確保每一步修改皆可回溯。

---

### 4.4 NotebookLM ➔ Obsidian 跨工具回存流 (對齊 EP04 & EP06)
1. **資料餵入**：將厚重的 PDF 教材、大部頭文獻或大量教學法規上傳至 Google NotebookLM。
2. **深度分析**：利用 NotebookLM 產出「研讀報告」、「問答清單」或「教學大綱」。
3. **自動歸檔**：透過 AI Agent 一鍵抓取 NotebookLM 產生的文字與結構，回存至本機 `03_Knowledge/NotebookLM_Reports/`，形成永久個人資產。

---

## 5. 第四章：教務行政與教學實務應用工作流

身兼資訊教師與學校行政主管，以下提供三套立即可用的標準化工作流程：

### 應用情境 A：一鍵編排「學期各週教學進度表」
1. **前置素材**：
   - 將教育部課程綱要、教科書單元目錄剪藏至 `01_Clipping/課綱/`。
2. **AI 指令 (Prompt)**：
   > *"請依據 `01_Clipping/課綱/` 中的九年級資訊科技課綱指標，結合我們學校這學期的 21 週行事曆（扣除期中考、畢業旅行），為我自動排定各週教學進度表，欄位包含：週次、單元名稱、核心素養指標、課堂實作活動、評量方式，輸出為標準 Markdown 表格。"*
3. **成果產出**：直接生成規範文件，可立即貼入學校教學計畫書中。

---

### 應用情境 B：極速整理「教師專業評鑑／教學檔案」
1. **收集素材**：平時將學生優良作品截圖、公開授課觀課回饋單、備課研習筆記存入 `02_Creation/教學紀錄/`。
2. **彙整歸檔**：
   > *"請讀取本學期 `02_Creation/教學紀錄/` 內的所有活動與反思，依照『課程設計與教學』、『班級經營與輔導』、『專業成長與進修』三大評鑑向度，產出完整教學檔案總結報告。"*

---

### 應用情境 C：段考考古題資料庫與自動出卷
1. **建立題庫**：將歷屆試題與段考試題 Markdown 檔放置於 `02_Creation/題庫/`。
2. **自動出題**：
   > *"請參考題庫中的『一元一次不等式』單元，維持難易度比例（基礎 40%、精熟 40%、挑戰 20%），自動生成 25 題全新四選一單選題，並附上精確解析與雙向細目表。"*

---

## 6. 第五章：常見踩坑防範與除錯指南 (Troubleshooting & FAQ)

### Q1：為什麼在不同的專案資料夾啟動 AI Agent，會找不到 Obsidian 筆記本？
- **原因**：設定了「相對路徑」而非「絕對路徑」，或 MCP 伺服器未宣告為全域（Global）。
- **解法**：在全域設定（如 `D:\Antigravity\AGENTS.md` 或全域 MCP 配置）中，明確指定絕對路徑（例如 `G:\我的雲端硬碟\second-brain`），確保任何子專案都能直接存取。

### Q2：Google Drive 同步時出現檔案衝突或延遲怎麼辦？
- **原因**：AI Agent 寫入速度極快，Google Drive 桌面版需要數秒鐘進行雲端校驗。
- **解法**：在 AI 大量批次產出檔案時，建議關閉雲端硬碟的即時快顯通知，或在本地專案產出完成後，再整體移動歸檔至 Vault。

### Q3：學生個資與敏感行政公文可以存進 Obsidian 嗎？
- **資安準則**：
  - **嚴格禁止**：未去識別化的學生個人資料（身分證字號、完整姓名、住址、成績冊）或機密公文上傳至未加密的公開雲端或未授權的大型語言模型。
  - **合規做法**：行政資料請於本機離線處理，或使用學校授權之封閉型教育雲端帳號；涉密公文請隱去機敏資訊後再交由 AI 潤飾文句。

---

## 結語與課後動手做 (Hands-on Practice)

> 🎓 **「工具會不斷推陳出新，但沉澱下來的結構化思考與知識資產將伴隨一生。」**  
> 請現在就跟著第一章的步驟，下載安裝 Obsidian，建立屬於您自己的第一座第二大腦！
