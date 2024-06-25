// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

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
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
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

// Area Chart Example

const renderAreaChar = (meanRatings) => {
  var ctxLine = document.getElementById("myAreaChart")
  new Chart(ctxLine, {
    type: 'line',
    data: {
      labels: ["Connectivity", "Maintenance", "Construction", "People Friendliness", "Amenities"],
      datasets: [
        {
          label: "Society",
          borderColor: "rgba(78, 115, 223, 1)",
          data: [
            meanRatings?.Connectivity?.society?.toFixed(1),
            meanRatings?.Maintenance?.society?.toFixed(1),
            meanRatings?.Construction?.society?.toFixed(1),
            meanRatings?.Amenities?.society?.toFixed(1),
            meanRatings?.PeopleFriendliness?.society?.toFixed(1)
          ],
          fill: false
        },
        {
          label: "City",
          borderColor: "rgba(28, 200, 138, 1)",
          data: [
            meanRatings?.Connectivity?.city?.toFixed(1),
            meanRatings?.Maintenance?.city?.toFixed(1),
            meanRatings?.Construction?.city?.toFixed(1),
            meanRatings?.Amenities?.city?.toFixed(1),
            meanRatings?.PeopleFriendliness?.city?.toFixed(1)
          ],
          fill: false
        },
        {
          label: "PAN India",
          borderColor: "rgba(255, 193, 7, 1)",
          data: [
            meanRatings?.Connectivity?.panIndia?.toFixed(1),
            meanRatings?.Maintenance?.panIndia?.toFixed(1),
            meanRatings?.Construction?.panIndia?.toFixed(1),
            meanRatings?.Amenities?.panIndia?.toFixed(1),
            meanRatings?.PeopleFriendliness?.panIndia?.toFixed(1)
          ],
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Comparison across Categories'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true
          }
        }]
      }
    }
  });

}
