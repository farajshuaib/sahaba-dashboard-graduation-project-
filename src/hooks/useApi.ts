import axios, { AxiosInstance } from "axios";

let api: AxiosInstance;

export function createApi() {
  api = axios.create({
    baseURL:  "https://api.sahabanft.com.ly/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    params: {
      locale: "ar",
    },
  });

  const token = localStorage.getItem("token");
  if (token) setToken(token);

  return api;
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function deleteToken() {
  localStorage.removeItem("token");
  delete api.defaults.headers.common.Authorization;
}


export function useApi() {
  if (!api) {
    createApi();
  }

  return api;
}
