import axios from 'axios';

// ✅ Use your backend’s deployed domain here:
const axiosInstance = axios.create({
  baseURL: 'https://ecommerce-app-flame-theta.vercel.app/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;