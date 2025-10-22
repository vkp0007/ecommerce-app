import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ecommerce-app-git-main-vinay-kumar-patels-projects.vercel.app/api', // your backend URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
