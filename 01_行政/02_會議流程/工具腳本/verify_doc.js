const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const psScript = `\uFEFF
$docxPath = "G:\\我的雲端硬碟\\91_Antigravity\\A01_學校工作\\02_會議流程\\會議紀錄\\115學年度彰化區高級中等學校免試入學工作小組第1次籌備會議紀錄.docx"
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open($docxPath)

Write-Host "Total Paragraphs:" $doc.Paragraphs.Count
$listCount = 0

foreach ($p in $doc.Paragraphs) {
    if ($p.Range.ListFormat.ListType -ne 0) {
        $listCount++
        $str = $p.Range.ListFormat.ListString
        $txt = $p.Range.Text.Trim()
        if ($txt.Length -gt 25) { $txt = $txt.Substring(0, 25) + "..." }
        Write-Host "   Level $($p.Range.ListFormat.ListLevelNumber) [$str] LeftIndent=$($p.Format.LeftIndent) FirstLineIndent=$($p.Format.FirstLineIndent) : $txt"
    }
}

Write-Host "Total Numbered Paragraphs:" $listCount

$fullText = $doc.Content.Text
$names = @("吳建鋒", "賴威東", "潘志軒", "林泓毅", "施凡昱", "陳怡誠", "盧佳信", "黃正誼", "黃宜弘", "王美智", "林嘉德")
foreach ($n in $names) {
    if ($fullText.Contains($n)) {
        Write-Host " [V] Name Found: $n"
    } else {
        Write-Host " [X] Name MISSING: $n"
    }
}

$doc.Close([ref]0)
$word.Quit()
`;

const psPath = path.join('G:\\我的雲端硬碟\\91_Antigravity\\A01_學校工作\\02_會議流程\\scripts', 'verify_run.ps1');
fs.writeFileSync(psPath, psScript, 'utf8');

try {
    const out = execSync(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, { encoding: 'utf8' });
    console.log(out);
} finally {
    if (fs.existsSync(psPath)) fs.unlinkSync(psPath);
}
