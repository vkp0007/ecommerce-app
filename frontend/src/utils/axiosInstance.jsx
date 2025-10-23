import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ecommerce-app-flame-theta.vercel.app/api', // your backend URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
