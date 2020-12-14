const engine_speed_options = {
    series: [0],
    chart: {
        type: 'radialBar',
        toolbar: {
            show: false
        },
        fontFamily: 'Roboto Condensed, sans-serif'
    },
    colors: [function({ value, seriesIndex, w }) {
        if (value <= 100) {
            return '#32CD32';
        } else if(value > 100 && value <= 110) {
            return '#FFFF00';
        } else{
            return '#FF0000';
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
                background: '#FFFFFF',
                strokeWidth: '70%',
                margin: 0,
            },
            dataLabels: {
                show: true,
                name: {
                    show: true,
                },
                value: {
                    color: '#FFFFFF',
                    fontSize: '36px',
                    show: true,
                    fontSize: "20px"
                },
                total: {
                    show: true,
                    label: '0 RPM',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontFamily: undefined,
                    fontWeight: 600,
                }
            }
        }
    },
    title: {
        text: "ENGINE SPEED",
        align: 'center',
        offsetX: 0,
        offsetY: 25,
        floating: false,
        style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#FFFFFF'
        },
    },
    stroke: {
        lineCap: 'butt'
    },
};

export default engine_speed_options;