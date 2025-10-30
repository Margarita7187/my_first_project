import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      error.message = 'Resource not found';
    } else if (error.response?.status >= 500) {
      error.message = 'Server error occurred';
    } else if (error.code === 'NETWORK_ERROR') {
      error.message = 'Network error - please check your connection';
    }
    
    return Promise.reject(error);
  }
);

// CRUD operations
export const itemsAPI = {
  // Get all items
  getAll: () => api.get('/items'),
  
  // Get single item
  getById: (id) => api.get(`/items/${id}`),
  
  // Create new item
  create: (itemData) => api.post('/items', itemData),
  
  // Update item
  update: (id, itemData) => api.put(`/items/${id}`, itemData),
  
  // Delete item
  delete: (id) => api.delete(`/items/${id}`),
};

export default api;