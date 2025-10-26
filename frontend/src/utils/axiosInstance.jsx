import axios from 'axios';

// ✅ Use your backend’s deployed domain here:
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
 
});

export default axiosInstance;