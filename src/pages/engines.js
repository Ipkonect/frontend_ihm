import React, { Fragment, useRef, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import engines_image from '../assets/images/engines.jpg';

import api from '../services/api';

import '../styles/pages/engines.css';

function Engines() {

    const [power_1, set_power_1] = useState(0);
    const [power_2, set_power_2] = useState(0);
    const [power_3, set_power_3] = useState(0);
    const [total_power, set_total_power] = useState(0);

    const nav_ref = useRef(null);

    async function get_power_engines(){
        const get_json_data = await api.get('get_json_data');

        set_power_1((get_json_data.data.result_m1.PMU_KW / 1000).toFixed(2));
        set_power_2((get_json_data.data.result_m2.PMU_KW / 1000).toFixed(2));
        set_power_3((get_json_data.data.result_m3.PMU_KW / 1000).toFixed(2));

        const total_power = (get_json_data.data.result_m1.PMU_KW + get_json_data.data.result_m2.PMU_KW + get_json_data.data.result_m3.PMU_KW) / 1000

        set_total_power(total_power);

    }

    useEffect(() => {

        get_power_engines();

        setInterval(() => {
            get_power_engines();
        }, 5000);
        
    }, []);

    function logout() {
        localStorage.removeItem('@ihm_token')

        window.location.reload()
    }

    function open_nav() {
        nav_ref.current.style.width = '250px';
    }

    function close_nav() {
        nav_ref.current.style.width = '0px';
    }

    return (
        <Fragment>
            <div className="engines_container">
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
                <div className="image_engine_container">
                    <span className="engine_1_power">{power_1} MW</span>
                    <span className="engine_2_power">{power_2} MW</span>
                    <span className="engine_3_power">{power_3} MW</span>
                    <span className="engines_power">{total_power.toFixed(2)} MW</span>
                    <img src={engines_image} />
                </div>
                <button onClick={open_nav} className="menu_button">
                    MENU
                </button>
            </div>
        </Fragment>
    )
}

export default Engines;