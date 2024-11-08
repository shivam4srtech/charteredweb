const ctxRatio = document.getElementById('ratioChart').getContext('2d');
        const ratioChart = new Chart(ctxRatio, {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023'], // X-axis labels (years)
                datasets: [
                    {
                        label: 'Debt Ratio (%)',
                        data: [35, 42, 48, 45, 50], // Debt ratio data for each year
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        tension: 0.3 // Smooth curve
                    },
                    {
                        label: 'Current Ratio (%)',
                        data: [1.2, 1.5, 1.3, 1.4, 1.6], // Current ratio data for each year
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                        tension: 0.3 // Smooth curve
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Ratio'
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
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });