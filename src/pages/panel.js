import React, { useEffect, useState, useRef, useReducer } from 'react';

import { Link } from 'react-router-dom';

import '../styles/pages/panel.css'

import api from '../services/api';

function Panel() {

    const [users, set_users] = useState([]);
    const [username, set_username] = useState('');
    const [name, set_name] = useState('');
    const [password, set_password] = useState('');

    const nav_ref = useRef(null);
    const modal_ref = useRef(null)

    async function get_users() {
        const response = await api.get('get_users');

        set_users(response.data.users)
    }

    useEffect(() => {

        get_users();

    }, []);

    function open_nav() {
        nav_ref.current.style.width = '250px';
    }

    function close_nav() {
        nav_ref.current.style.width = '0px';
    }

    function logout() {
        localStorage.removeItem('@ihm_token')

        window.location.reload()
    }

    function open_modal() {
        modal_ref.current.style.display = "block"
    }

    function close_modal() {
        modal_ref.current.style.display = "none"
    }

    async function register_user(){
        close_modal();
        await api.post('register_user', {full_name: name, username, password});
    }

    return (
        <div style={{ margin: "150px auto", width: "100%", maxWidth: "700px" }}>
            <div className="modal" ref={modal_ref}>
                <div className="modal_content" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <form>
                        <div className="input_field">
                            <input type="text" id="username" required value={username} onChange={e => set_username(e.target.value)} />
                            <label for="username">NOME DE USUÁRIO</label>
                        </div>
                        <div className="input_field">
                            <input type="text" id="Nome" required value={name} onChange={e => set_name(e.target.value)} />
                            <label for="nome">NOME</label>
                        </div>
                        <div className="input_field">
                            <input type="password" id="password" required  value={password} onChange={e => set_password(e.target.value)} />
                            <label for="password">SENHA</label>
                        </div>
                    </form>
                    <div>
                        <button onClick={close_modal} style={{ border: "none", padding: "5px", marginRight: "10px", backgroundColor: "red", color: "#FFF", cursor: "pointer", fontWeight: "bold" }}>
                            Cancelar
                        </button>
                        <button  onClick={register_user} style={{ border: "none", padding: "5px", backgroundColor: "#32CD32", color: "#FFF", cursor: "pointer", fontWeight: "bold" }}>
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
            <div className="side_nav" ref={nav_ref} style={{ backgroundColor: "#2141CA" }} >
                <a href="javascript:void(0)" className="close_button" onClick={close_nav} >&times;</a>
                <Link to="/engine_1">MOTOR 1</Link>
                <Link to="/engine_2">MOTOR 2</Link>
                <Link to="/engine_3">MOTOR 3</Link>
                <Link to="/panel">PAINEL</Link>
                <a href="javascript:void(0)" onClick={logout}>SAIR</a>
            </div>
            <button onClick={open_nav} style={{ position: "absolute", top: "8px", right: "5px", border: "none", padding: "10px", cursor: "pointer", backgroundColor: "#2141CA", color: "#FFF" }}>
                MENU
            </button>
            <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#2141CA", padding: "20px", color: "#FFF" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }} >
                    <h2>Painel de Administrador</h2>
                    <button onClick={open_modal} style={{ border: "none", padding: "8px", backgroundColor: "#32CD32", color: "#FFF", cursor: "pointer", fontWeight: "bold" }}>
                        Adicionar usuário
                    </button>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", border: "2px solid #FFF" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid black", padding: "10px", fontSize: "15px", border: "2px solid #FFF" }}>Nome de Usuário</th>
                            <th style={{ border: "1px solid black", padding: "10px", fontSize: "15px", border: "2px solid #FFF" }}>Nome</th>
                            <th style={{ border: "1px solid black", padding: "10px", fontSize: "15px", border: "2px solid #FFF" }}>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            return (
                                <tr key={user._id}>
                                    <td style={{ border: "1px solid black", padding: "10px", fontSize: "15px", border: "2px solid #FFF" }}>{user.username}</td>
                                    <td style={{ border: "1px solid black", padding: "10px", fontSize: "15px", border: "2px solid #FFF" }}>{user.full_name}</td>
                                    <th style={{ border: "1px solid black", textAlign: "left", padding: "10px", border: "2px solid #FFF" }}>{user.master ? null : <div><button style={{ backgroundColor: "red", border: "none", padding: "10px", marginRight: "10px", color: "#FFF", cursor: "pointer", fontWeight: "bold" }}>Deletar</button><button style={{ backgroundColor: "orange", border: "none", padding: "10px", marginRight: "10px", color: "#FFF", cursor: "pointer", fontWeight: "bold" }}>Editar</button></div>}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Panel;