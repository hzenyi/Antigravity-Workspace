# ==============================================================================
# import_config.ps1
# 功能：將專案庫中的 _antigravity_config 設定與外掛/Skills 匯入到當前電腦的 Antigravity 中
# ==============================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$RepoRoot = Split-Path -Parent $PSScriptRoot
$SourceBackupDir = Join-Path $RepoRoot "_antigravity_config"
$UserProfile = $env:USERPROFILE
$TargetConfigDir = Join-Path $UserProfile ".gemini\config"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " [Antigravity] 開始匯入全域設定檔與 Skills..." -ForegroundColor Cyan
Write-Host " 來源備份: $SourceBackupDir" -ForegroundColor Gray
Write-Host " 目的設定: $TargetConfigDir" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not (Test-Path $SourceBackupDir)) {
    Write-Error "找不到備份目錄：$SourceBackupDir，請先確認已執行 git pull 取得最新檔案。"
    exit 1
}

# 若目的目錄存在，先進行安全備份
if (Test-Path $TargetConfigDir) {
    $Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $BackupDir = Join-Path $UserProfile (".gemini\config_backup_" + $Timestamp)
    Write-Host " 偵測到現有設定，建立安全備份至: $BackupDir" -ForegroundColor Yellow
    Copy-Item -Path $TargetConfigDir -Destination $BackupDir -Recurse -Force
} else {
    New-Item -ItemType Directory -Path $TargetConfigDir -Force | Out-Null
}

$ConfigFiles = @("config.json", "mcp_config.json")
foreach ($file in $ConfigFiles) {
    $srcPath = Join-Path $SourceBackupDir $file
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $TargetConfigDir -Force
        Write-Host " [V] 已還原設定檔: $file" -ForegroundColor Green
    }
}

$SrcPluginsDir = Join-Path $SourceBackupDir "plugins"
$TargetPluginsDir = Join-Path $TargetConfigDir "plugins"

if (Test-Path $SrcPluginsDir) {
    Write-Host " 正在還原外掛與 Skills (plugins/)..." -ForegroundColor Yellow
    if (Test-Path $TargetPluginsDir) {
        Remove-Item -Path $TargetPluginsDir -Recurse -Force
    }
    Copy-Item -Path $SrcPluginsDir -Destination $TargetPluginsDir -Recurse -Force
    Write-Host " [V] 外掛與 Skills (plugins/) 還原完成！" -ForegroundColor Green
}

$SrcSkillsDir = Join-Path $SourceBackupDir "skills"
$TargetSkillsDir = Join-Path $TargetConfigDir "skills"

if (Test-Path $SrcSkillsDir) {
    if (Test-Path $TargetSkillsDir) {
        Remove-Item -Path $TargetSkillsDir -Recurse -Force
    }
    Copy-Item -Path $SrcSkillsDir -Destination $TargetSkillsDir -Recurse -Force
    Write-Host " [V] 自訂技能 (skills/) 還原完成！" -ForegroundColor Green
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " 全域設定與 Skills 已順利匯入至這台電腦！" -ForegroundColor Green
Write-Host " 請重新啟動 Antigravity 以載入最新設定。" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
