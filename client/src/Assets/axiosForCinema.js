// import axios from "axios";
// const token = localStorage.getItem('Cinematoken')
// const baseURL= "http://localhost:8080" 
// const instance = axios.create({
//   baseURL,
//   withCredentials:true,
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });
// export default instance;


import axios from "axios";

const baseURL = "http://localhost:8080";
const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("Cinematoken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;



