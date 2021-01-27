/* eslint-disable no-param-reassign */
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AppState = {
  openDays: number[];
  editingTransaction: boolean;
  editingTransactionId: number;
};

const initialState: AppState = {
  openDays: [],
  editingTransaction: false,
  editingTransactionId: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOpenDays(state, action: PayloadAction<number[]>) {
      state.openDays = action.payload;
    },

    transactionEditing(state, action: PayloadAction<boolean>) {
      state.editingTransaction = action.payload;
    },
    transactionEditingId(state, action: PayloadAction<number>) {
      state.editingTransactionId = action.payload;
    },
  },
});

export const {
  setOpenDays,
  transactionEditing,
  transactionEditingId,
} = appSlice.actions;

export const setTransactionEditing = (editing: boolean) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(transactionEditing(editing));
};

export const setTransactionEditingId = (editingId: number) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(transactionEditingId(editingId));
};

export const toggleOpenDays = (days: number[] | number) => async (
  dispatch: Dispatch<any>
) => {
  if (typeof days === "number") {
    days = [days];
  }
  dispatch(setOpenDays(days));
};

const openDays = (state: RootState) => state.app.openDays;
const editingTransaction = (state: RootState) => state.app.editingTransaction;
const editingTransactionId = (state: RootState) =>
  state.app.editingTransactionId;

export const appSelectors = {
  openDays,
  editingTransaction,
  editingTransactionId,
};
export default appSlice;
