import React, { useEffect, useState, useRef, Fragment } from 'react';

import { Link } from 'react-router-dom';

import '../styles/pages/panel.css'

import api from '../services/api';

function Panel() {

    const [users, set_users] = useState([]);
    const [name, set_name] = useState('');
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const [user_logged, set_user_logged] = useState([]);
    const [user_selected, set_user_selected] = useState({
        user_id: '',
        usernamae: ''
    })

    const nav_ref = useRef(null);
    const modal_add_user_ref = useRef(null);
    const modal_delete_user_ref = useRef(null);
    const snack_user_register_error_ref = useRef(null);
    const snack_user_register_success_ref = useRef(null);
    const snack_user_deleted_success_ref = useRef(null);
    const lengh_password_error_ref = useRef(null);
    const lower_case_password_ref = useRef(null);
    const upper_case_passoword_ref = useRef(null);
    const number_password_ref = useRef(null);
    const white_space_password_ref = useRef(null);
    const white_space_username_ref = useRef(null);

    async function get_users() {
        const users_array = await api.get('get_users');
        set_users(users_array.data.users);
    }

    async function get_user() {
        const logged_user = await api.get('get_logged_user');
        set_user_logged(logged_user.data.user);
    }

    useEffect(() => {

        get_users();
        get_user();

    }, []);

    function open_nav() {
        nav_ref.current.style.width = '250px';
    }

    function close_nav() {
        nav_ref.current.style.width = '0px';
    }

    function logout() {
        localStorage.removeItem('@ihm_token');

        window.location.reload();
    }

    function open_modal_add_user() {
        modal_add_user_ref.current.style.display = 'block';
        set_name('');
        set_username('');
        set_password('');
    }

    function close_modal_add_user() {
        modal_add_user_ref.current.style.display = 'none';
        lengh_password_error_ref.current.style.display = 'none';
        lengh_password_error_ref.current.style.display = 'none';
        lower_case_password_ref.current.style.display = 'none';
        upper_case_passoword_ref.current.style.display = 'none';
        number_password_ref.current.style.display = 'none';
        white_space_password_ref.current.style.display = 'none';
        white_space_username_ref.current.style.display = 'none';
        set_name('');
        set_username('');
        set_password('');
    }

    function open_modal_delete_user() {
        modal_delete_user_ref.current.style.display = 'block';
    }

    function close_modal_delete_user() {
        modal_delete_user_ref.current.style.display = 'none'
    }

    function has_white_space(s) {
        return /\s/g.test(s);
    }

    async function register_user() {

        lengh_password_error_ref.current.style.display = 'none';
        lower_case_password_ref.current.style.display = 'none';
        upper_case_passoword_ref.current.style.display = 'none';
        number_password_ref.current.style.display = 'none';
        white_space_password_ref.current.style.display = 'none';
        white_space_username_ref.current.style.display = 'none';

        var lower_case_letters = /[a-z]/g;
        if(!password.match(lower_case_letters)) {  
            lower_case_password_ref.current.style.display = 'block';
            return;
        } 

        var upper_case_letters = /[A-Z]/g;
        if(!password.match(upper_case_letters)) {  
            upper_case_passoword_ref.current.style.display = 'block';
            return;
        }
      
        var numbers = /[0-9]/g;
        if(!password.match(numbers)) {  
            number_password_ref.current.style.display = 'block';
            return;
        }
        
        if(password.length < 6) {
            lengh_password_error_ref.current.style.display = 'block';
            return;
        }

        if(has_white_space(password)){
            white_space_password_ref.current.style.display = 'block';
            return;
        }

        if(has_white_space(username)){
            white_space_username_ref.current.style.display = 'block';
            return;
        }

        close_modal_add_user();
        const new_user = await api.post('register_user', { full_name: name, username, password });
        if (new_user.data.message === 'Usuário já cadastrado') {
            open_snackbar_error_register_user();
        }else{
            open_snackbar_register_user_success();
            get_users();
        }

        lengh_password_error_ref.current.style.display = 'none';
        lower_case_password_ref.current.style.display = 'none';
        upper_case_passoword_ref.current.style.display = 'none';
        number_password_ref.current.style.display = 'none';
        white_space_password_ref.current.style.display = 'none';
    }

    async function delete_user() {
        await api.post('delete_user', { user_id: user_selected.user_id });
        close_modal_delete_user();
        open_snackbar_deleted_user_success();
        get_users();
    }

    function open_snackbar_error_register_user() {
        snack_user_register_error_ref.current.className = "show";
        setTimeout(function () {
            snack_user_register_error_ref.current.className = snack_user_register_error_ref.current.className.replace("show", "");
        }, 5000);
    }

    function open_snackbar_register_user_success() {
        snack_user_register_success_ref.current.className = "show";
        setTimeout(function () {
            snack_user_register_success_ref.current.className = snack_user_register_success_ref.current.className.replace("show", "");
        }, 5000);
    }

    function open_snackbar_deleted_user_success() {
        snack_user_deleted_success_ref.current.className = "show";
        setTimeout(function () {
            snack_user_deleted_success_ref.current.className = snack_user_deleted_success_ref.current.className.replace("show", "");
        }, 5000);
    }

    return (
        <Fragment>
            <div className="panel_container">
                <div className="side_nav" ref={nav_ref}>
                    <a className="close_button" onClick={close_nav}>&times;</a>
                    <Link to="/engine_1">MOTOR 1</Link>
                    <Link to="/engine_2">MOTOR 2</Link>
                    <Link to="/engine_3">MOTOR 3</Link>
                    <Link to="/panel">PAINEL</Link>
                    <a onClick={logout}>SAIR</a>
                </div>
                <div className="modal_add_user" ref={modal_add_user_ref}>
                    <div className="modal_content">
                        <form>
                            <div className="input_field">
                                <input type="text" id="full_name" required value={name} onChange={e => set_name(e.target.value)} />
                                <label htmlFor="full_name">NOME COMPLETO</label>
                            </div>
                            <div className="input_field">
                                <input type="text" id="username" required value={username} onChange={e => set_username(e.target.value)} />
                                <label htmlFor="username">NOME DE USUÁRIO</label>
                            </div>
                            <div className="input_field">
                                <input type="password" id="password" required value={password} onChange={e => set_password(e.target.value)} />
                                <label htmlFor="password">SENHA</label>
                            </div>
                        </form>
                            <p className="error" ref={white_space_username_ref}>NOME DE USUÁRIO NÃO PODE CONTER ESPAÇO</p>
                            <p className="error" ref={white_space_password_ref}>SENHA NÃO PODE CONTER ESPAÇO</p>
                            <p className="error" ref={number_password_ref}>SENHA FRACA, ADICIONE NÚMEROS</p>
                            <p className="error" ref={lower_case_password_ref}>SENHA FRACA, ADICIONE LETRAS MINUSCULAS</p>
                            <p className="error" ref={upper_case_passoword_ref}>SENHA FRACA, ADICIONE LETRAS MAIUSCULAS</p>
                            <p className="error" ref={lengh_password_error_ref}>SENHA PRECISA TER NO MINIMO 6 CARACTERES</p>
                        <div>
                            <button onClick={close_modal_add_user} className="button_close_modal_add_user">
                                CANCELAR
                        </button>
                            <button onClick={register_user} className="button_add_user">
                                ADICIONAR
                        </button>
                        </div>
                    </div>
                </div>
                <div className="modal_delete_user" ref={modal_delete_user_ref}>
                    <div className="modal_content">
                        <p>Deletar usuário "{user_selected.username}"?</p>
                        <div>
                            <button onClick={close_modal_delete_user} className="button_close_modal_delete_user">
                                CANCELAR
                            </button>
                            <button onClick={delete_user} className="button_delete_user">
                                DELETAR
                            </button>
                        </div>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel_header">
                        <h2>PAINEL DE ADIMINISTRADOR</h2>
                        <button onClick={open_modal_add_user} className="button_open_modal_add_user">
                            ADICIONAR USUÁRIO
                        </button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>NOME DO USUÁRIO</th>
                                <th>NOME COMPLETO</th>
                                <th>OPÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => {
                                return (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.full_name}</td>
                                        <td>{user.master ? null : <div><button className="button_open_modal_delete_user" onClick={() => { open_modal_delete_user(); set_user_selected({ user_id: user._id, username: user.username }); }}>DELETAR</button><button className="button_open_modal_update_user">EDITAR</button></div>}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <button onClick={open_nav} className="menu_button">
                    MENU
                </button>
                <div id="snackbar_user_register_error" ref={snack_user_register_error_ref}>NOME DE USUÁRIO JÁ CADASTRADO.</div>
                <div id="snackbar_user_register_success" ref={snack_user_register_success_ref}>USUÁRIO ADICIONADO COM SUCESSO.</div>
                <div id="snackbar_user_deleted_success" ref={snack_user_deleted_success_ref}>USUÁRIO DELETADO COM SUCESSO.</div>
            </div>
        </Fragment>
    );
}

export default Panel;