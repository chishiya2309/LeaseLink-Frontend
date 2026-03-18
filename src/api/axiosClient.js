import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => (response && response.data !== undefined ? response.data : response),
  (error) => {
    console.error("Loi tu Server:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
