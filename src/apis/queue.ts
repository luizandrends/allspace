import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.QUEUE_URL}/`,
});

export default api;
