const b_options = {
    series: [{
        name: 'B',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }],
    chart: {
        type: 'bar',
        toolbar: {
            show: false
        },
        fontFamily: 'Roboto Condensed, sans-serif'
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '80%',
            endingShape: 'flat',
            dataLabels: {
                position: 'top',
            },
            colors: {
                ranges: [{
                    from: 0,
                    to: 500,
                    color: '#32CD32'
                },{
                    from: 500,
                    to: 550,
                    color: '#FFFF00'
                },
                {
                    from: 550,
                    to: 600,
                    color: '#FF0000'
                }]
            }
        },
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val + '°C';
        },
        offsetY: -13,
        style: {
            fontSize: '9px',
            colors: ['#FFFFFF']
        }
    },
    stroke: {
        show: true,
        width: 5,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
        labels: {
            show: true,
            style: {
                colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                fontSize: '12px',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label',
            },
        },
    },
    legend: {
        show: false
    },
    yaxis: {
        title: {
            text: 'CLY# (°C)',
            style: {
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-title',
            },
        },
        max: 600,
        labels: {
            show: true,
            style: {
                colors: ['#FFFFFF'],
                fontSize: '12px',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
            },
        },
    },
    fill: {
        opacity: 1
    },
    labels: {
        show: false,
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + ' °C'
            }
        }
    }
};

export default b_options;