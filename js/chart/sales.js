
    // Get the context of the canvas element we want to select
    const ctx = document.getElementById('salesChart').getContext('2d');

    // Create the line chart
    const myLineChart = new Chart(ctx, {
      type: 'line', // Line chart type
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Sales',
          data: [15, 20, 10, 40, 25, 35, 30],
          borderColor: 'rgba(75, 192, 192, 1)',  // Line color
          backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Fill color under the line
          borderWidth: 2,
          tension: 0.4 // Curved lines
        }]
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