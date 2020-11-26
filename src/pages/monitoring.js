import React, { useEffect, useState } from 'react';

import api from '../services/api';

function Monitoring() {

    const [m_1, set_m_1] = useState('')

    useEffect(() => {

        async function get_json_date() {

            const date_json = await api.get('get_date');

            console.log(date_json.data);
            set_m_1(date_json.data.result_m1.TC_A)

        }

        setInterval(() => {

            get_json_date();

        }, 1000);

    }, []);

    return (
        <h1>{m_1}</h1>
    );
}

export default Monitoring;