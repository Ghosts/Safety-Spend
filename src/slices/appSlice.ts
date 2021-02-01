/* eslint-disable no-param-reassign */
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AppState = {
  openDays: number[];
  editingTransaction: boolean;
  editingTransactionId: number;
  managingRecurrences: boolean;
  editingRecurrence: boolean;
  editingRecurrenceId: number;
};

const initialState: AppState = {
  openDays: [],
  editingTransaction: false,
  editingTransactionId: 0,
  managingRecurrences: false,
  editingRecurrence: false,
  editingRecurrenceId: 0,
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
    managingRecurrences(state, action: PayloadAction<boolean>) {
      state.managingRecurrences = action.payload;
    },
    recurrenceEditing(state, action: PayloadAction<boolean>) {
      state.editingRecurrence = action.payload;
    },
    recurrenceEditingId(state, action: PayloadAction<number>) {
      state.editingRecurrenceId = action.payload;
    },
  },
});

export const {
  setOpenDays,
  transactionEditing,
  transactionEditingId,
  managingRecurrences,
  recurrenceEditing,
  recurrenceEditingId,
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

export const setRecurrenceEditing = (editing: boolean) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(recurrenceEditing(editing));
};

export const setRecurrenceEditingId = (editingId: number) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(recurrenceEditingId(editingId));
};

export const setManagingRecurrences = (managing: boolean) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(managingRecurrences(managing));
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
const areManagingRecurrences = (state: RootState) =>
  state.app.managingRecurrences;
const editingRecurrence = (state: RootState) => state.app.editingRecurrence;
const editingRecurrenceId = (state: RootState) => state.app.editingRecurrenceId;

export const appSelectors = {
  openDays,
  editingTransaction,
  editingTransactionId,
  areManagingRecurrences,
  editingRecurrence,
  editingRecurrenceId,
};
export default appSlice;
