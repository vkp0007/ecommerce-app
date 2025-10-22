import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ecommerce-app-git-main-vinay-kumar-patels-projects.vercel.app/', // your backend URL
  withCredentials: true,
});

export default axiosInstance;
