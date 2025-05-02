let chart;

function fetchStockData(days = 30) {
  const ticker = document.getElementById('ticker').value.toUpperCase();
  if (!ticker) return alert('Please enter a stock ticker');

  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

  const from = startDate.toISOString().split('T')[0];
  const to = endDate.toISOString().split('T')[0];

  const apiKey = 'YOUR_POLYGON_API_KEY';
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.results) throw new Error('No data');

      const labels = data.results.map(r => new Date(r.t).toLocaleDateString());
      const values = data.results.map(r => r.c);

      if (chart) chart.destroy();
      const ctx = document.getElementById('stockChart').getContext('2d');
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `${ticker} Closing Prices`,
            data: values,
            borderColor: 'blue',
            fill: false
          }]
        }
      });
    })
    .catch(err => {
      console.error(err);
      alert('Failed to load stock data');
    });
}

function fetchRedditStocks() {
  fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
    .then(res => res.json())
    .then(data => {
      const top5 = data.slice(0, 5);
      const tbody = document.querySelector('#redditStocks tbody');
      tbody.innerHTML = '';

      top5.forEach(stock => {
        const row = document.createElement('tr');
        const icon = stock.sentiment === 'Bullish' ? '📈' : '📉';

        row.innerHTML = `
          <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
          <td>${stock.no_of_comments}</td>
          <td>${icon} ${stock.sentiment}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => console.error('Failed to load Reddit stocks:', err));
}

document.addEventListener('DOMContentLoaded', () => {
  fetchRedditStocks();

  if (annyang) {
    annyang.addCommands({
      'lookup *ticker': ticker => {
        document.getElementById('ticker').value = ticker.toUpperCase();
        fetchStockData(30);
      }
    });
  }
});