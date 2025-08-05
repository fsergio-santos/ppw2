import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { useCallback } from 'react';
import type { MensagemServidor } from '../../type/MensagemServidor';

export const http = axios.create({
  baseURL: import.meta.env.SERVIDOR || 'http://localhost:8000/rest',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const useApi = <T>() => {
  const getData = useCallback(async (url: string): Promise<AxiosResponse<MensagemServidor<T[]>>> => {
    const response = await http.get<MensagemServidor<T[]>>(url);
    return response;
  }, []);

  const getDataById = async (id: string | number, url: string): Promise<AxiosResponse<MensagemServidor<T>>> => {
    const response = await http.get<MensagemServidor<T>>(`${url}${id}`);
    return response;
  };

  const postData = async (url: string, body: unknown): Promise<AxiosResponse<MensagemServidor<T>>> => {
    const response = await http.post<MensagemServidor<T>>(url, body);
    return response;
  };

  const putData = async (
    id: string | number,
    url: string,
    body: unknown,
  ): Promise<AxiosResponse<MensagemServidor<T>>> => {
    const response = await http.put<MensagemServidor<T>>(`${url}${id}`, body);
    return response;
  };

  const deleteData = async (url: string, id: string | number): Promise<AxiosResponse<MensagemServidor<T>>> => {
    const response = await http.delete<MensagemServidor<T>>(`${url}${id}`);
    return response;
  };

  return {
    getData,
    getDataById,
    postData,
    putData,
    deleteData,
  };
};

export const useApiAuth = <T>() => {
  const getProfile = async (url: string): Promise<AxiosResponse<MensagemServidor<T>>> => {
    const response = await http.get<MensagemServidor<T>>(url);
    return response;
  };

  const postLogout = async (url: string): Promise<AxiosResponse<void>> => {
    const response = await http.post(url);
    return response;
  };

  return {
    getProfile,
    postLogout,
  };
};

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default http;
