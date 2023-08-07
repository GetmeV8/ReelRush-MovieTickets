import axios from "axios";
const authTokens = JSON.parse(localStorage.getItem('authTokens'))
const token = authTokens?.access
const baseURL= "http://localhost:8080" 
const instance = axios.create({
  baseURL,
  withCredentials:true,
  headers: {
    Authorization: `Bearer ${token}`
  }
});
export default instance;