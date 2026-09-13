const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const workDir = "G:\\我的雲端硬碟\\91_Antigravity\\A01_學校工作\\02_會議流程\\1150921_擴大主管會議";
const targetDir = path.join(workDir, "00_彙整定稿");
const mdPath = path.join(targetDir, "1150921_教務處擴大主管會議宣導資料_定稿.md");

const docxPath = path.join(targetDir, "1150921_教務處擴大主管會議宣導資料_定稿.docx");
const pdfPath = path.join(targetDir, "1150921_教務處擴大主管會議宣導資料_定稿.pdf");

const ps1Script = `\uFEFF
$mdPath = @'
${mdPath}
'@

$docxPath = @'
${docxPath}
'@

$pdfPath = @'
${pdfPath}
'@

$lines = [System.IO.File]::ReadAllLines($mdPath, [System.Text.Encoding]::UTF8)

$word = $null
$doc = $null

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $doc = $word.Documents.Add()

    # 頁面邊界：上、下、左、右 皆為 1 公分 (28.3465 pt/cm)
    $cm = 28.3465
    $doc.PageSetup.TopMargin = 1.0 * $cm
    $doc.PageSetup.BottomMargin = 1.0 * $cm
    $doc.PageSetup.LeftMargin = 1.0 * $cm
    $doc.PageSetup.RightMargin = 1.0 * $cm
    $doc.PageSetup.Orientation = 0

    # 建立多層次清單範本 (OutlineNumbered = $true)
    $lt = $doc.ListTemplates.Add($true, "StandardSchoolHierarchy")

    # 第一層：一、二、三... (35: 繁中大寫數字「一、二、三」)
    $lvl1 = $lt.ListLevels.Item(1)
    $lvl1.NumberStyle = 35
    $lvl1.NumberFormat = "%1、"
    $lvl1.TrailingCharacter = 2 # wdTrailingSpace
    $lvl1.NumberPosition = 0
    $lvl1.TextPosition = 28
    $lvl1.TabPosition = 28
    $lvl1.Font.NameFarEast = "微軟正黑體"
    $lvl1.Font.NameAscii = "Microsoft JhengHei"
    $lvl1.Font.Size = 14

    # 第二層：1、2、3... (0: 阿拉伯數字「1、2、3」)
    $lvl2 = $lt.ListLevels.Item(2)
    $lvl2.NumberStyle = 0
    $lvl2.NumberFormat = "%2、"
    $lvl2.TrailingCharacter = 2
    $lvl2.ResetOnHigher = 1
    $lvl2.NumberPosition = 28
    $lvl2.TextPosition = 56
    $lvl2.TabPosition = 56
    $lvl2.Font.NameFarEast = "微軟正黑體"
    $lvl2.Font.NameAscii = "Microsoft JhengHei"
    $lvl2.Font.Size = 14

    # 第三層：阿拉伯數字括號（1）、（2）...
    $lvl3 = $lt.ListLevels.Item(3)
    $lvl3.NumberStyle = 0
    $lvl3.NumberFormat = "（%3）"
    $lvl3.TrailingCharacter = 2
    $lvl3.ResetOnHigher = 2
    $lvl3.NumberPosition = 56
    $lvl3.TextPosition = 84
    $lvl3.TabPosition = 84
    $lvl3.Font.NameFarEast = "微軟正黑體"
    $lvl3.Font.NameAscii = "Microsoft JhengHei"
    $lvl3.Font.Size = 14

    # 第四層：中文大寫數字括號（一）、（二）...
    $lvl4 = $lt.ListLevels.Item(4)
    $lvl4.NumberStyle = 35
    $lvl4.NumberFormat = "（%4）"
    $lvl4.TrailingCharacter = 2
    $lvl4.ResetOnHigher = 2
    $lvl4.NumberPosition = 56
    $lvl4.TextPosition = 84
    $lvl4.TabPosition = 84
    $lvl4.Font.NameFarEast = "微軟正黑體"
    $lvl4.Font.NameAscii = "Microsoft JhengHei"
    $lvl4.Font.Size = 14

    $selection = $word.Selection

    $isFirstSection = $true
    $isFirstLvl1InGroup = $true

    foreach ($line in $lines) {
        $trimmed = $line.Trim()
        if ([string]::IsNullOrWhiteSpace($trimmed)) {
            continue
        }

        # 主標題：微軟正黑體、14號字、粗體、置中、單行間距，與下方內容保留一個空白行
        if ($line.StartsWith("#")) {
            $selection.Range.ListFormat.RemoveNumbers()
            $selection.ParagraphFormat.Alignment = 1 # 置中
            $selection.ParagraphFormat.SpaceBefore = 0
            $selection.ParagraphFormat.SpaceAfter = 0
            $selection.ParagraphFormat.LineSpacingRule = 0 # 單行間距
            $selection.ParagraphFormat.LeftIndent = 0
            $selection.ParagraphFormat.FirstLineIndent = 0
            $selection.Font.NameFarEast = "微軟正黑體"
            $selection.Font.NameAscii = "Microsoft JhengHei"
            $selection.Font.Size = 14
            $selection.Font.Bold = 1
            $selection.TypeText($trimmed.Replace("#", "").Trim())
            $selection.TypeParagraph()
            
            # 標題與第一組之間保留一個空白行
            $selection.TypeParagraph()
            continue
        }

        # 各組宣導資料標題 (※)：微軟正黑體、14號字、粗體、靠左、單行間距
        if ($trimmed.StartsWith("※")) {
            # 組與組之間保留一個空白行
            if (-not $isFirstSection) {
                $selection.Range.ListFormat.RemoveNumbers()
                $selection.ParagraphFormat.LeftIndent = 0
                $selection.ParagraphFormat.FirstLineIndent = 0
                $selection.ParagraphFormat.SpaceBefore = 0
                $selection.ParagraphFormat.SpaceAfter = 0
                $selection.TypeParagraph()
            }
            $isFirstSection = $false
            $isFirstLvl1InGroup = $true

            $selection.Range.ListFormat.RemoveNumbers()
            $selection.ParagraphFormat.Alignment = 0 # 靠左
            $selection.ParagraphFormat.SpaceBefore = 0
            $selection.ParagraphFormat.SpaceAfter = 0
            $selection.ParagraphFormat.LineSpacingRule = 0 # 單行間距
            $selection.ParagraphFormat.LeftIndent = 0
            $selection.ParagraphFormat.FirstLineIndent = 0
            $selection.Font.NameFarEast = "微軟正黑體"
            $selection.Font.NameAscii = "Microsoft JhengHei"
            $selection.Font.Size = 14
            $selection.Font.Bold = 1
            $selection.TypeText($trimmed)
            $selection.TypeParagraph()
            continue
        }

        # 提案標題 (提案一、案由、提案單位、說明、辦法)
        if ($trimmed.StartsWith("提案一") -or $trimmed.StartsWith("案由：") -or $trimmed.StartsWith("提案單位：") -or $trimmed.StartsWith("說明：") -or $trimmed.StartsWith("辦法：")) {
            $selection.Range.ListFormat.RemoveNumbers()
            $selection.ParagraphFormat.Alignment = 0 # 靠左
            $selection.ParagraphFormat.SpaceBefore = 0
            $selection.ParagraphFormat.SpaceAfter = 0
            $selection.ParagraphFormat.LineSpacingRule = 0
            $selection.ParagraphFormat.LeftIndent = 0
            $selection.ParagraphFormat.FirstLineIndent = 0
            $selection.Font.NameFarEast = "微軟正黑體"
            $selection.Font.NameAscii = "Microsoft JhengHei"
            $selection.Font.Size = 14
            if ($trimmed.StartsWith("提案一") -or $trimmed.StartsWith("案由：")) {
                $selection.Font.Bold = 1
            } else {
                $selection.Font.Bold = 0
            }
            if ($trimmed.StartsWith("說明：")) {
                $isFirstLvl1InGroup = $true
            }
            $selection.TypeText($trimmed)
            $selection.TypeParagraph()
            continue
        }

        # 一般內文或自動編號處理：微軟正黑體、14號字、單行間距、常規字體
        $selection.ParagraphFormat.SpaceBefore = 0
        $selection.ParagraphFormat.SpaceAfter = 0
        $selection.ParagraphFormat.LineSpacingRule = 0 # 單行間距
        $selection.Font.NameFarEast = "微軟正黑體"
        $selection.Font.NameAscii = "Microsoft JhengHei"
        $selection.Font.Size = 14
        $selection.Font.Bold = 0

        # 檢查第一層編號：一、二、三...
        if ($trimmed -match "^[一二三四五六七八九十]+、\s*(.*)$") {
            $textOnly = $matches[1]
            $continueFlag = -not $isFirstLvl1InGroup
            $selection.Range.ListFormat.ApplyListTemplateWithLevel($lt, $continueFlag, 0, 1)
            $selection.Range.ListFormat.ListLevelNumber = 1
            $isFirstLvl1InGroup = $false
            $selection.ParagraphFormat.Alignment = 3 # 左右對齊
            $selection.ParagraphFormat.LeftIndent = 28
            $selection.ParagraphFormat.FirstLineIndent = -28
            $selection.TypeText($textOnly)
            $selection.TypeParagraph()
            continue
        }

        # 檢查第二層編號：1、2、3...
        if ($trimmed -match "^[0-9]+、\s*(.*)$") {
            $textOnly = $matches[1]
            $selection.Range.ListFormat.ApplyListTemplateWithLevel($lt, $true, 0, 2)
            $selection.Range.ListFormat.ListLevelNumber = 2
            $selection.ParagraphFormat.Alignment = 3
            $selection.ParagraphFormat.LeftIndent = 56
            $selection.ParagraphFormat.FirstLineIndent = -28
            $selection.TypeText($textOnly)
            $selection.TypeParagraph()
            continue
        }

        # 檢查第三層編號：阿拉伯數字括號（1）、（2）...
        if ($trimmed -match "^[(（][0-9]+[)）]\s*(.*)$") {
            $textOnly = $matches[1]
            $selection.Range.ListFormat.ApplyListTemplateWithLevel($lt, $true, 0, 3)
            $selection.Range.ListFormat.ListLevelNumber = 3
            $selection.ParagraphFormat.Alignment = 3
            $selection.ParagraphFormat.LeftIndent = 84
            $selection.ParagraphFormat.FirstLineIndent = -28
            $selection.TypeText($textOnly)
            $selection.TypeParagraph()
            continue
        }

        # 檢查第四層編號：中文大寫數字括號（一）、（二）...
        if ($trimmed -match "^[(（][一二三四五六七八九十]+[)）]\s*(.*)$") {
            $textOnly = $matches[1]
            $selection.Range.ListFormat.ApplyListTemplateWithLevel($lt, $true, 0, 4)
            $selection.Range.ListFormat.ListLevelNumber = 4
            $selection.ParagraphFormat.Alignment = 3
            $selection.ParagraphFormat.LeftIndent = 84
            $selection.ParagraphFormat.FirstLineIndent = -28
            $selection.TypeText($textOnly)
            $selection.TypeParagraph()
            continue
        }

        # 無編號之普通段落
        $selection.Range.ListFormat.RemoveNumbers()
        $selection.ParagraphFormat.Alignment = 3 # 左右對齊
        $selection.ParagraphFormat.LeftIndent = 0
        $selection.ParagraphFormat.FirstLineIndent = 0
        $selection.TypeText($trimmed)
        $selection.TypeParagraph()
    }

    # === 自動合規性檢查清單 (Post-Generation Verification) ===
    Write-Host "=== 開始執行 Word 產出自動檢查清單 ==="
    $verificationErrors = @()

    # 1. 檢查頁面邊界
    $topM = [math]::Round($doc.PageSetup.TopMargin / $cm, 2)
    $bottomM = [math]::Round($doc.PageSetup.BottomMargin / $cm, 2)
    $leftM = [math]::Round($doc.PageSetup.LeftMargin / $cm, 2)
    $rightM = [math]::Round($doc.PageSetup.RightMargin / $cm, 2)
    if ($topM -ne 1.0 -or $bottomM -ne 1.0 -or $leftM -ne 1.0 -or $rightM -ne 1.0) {
        $verificationErrors += "邊界不合規: Top=$topM, Bottom=$bottomM, Left=$leftM, Right=$rightM (應皆為 1.0 cm)"
    } else {
        Write-Host " [V] 邊界檢查通過：上、下、左、右 皆為 1.0 公分"
    }

    # 2. 檢查段落、自動編號與縮行
    $totalListParagraphs = 0
    foreach ($p in $doc.Paragraphs) {
        $pText = $p.Range.Text.Trim()
        if ([string]::IsNullOrWhiteSpace($pText)) { continue }

        # 字型檢查
        if ($p.Range.Font.NameFarEast -ne "微軟正黑體") {
            $verificationErrors += "段落字型非微軟正黑體: $($p.Range.Font.NameFarEast)"
        }
        # 字級檢查
        if ($p.Range.Font.Size -ne 14) {
            $verificationErrors += "段落字級非 14pt: $($p.Range.Font.Size)"
        }

        # 清單項目自動編號與縮行檢查
        if ($p.Range.ListFormat.ListType -ne 0) {
            $totalListParagraphs++
            $listStr = $p.Range.ListFormat.ListString

            # 嚴禁天干編號檢核
            if ($listStr -match "^[甲乙丙丁戊己庚辛壬癸]") {
                $verificationErrors += "嚴重格式錯誤：檢測到天干編號 '$listStr' (內容: '$($pText.Substring(0, [math]::Min(15, $pText.Length)))')，必須為中文數字 一、二、三...！"
            }

            # 列印所有編號項目
            Write-Host ("   -> 編號項目 " + $totalListParagraphs + ": 標號=[" + $listStr + "] 內容=" + $pText.Substring(0, [math]::Min(25, $pText.Length)) + "...")

            # 檢查是否有做到縮行 (凸排 FirstLineIndent 為負值且 LeftIndent > 0)
            if ($p.Format.FirstLineIndent -ge 0 -or $p.Format.LeftIndent -le 0) {
                $verificationErrors += "自動編號項目未正確縮行: '$($pText.Substring(0, [math]::Min(15, $pText.Length)))' (LeftIndent: $($p.Format.LeftIndent), FirstLineIndent: $($p.Format.FirstLineIndent))"
            }
        }
    }

    if ($totalListParagraphs -eq 0) {
        $verificationErrors += "未檢測到任何自動編號段落！"
    } else {
        Write-Host " [V] 自動編號與縮行檢查通過：共 $totalListParagraphs 個清單項目，皆具備原生自動編號且凸排縮行成功！"
    }

    if ($verificationErrors.Count -gt 0) {
        Write-Host "【檢驗失敗】發現以下格式不符合規定："
        foreach ($err in $verificationErrors) {
            Write-Host (" - " + $err)
        }
        throw "Word 產出合規性檢驗失敗，需重新修正！"
    } else {
        Write-Host "【檢驗全數通過】所有檢查項目 100% 合規（無天干編號、標號正確一、二、三、邊界1cm、微軟正黑體14pt、單行間距、自動編號與縮排縮行皆正確無誤）！"
    }

    if (Test-Path $docxPath) { Remove-Item $docxPath -Force }
    if (Test-Path $pdfPath) { Remove-Item $pdfPath -Force }

    $doc.SaveAs($docxPath, 16)
    Write-Host "DOCX_REGEN_SUCCESS"

    $doc.ExportAsFixedFormat($pdfPath, 17)
    Write-Host "PDF_REGEN_SUCCESS"

} catch {
    Write-Host ("WORD_ERROR: " + $_.Exception.Message)
} finally {
    if ($doc -ne $null) {
        $doc.Close(0)
    }
    if ($word -ne $null) {
        $word.Quit()
    }
}
`;

const ps1Path = path.join(workDir, "run_final_export.ps1");
fs.writeFileSync(ps1Path, ps1Script, 'utf8');

console.log("Exporting Word & PDF...");
try {
    const stdout = execSync(`powershell -ExecutionPolicy Bypass -File "${ps1Path}"`, { encoding: 'utf8' });
    console.log("Result:\n", stdout);
} catch (err) {
    console.error("Execution Error:", err.stdout || err.message);
} finally {
    if (fs.existsSync(ps1Path)) fs.unlinkSync(ps1Path);
}
