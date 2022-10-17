import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useApi } from "../../hooks/useApi";

const api = useApi();

export const getCategories = createAsyncThunk(
  "general/getCategories",
  async () => {
    const response = await api.get("/categories");
    return response.data;
  }
);

export const getCollections = createAsyncThunk(
  "general/getCollections",
  async () => {
    const response = await api.get("/my-collections");
    return response.data;
  }
);

export const getEthPriceInUSD = createAsyncThunk(
  "general/getEthPriceInUSD",
  async () => {
    const response = await axios.get(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    );
    return response.data;
  }
);

export const clearGeneralState = createAsyncThunk("general/clear", async () => {
  return null;
});
