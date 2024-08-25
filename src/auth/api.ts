import axios, { AxiosRequestConfig } from "axios";
import * as CryptoJS from "crypto-js";
import { CustomAxiosInstance } from "./model/api";
import { snackActions } from "../utils/notification/snackbar-util";
import { verifyRequest } from "../utils/utils";

//NÃO MODIFICAR
export const SECURITY_KEY = "@Security_MRR@amcAMCfinancialFINANCIAL_@";

const api = axios.create({
  baseURL: "https://avegenaapi.erdeenterprise.com:8443",
  headers: {
    "Content-Type": "application/json",
  },
}) as CustomAxiosInstance;

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
// api.interceptors.response.use(
//   async (response) => {
//     const success = await verifyRequest(response);
//     if (success) {
//       snackActions.success(`Successfully`);
//     }
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       snackActions.error("Without authorization, please log in again");
//       localStorage.clear();
//       setTimeout(() => {
//         window.location.reload();
//       }, 3000);
//     }
//     return Promise.reject(error);
//   }
// );

api.sendForm = function (
  url: string,
  data: any,
  config: AxiosRequestConfig<any> | undefined
) {
  return this.post(url, data, {
    ...config,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

api.sendUpdateForm = function (
  url: string,
  data: any,
  config: AxiosRequestConfig<any> | undefined
) {
  return this.patch(url, data, {
    ...config,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export default api;
