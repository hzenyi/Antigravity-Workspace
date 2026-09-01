# ==============================================================================
# setup_new_pc.ps1
# 功能：新電腦 (電腦 B) 一鍵初次啟用 Antigravity 工作區與設定檔部署
# ==============================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " [Antigravity] 新電腦環境一鍵初次部署安裝" -ForegroundColor Cyan
Write-Host " 專案庫：https://github.com/hzenyi/Antigravity-Workspace" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. 檢查 Git 是否已安裝
Write-Host "`n[1/3] 正在檢查 Git 安裝環境..." -ForegroundColor Cyan
$gitPath = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitPath) {
    Write-Host "[X] 錯誤：這台電腦尚未安裝 Git！" -ForegroundColor Red
    Write-Host "請先安裝 Git（下載網址：https://git-scm.com/download/win）後再執行本腳本。" -ForegroundColor Yellow
    Pause
    exit 1
}
Write-Host "[V] 偵測到 Git 環境就緒。" -ForegroundColor Green

# 2. 決定安裝路徑 (預設 D:\Antigravity，若無 D 槽則使用 C:\Antigravity)
$TargetDir = "D:\Antigravity"
if (-not (Test-Path "D:\")) {
    Write-Warning "這台電腦沒有 D 槽，將自動安裝於 C:\Antigravity"
    $TargetDir = "C:\Antigravity"
}

# 3. 下載或更新儲存庫
Write-Host "`n[2/3] 正在從 GitHub 下載工作區與設定 (至 $TargetDir)..." -ForegroundColor Cyan
if (Test-Path (Join-Path $TargetDir ".git")) {
    Write-Host "偵測到目錄已存在，正在執行更新 (git pull)..." -ForegroundColor Yellow
    Set-Location $TargetDir
    git pull origin main
} else {
    git clone https://github.com/hzenyi/Antigravity-Workspace.git $TargetDir
}

if (-not (Test-Path $TargetDir)) {
    Write-Host "[X] 下載失敗，請確認網路連線與 GitHub 存取權限。" -ForegroundColor Red
    Pause
    exit 1
}

# 4. 執行設定與 Skills 一鍵還原
Write-Host "`n[3/3] 正在自動還原 Antigravity 全域設定、外掛與 Skills..." -ForegroundColor Cyan
$ImportScript = Join-Path $TargetDir "scripts\import_config.ps1"

if (Test-Path $ImportScript) {
    powershell -ExecutionPolicy Bypass -File $ImportScript
} else {
    Write-Host "[X] 找不到匯入腳本：$ImportScript" -ForegroundColor Red
    Pause
    exit 1
}

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host " 🎉 恭喜！新電腦環境已全數部署完成！" -ForegroundColor Green
Write-Host " 工作區位置：$TargetDir" -ForegroundColor White
Write-Host " 包含規範：AGENTS.md、各學科教案、公文處理" -ForegroundColor White
Write-Host " 包含技能：antigravity-github-sync、tw-formal-writing 及全部外掛 Skills" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Green
Write-Host " 請開啟 Antigravity 軟體，並打開該資料夾即可開始使用！" -ForegroundColor Yellow
Write-Host "==========================================================`n" -ForegroundColor Green

Pause
