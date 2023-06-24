// Fetch data initially
fetchDataWithThen();

// Fetch data using .then
function fetchDataWithThen() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.log(error));
}

// Fetch data using async/await
async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.log(error);
  }
}

// Render the table with data
function renderTable(data) {
  const tableBody = document.getElementById('cryptoTableBody');
  tableBody.innerHTML = '';

  data.forEach(coin => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${coin.symbol}</td>
      <td>${coin.name}</td>
      <td>${coin.current_price}</td>
      <td>${coin.total_volume}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Search function
function search() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.toLowerCase();
  const tableRows = document.getElementById('cryptoTableBody').getElementsByTagName('tr');

  for (let i = 0; i < tableRows.length; i++) {
    const row = tableRows[i];
    const symbol = row.getElementsByTagName('td')[0].textContent.toLowerCase();
    const name = row.getElementsByTagName('td')[1].textContent.toLowerCase();

    if (symbol.includes(searchTerm) || name.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  }
}

// Sort function
function sortData() {
  const tableBody = document.getElementById('cryptoTableBody');
  const rows = Array.from(tableBody.getElementsByTagName('tr'));
  const sortedRows = rows.sort((rowA, rowB) => {
    const marketCapA = parseFloat(rowA.getElementsByTagName('td')[2].textContent);
    const marketCapB = parseFloat(rowB.getElementsByTagName('td')[2].textContent);
    return marketCapA - marketCapB;
  });

  tableBody.innerHTML = '';
  sortedRows.forEach(row => tableBody.appendChild(row));
}

