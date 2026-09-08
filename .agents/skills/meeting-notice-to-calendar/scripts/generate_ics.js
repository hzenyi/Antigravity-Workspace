/**
 * iCalendar (.ics) 檔案生成器 - 零依賴版本
 * 支援 RFC 5545 標準格式，預設 Asia/Taipei 時區
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function formatIcsDateTime(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    throw new Error(`無效的時間格式: ${dateStr}`);
  }
  
  const pad = (n) => String(n).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

function formatUtcDateTime(d = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

function escapeText(str = '') {
  return str
    .replace(/\\r\\n|\\n|\\r|\r\n|\n|\r/g, '\n') // 先統一為真實換行
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n'); // 轉換為 RFC 5545 的 \n
}

function generateIcs({
  title,
  startTime,
  endTime,
  location = '',
  description = '',
  organizer = '',
  alarmMinutes = 15,
  outputPath
}) {
  if (!title || !startTime) {
    throw new Error('必須提供會議標題 (title) 與開始時間 (startTime)');
  }

  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : new Date(start.getTime() + 60 * 60 * 1000);

  const startStr = formatIcsDateTime(start);
  const endStr = formatIcsDateTime(end);
  const nowUtc = formatUtcDateTime();
  const uid = crypto.randomUUID();

  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Antigravity//Meeting Notice to Calendar//TW',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Taipei',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+0800',
    'TZOFFSETTO:+0800',
    'TZNAME:CST',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART;TZID=Asia/Taipei:${startStr}`,
    `DTEND;TZID=Asia/Taipei:${endStr}`,
    `SUMMARY:${escapeText(title)}`,
  ];

  if (location) {
    icsContent.push(`LOCATION:${escapeText(location)}`);
  }

  if (description) {
    icsContent.push(`DESCRIPTION:${escapeText(description)}`);
  }

  if (organizer) {
    icsContent.push(`ORGANIZER;CN=${escapeText(organizer)}:MAILTO:noreply@school.edu.tw`);
  }

  if (alarmMinutes && alarmMinutes > 0) {
    icsContent.push(
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: ${escapeText(title)}`,
      `TRIGGER:-PT${alarmMinutes}M`,
      'END:VALARM'
    );
  }

  icsContent.push('END:VEVENT');
  icsContent.push('END:VCALENDAR');

  const finalString = icsContent.join('\r\n') + '\r\n';

  const targetPath = outputPath || path.join(process.cwd(), `${title.replace(/[\\/:*?"<>|]/g, '_')}.ics`);
  fs.writeFileSync(targetPath, finalString, 'utf8');
  return targetPath;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const params = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    const val = args[i + 1];
    params[key] = val;
  }

  try {
    const savedPath = generateIcs({
      title: params.title || '會議行程',
      startTime: params.start || new Date().toISOString(),
      endTime: params.end,
      location: params.location,
      description: params.desc,
      alarmMinutes: params.alarm ? parseInt(params.alarm, 10) : 15,
      outputPath: params.output
    });
    console.log(`ICS 檔案建立成功: ${savedPath}`);
  } catch (err) {
    console.error(`建立 ICS 失敗: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { generateIcs };
