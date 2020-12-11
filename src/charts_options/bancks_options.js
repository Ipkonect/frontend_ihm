const banck_options = {
    series: [{
        name: '',
        data: [0, 0]
    }],
    chart: {
        type: 'bar',
        toolbar: {
            show: false
        }
    },
    xaxis: {
        categories: ['A-BANCK', 'B-BANCK'],
        labels: {
            show: true,
            style: {
                colors: ['#FFFFFF', '#FFFFFF'],
                fontSize: '12px',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label',
            },
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '40%',
            endingShape: 'flat',
            dataLabels: {
                position: 'top',
            },
            colors: {
                ranges: [{
                    from: 0,
                    to: 700,
                    color: '#32CD32'
                },{
                    from: 700,
                    to: 750,
                    color: '#FFFF00'
                },
                {
                    from: 750,
                    to: 800,
                    color: '#FF0000'
                }]
            }
        },
    },
    colors: [
        "#C71585", "#32CD32",
    ],
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
    legend: {
        show: false
    },
    yaxis: {
        title: {
            text: '',
        },
        labels: {
            show: true,
            style: {
                colors: ['#FFFFFF'],
                fontSize: '12px',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
            },
        },
        max: 800,
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

export default banck_options;