# ==============================================================================
# sync_push.ps1
# 功能：一鍵備份設定並提交推送到遠端 Git 儲存庫
# ==============================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$RepoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $RepoRoot

# 1. 執行匯出
& "$PSScriptRoot\export_config.ps1"

# 2. 檢查 Git 變更
Write-Host "`n[Git] 正在檢查專案與設定異動..." -ForegroundColor Cyan
git status -s

$hasChanges = (git status -s)
if (-not $hasChanges) {
    Write-Host "`n[V] 沒有任何檔案變更需要提交。" -ForegroundColor Green
} else {
    Write-Host "`n[Git] 正在暫存所有變更 (git add .)..." -ForegroundColor Cyan
    git add .

    $commitMsg = Read-Host "請輸入本次 Commit 說明 (直接按 Enter 則使用自動時間戳記)"
    if ([string]::IsNullOrWhiteSpace($commitMsg)) {
        $commitMsg = "sync: 自動同步工作區與設定檔 (" + (Get-Date -Format "yyyy-MM-dd HH:mm") + ")"
    }

    Write-Host "[Git] 正在提交 (git commit)..." -ForegroundColor Cyan
    git commit -m "$commitMsg"
}

# 3. 檢查是否有遠端儲存庫 (Remote)
$remotes = git remote -v
if (-not $remotes) {
    Write-Host "`n==========================================================" -ForegroundColor Yellow
    Write-Host " 尚未設定遠端 Git 儲存庫 (Remote)！" -ForegroundColor Yellow
    Write-Host " 請在 GitHub 建立 Private 儲存庫後，執行以下指令綁定：" -ForegroundColor White
    Write-Host "   git remote add origin <您的儲存庫網址>" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor Cyan
    Write-Host "==========================================================" -ForegroundColor Yellow
} else {
    Write-Host "`n[Git] 正在推送到遠端儲存庫 (git push)..." -ForegroundColor Cyan
    git push
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n[V] 同步完成！已成功推送到遠端儲存庫。" -ForegroundColor Green
    } else {
        Write-Host "`n[X] 推送時發生問題，請確認網路連線與權限。" -ForegroundColor Red
    }
}
