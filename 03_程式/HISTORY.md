# 程式研發領域歷程記錄 (03_程式 / HISTORY.md)

本文件依據全域規範記錄 `03_程式` 目錄下所有軟硬體研發、AI 專案與工具腳本之重要里程碑與變更歷程。

## [1.2.0] - 2026-09-15T13:38:00+08:00
### 工作背景與任務需求
- 排除 Antigravity 啟動時發生的 `config.json: parsing user config: proto: syntax error (line 1:1): invalid value` 崩潰問題。
- 根治 Windows PowerShell 5.1 匯出/匯入時強加 UTF-8 BOM（`0xEF 0xBB 0xBF`）與 Go `protojson` 解析器衝突之缺陷。
- 最佳化設定檔與外掛備份同步效能，確保推送到 GitHub 遠端倉庫之設定檔保持純淨無 BOM。

### 執行內容與技術關鍵
- **修復本機與備份庫設定檔**：
  - 清除 `config.json` 與 `mcp_config.json` 開頭之 UTF-8 BOM，確認二進位標頭回歸純 ASCII `{`（`0x7B`）。
- **強化腳本寫入防護與效能**：
  - `scripts/import_config.ps1`：停用 `Set-Content -Encoding UTF8`，改採 `[System.Text.UTF8Encoding]($false)` 無 BOM 寫入；同步參數加入 `/NP /R:1 /W:1 /MT:16` 防止鎖檔延遲。
  - `scripts/export_config.ps1`：加入自動偵測與切除 BOM 之過濾防線；複製機制由 `Copy-Item` 全面升級為多執行緒 `robocopy /MT:16 /NP /R:1 /W:1`，數秒內完成 3,000+ 個外掛與技能零碎檔案同步。
- **全域同步檢核**：
  - 驗證匯出與還原流程，確認產出檔案皆為純 UTF-8 無 BOM。

### 異動檔案清單
- `_antigravity_config/config.json` (移除 BOM)
- `_antigravity_config/mcp_config.json` (移除 BOM)
- `scripts/import_config.ps1` (更新)
- `scripts/export_config.ps1` (更新)
- `03_程式/HISTORY.md` (更新)

### 驗證方式與成果摘要
- 執行 `export_config.ps1` 正常結束（Exit Code 0），二進位檢查無 BOM，檔案結構與白名單權限完整。

---

## [1.1.0] - 2026-09-14T08:24:00+08:00
### 工作背景與任務需求
- 執行跨電腦自 GitHub 取回設定檔與還原流程（依據 `antigravity-github-sync` SOP）。
- 解決跨電腦還原時可能發生的主機名稱被覆蓋、權限白名單遺失以及大量檔案同步耗時問題。

### 執行內容與技術關鍵
- **升級 `scripts/import_config.ps1`**：
  1. **智慧整併 `config.json`**：動態保留當前本機之 `remoteControlHostname`，並將兩台電腦的 `globalPermissionGrants` 權限白名單自動進行聯集（Union），避免重複提示授權。
  2. **高速多線程同步**：將外掛與自訂技能之複製機制由 `Copy-Item` 升級為 `robocopy /E /MT:8`，大幅提升包含 `node_modules` 與龐大資源庫時的同步效能。
  3. **編碼防護**：確保 PowerShell 5.1 在繁體中文環境下能精準解析帶有 BOM 之 UTF-8 腳本。
- **執行取回與還原**：
  - 驗證 `git pull origin main` 確保版本庫為最新。
  - 執行 `import_config.ps1` 自動建立快照備份（`config_backup_20260914_082312`），並成功將 `config.json`、`mcp_config.json`、6 組外掛與 5 組自訂技能還原至本機全域環境。

### 異動檔案清單
- `scripts/import_config.ps1` (更新)
- `03_程式/HISTORY.md` (更新)

### 驗證方式與成果摘要
- 執行 `import_config.ps1` 正常結束（Exit Code 0），全域環境驗證通過。

---

## [1.0.0] - 2026-09-13
### 工作背景與任務需求
- 配合工作區「行政、教學、程式」三大領域整體重構架構，正式建立 `03_程式` 專屬領域目錄。
- 移入 `AI基本功` 專案，建立電子工程師與軟體架構師之專業協作基座。

### 執行內容與技術關鍵
- 建立 `03_程式/AGENTS.md`，制定 MCU 嵌入式系統、軟體工程 Clean Code、防禦性編程與 RCA 除錯 SOP。
- 完成 `AI基本功` 專案子目錄之繁體中文化更名（參考文件、提示詞、字幕逐字稿、下載暫存、工具腳本）。

### 異動檔案清單
- `03_程式/AGENTS.md` (新建)
- `03_程式/HISTORY.md` (新建)
- `03_程式/AI基本功/` (目錄搬遷與中文化)

### 驗證方式與成果摘要
- 目錄結構檢核通過，子專案路徑正名完成。
