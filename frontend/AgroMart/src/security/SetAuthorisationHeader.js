import axios from "axios";
export const setAuthorisationHeader = () =>{
    axios.interceptors.request.use(
      (config) => {
        
        const token = sessionStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
    
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }