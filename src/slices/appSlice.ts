/* eslint-disable no-param-reassign */
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum Views {
  Transactions,
  Recurrences,
  Breakdown,
  Default,
}

type AppState = {
  openDays: number[];
  isEditing: boolean;
  currentView: Views;
  editingId: string;
};

const initialState: AppState = {
  openDays: [],
  isEditing: false,
  currentView: Views.Default,
  editingId: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOpenDays(state, action: PayloadAction<number[]>) {
      state.openDays = action.payload;
    },
    setView(state, action: PayloadAction<Views>) {
      state.currentView = action.payload;
    },
    setEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
    setEditingId(state, action: PayloadAction<string>) {
      state.editingId = action.payload;
    },
  },
});

export const {
  setOpenDays,
  setView,
  setEditing,
  setEditingId,
} = appSlice.actions;

export const updateEditingId = (editingId: string) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(setEditingId(editingId));
};

export const updateView = (view: Views) => async (dispatch: Dispatch<any>) => {
  dispatch(setView(view));
};

export const updateIsEditing = (isEditing: boolean) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(setEditing(isEditing));
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

const isEditing = (state: RootState) => state.app.isEditing;
const currentView = (state: RootState) => state.app.currentView;
const editingId = (state: RootState) => state.app.editingId;

export const appSelectors = {
  openDays,
  isEditing,
  currentView,
  editingId,
};
export default appSlice;
