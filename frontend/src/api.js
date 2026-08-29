import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getTools = (params) => api.get('/tools', { params }).then(r => r.data);
export const getTool = (slug) => api.get(`/tools/${slug}`).then(r => r.data);
export const getCategories = () => api.get('/categories').then(r => r.data);

export default api;
