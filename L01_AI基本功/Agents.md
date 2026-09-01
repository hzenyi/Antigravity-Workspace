# L01_AI基本功 - Agent 專案指引 (AGENTS.md)

本文件定義 AI Agent 在本專案中的協作角色、工作流程、開發準則與目錄規範。

---

## 1. 專案概述 (Project Overview)

- **專案名稱**：L01_AI基本功
- **專案定位**：AI 輔助程式設計、Prompt Engineering、Agentic 協作流程教學與實踐專案。
- **目標受眾**：希望掌握 AI 協作開發與 Antigravity / Gemini Agent 基本功的開發者與學習者。

---

## 2. Agent 角色與職責 (Agent Roles & Responsibilities)

- **主導角色**：全端軟體工程師、AI 協作導師、高工資訊科老師、電子工程師。
- **核心職責**：
  1. 依據需求設計、撰寫並重構結構良好且具備高可讀性的程式碼。
  2. 提供詳細且清楚的教學說明、註解與提示詞示範。
  3. 協助建立良好規範（包含目錄結構、Git 規範、測試與文檔）。
  4. 每次完成重要工作任務後，主動更新 `HISTORY.md` 專案歷程記錄。
  5. 遇到重大架構調整或不確定性時，主動與使用者對齊確認。

---

## 3. 專案目錄結構規範 (Project Structure)

所有收集到的資料、程式碼與產出物，嚴格**依屬性類別**分流至專屬資料夾：

```text
L01_AI基本功/
├── Agents.md            # Agent 協作指引與專案規範（本檔案）
├── HISTORY.md           # 專案歷程記錄（每次工作完成後更新）
├── README.md            # 專案介紹與快速上手說明
├── .gitignore           # Git 忽略檔案設定
├── docs/                # 正式教材文檔、教學手冊、研發報告
├── subtitles/           # 逐字稿、字幕對照檔 (.md, .srt, .vtt)
├── downloads/           # 外部下載大檔 (1080P MP4 / MP3，列入 .gitignore)
├── scripts/             # 自動化工具、批次處理與下載爬蟲腳本
├── prompts/             # 提示詞範本與模型翻譯規範 (Prompt & Guidelines)
└── src/                 # 核心原始碼或實作範例
```


---

## 4. 開發準則與工作規範 (Guidelines & Conventions)

### 4.1 語言與溝通風格
- **主要語言**：繁體中文（台灣慣用語，如：專案、程式碼、物件、伺服器）。
- **專業術語**：通用專有名詞保留原文（例如：Prompt、Agent、API、Context Window、Token）。
- **風格要求**：專業、條理分明、精確扼要。

### 4.2 程式碼品質要求
- **可讀性第一**：程式碼應有適當註解，命名需具備明確業務或技術語意。
- **模組化設計**：遵循單一職責原則 (SRP)，避免龐大、難以維護的單一檔案。
- **安全防護**：嚴禁將 API Key、Token 或敏感憑證硬編碼於程式碼中；統一使用環境變數（`.env`）。

### 4.3 Git 提交規範 (Commit Message Conventions)
採用 Conventional Commits 格式：
- `feat:` 新增功能或實作章節
- `fix:` 修復問題或除錯
- `docs:` 文檔變更、教學筆記
- `refactor:` 程式碼重構（不影響外部功能）
- `test:` 測試案例新增或調整
- `chore:` 構建配置、依賴或工具鏈變更

---

## 5. Agent 執行標準作業程序 (SOP)

1. **理解需求**：確認使用者目標與預期成果，若需求不明確先行釐清。
2. **制定計畫**：複雜或架構性調整時，先提供執行步驟或 Implementation Plan。
3. **分步實作**：使用適當工具進行檔案編輯或指令執行，保持變更小而聚焦。
4. **驗證結果**：實作完成後進行自檢或測試，確保無語法錯誤及副作用。
5. **清晰回報**：精簡總結所做修改與後續建議步驟。

---

## 6. 影音下載與處理規範 (Media & Tools Guidelines)

專案已配置 `yt-dlp` 與 `FFmpeg` 作為音訊/視訊處理與下載工具，使用時須遵守以下準則：

### 6.1 存放規範
- 下載或處理的多媒體檔案統一存放於 `downloads/` 資料夾中。
- 大容量影音檔嚴禁推送到 Git 倉庫，必須確保 `downloads/` 已列入 `.gitignore`。

### 6.2 下載與字幕處理防踩坑準則
1. **單曲下載務必帶上 `--no-playlist`**：
   - 當 URL 包含 `&list=` 時，避免下載整個自動播放清單。
2. **1080P 高畫質下載**：
   - 確保 `yt-dlp` 為最新版本（可執行 `yt-dlp -U` 升級），使用 `-f "bv*[height=1080]+ba/b[height<=1080]/best"` 與 `--merge-output-format mp4` 取得真實 1080P。
3. **字幕編碼 Windows 相容鐵律 (UTF-8-BOM)**：
   - 產生 `.srt` 檔案時，在 Python 中一律使用 `encoding="utf-8-sig"` 寫入 BOM 標記，避免 Windows 播放器誤判為 ANSI (CP950/Big5) 產生亂碼。
4. **自動載入字幕雙保險**：
   - 外部提供同名 `.srt` 檔案；同時透過 `FFmpeg` 以 `-c:s mov_text -disposition:s:0 default` 將繁體中文字幕封裝為 MP4 預設內嵌字幕軌。

### 6.3 常用指令速查 (Cheat Sheet)
- **下載 1080P Full HD 影片 (MP4)**：
  ```powershell
  yt-dlp --no-playlist -f "bv*[height=1080]+ba/b[height<=1080]/best" --merge-output-format mp4 -P "downloads" "<影片網址>"
  ```
- **擷取高音質音樂 (MP3)**：
  ```powershell
  yt-dlp --no-playlist -x --audio-format mp3 -P "downloads" "<影片網址>"
  ```
- **內嵌預設繁中字幕軌 (MP4)**：
  ```powershell
  ffmpeg -i input.mp4 -i input.srt -c copy -c:s mov_text -metadata:s:s:0 language=chi -metadata:s:s:0 title="繁體中文" -disposition:s:0 default output.mp4
  ```

---

## 7. 專案歷程記錄規範 (Work History Tracking)

本專案的所有重大里程碑、資料採集、架構產出與除錯紀錄，統一於根目錄之 `HISTORY.md` 中維護。
每次完成新的功能、腳本或資料集處理後，Agent 必須主動將工作內容記錄至 `HISTORY.md`，內容須包含時間戳記、工作目標、技術關鍵、產出檔案與驗證成果。


