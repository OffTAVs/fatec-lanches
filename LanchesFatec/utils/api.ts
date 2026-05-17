import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.21:3000',//'https://fateclanchesback.onrender.com',//,//'https://fateclanchesback-0erx.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default api;