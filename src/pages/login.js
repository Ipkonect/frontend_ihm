import React, { Fragment, useState } from 'react';

import api from '../services/api';

import { login } from '../services/auth';

import '../styles/pages/login.css';

function Login({ history }) {

    const [username, set_username] = useState('');
    const [password, set_password] = useState('');

    async function handle_login(e) {
        e.preventDefault()

        const get_user_token = await api.post('login_user', {
            username: username.toLowerCase(),
            password
        });

        if (!get_user_token.data.user) {
            return
        }

        login(get_user_token.data.token);

        history.push('/engine_1');
    }

    return (
        <Fragment>
            <div className="container_login">
                <form>
                    <h1>IHM46 WEB</h1>
                    <div className="input_field">
                        <input type="text" id="username" required value={username} onChange={e => set_username(e.target.value)} />
                        <label for="username">NOME DE USUÁRIO</label>
                    </div>
                    <div className="input_field">
                        <input id="password" required value={password} type="password" onChange={e => set_password(e.target.value)} />
                        <label for="password">SENHA</label>
                    </div>
                    <button onClick={handle_login}>
                        <div className="slide"></div>
                        <p>Entrar</p>
                    </button>
                </form>
            </div>
        </Fragment>
    );
}

export default Login;
