import { useWeb3React } from "@web3-react/core";
import axios, { AxiosInstance } from "axios";

let api: AxiosInstance;

export function createApi() {
  api = axios.create({
    baseURL:
      // "http://127.0.0.1:8000/api",
      "https://sahabanft.bluespace.ly/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
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
  api.defaults.params.chainId = window.ethereum.networkVersion;
  api.defaults.baseURL =
    window.ethereum.networkVersion == 5
      ? "https://sahabanft.bluespace.ly/api" // testnet
      : "https://sahabanft.bluespace.ly/api"; // mainnet
  return api;
}
