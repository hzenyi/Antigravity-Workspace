# ==============================================================================
# export_config.ps1
# 功能：將當前電腦本機的 Antigravity 全域設定與已安裝之外掛/Skills 匯出備份到專案庫中
# ==============================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$RepoRoot = Split-Path -Parent $PSScriptRoot
$UserProfile = $env:USERPROFILE
$SourceConfigDir = Join-Path $UserProfile ".gemini\config"
$TargetBackupDir = Join-Path $RepoRoot "_antigravity_config"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " [Antigravity] 開始匯出全域設定檔與 Skills..." -ForegroundColor Cyan
Write-Host " 來源目錄: $SourceConfigDir" -ForegroundColor Gray
Write-Host " 目的目錄: $TargetBackupDir" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not (Test-Path $SourceConfigDir)) {
    Write-Warning "未找到全域設定目錄：$SourceConfigDir"
    exit 1
}

if (-not (Test-Path $TargetBackupDir)) {
    New-Item -ItemType Directory -Path $TargetBackupDir -Force | Out-Null
}

$ConfigFiles = @("config.json", "mcp_config.json")
foreach ($file in $ConfigFiles) {
    $srcPath = Join-Path $SourceConfigDir $file
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $TargetBackupDir -Force
        Write-Host " [V] 已備份設定檔: $file" -ForegroundColor Green
    }
}

$SrcPluginsDir = Join-Path $SourceConfigDir "plugins"
$TargetPluginsDir = Join-Path $TargetBackupDir "plugins"

if (Test-Path $SrcPluginsDir) {
    Write-Host " 正在同步外掛與 Skills (plugins/)..." -ForegroundColor Yellow
    if (Test-Path $TargetPluginsDir) {
        Remove-Item -Path $TargetPluginsDir -Recurse -Force
    }
    Copy-Item -Path $SrcPluginsDir -Destination $TargetPluginsDir -Recurse -Force
    Write-Host " [V] 外掛與 Skills (plugins/) 同步完成！" -ForegroundColor Green
}

$SrcSkillsDir = Join-Path $SourceConfigDir "skills"
$TargetSkillsDir = Join-Path $TargetBackupDir "skills"

if (Test-Path $SrcSkillsDir) {
    if (Test-Path $TargetSkillsDir) {
        Remove-Item -Path $TargetSkillsDir -Recurse -Force
    }
    Copy-Item -Path $SrcSkillsDir -Destination $TargetSkillsDir -Recurse -Force
    Write-Host " [V] 自訂技能 (skills/) 同步完成！" -ForegroundColor Green
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " 全域設定與 Skills 匯出成功！" -ForegroundColor Green
Write-Host " 目錄位置：$TargetBackupDir" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
