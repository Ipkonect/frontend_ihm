const charge_air_temp_options = {
    series: [0],
    chart: {
        type: 'radialBar',
        toolbar: {
            show: false
        },
        fontFamily: 'Roboto Condensed, sans-serif'
    },
    colors: [function({ value, seriesIndex, w }) {
        if (value < 77.77) {
            return '#32CD32'
        } else if(value > 77.77 && value < 83.33) {
            return '#FFFF00'
        } else{
            return '#FF0000'
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
                    label: '0 °C',
                    color: '#FFF',
                    fontSize: '11px',
                    fontFamily: undefined,
                    fontWeight: 600,
                }
            }
        }
    },
    title: {
        text: 'CHARGE AIR TEMP',
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

export default charge_air_temp_options;