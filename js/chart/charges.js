const ctxcharges = document.getElementById('chargesPieChart').getContext('2d');
const chargesPieChart = new Chart(ctxcharges, {
    type: 'pie',
    data: {
        labels: [
            'Industrial Development Bank of India',
            'State Bank of India',
            'Canara Bank',
            'Joint Plant Committee',
            'Others'
        ],
        datasets: [{
            label: 'Bank Charges Distribution',
            data: [25, 20, 15, 10, 30], // Example data (adjust to actual distribution)
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}%`;
                    }
                }
            }
        }
    }
});