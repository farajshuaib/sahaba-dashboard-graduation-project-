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

function setChaidId() {
  if (import.meta.env.MODE === "development") return;
  api.defaults.params.chainId = window?.ethereum ? window?.ethereum?.networkVersion || 5 : 5;
}

export function useApi() {
  if (!api) {
    createApi();
  }

  setChaidId();

  return api;
}
