/**
 * 每日巡堂紀錄自動整理與 LINE 公告文案生成工具 (Node.js 引擎)
 * 
 * 功能：
 * 1. 自動從 Google Sheet (gid=876569101) 抓取最新巡堂資料
 * 2. 篩選當日（或指定日期）之異常紀錄
 * 3. 大眾化項目（窗簾、電器未關）：以年級為單位彙總為「全校環境節能 LINE 公告」
 * 4. 個別課堂常規（玩手機、睡覺、飲食等）：以導師為單位產出「個別 LINE 私訊」
 */

const fs = require('fs');
const path = require('path');

const CSV_URL = 'https://docs.google.com/spreadsheets/d/1q3mecMHX9kKmYwlMBOiD68aLkZQ2WTaTMKcL-s8SdQk/export?format=csv&gid=876569101';

const TUTOR_MAP = {
  '101': '勝彥老師', '102': '銘仁老師', '103': '寶鵬老師', '104': '雅涵老師',
  '105': '家明老師', '106': '逸峰老師', '107': '巧玲老師', '108': '宏銘老師',
  '109': '馨旻老師', '110': '玉燕老師', '111': '美鳳老師', '112': '泊修老師',
  '113': '志文老師', '114': '美滿老師', '115': '晶老師',   '116': '迺薰老師',
  '117': '昱陵老師',

  '201': '南成老師', '202': '晉瑀老師', '203': '麗嬌老師', '204': '智聰老師',
  '205': '秀純老師', '206': '椿魁老師', '207': '貞愛老師', '208': '珊慈老師',
  '209': '政倫老師', '210': '明地老師', '211': '佩珊老師', '212': '唯庭老師',
  '213': '佳信老師', '214': '汯緯老師', '215': '敏傑老師', '216': '盛進老師',
  '217': '秀芳老師',

  '301': '瑞閔老師', '302': '崇彥老師', '303': '湘豐老師', '304': '鳳英老師',
  '305': '建億老師', '306': '孟龍老師', '307': '奐笙老師', '308': '榮聲老師',
  '309': '學智老師', '310': '淑娟老師', '311': '世河老師', '312': '琛雅老師',
  '313': '宗校老師', '314': '駿揚老師', '315': '暐仁老師', '316': '能義老師',
  '317': '勝華老師'
};

function parseCSVLine(text) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function parseCSV(csvText) {
  const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = vals[idx] || '';
    });
    rows.push(row);
  }
  return rows;
}

function normalizeDate(dStr) {
  if (!dStr) return '';
  const parts = dStr.split(/[\/\-]/);
  if (parts.length >= 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const d = parseInt(parts[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      return `${y}/${m}/${d}`;
    }
  }
  return dStr.trim();
}

async function run() {
  const targetDateArg = process.argv[2];
  let targetDate = '';
  if (targetDateArg) {
    targetDate = normalizeDate(targetDateArg);
  } else {
    const now = new Date();
    targetDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  }

  console.log(`>>> 正在連線 Google Sheet 抓取巡堂紀錄 (目標日期: ${targetDate})...`);
  const resp = await fetch(CSV_URL);
  if (!resp.ok) {
    throw new Error(`無法下載 Google Sheet: HTTP ${resp.status}`);
  }
  const csvText = await resp.text();
  const allRecords = parseCSV(csvText);

  const dayRecords = allRecords.filter(r => normalizeDate(r['日期']) === targetDate);

  if (dayRecords.length === 0) {
    console.log(`>>> 目標日期 [${targetDate}] 尚無巡堂紀錄。`);
    return;
  }

  console.log(`>>> 成功讀取當日共 ${dayRecords.length} 筆巡堂紀錄，開始智能分類...\n`);

  const publicG1 = [];
  const publicG2 = [];
  const publicG3 = [];
  const privateMap = {};

  for (const r of dayRecords) {
    const classId = (r['班級代號'] || '').trim();
    const className = (r['班級名稱'] || '').trim();
    const period = (r['節次'] || '').trim();
    if (!classId) continue;

    const grade = classId[0];
    const env = (r['教學環境'] || '') + ' ' + (r['教學環境_其他'] || '');
    const elec = (r['電器設備未關'] || '') + (r['電器設備未關_其他'] ? ` (${r['電器設備未關_其他']})` : '');

    const hasCurtain = env.includes('窗簾');
    const hasElec = elec.trim().length > 0;

    if (hasCurtain || hasElec) {
      const items = [];
      if (hasCurtain) items.push('窗簾拉上無法查看');
      if (hasElec) items.push(`電器未關：${elec.trim()}`);
      const line = `${className}（${period}）：${items.join('、')}`;
      if (grade === '1') publicG1.push(line);
      else if (grade === '2') publicG2.push(line);
      else if (grade === '3') publicG3.push(line);
    }

    const stuIssues = [];
    const stuMain = (r['學生上課情形'] || '').trim();
    const stuOther = (r['學生上課情形_其他'] || '').trim();
    const teaOther = (r['教師教學情形_其他'] || '').trim();

    // 判斷睡覺／打瞌睡
    if (stuMain.includes('打瞌睡') || /睡覺/.test(stuMain) || /睡覺/.test(teaOther)) {
      if (stuOther.includes('睡')) {
        stuIssues.push(stuOther);
      } else if (teaOther.includes('睡')) {
        stuIssues.push(teaOther);
      } else {
        stuIssues.push('同學打瞌睡/睡覺');
      }
    }

    // 判斷手機
    if (stuMain.includes('手機') || stuOther.includes('手機')) {
      if (stuOther.includes('手機')) {
        stuIssues.push(stuOther);
      } else {
        stuIssues.push('同學課堂使用手機');
      }
    }

    // 判斷飲食
    if (stuMain.includes('便當') || stuOther.includes('便當') || stuOther.includes('吃')) {
      stuIssues.push(stuOther || '課堂違規飲食');
    }

    // 去除重複項目
    const uniqueIssues = Array.from(new Set(stuIssues));

    if (uniqueIssues.length > 0) {
      if (!privateMap[classId]) {
        privateMap[classId] = { className, entries: [] };
      }
      privateMap[classId].entries.push(`${period}：${uniqueIssues.join('；')}`);
    }
  }

  const out = [];

  out.push('==================================================================');
  out.push('【📢 今日巡堂大眾化環境與節能提醒｜依年級彙總】');
  out.push(`巡查日期：${targetDate}`);
  out.push('提醒各班導師及任課老師留意，離班請隨手關閉電源，除投影教學外請維持採光通風：\n');

  if (publicG1.length > 0) {
    out.push('【高一年級】');
    publicG1.forEach(i => out.push(`• ${i}`));
    out.push('');
  }
  if (publicG2.length > 0) {
    out.push('【高二年級】');
    publicG2.forEach(i => out.push(`• ${i}`));
    out.push('');
  }
  if (publicG3.length > 0) {
    out.push('【高三年級】');
    publicG3.forEach(i => out.push(`• ${i}`));
    out.push('');
  }
  if (publicG1.length === 0 && publicG2.length === 0 && publicG3.length === 0) {
    out.push('今日全校各班採光通風良好，電器設備皆已落實關閉，感謝全體師生！\n');
  }
  out.push('感謝各位老師共同維護校園安全與用電品質！');
  out.push('==================================================================\n');

  out.push('【📱 學生課堂常規提醒｜各班導師個別私訊文案】\n');

  const cids = Object.keys(privateMap).sort();
  if (cids.length === 0) {
    out.push('今日無個別學生違規（手機、睡覺、飲食）紀錄。\n');
  } else {
    for (const cid of cids) {
      const cData = privateMap[cid];
      const tutorName = TUTOR_MAP[cid] || '導師';
      out.push('--------------------------------------------------');
      out.push(`【📋 巡堂紀錄提醒｜${cid} ${cData.className}】\n`);
      out.push(`${tutorName}好，提供今日巡堂回報紀錄，請協助留意與宣導：\n`);
      for (const e of cData.entries) {
        out.push(`• ${e}`);
      }
      out.push('\n提醒說明：請老師協助向同學宣導課堂常規與專注度，感謝老師！');
      out.push('--------------------------------------------------\n');
    }
  }

  const resultText = out.join('\n');
  console.log(resultText);

  // 存檔備份
  const outDir = 'd:/91_Antigravity/A01_學校工作/01_公文處理/產出';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const dParts = targetDate.split('/');
  const yyyy = dParts[0];
  const mm = dParts[1].padStart(2, '0');
  const dd = dParts[2].padStart(2, '0');
  const cleanD = `${yyyy}${mm}${dd}`;
  const outPath = path.join(outDir, `巡堂日報_${cleanD}.txt`);
  fs.writeFileSync(outPath, resultText, 'utf8');
  console.log(`>>> 日報已同步備份至: ${outPath}`);
}

run().catch(err => {
  console.error('執行發生錯誤:', err);
  process.exit(1);
});
