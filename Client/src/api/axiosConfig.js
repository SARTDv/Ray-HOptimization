import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000', // Valor por defecto para desarrollo
  headers: {
    'Content-Type': 'application/json',
    // Aquí puedes agregar headers comunes como tokens de autenticación
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response.data, // Extraemos solo los datos de la respuesta
  (error) => {
    // Manejo centralizado de errores
    if (error.response) {
      console.error('Error de respuesta:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Error de solicitud:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;