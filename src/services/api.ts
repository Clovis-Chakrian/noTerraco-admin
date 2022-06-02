import axios from 'axios';

const api = axios.create({
  baseURL: 'https://noterraco-menu.herokuapp.com'
});

export default api;