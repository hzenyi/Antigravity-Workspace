<#
.SYNOPSIS
    教務處會議資料夾自動建立工具
.DESCRIPTION
    依據教務處會議資料彙整標準作業程序，建立本次會議專屬目錄與各組獨立子目錄。
.PARAMETER MeetingName
    會議名稱或資料夾名稱（預設為「YYYYMMDD_會議名稱」）
.PARAMETER TargetPath
    欲建立會議目錄之上層路徑（預設為當前執行路徑）
.EXAMPLE
    .\建立會議資料夾.ps1 -MeetingName "114學年度第1學期第2次行政會報"
#>

param (
    [string]$MeetingName = "",
    [string]$TargetPath = "."
)

# 若未提供會議名稱，提示輸入
if ([string]::IsNullOrWhiteSpace($MeetingName)) {
    $today = Get-Date -Format "yyyyMMdd"
    $MeetingName = Read-Host "請輸入會議名稱 (例如：${today}_行政會報)"
    if ([string]::IsNullOrWhiteSpace($MeetingName)) {
        $MeetingName = "${today}_教務處會議資料"
    }
}

$meetingDir = Join-Path -Path $TargetPath -ChildPath $MeetingName

# 定義標準子目錄清單（嚴格依規定順序命名）
$subDirs = @(
    "00_彙整定稿",
    "01_教學組",
    "02_註冊組",
    "03_設備組",
    "04_課務組",
    "05_實驗研究組"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " 🏫 開始建立教務處會議工作目錄" -ForegroundColor Cyan
Write-Host " 目標目錄: $meetingDir" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

# 建立主目錄
if (-not (Test-Path -Path $meetingDir)) {
    New-Item -ItemType Directory -Path $meetingDir -Force | Out-Null
    Write-Host "[建立] 主目錄: $MeetingName" -ForegroundColor Green
} else {
    Write-Host "[已存在] 主目錄: $MeetingName" -ForegroundColor DarkGray
}

# 建立各子目錄
foreach ($sub in $subDirs) {
    $subPath = Join-Path -Path $meetingDir -ChildPath $sub
    if (-not (Test-Path -Path $subPath)) {
        New-Item -ItemType Directory -Path $subPath -Force | Out-Null
        Write-Host "  ├── [建立] $sub" -ForegroundColor Green
    } else {
        Write-Host "  ├── [已存在] $sub" -ForegroundColor DarkGray
    }
}

Write-Host "`n✅ 所有資料夾已依規定順序建立完畢！" -ForegroundColor Green
Write-Host "請將各組長回傳之原始資料依組別放置於對應子資料夾中。`n" -ForegroundColor White
