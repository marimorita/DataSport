import axios from 'axios';
//local: http://localhost:3000
//desplegada: https://datasportback.onrender.com
// Configuración global de Axios
const axiosInstance = axios.create({
    baseURL: 'https://datasportback.onrender.com/ds/auth'
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        if (!config.headers) config.headers = {}; // Asegúrate de que headers no sea undefined
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Instancia de Axios para Cloudinary
const cloudinaryAxios = axios.create({
    baseURL: 'https://api.cloudinary.com/v1_1/dlezql4zq' // URL base para Cloudinary
});

export { axiosInstance, cloudinaryAxios };