/* eslint-disable no-param-reassign */
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Recurrence } from "../models/recurrence";

type RecurrencesState = {
  loading: boolean;
  list: Recurrence[];
};

const initialState: RecurrencesState = {
  loading: false,
  list: [],
};

const recurrencesSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    addRecurrence(state, action: PayloadAction<Recurrence>) {
      action.payload.id = "" + state.list.length + 1;
      state.list = [...state.list, action.payload];
    },
    updateRecurrence(state, action: PayloadAction<Recurrence>) {
      state.list = state.list.map((transaction) => {
        if (transaction.id === action.payload.id) {
          return action.payload;
        }
        return transaction;
      });
    },
    removeRecurrence(state, action: PayloadAction<string>) {
      state.list = [...state.list.filter((t) => t.id !== action.payload)];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  addRecurrence,
  updateRecurrence,
  setLoading,
  removeRecurrence,
} = recurrencesSlice.actions;

export const createRecurrence = (recurrence: Recurrence) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(setLoading(true));
  dispatch(addRecurrence(recurrence));
  dispatch(setLoading(false));
};

export const editRecurrence = (recurrence: Recurrence) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(setLoading(true));
  dispatch(updateRecurrence(recurrence));
  dispatch(setLoading(false));
};

export const deleteRecurrence = (id: string) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(setLoading(true));
  dispatch(removeRecurrence(id));
  dispatch(setLoading(false));
};

const list = (state: RootState) => state.recurrences.list;
const loading = (state: RootState) => state.recurrences.loading;
const total = (state: RootState) =>
  state.recurrences.list.length > 0
    ? state.recurrences.list
        .map((item) => item.amount)
        .reduce((prev, next) => prev + next)
    : 0;

const byId = (id: string) => (state: RootState) =>
  state.recurrences.list.find((t) => t.id === id);

export const recurrencesSelectors = { list, loading, total, byId };
export default recurrencesSlice;
