import axios from 'axios';
import {API_CONFIG} from '../../constants/api';

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    console.log('Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('Error:', error.message);

    if (error.response) {
      console.error(
        'Server Error:',
        error.response.status,
        error.response.data,
      );
    } else if (error.request) {
      console.error('Network Error: No response received');
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
