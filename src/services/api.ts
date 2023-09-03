import axios from 'axios';

const api = axios.create({
  baseURL: 'https://noterracorestaurante.herokuapp.com'
});

export default api;