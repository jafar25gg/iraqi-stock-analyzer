// واجهة المتصفح: تحمّل data/stocks.json و data/news.json وتعرضها
async function loadData() {
  try {
    const [stocksRes, newsRes] = await Promise.all([
      fetch('data/stocks.json'),
      fetch('data/news.json')
    ]);
    if (!stocksRes.ok || !newsRes.ok) throw new Error('فشل تحميل ملفات البيانات');
    const stocks = await stocksRes.json();
    const news = await newsRes.json();
    renderNews(news);
    renderStocks(stocks);
  } catch (err) {
    console.error(err);
    const container = document.getElementById('stocks');
    container.innerHTML = '<div class="card"><p class="muted">تعذّر تحميل البيانات. تحقق من ملفات data/*.json</p></div>';
  }
}

function renderNews(list) {
  const container = document.getElementById('news');
  container.innerHTML = '<h2>📰 آخر الأخبار</h2>';
  (list || []).slice(0, 5).forEach(item => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<a href="${item.link}" target="_blank" rel="noopener">${item.title}</a>`;
    container.appendChild(div);
  });
}

function renderStocks(list) {
  const container = document.getElementById('stocks');
  container.innerHTML = '<h2>📊 قائمة الأسهم</h2>';
  (list || []).forEach(stock => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${stock.name} — <small>${stock.ticker}</small></h3>
      <p>السعر: <strong>${stock.close}</strong> IQD</p>
      <p class="muted">Entry: ${stock.entry} | Stop: ${stock.stop} | T1: ${stock.target1} | T2: ${stock.target2}</p>
    `;
    container.appendChild(card);
  });
}

window.addEventListener('load', loadData);