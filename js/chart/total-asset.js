
  // Generate random values for demonstration
  const assetData = [
    Math.floor(Math.random() * 100000) + 50000, // Random values between 50,000 and 150,000
    Math.floor(Math.random() * 100000) + 50000,
    Math.floor(Math.random() * 100000) + 50000,
    Math.floor(Math.random() * 100000) + 50000,
    Math.floor(Math.random() * 100000) + 50000
  ];

  // Set up the chart
  const ctxasset = document.getElementById('assetChart').getContext('2d');
  const assetChart = new Chart(ctxasset, {
    type: 'bar',
    data: {
      labels: ['2020', '2021', '2022', '2023', '2024'], // Last five years
      datasets: [{
        label: 'Total Assets',
        data: assetData,
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Assets (in INR)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Year'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    }
  });
