import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { City, Server } from "../type";

export interface FilterState {
  buyCity: Record<City, boolean>;
  sellCity: Record<City, boolean>;
  server: Server;
}

const getCityInitialState = () => ({
  [City.FortSterling]: true,
  [City.Martlock]: true,
  [City.Bridgewatch]: true,
  [City.Lymhurst]: true,
  [City.Thetford]: true,
  [City.Caerleon]: false,
  [City.BlackMarket]: false,
});

const initialState: FilterState = {
  buyCity: getCityInitialState(),
  sellCity: getCityInitialState(),
  server: Server.EUROPE,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleBuyCity: (state, action: PayloadAction<City>) => {
      state.buyCity = {
        ...state.buyCity,
        [action.payload]: !state.buyCity[action.payload],
      };
    },
    toggleSellCity: (state, action: PayloadAction<City>) => {
      state.sellCity = {
        ...state.sellCity,
        [action.payload]: !state.sellCity[action.payload],
      };
    },
    updateServer: (state, action: PayloadAction<Server>) => {
      state.server = action.payload;
    },
  },
});

export const { toggleBuyCity, toggleSellCity, updateServer } =
  filterSlice.actions;

export const selectBuyCity = (state: RootState) => state.filter.buyCity;
export const selectSellCity = (state: RootState) => state.filter.sellCity;
export const selectServer = (state: RootState) => state.filter.server;

export default filterSlice.reducer;
