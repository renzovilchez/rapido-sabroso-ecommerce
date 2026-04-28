import axios from 'axios';
const API_URL = "http://localhost:5000/api";

export const api = {
  getMetodosPago: () => axios.get(`${API_URL}/payment-methods`),
  crearMetodoPago: (data) => axios.post(`${API_URL}/payment-methods`, data),
  getClientePorCorreo: (email) => axios.get(`${API_URL}/customers/email/${email}`),
  crearPedido: (data) => axios.post(`${API_URL}/orders`, data),
  getPedido: (id) => axios.get(`${API_URL}/orders/${id}`),
  crearComprobante: (data) => axios.post(`${API_URL}/receipts`, data),
  getComprobantePorPedido: (id) => axios.get(`${API_URL}/receipts/order/${id}`),
};