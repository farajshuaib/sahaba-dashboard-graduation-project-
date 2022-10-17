import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { login, logout } from "./actions";

export interface AccountState {
  userData?: any;
}

const initialState: AccountState = {
  userData: null
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action:any) => {
      state.userData = action?.payload?.user || null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.userData = null;
    });
  },
});

export const accountData = (state: RootState) => state.account;

export default accountSlice.reducer;
