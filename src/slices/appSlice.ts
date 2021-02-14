/* eslint-disable no-param-reassign */
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { RootState } from "../store";
import { getWeekEnd, getWeekStart } from "../utils/dates";

export enum Views {
  Transactions,
  Recurrences,
  Default,
  Settings,
}

type AppState = {
  openDays: number[];
  isEditing: boolean;
  currentView: Views;
  editingId: string;
  currentUser: User | null;
  currentDay: string;
};

const initialState: AppState = {
  openDays: [],
  isEditing: false,
  currentView: Views.Default,
  editingId: "",
  currentUser: null,
  currentDay: new Date().toISOString(),
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
    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    setCurrentDay(state, action: PayloadAction<string>) {
      state.currentDay = action.payload;
    },
  },
});

export const {
  setOpenDays,
  setView,
  setEditing,
  setEditingId,
  setCurrentUser,
  setCurrentDay,
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

export const goLastWeek = () => async (
  dispatch: Dispatch<any>,
  getState: () => RootState
) => {
  return new Promise((resolve, reject) => {
    const currentDay = new Date(getState().app.currentDay);
    const weekStart = getWeekStart(currentDay);
    weekStart.setDate(weekStart.getDate() - 6);
    dispatch(setCurrentDay(weekStart.toISOString()));
    resolve("");
  });
};

export const goNextWeek = () => async (
  dispatch: Dispatch<any>,
  getState: () => RootState
) => {
  return new Promise<void>((resolve, reject) => {
    const currentDay = new Date(getState().app.currentDay);
    const weekEnd = getWeekEnd(currentDay);
    weekEnd.setDate(weekEnd.getDate() + 6);
    dispatch(setCurrentDay(weekEnd.toISOString()));
    resolve();
  });
};

export const toggleOpenDays = (days: number[] | number) => async (
  dispatch: Dispatch<any>
) => {
  if (typeof days === "number") {
    days = [days];
  }
  dispatch(setOpenDays(days));
};

export const updateCurrentUesr = (user: User) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(setCurrentUser(user));
};

const openDays = (state: RootState) => state.app.openDays;
const isEditing = (state: RootState) => state.app.isEditing;
const currentView = (state: RootState) => state.app.currentView;
const editingId = (state: RootState) => state.app.editingId;
const currentUser = (state: RootState) => state.app.currentUser;
const currentDay = (state: RootState) => state.app.currentDay;

export const appSelectors = {
  openDays,
  isEditing,
  currentView,
  editingId,
  currentUser,
  currentDay,
};
export default appSlice;
