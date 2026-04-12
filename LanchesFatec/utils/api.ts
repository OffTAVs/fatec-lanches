import axios from 'axios';

const api = axios.create({
  baseURL: 'https://expert-train-9gppqrx7jgvfxpxx-3000.app.github.dev', //'http://192.168.18.8:3000',//'https://fateclanchesback-0erx.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default api;