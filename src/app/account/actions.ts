import { getCategories, getEthPriceInUSD } from "./../general/actions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearGeneralState, getCollections } from "../general/actions";
import { deleteToken, setToken, useApi } from "../../hooks/useApi";

const api = useApi();

export const connectToWallet = createAsyncThunk(
  "users/connectToWallet",
  async (wallet_address: string, thunkAPI) => {
    const response = await api.post("/connect-wallet", {
      wallet_address,
    });
    if (response?.data?.token) {
      setToken(response.data.token);
    }
    thunkAPI.dispatch(getCollections());
    thunkAPI.dispatch(getCategories());
    return response.data;
  }
);

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  const response = await api.post("/logout");
  deleteToken();
  thunkAPI.dispatch(clearGeneralState());
  return response.data;
});
