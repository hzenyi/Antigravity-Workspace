/**
 * 505 班級 Padlet 愛心即時追蹤與數據監控腳本
 * 看板：114 HT美術~Bubble , Imaginative , Story
 * 目標貼文：
 *   1. 505 畫吧! 想像力飛起來~ (ID: 3965454058)
 *   2. 505 故事大王，GO! (ID: 3965480913)
 */

const https = require('https');

const WALL_ID = '266439106';
const TARGET_POSTS = {
  '3965454058': '505 畫吧! 想像力飛起來~',
  '3965480913': '505 故事大王，GO!'
};
const TARGET_COUNT = 444;
const INTERVAL_MS = 60 * 1000; // 每 1 分鐘檢查一次

let iteration = 0;

function fetchHeartCounts() {
  return new Promise((resolve, reject) => {
    const url = `https://padlet.com/api/7/accumulated_reactions?wall_id=${WALL_ID}`;
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const attrs = json.data?.attributes || {};
          const results = {};
          for (const [id, title] of Object.entries(TARGET_POSTS)) {
            const count = attrs[id]?.totalReactionsCount ?? 0;
            results[id] = { title, count };
          }
          resolve(results);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function check() {
  iteration++;
  const timestamp = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
  try {
    const results = await fetchHeartCounts();
    console.log(`\n========================================`);
    console.log(`[ANTIGRAVITY 監控] 執行第 ${iteration} 次檢查 (${timestamp})`);
    console.log(`========================================`);

    let allReached = true;
    for (const [id, item] of Object.entries(results)) {
      const reached = item.count >= TARGET_COUNT;
      console.log(`📌 貼文 [${item.title}]`);
      console.log(`   - 貼文 ID: ${id}`);
      console.log(`   - 目前愛心數: ${item.count} 顆 ❤️  (目標: ${TARGET_COUNT} 顆)`);
      console.log(`   - 達成進度: ${((item.count / TARGET_COUNT) * 100).toFixed(1)}% ${reached ? '✅ 已達標' : '⏳ 未達標'}`);
      if (!reached) allReached = false;
    }

    if (allReached) {
      console.log(`\n🎉 恭喜！505 相關貼文愛心數已全數達到 ${TARGET_COUNT}！監控結束。`);
      process.exit(0);
    } else {
      console.log(`\n⏰ 等待 1 分鐘後進行下一次檢查... (按 Ctrl+C 可停止)`);
    }
  } catch (err) {
    console.error(`[執行第 ${iteration} 次] 抓取失敗:`, err.message);
  }
}

const isOnce = process.argv.includes('--once');

// 啟動首次檢查與定時輪詢
console.log(`🚀 啟動 505 愛心即時監控系統，每隔 1 分鐘更新一次...`);
check().then(() => {
  if (isOnce) {
    process.exit(0);
  } else {
    setInterval(check, INTERVAL_MS);
  }
});

