// سكربت Node.js لتحديث data/stocks.json و data/news.json
// ملاحظات:
// - يقوم المثال أدناه بجلب بيانات وهميّة/افتراضية.
// - استبدل أقسام fetch بـ API حقيقي عند توفره.
// - يفترض تشغيله في Node 18+ (fetch متاحة)، أو يمكنك تثبيت node-fetch.

import fs from 'fs/promises';
import path from 'path';

const outDir = path.resolve('data');

async function fetchStocks() {
  try {
    // استبدل الروابط أدناه بواجهة حقيقية
    return [
      {
        name: "مصرف بغداد",
        ticker: "BBOB",
        close: 1.40,
        entry: 1.30,
        stop: 1.20,
        target1: 1.45,
        target2: 1.60
      },
      {
        name: "شركة زانوب",
        ticker: "ZANP",
        close: 0.85,
        entry: 0.80,
        stop: 0.75,
        target1: 0.95,
        target2: 1.10
      }
    ];
  } catch (err) {
    console.error('fetchStocks failed', err);
    return [];
  }
}

async function fetchNews() {
  try {
    return [
      { title: "ارتفاع أسعار النفط يدعم الأسهم العراقية", link: "https://example.com/news1" },
      { title: "تقارير اقتصادية تبعث على التفاؤل في البورصة", link: "https://example.com/news2" }
    ];
  } catch (err) {
    console.error('fetchNews failed', err);
    return [];
  }
}

async function main() {
  try {
    await fs.mkdir(outDir, { recursive: true });
    const [stocks, news] = await Promise.all([fetchStocks(), fetchNews()]);
    await fs.writeFile(path.join(outDir, 'stocks.json'), JSON.stringify(stocks, null, 2), 'utf8');
    await fs.writeFile(path.join(outDir, 'news.json'), JSON.stringify(news, null, 2), 'utf8');
    console.log('Data files updated.');
  } catch (err) {
    console.error('Failed to update data files', err);
    process.exit(1);
  }
}

main();