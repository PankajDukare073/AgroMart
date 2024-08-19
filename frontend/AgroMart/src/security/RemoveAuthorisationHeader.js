import axios from "axios";
export const removeAuthorisationHeader = () =>{
    axios.interceptors.request.use(
      (config) => {
          config.headers.Authorization = null;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }