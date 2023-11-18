import { AxiosInstance, AxiosRequestConfig } from "axios";

export interface CustomAxiosInstance extends AxiosInstance {
    sendForm: (url: string, data: any, config?: AxiosRequestConfig) => Promise<any>;
    sendUpdateForm: (url: string, data: any, config?: AxiosRequestConfig) => Promise<any>;
  }