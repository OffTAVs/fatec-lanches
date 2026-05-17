import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fateclanchesback.onrender.com',//'http://192.168.0.21:3000',//'https://fateclanchesback-0erx.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default api;