import axios from 'axios';

// Configurar Axios globalmente
axios.defaults.baseURL = 'http://localhost:3000/ds/auth';

// Agregar un interceptor para incluir el token en todas las solicitudes
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        if (!config.headers) config.headers = {}; // Asegúrate de que headers no sea undefined
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axios;
