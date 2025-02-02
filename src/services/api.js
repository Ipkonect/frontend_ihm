import axios from 'axios';

import { get_token } from "./auth";

const api = axios.create({
    baseURL: 'https://supervisoriotcb.net/backend_ihm/'
});

api.interceptors.request.use(async config => {
    const token = get_token();
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;