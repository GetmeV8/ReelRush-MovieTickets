
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080" 
  });
  
api.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("authTokens");
    if (tokenString) {
      const token = JSON.parse(tokenString);
      config.headers.Authorization = `Bearer ${token.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;