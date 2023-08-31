import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1/', // Ganti dengan URL API Anda
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Ganti dengan cara Anda mendapatkan token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default instance;