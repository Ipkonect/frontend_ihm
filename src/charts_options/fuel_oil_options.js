const fuel_oil_options = {
    series: [0],
    chart: {
        type: 'radialBar',
        toolbar: {
            show: false
        },
        fontFamily: 'Roboto Condensed, sans-serif'
    },
    colors: [function({ value, seriesIndex, w }) {
        if (value < 18.75) {
            return '#FF0000'
        } else if(value > 18.75 && value < 25) {
            return '#FFFF00'
        } else{
            return '#32CD32'
        }
    }],
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            hollow: {
                margin: 0,
                size: '60%',
                background: '#312D2D',
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: 'front',
            },
            track: {
                background: '#FFF',
                strokeWidth: '67%',
                margin: 0,
            },
            dataLabels: {
                show: true,
                name: {
                    show: true,
                },
                value: {
                    color: '#FFF',
                    fontSize: '36px',
                    show: false,
                    fontSize: "20px"
                },
                total: {
                    show: true,
                    label: '0 BAR',
                    color: '#FFF',
                    fontSize: '11px',
                    fontFamily: undefined,
                    fontWeight: 600,
                }
            }
        }
    },
    title: {
        text: 'FUEL OIL PRESS',
        align: 'center',
        offsetX: 0,
        offsetY: 15,
        floating: false,
        style: {
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#FFF'
        },
    },
    stroke: {
        lineCap: 'butt'
    },
};

export default fuel_oil_options;