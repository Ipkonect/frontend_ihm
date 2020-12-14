import React, { Fragment, useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

import ReactApexChart from 'react-apexcharts';

import api from '../services/api';

import a_options from '../charts_options/a_options';
import b_options from '../charts_options/b_options';
import engine_speed_options from '../charts_options/engine_speed_options';
import lo_pressure_options from '../charts_options/lo_pressure_options';
import fuel_oil_options from '../charts_options/fuel_oil_options';
import starting_air_options from '../charts_options/starting_air_options';
import control_air_options from '../charts_options/control_air_options';
import charge_air_options from '../charts_options/charge_air_options';
import lt_water_options from '../charts_options/lt_water_options';
import ht_water_options from '../charts_options/ht_water_options';
import ht_water_temp_options from '../charts_options/ht_water_temp_options';
import charge_air_temp_options from '../charts_options/charge_air_temp_options';
import bancks_options from '../charts_options/bancks_options';

import '../styles/pages/engine.css';

Number.prototype.pad = function (size) {
    let s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

function Engine_1({ history }) {

    const [a_chart, set_a_chart] = useState(a_options);
    const [b_chart, set_b_chart] = useState(b_options);
    const [temp_avarenge_chart, set_temp_avarenge_chart] = useState(bancks_options);
    const [temp_after_chart, set_temp_after_chart] = useState(bancks_options);
    const [temp_before_chart, set_temp_before_chart] = useState(bancks_options);
    const [engine_speed_chart, set_engine_speed_chart] = useState(engine_speed_options);
    const [lo_pressure_chart, set_lo_pressure_chart] = useState(lo_pressure_options);
    const [fuel_oil_chart, set_fuel_oil_chart] = useState(fuel_oil_options);
    const [starting_air_chart, set_starting_air_chart] = useState(starting_air_options);
    const [control_air_chart, set_control_air_chart] = useState(control_air_options);
    const [charge_air_chart, set_charge_air_chart] = useState(charge_air_options);
    const [lt_water_chart, set_lt_water_chart] = useState(lt_water_options);
    const [ht_water_chart, set_ht_water_chart] = useState(ht_water_options);
    const [ht_water_temp_chart, set_ht_water_temp_chart] = useState(ht_water_temp_options);
    const [charge_air_temp_chart, set_charge_air_temp_chart] = useState(charge_air_temp_options);
    const [tca, set_tca] = useState('0');
    const [tcb, set_tcb] = useState('0');
    const [active_power, set_active_power] = useState('0');

    const nav_ref = useRef(null);

    function value_to_percent_engine_speed(value) {
        return (value * 120) / 616;
    }

    function value_to_percent(value, max) {
        return (value * 100) / max;
    }

    function logout() {
        localStorage.removeItem('@ihm_token')

        window.location.reload()
    }

    async function get_data_engine() {

        const get_json_data = await api.get('get_json_data');

        set_tca(get_json_data.data.result_m1.TC_A);
        set_tcb(get_json_data.data.result_m1.TC_B);
        set_active_power(get_json_data.data.result_m1.PMU_KW);

        console.log(value_to_percent(75, 90))

        set_engine_speed_chart({ series: [value_to_percent_engine_speed(get_json_data.data.result_m1.EngineSpeed).toFixed(0)], plotOptions: { radialBar: { dataLabels: { total: { label: `${get_json_data.data.result_m1.EngineSpeed} RPM` } } } } });
        set_lo_pressure_chart({ series: [value_to_percent(get_json_data.data.result_m1.LO_Pressure, 10)], plotOptions: { radialBar: { dataLabels: { total: { label: `${get_json_data.data.result_m1.LO_Pressure} BAR` } } } } });
        set_fuel_oil_chart({ series: [value_to_percent(get_json_data.data.result_m1.FuelOil, 16)], plotOptions: { radialBar: { dataLabels: { total: { label: `${get_json_data.data.result_m1.FuelOil} BAR` } } } } });
        set_starting_air_chart({ series: [value_to_percent(get_json_data.data.result_m1.StartAir, 40)], plotOptions: { radialBar: { dataLabels: { total: { label: `${get_json_data.data.result_m1.StartAir} BAR` } } } } });
        set_control_air_chart({ series: [value_to_percent(get_json_data.data.result_m1.CtrlAir, 40)], plotOptions: { radialBar: { dataLabels: { total: { label: `${get_json_data.data.result_m1.CtrlAir} BAR` } } } } });
        set_charge_air_chart({ series: [value_to_percent(get_json_data.data.result_m1.ChargeAir, 6)], plotOptions: { radialBar: { dataLabels: { total: { label: `${get_json_data.data.result_m1.ChargeAir} BAR` } } } } });
        set_lt_water_chart({ series: [value_to_percent(get_json_data.data.result_m1.LT_Water, 6)], plotOptions: { radialBar: { dataLabels: { total: { label: `${get_json_data.data.result_m1.LT_Water} BAR` } } } } });
        set_ht_water_chart({ series: [value_to_percent(get_json_data.data.result_m1.HT_Water, 6)], plotOptions: { radialBar: { dataLabels: { total: { label: `${get_json_data.data.result_m1.HT_Water} BAR` } } } } });
        set_ht_water_temp_chart({ series: [value_to_percent(get_json_data.data.result_m1.HT_WaterTemp, 120)], plotOptions: { radialBar: { dataLabels: { total: { label: `${get_json_data.data.result_m1.HT_WaterTemp} °C` } } } } });
        set_charge_air_temp_chart({ series: [value_to_percent(get_json_data.data.result_m1.ChargeAirTemp, 90)], plotOptions: { radialBar: { dataLabels: { total: { label: `${get_json_data.data.result_m1.ChargeAirTemp} °C` } } } } });

        set_a_chart({
            series: [{
                name: 'A',
                data: [get_json_data.data.result_m1.A1, get_json_data.data.result_m1.A2, get_json_data.data.result_m1.A3, get_json_data.data.result_m1.A4, get_json_data.data.result_m1.A5, get_json_data.data.result_m1.A6, get_json_data.data.result_m1.A7, get_json_data.data.result_m1.A8, get_json_data.data.result_m1.A9]
            }]
        });

        set_b_chart({
            series: [{
                name: 'B',
                data: [get_json_data.data.result_m1.B1, get_json_data.data.result_m1.B2, get_json_data.data.result_m1.B3, get_json_data.data.result_m1.B4, get_json_data.data.result_m1.B5, get_json_data.data.result_m1.B6, get_json_data.data.result_m1.B7, get_json_data.data.result_m1.B8, get_json_data.data.result_m1.B9]
            }]
        });

        set_temp_avarenge_chart({
            series: [{
                name: 'EXH. TEMP AVARENGE',
                data: [get_json_data.data.result_m1.ATempAverange, get_json_data.data.result_m1.BTempAverange]
            }], yaxis: { title: { text: 'EXH. TEMP AVARENGE', style: { color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cssClass: 'apexcharts-yaxis-title' } }, max: 800, labels: { show: true, style: { colors: ['#FFFFFF'], fontSize: '12px', fontWeight: 400, ncssClass: 'apexcharts-yaxis-label' }, }, },
            xaxis: {
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
        });

        set_temp_after_chart({
            series: [{
                name: 'EXH. TEMP AFTER',
                data: [get_json_data.data.result_m1.ATempAfter, get_json_data.data.result_m1.BTempAfter]
            }], yaxis: { title: { text: 'EXH. TEMP AFTER', style: { color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cssClass: 'apexcharts-yaxis-title' }, }, max: 800, labels: { show: true, style: { colors: ['#FFFFFF'], fontSize: '12px', fontWeight: 400, ncssClass: 'apexcharts-yaxis-label' }, } },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                        fontSize: '12px',
                        fontWeight: 400,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
            }
        });

        set_temp_before_chart({
            series: [{
                name: 'EXH. TEMP BEFORE',
                data: [get_json_data.data.result_m1.ATempBefore, get_json_data.data.result_m1.BTempBefore]
            }], yaxis: { title: { text: 'EXH. TEMP BEFORE', style: { color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cssClass: 'apexcharts-yaxis-title' } }, max: 800, labels: { show: true, style: { colors: ['#FFFFFF'], fontSize: '12px', fontWeight: 400, ncssClass: 'apexcharts-yaxis-label' } } },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                        fontSize: '12px',
                        fontWeight: 400,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
            }
        });
    }

    useEffect(() => {

        setInterval(() => {
            get_data_engine();
        }, 5000);

    }, [])

    function open_nav() {
        nav_ref.current.style.width = '250px';
    }

    function close_nav() {
        nav_ref.current.style.width = '0px';
    }

    return (
        <Fragment >
            <div className="engine_container">
                <div className="side_nav" ref={nav_ref}>
                    <a className="close_button" onClick={close_nav}>&times;</a>
                    <div className="links">
                        <Link to="/engine_1">MOTOR 1</Link>
                        <Link to="/engine_2">MOTOR 2</Link>
                        <Link to="/engine_3">MOTOR 3</Link>
                        <Link to="/engines">MOTORES</Link>
                        <Link to="/panel">PAINEL</Link>
                        <a onClick={logout}>SAIR</a>
                    </div>
                </div>
                <div className="engine_data_charts">
                    <div className="engine_info_part_1">
                        <div className="enigne_speed_tca_tcb_power">
                            <div className="active_power">
                                <p>ACTIVE POWER</p>
                                <p>{active_power} kWh</p>
                            </div>
                            <div id="card">
                                <div id="chart_engine_speed">
                                    <ReactApexChart options={engine_speed_chart} series={engine_speed_chart.series} type="radialBar" height={300} />
                                </div>
                            </div>
                            <div className="tcs">
                                <div className="tc">
                                    <p>TC-A</p>
                                    <p>{tca} RPM</p>
                                </div>
                                <div className="tc">
                                    <p>TC-B</p>
                                    <p>{tcb} RPM</p>
                                </div>
                            </div>
                        </div>
                        <div className="gauge_charts">
                            <div className="line_1">
                                <div id="card">
                                    <div id="chart_lo_pressure">
                                        <ReactApexChart options={lo_pressure_chart} series={lo_pressure_chart.series} type="radialBar" height={150} />
                                    </div>
                                </div>
                                <div id="card">
                                    <div id="chart_fuel_oi">
                                        <ReactApexChart options={fuel_oil_chart} series={fuel_oil_chart.series} type="radialBar" height={150} />
                                    </div>
                                </div>
                                <div id="card">
                                    <div id="chart_starting_air">
                                        <ReactApexChart options={starting_air_chart} series={starting_air_chart.series} type="radialBar" height={150} />
                                    </div>
                                </div>
                            </div>
                            <div className="line_2">
                                <div id="card">
                                    <div id="chart_control_air">
                                        <ReactApexChart options={control_air_chart} series={control_air_chart.series} type="radialBar" height={150} />
                                    </div>
                                </div>
                                <div id="card">
                                    <div id="chart_charge_air">
                                        <ReactApexChart options={charge_air_chart} series={charge_air_chart.series} type="radialBar" height={150} />
                                    </div>
                                </div>
                                <div id="card">
                                    <div id="chart_lt_water">
                                        <ReactApexChart options={lt_water_chart} series={lt_water_chart.series} type="radialBar" height={150} />
                                    </div>
                                </div>
                            </div>
                            <div className="line_3">
                                <div id="card">
                                    <div id="chart_ht_water">
                                        <ReactApexChart options={ht_water_chart} series={ht_water_chart.series} type="radialBar" height={150} />
                                    </div>
                                </div>
                                <div id="card">
                                    <div id="chart_ht_water_temp">
                                        <ReactApexChart options={ht_water_temp_chart} series={ht_water_temp_chart.series} type="radialBar" height={150} />
                                    </div>
                                </div>
                                <div id="card">
                                    <div id="chart_charge_air_temp">
                                        <ReactApexChart options={charge_air_temp_chart} series={charge_air_temp_chart.series} type="radialBar" height={150} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="engine_info_part_2">
                        <div id="chart_temp_averange">
                            <ReactApexChart options={temp_avarenge_chart} series={temp_avarenge_chart.series} type="bar" height={200} />
                        </div>
                        <div id="chart_temp_before">
                            <ReactApexChart options={temp_before_chart} series={temp_before_chart.series} type="bar" height={200} />
                        </div>
                    </div>
                    <div className="engine_info_part_3">
                        <div id="chart_a" style={{width: "400px"}}>
                            <ReactApexChart options={a_chart} series={a_chart.series} type="bar" height={200} />
                        </div>
                        <div id="chart_b" style={{width: "400px"}}>
                            <ReactApexChart options={b_chart} series={b_chart.series} type="bar" height={200} />
                        </div>
                    </div>
                    <div className="engine_info_part_4">
                        <div id="chart_temp_after">
                            <ReactApexChart options={temp_after_chart} series={temp_after_chart.series} type="bar" height={200} />
                        </div>
                    </div>
                </div>
                <button onClick={open_nav} className="menu_button">
                    MENU
                </button>
            </div>
        </Fragment>
    );
}

export default Engine_1;