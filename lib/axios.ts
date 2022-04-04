import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
  decompress: true,
});
axiosInstance.interceptors.response.use(
  (response: { data: unknown }) => response.data,
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  (error) => Promise.reject(error),
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
);
export default axiosInstance;
