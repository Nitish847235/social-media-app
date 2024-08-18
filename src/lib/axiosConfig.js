import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_HOST

const axiosApp = axios.create({
    baseURL,
    withCredentials: true
})

axiosApp.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      window.location.href = '/login'; // Change '/login' to your actual login page URL
    }
    return Promise.reject(error.response.data.err);
  }
);

export default axiosApp;