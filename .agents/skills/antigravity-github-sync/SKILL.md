---
name: antigravity-github-sync
description: 自動將 Antigravity 工作區、教案與全域設定檔（config.json、外掛與 Skills）同步至 GitHub，或從 GitHub 拉回最新進度並自動還原至本地電腦。當使用者說「我要同步到 GitHub」、「同步設定到 GitHub」、「備份到遠端」或「從 GitHub 取回設定」、「從 GitHub 更新」、「拉回本地端」時觸發使用。
---

# Antigravity GitHub 雙向同步技能 (antigravity-github-sync)

本技能提供標準化、自動化且安全的雙向同步流程，確保兩台或多台電腦之間的教材專案、協作規範（AGENTS.md）以及 Antigravity 全域設定檔（config.json、外掛模組、Skills）保持一致。

---

## 觸發時機

1. **推送同步（Upload / Push）**：
   - 使用者指令包含：「我要同步到 GitHub」、「同步到 GitHub」、「把設定推送到 GitHub」、「備份到 GitHub」等。
2. **取回同步（Download / Pull）**：
   - 使用者指令包含：「從 GitHub 取回設定」、「從 GitHub 拉回」、「更新本地端」、「從遠端同步回來」等。

---

## 執行作業程序 (Standard Operating Procedure)

### 流程一：推送同步到 GitHub (Push Workflow)

當使用者指示要同步/備份到 GitHub 時，請依照以下步驟執行：

1. **執行全域設定匯出**：
   - 使用 `run_command` 於工作區根目錄執行匯出腳本：
     ```powershell
     powershell -ExecutionPolicy Bypass -File .\scripts\export_config.ps1
     ```
   - 確保本機 `~/.gemini/config/` 中的最新設定檔與 Plugins/Skills 已複製至 `_antigravity_config/`。
2. **檢查 Git 狀態**：
   - 執行 `git status -s` 檢視變更項目。
   - 若無任何變更，主動告知使用者：「目前工作區與設定檔皆為最新狀態，無需推送。」並結束流程。
3. **暫存並提交變更**：
   - 執行 `git add .`
   - 自動生成符合 Conventional Commits 規範的提交訊息（依據當前異動內容自動判定，例如 `sync: 同步教學教材與 Antigravity 設定檔 (YYYY-MM-DD HH:mm)`）。
   - 執行 `git commit -m "提交訊息"`。
4. **推送到遠端儲存庫**：
   - 檢查 `git remote -v` 確認是否已綁定遠端 origin。
     - 若**尚未綁定遠端**：提示使用者尚未設定 GitHub 遠端倉庫，並附上 `git remote add origin <URL>` 的引導說明。
     - 若**已綁定遠端**：執行 `git push origin main`。
5. **回報成果**：
   - 清楚列出本次成功備份與推送的檔案類別（如：教案更新、全域設定、Skills 外掛等）與 Commit ID。

---

### 流程二：從 GitHub 取回設定到本地端 (Pull & Restore Workflow)

當使用者指示要從 GitHub 取回或更新設定時，請依照以下步驟執行：

1. **拉取遠端最新變更**：
   - 於工作區根目錄下執行：
     ```powershell
     git pull origin main
     ```
   - 檢查輸出結果：
     - 若為 `Already up to date.`：代表本地端專案已是最新版本。
2. **自動還原全域設定檔**：
   - 無論是否有新的 git pull，皆執行匯入還原腳本，以確保本地 `~/.gemini/config/` 與專案保持一致：
     ```powershell
     powershell -ExecutionPolicy Bypass -File .\scripts\import_config.ps1
     ```
   - 腳本會自動將當前舊設定備份到快照資料夾，並安全覆蓋還原 `config.json`、`mcp_config.json`、`plugins/` 與 `skills/`。
3. **回報成果與重啟提醒**：
   - 總結更新項目。
   - 溫馨提醒使用者：「已完成設定還原。若本次有更新外掛或核心設定，建議重新啟動 Antigravity 以載入最新配置。」
