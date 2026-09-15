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

# 1. 還原設定檔與動態調整
$ConfigFile = Join-Path $SourceBackupDir "config.json"
$targetConfigFile = Join-Path $TargetConfigDir "config.json"
if (Test-Path $ConfigFile) {
    if (Test-Path $targetConfigFile) {
        try {
            $localConfig = Get-Content $targetConfigFile -Raw -Encoding UTF8 | ConvertFrom-Json
            $backupConfig = Get-Content $ConfigFile -Raw -Encoding UTF8 | ConvertFrom-Json
            
            # 保留本機主機名稱
            if ($localConfig.userSettings.remoteControlHostname) {
                $backupConfig.userSettings.remoteControlHostname = $localConfig.userSettings.remoteControlHostname
            }
            
            # 聯集整併權限白名單 (Union Permission Grants)
            $localAllows = @($localConfig.userSettings.globalPermissionGrants.allow)
            $backupAllows = @($backupConfig.userSettings.globalPermissionGrants.allow)
            $mergedAllows = ($localAllows + $backupAllows) | Select-Object -Unique
            $backupConfig.userSettings.globalPermissionGrants.allow = $mergedAllows
            
            $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
            $jsonContent = $backupConfig | ConvertTo-Json -Depth 10
            [System.IO.File]::WriteAllText($targetConfigFile, $jsonContent, $utf8NoBom)
            Write-Host " [V] 已還原設定檔（智慧保留本機主機名稱與權限白名單）: config.json" -ForegroundColor Green
        } catch {
            Copy-Item -Path $ConfigFile -Destination $TargetConfigDir -Force
            Write-Host " [V] 已還原設定檔: config.json" -ForegroundColor Green
        }
    } else {
        Copy-Item -Path $ConfigFile -Destination $TargetConfigDir -Force
        Write-Host " [V] 已還原設定檔: config.json" -ForegroundColor Green
    }
}

$McpFile = Join-Path $SourceBackupDir "mcp_config.json"
if (Test-Path $McpFile) {
    # 讀取並動態置換使用者路徑為當前電腦之 USERPROFILE
    $mcpRaw = Get-Content $McpFile -Raw -Encoding UTF8
    $escapedUser = $UserProfile.Replace('\', '\\')
    # 將任何形如 C:\\Users\\...\\.config\\google-calendar-mcp 動態適應為當前本機路徑
    $mcpFixed = [regex]::Replace($mcpRaw, 'C:\\\\Users\\\\[^\\]+\\\\.config\\\\google-calendar-mcp', "$escapedUser\\.config\\google-calendar-mcp")
    $targetMcpPath = Join-Path $TargetConfigDir "mcp_config.json"
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($targetMcpPath, $mcpFixed, $utf8NoBom)
    
    # 確保 Google 日曆金鑰資料夾存在
    $calConfigDir = Join-Path $UserProfile ".config\google-calendar-mcp"
    if (-not (Test-Path $calConfigDir)) {
        New-Item -ItemType Directory -Path $calConfigDir -Force | Out-Null
    }
    Write-Host " [V] 已還原並動態調整 MCP 設定: mcp_config.json" -ForegroundColor Green
}

# 2. 還原外掛 plugins/
$SrcPluginsDir = Join-Path $SourceBackupDir "plugins"
$TargetPluginsDir = Join-Path $TargetConfigDir "plugins"

if (Test-Path $SrcPluginsDir) {
    Write-Host " 正在還原外掛 (plugins/)..." -ForegroundColor Yellow
    if (-not (Test-Path $TargetPluginsDir)) {
        New-Item -ItemType Directory -Path $TargetPluginsDir -Force | Out-Null
    }
    $null = robocopy $SrcPluginsDir $TargetPluginsDir /E /MT:16 /NP /R:1 /W:1 /NDL /NFL /NJH /NJS
    Write-Host " [V] 外掛 (plugins/) 還原完成！" -ForegroundColor Green
}

# 3. 還原自訂技能 skills/（同步至全域 ~/.gemini/config/skills 與專案 .agents/skills）
$SrcSkillsDir = Join-Path $SourceBackupDir "skills"
$TargetSkillsDir = Join-Path $TargetConfigDir "skills"
$WorkspaceSkillsDir = Join-Path $RepoRoot ".agents\skills"

if (Test-Path $SrcSkillsDir) {
    Write-Host " 正在還原技能庫 (skills/)..." -ForegroundColor Yellow
    if (-not (Test-Path $TargetSkillsDir)) {
        New-Item -ItemType Directory -Path $TargetSkillsDir -Force | Out-Null
    }
    $null = robocopy $SrcSkillsDir $TargetSkillsDir /E /MT:16 /NP /R:1 /W:1 /NDL /NFL /NJH /NJS

    if (-not (Test-Path $WorkspaceSkillsDir)) {
        New-Item -ItemType Directory -Path $WorkspaceSkillsDir -Force | Out-Null
    }
    $null = robocopy $SrcSkillsDir $WorkspaceSkillsDir /E /MT:16 /NP /R:1 /W:1 /NDL /NFL /NJH /NJS
    Write-Host " [V] 自訂技能 (skills/) 已同步還原至全域與專案工作區！" -ForegroundColor Green
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " 全域設定與 Skills 已順利匯入至這台電腦！" -ForegroundColor Green
Write-Host " 請重新啟動 Antigravity 以載入最新設定。" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
