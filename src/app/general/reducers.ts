import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  clearGeneralState,
  getCategories,
  getCollections,
  getEthPriceInUSD,
} from "./actions";

export interface GeneralState {
  categories: Category[] | null;
  myCollections: Collection[] | null;
  ethPrice: number | null;
  notifications: any[];
  notificationsLength: number;
}

const initialState: GeneralState = {
  categories: null,
  myCollections: null,
  ethPrice: null,
  notifications: [],
  notificationsLength: 0,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      return {
        ...state,
        notifications: action.payload,
      };
    },
    setNotificationsLength: (state, action) => {
      return {
        ...state,
        notificationsLength: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getCollections.fulfilled, (state, action) => {
      state.myCollections = action.payload?.data;
    });
    builder.addCase(getEthPriceInUSD.fulfilled, (state, action) => {
      state.ethPrice = action.payload.USD;
    });
    builder.addCase(clearGeneralState.fulfilled, (state, action) => {
      state.myCollections = null;
    });
  },
});

export const { setNotifications, setNotificationsLength } =
  generalSlice.actions;

export const generalData = (state: RootState) => state.general;

export default generalSlice.reducer;
