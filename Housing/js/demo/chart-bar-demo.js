function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

Chart.plugins.register({
    afterDatasetsDraw: function (chart) {
        var ctx = chart.ctx;

        chart.data.datasets.forEach(function (dataset, i) {
            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
                    ctx.fillStyle = 'rgb(0, 0, 0)';
                    var fontSize = 16;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                    var dataString = dataset.data[index]?.toString();

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                });
            }
        });
    }
});

var commonOptions = {
    maintainAspectRatio: false,
    layout: {
        padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
        }
    },
    scales: {
        xAxes: [{
            time: {
                unit: 'month'
            },
            gridLines: {
                display: false,
                drawBorder: false
            },
            ticks: {
                maxTicksLimit: 3
            },
            maxBarThickness: 25,
        }],
        yAxes: [{
            ticks: {
                min: 1,
                max: 5,
                maxTicksLimit: 5,
                padding: 10,
                callback: function (value, index, values) {
                    return number_format(value);
                }
            },
            gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
            }
        }],
    },
    legend: {
        display: false
    },
    tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
            label: function (tooltipItem, chart) {
                var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
            }
        }
    },
};
const renderCharts = (meanRatings) => {
    const category1ChartCtx = document.getElementById('connectivityChart').getContext('2d');
    const category2ChartCtx = document.getElementById('maintenanceChart').getContext('2d');
    const category3ChartCtx = document.getElementById('constructionChart').getContext('2d');
    const category4ChartCtx = document.getElementById('amenitiesChart').getContext('2d');
    const category5ChartCtx = document.getElementById('peopleFriendlinessChart').getContext('2d');
    const categories = ["Connectivity", "Maintenance", 'Construction', 'Amenities', 'PeopleFriendliness'];
    const chartCtxs = [category1ChartCtx, category2ChartCtx, category3ChartCtx, category4ChartCtx, category5ChartCtx];

    categories.forEach((category, index) => {
        // const categoryData = csvData.map(row => row.ratings[category]);
        // const cityMeanRatings = calculateMeanRatings();

        new Chart(chartCtxs[index], {
            type: 'bar',
            data: {
                labels: [`${selectedSociety}`, `${selectedCity}`, `Pan India`],
                datasets: [{
                    label: `${category} Ratings`,
                    data: [meanRatings[category]?.society.toFixed(1), meanRatings[category]?.city?.toFixed(1), meanRatings[category]?.panIndia.toFixed(1)],
                    backgroundColor: ["#4e73df", "#1cc88a", "#e74a3b"],
                    borderColor: ["#36b9cc", "#36b9cc", "#36b9cc"],
                    borderWidth: 1
                }]
            },
            options: commonOptions
        });
    })
}
