const lt_water_options = {
    series: [0],
    chart: {
        type: 'radialBar',
        toolbar: {
            show: false
        }
    },
    colors: [function({ value, seriesIndex, w }) {
        if (value < 100) {
            return '#32CD32'
        } else if(value > 100 && value < 110) {
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
                    label: '00 BAR',
                    color: '#FFF',
                    fontSize: '11px',
                    fontFamily: undefined,
                    fontWeight: 600,
                }
            }
        }
    },
    title: {
        text: "LT WATER",
        align: 'center',
        offsetX: 0,
        offsetY: 0,
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

export default lt_water_options;