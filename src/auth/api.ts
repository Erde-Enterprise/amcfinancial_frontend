import axios from "axios";
import * as CryptoJS from 'crypto-js';

//NÃO MODIFICAR
export const SECURITY_KEY = "@Security_MRR@amcAMCfinancialFINANCIAL_@"

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const descrypt = CryptoJS.AES.decrypt(storedUser, SECURITY_KEY);
      const user = JSON.parse(descrypt.toString(CryptoJS.enc.Utf8));
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
