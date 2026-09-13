# ==============================================================================
# export_config.ps1
# 功能：將當前電腦本機的 Antigravity 全域設定與專案/全域 Skills 匯出備份到專案庫中
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
    Write-Host " 正在同步外掛 (plugins/)..." -ForegroundColor Yellow
    if (-not (Test-Path $TargetPluginsDir)) {
        New-Item -ItemType Directory -Path $TargetPluginsDir -Force | Out-Null
    }
    Copy-Item -Path "$SrcPluginsDir\*" -Destination $TargetPluginsDir -Recurse -Force
    Write-Host " [V] 外掛 (plugins/) 同步完成！" -ForegroundColor Green
}

# 雙重同步 Skills：整合專案庫 .agents/skills 與全域 ~/.gemini/config/skills
$TargetSkillsDir = Join-Path $TargetBackupDir "skills"
$WorkspaceSkillsDir = Join-Path $RepoRoot ".agents\skills"
$SrcSkillsDir = Join-Path $SourceConfigDir "skills"

if (-not (Test-Path $TargetSkillsDir)) {
    New-Item -ItemType Directory -Path $TargetSkillsDir -Force | Out-Null
}

# 1. 將專案工作區的 .agents/skills 匯入備份庫
if (Test-Path $WorkspaceSkillsDir) {
    Write-Host " 正在備份工作區技能 (.agents/skills/)..." -ForegroundColor Yellow
    Copy-Item -Path "$WorkspaceSkillsDir\*" -Destination $TargetSkillsDir -Recurse -Force
}

# 2. 將本機全域技能匯入備份庫
if (Test-Path $SrcSkillsDir) {
    Write-Host " 正在備份全域技能 (~/.gemini/config/skills/)..." -ForegroundColor Yellow
    Copy-Item -Path "$SrcSkillsDir\*" -Destination $TargetSkillsDir -Recurse -Force
}

# 3. 確保本機全域也具備備份庫中的全量技能
if (Test-Path $TargetSkillsDir) {
    if (-not (Test-Path $SrcSkillsDir)) {
        New-Item -ItemType Directory -Path $SrcSkillsDir -Force | Out-Null
    }
    Copy-Item -Path "$TargetSkillsDir\*" -Destination $SrcSkillsDir -Recurse -Force
}

Write-Host " [V] Skills 技能庫雙向完整同步完成！" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " 全域設定與 Skills 匯出成功！" -ForegroundColor Green
Write-Host " 目錄位置：$TargetBackupDir" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

