import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vast-river-34476.herokuapp.com/https://demoapi.remis.ng',
});

export default api;
