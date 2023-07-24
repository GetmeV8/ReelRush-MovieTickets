import axios from "axios";
const token = localStorage.getItem('token')
const baseURL= "http://localhost:8080" 
const instance = axios.create({
  baseURL,
  withCredentials:true,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default instance;