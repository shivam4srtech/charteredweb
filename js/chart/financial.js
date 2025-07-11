
  // Get the context of the canvas element we want to select
  const financial = document.getElementById('financial').getContext('2d');

  // Create the line chart
  const financialChart = new Chart(financial, {
    type: 'line', // Line chart type
    data: {
      labels: ['Q1', 'Q2', 'Q3'], // Three data points for three quarters
      datasets: [
        {
          label: 'Gross margin',
          data: [30, 45, 20], // Y-values for Sales
          borderColor: 'rgba(75, 192, 192, 1)',  // Line color for Sales
          backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Fill color under the Sales line
          borderWidth: 2,
          tension: 0.4 // Curved line
        },
        {
          label: 'Operating margin',
          data: [50, 60, 80], // Y-values for Revenue
          borderColor: 'rgba(192, 75, 75, 1)',  // Line color for Revenue
          backgroundColor: 'rgba(192, 75, 75, 0.2)',  // Fill color under the Revenue line
          borderWidth: 2,
          tension: 0.4 // Curved line
        },
        {
          label: 'Net margin',
          data: [20, 30, 25], // Y-values for Expenses
          borderColor: 'rgba(75, 75, 192, 1)',  // Line color for Expenses
          backgroundColor: 'rgba(75, 75, 192, 0.2)',  // Fill color under the Expenses line
          borderWidth: 2,
          tension: 0.4 // Curved line
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

