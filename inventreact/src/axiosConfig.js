import axios from 'axios';

// Set default base URL
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';

// Allow cookies to be sent with requests
axios.defaults.withCredentials = true;

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to the headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // If we receive a 401 (Unauthorized) response, 
      // it means our token is no longer valid
      localStorage.removeItem('token');
      // Redirect to login page
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;