/**
 * Google Calendar 直寫腳本 (無依賴原生 Node.js 實作)
 * 支援從 tokens.json 自動讀取 access_token，過期時自動透過 refresh_token 換證
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const CONFIG_DIR = path.join(process.env.USERPROFILE || process.env.HOME, '.config', 'google-calendar-mcp');
const KEYS_PATH = path.join(CONFIG_DIR, 'gcp-oauth.keys.json');
const TOKENS_PATH = path.join(CONFIG_DIR, 'tokens.json');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

function httpsPost(urlStr, headers, bodyData) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: headers
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ statusCode: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ statusCode: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);
    if (bodyData) req.write(bodyData);
    req.end();
  });
}

async function getValidAccessToken() {
  if (!fs.existsSync(KEYS_PATH) || !fs.existsSync(TOKENS_PATH)) {
    throw new Error('找不到 OAuth 憑證或 tokens.json，請確認已放置於 ' + CONFIG_DIR);
  }

  const keys = readJson(KEYS_PATH);
  const keyInfo = keys.installed || keys.web;
  const tokens = readJson(TOKENS_PATH);
  const accountTokens = tokens.normal || tokens;

  // 檢查是否過期 (提早 60 秒緩衝)
  const now = Date.now();
  if (accountTokens.expiry_date && now < accountTokens.expiry_date - 60000 && accountTokens.access_token) {
    return accountTokens.access_token;
  }

  // 若已過期，使用 refresh_token 刷新
  if (!accountTokens.refresh_token) {
    throw new Error('缺少 refresh_token，無法自動換發 access_token');
  }

  const postParams = new URLSearchParams({
    client_id: keyInfo.client_id,
    client_secret: keyInfo.client_secret,
    refresh_token: accountTokens.refresh_token,
    grant_type: 'refresh_token'
  }).toString();

  const res = await httpsPost('https://oauth2.googleapis.com/token', {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postParams)
  }, postParams);

  if (res.data && res.data.access_token) {
    accountTokens.access_token = res.data.access_token;
    accountTokens.expiry_date = Date.now() + (res.data.expires_in * 1000);
    if (tokens.normal) {
      tokens.normal = accountTokens;
    }
    writeJson(TOKENS_PATH, tokens);
    return accountTokens.access_token;
  } else {
    throw new Error('刷新 Token 失敗: ' + JSON.stringify(res.data));
  }
}

async function createCalendarEvent(eventData, calendarId = 'primary') {
  const token = await getValidAccessToken();
  const body = JSON.stringify(eventData);

  const res = await httpsPost(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body)
    },
    body
  );

  if (res.data && res.data.htmlLink) {
    return res.data;
  } else {
    throw new Error('建立行程失敗: ' + JSON.stringify(res.data || res.raw));
  }
}

// 支援命令列傳入 JSON 參數或 JSON 檔案
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node add_calendar_event.js <json-string-or-json-file>');
    process.exit(1);
  }

  let eventPayload;
  if (fs.existsSync(args[0])) {
    eventPayload = readJson(args[0]);
  } else {
    eventPayload = JSON.parse(args[0]);
  }

  try {
    const result = await createCalendarEvent(eventPayload);
    console.log('SUCCESS_LINK:' + result.htmlLink);
    console.log('EVENT_ID:' + result.id);
  } catch (err) {
    console.error('ERROR:' + err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { createCalendarEvent, getValidAccessToken };
