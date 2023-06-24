
function fetchDataWithThen() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.log(error));// Fetch data using .then
}

async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.log(error);
// Fetch data using async/await
  }
}

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
// Render the table with data
  });
}


function search() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.toLowerCase();
  const tableRows = document.getElementById('cryptoTableBody').getElementsByTagName('tr');

  for (let i = 0; i < tableRows.length; i++) {
    const row = tableRows[i];
    const symbol = row.getElementsByTagName('td')[0].textContent.toLowerCase();
    const name = row.getElementsByTagName('td')[1].textContent.toLowerCase();
// Search function
    if (symbol.includes(searchTerm) || name.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  }
}

// Sort function
function sortData(sortBy) {
  const tableBody = document.getElementById('cryptoTableBody');
  const rows = Array.from(tableBody.getElementsByTagName('tr'));

  rows.sort((rowA, rowB) => {
    let valueA, valueB;

 if (sortBy === 'percentage') {
      valueA = parseFloat(rowA.getElementsByTagName('td')[3].textContent);
      valueB = parseFloat(rowB.getElementsByTagName('td')[3].textContent);
    } else if (sortBy === 'marketCap') {
      valueA = parseFloat(rowA.getElementsByTagName('td')[4].textContent);
      valueB = parseFloat(rowB.getElementsByTagName('td')[4].textContent);
    }

    return valueA - valueB;
  });

  tableBody.innerHTML = '';
  rows.forEach(row => tableBody.appendChild(row));
}

// Fetch data initially
fetchDataWithThen();
