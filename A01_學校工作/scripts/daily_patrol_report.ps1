# ==============================================================================
# 每日巡堂紀錄自動整理與 LINE 公告文案生成腳本
# 功能：
# 1. 自動從 Google Sheet (gid=876569101) 下載最新巡堂資料
# 2. 篩選當日（或指定日期）之異常紀錄
# 3. 大眾化項目（窗簾、電器未關）：以年級為單位彙總為「全校環境節能 LINE 公告」
# 4. 個別課堂常規（玩手機、睡覺、飲食等）：以導師為單位產出「個別 LINE 私訊」
# ==============================================================================

param (
    [string]$TargetDate = ""  # 格式如 2026/9/9 或 2026/09/09，留空則自動抓取今天
)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

if ([string]::IsNullOrWhiteSpace($TargetDate)) {
    $now = Get-Date
    # Google Sheet 內的日期格式為 2026/9/9 或 2026/09/09
    $TargetDate = "{0}/{1}/{2}" -f $now.Year, $now.Month, $now.Day
}

Write-Host ">>> 正在連線 Google Sheet 下載最新巡堂資料 (目標日期: $TargetDate)..." -ForegroundColor Cyan

$sheetUrl = "https://docs.google.com/spreadsheets/d/1q3mecMHX9kKmYwlMBOiD68aLkZQ2WTaTMKcL-s8SdQk/export?format=csv&gid=876569101"

try {
    $tempCsv = Join-Path $env:TEMP "patrol_records_latest.csv"
    $webClient = New-Object System.Net.WebClient
    $webClient.Encoding = [System.Text.Encoding]::UTF8
    $webClient.DownloadFile($sheetUrl, $tempCsv)
    $records = Import-Csv -Path $tempCsv -Encoding UTF8
} catch {
    Write-Error "連線下載或解析 Google Sheet 失敗: $_"
    exit 1
}

# 建立 51 班導師名冊對照表 (班級代號 -> 導師尊稱)
$tutorMap = @{
    "101" = "勝彥老師"; "102" = "銘仁老師"; "103" = "寶鵬老師"; "104" = "雅涵老師";
    "105" = "家明老師"; "106" = "逸峰老師"; "107" = "巧玲老師"; "108" = "宏銘老師";
    "109" = "馨旻老師"; "110" = "玉燕老師"; "111" = "美鳳老師"; "112" = "泊修老師";
    "113" = "志文老師"; "114" = "美滿老師"; "115" = "晶老師";   "116" = "迺薰老師";
    "117" = "昱陵老師";

    "201" = "南成老師"; "202" = "晉瑀老師"; "203" = "麗嬌老師"; "204" = "智聰老師";
    "205" = "秀純老師"; "206" = "椿魁老師"; "207" = "貞愛老師"; "208" = "珊慈老師";
    "209" = "政倫老師"; "210" = "明地老師"; "211" = "佩珊老師"; "212" = "唯庭老師";
    "213" = "佳信老師"; "214" = "汯緯老師"; "215" = "敏傑老師"; "216" = "盛進老師";
    "217" = "秀芳老師";

    "301" = "瑞閔老師"; "302" = "崇彥老師"; "303" = "湘豐老師"; "304" = "鳳英老師";
    "305" = "建億老師"; "306" = "孟龍老師"; "307" = "奐笙老師"; "308" = "榮聲老師";
    "309" = "學智老師"; "310" = "淑娟老師"; "311" = "世河老師"; "312" = "琛雅老師";
    "313" = "宗校老師"; "314" = "駿揚老師"; "315" = "暐仁老師"; "316" = "能義老師";
    "317" = "勝華老師"
}

# 格式化日期比對 (容許 2026/9/9 或 2026/09/09)
function Match-Date($recDate, $target) {
    if ([string]::IsNullOrWhiteSpace($recDate)) { return $false }
    try {
        $d1 = [DateTime]::Parse($recDate)
        $d2 = [DateTime]::Parse($target)
        return ($d1.Date -eq $d2.Date)
    } catch {
        return $false
    }
}

# 篩選當日紀錄
$dayRecords = $records | Where-Object { Match-Date $_.日期 $TargetDate }

if ($dayRecords.Count -eq 0) {
    Write-Host ">>> 目標日期 [$TargetDate] 尚無任何巡堂紀錄。" -ForegroundColor Yellow
    exit 0
}

Write-Host ">>> 成功取得當日共 $($dayRecords.Count) 筆紀錄，開始進行分類整理..." -ForegroundColor Green

# 容器分類
# 1. 大眾化項目 (窗簾、電器未關)
$publicGrade1 = @()
$publicGrade2 = @()
$publicGrade3 = @()

# 2. 個別導師私訊項目 (玩手機、睡覺、飲食等課堂常規)
$privateByClass = @{}

foreach ($r in $dayRecords) {
    $classId = $r.班級代號.Trim()
    $className = $r.班級名稱.Trim()
    $period = $r.節次.Trim()
    if ([string]::IsNullOrEmpty($classId)) { continue }

    $grade = $classId.Substring(0, 1)

    # 檢查是否為大眾化項目 (窗簾拉上、電器設備未關)
    $hasCurtain = ($r.教學環境 -match "窗簾" -or $r.教學環境_其他 -match "窗簾")
    $hasElectric = (-not [string]::IsNullOrWhiteSpace($r.電器設備未關) -or -not [string]::IsNullOrWhiteSpace($r.電器設備未關_其他))

    if ($hasCurtain -or $hasElectric) {
        $itemDesc = @()
        if ($hasCurtain) { $itemDesc += "窗簾拉上無法查看" }
        if ($hasElectric) {
            $eDetail = $r.電器設備未關
            if (-not [string]::IsNullOrWhiteSpace($r.電器設備未關_其他)) {
                $eDetail += " (" + $r.電器設備未關_其他 + ")"
            }
            $itemDesc += ("電器未關：" + $eDetail)
        }

        $entry = "$className（$period）：" + ($itemDesc -join "、")
        if ($grade -eq "1") { $publicGrade1 += $entry }
        elseif ($grade -eq "2") { $publicGrade2 += $entry }
        elseif ($grade -eq "3") { $publicGrade3 += $entry }
    }

    # 檢查是否有課堂常規項目 (玩手機、睡覺、飲食等)
    $studyIssue = @()
    if ($r.學生上課情形 -match "瞌睡|睡覺" -or $r.學生上課情形_其他 -match "瞌睡|睡覺" -or $r.教師教學情形_其他 -match "睡覺") {
        $detail = $r.學生上課情形_其他
        if ([string]::IsNullOrWhiteSpace($detail)) { $detail = "學生打瞌睡/睡覺" }
        $studyIssue += $detail
    }
    if ($r.學生上課情形 -match "手機" -or $r.學生上課情形_其他 -match "手機") {
        $detail = $r.學生上課情形_其他
        if ([string]::IsNullOrWhiteSpace($detail)) { $detail = "學生課堂使用手機" }
        $studyIssue += $detail
    }
    if ($r.學生上課情形 -match "便當|吃" -or $r.學生上課情形_其他 -match "便當|吃") {
        $detail = $r.學生上課情形_其他
        if ([string]::IsNullOrWhiteSpace($detail)) { $detail = "課堂違規飲食" }
        $studyIssue += $detail
    }

    if ($studyIssue.Count -gt 0) {
        if (-not $privateByClass.ContainsKey($classId)) {
            $privateByClass[$classId] = @{
                ClassName = $className
                Entries = @()
            }
        }
        $privateByClass[$classId].Entries += ("$period：" + ($studyIssue -join "；"))
    }
}

$outputReport = @()

$outputReport += "=================================================================="
$outputReport += "【📢 今日巡堂大眾化環境與節能提醒｜依年級彙總】"
$outputReport += "巡查日期：$TargetDate"
$outputReport += "提醒各班導師及任課老師留意，離班請隨手關閉電源，除投影教學外請維持採光通風："
$outputReport += ""

if ($publicGrade1.Count -gt 0) {
    $outputReport += "【高一年級】"
    foreach ($item in $publicGrade1) { $outputReport += "• $item" }
    $outputReport += ""
}

if ($publicGrade2.Count -gt 0) {
    $outputReport += "【高二年級】"
    foreach ($item in $publicGrade2) { $outputReport += "• $item" }
    $outputReport += ""
}

if ($publicGrade3.Count -gt 0) {
    $outputReport += "【高三年級】"
    foreach ($item in $publicGrade3) { $outputReport += "• $item" }
    $outputReport += ""
}

if ($publicGrade1.Count -eq 0 -and $publicGrade2.Count -eq 0 -and $publicGrade3.Count -eq 0) {
    $outputReport += "今日全校各班環境採光通風良好，電器設備皆已依規定關閉，感謝全體師生！"
    $outputReport += ""
}

$outputReport += "感謝各位老師共同維護校園安全與用電品質！"
$outputReport += "=================================================================="
$outputReport += ""
$outputReport += "【📱 學生課堂常規提醒｜各班導師個別私訊文案】"
$outputReport += ""

if ($privateByClass.Keys.Count -eq 0) {
    $outputReport += "今日無個別學生違規（手機、睡覺、飲食）紀錄。"
} else {
    foreach ($cid in ($privateByClass.Keys | Sort-Object)) {
        $cData = $privateByClass[$cid]
        $tName = if ($tutorMap.ContainsKey($cid)) { $tutorMap[$cid] } else { "導師" }
        
        $outputReport += "--------------------------------------------------"
        $outputReport += "【📋 巡堂紀錄提醒｜$cid $($cData.ClassName)】"
        $outputReport += ""
        $outputReport += "$tName" + "好，提供今日巡堂回報紀錄，請協助留意與宣導："
        $outputReport += ""
        foreach ($e in $cData.Entries) {
            $outputReport += "• $e"
        }
        $outputReport += ""
        $outputReport += "提醒說明：請老師協助向同學宣導課堂常規與專注度，感謝老師！"
        $outputReport += "--------------------------------------------------"
        $outputReport += ""
    }
}

$finalText = $outputReport -join "`r`n"
Write-Output $finalText

# 自動存檔至本機備份
$outDir = "d:\91_Antigravity\A01_學校工作\01_公文處理\產出"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }
$cleanDate = [DateTime]::Parse($TargetDate).ToString("yyyyMMdd")
$outPath = Join-Path $outDir "巡堂日報_$cleanDate.txt"
[System.IO.File]::WriteAllText($outPath, $finalText, [System.Text.Encoding]::UTF8)
Write-Host ">>> 日報已同步備份至: $outPath" -ForegroundColor Cyan
