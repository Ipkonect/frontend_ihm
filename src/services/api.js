import axios from 'axios';

const api = axios.create({
    baseURL: 'https://test-server-ihm.herokuapp.com/'
});

export default api;