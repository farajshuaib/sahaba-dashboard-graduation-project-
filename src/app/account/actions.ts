import { getCategories, getEthPriceInUSD } from "./../general/actions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearGeneralState, getCollections } from "../general/actions";
import { deleteToken, setToken, useApi } from "../../hooks/useApi";

const api = useApi();

export const login = createAsyncThunk(
  "users/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await api.post("/login", credentials);
      if (response?.data?.token) {
        setToken(response.data.token);
      }
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const isLoggedIn = createAsyncThunk(
  "users/login",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/me");
      if (
        data?.user &&
        data.user.roles.some(
          (role: any) => role.name === "admin" || role.name === "super-admin"
        )
      ) {
        return thunkAPI.fulfillWithValue(data);
      }
      return thunkAPI.rejectWithValue({ data: { message: "Unauthorized" } });
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    const response = await api.post("/logout");
    deleteToken();
    thunkAPI.dispatch(clearGeneralState());
    return response.data;
  } catch (err: any) {
    thunkAPI.rejectWithValue(err.response);
  }
});
