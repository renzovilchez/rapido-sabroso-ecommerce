import axios from 'axios';

const API_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/admin/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance as apiAxios };

export const api = {
  getMetodosPago: () => axiosInstance.get('/payment-methods'),
  crearMetodoPago: (data) => axiosInstance.post('/payment-methods', data),
  getClientePorCorreo: (email) => axiosInstance.get(`/customers/email/${email}`),
  crearPedido: (data) => axiosInstance.post('/orders', data),
  getPedido: (id) => axiosInstance.get(`/orders/${id}`),
  crearComprobante: (data) => axiosInstance.post('/receipts', data),
  getComprobantePorPedido: (id) => axiosInstance.get(`/receipts/order/${id}`),
};