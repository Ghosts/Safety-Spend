/* eslint-disable no-param-reassign */
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Recurrence } from "../models/recurrence";
import { RecurrencesApi } from "../api/recurrences";
import { getRandomId } from "../utils/common";

type RecurrencesState = {
  loading: boolean;
  list: Recurrence[];
  error: string;
};

const initialState: RecurrencesState = {
  loading: false,
  list: [],
  error: "",
};

const recurrencesSlice = createSlice({
  name: "recurrences",
  initialState,
  reducers: {
    addRecurrence(state, action: PayloadAction<Recurrence>) {
      state.list = [...state.list, action.payload];
      state.loading = false;
      state.error = "";
    },
    updateRecurrence(state, action: PayloadAction<Recurrence>) {
      state.list = state.list.map((transaction) => {
        if (transaction.id === action.payload.id) {
          return action.payload;
        }
        return transaction;
      });
      state.loading = false;
      state.error = "";
    },
    removeRecurrence(state, action: PayloadAction<string>) {
      state.list = [...state.list.filter((t) => t.id !== action.payload)];
      state.loading = false;
      state.error = "";
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      state.error = "";
    },
    setRecurrences(state, action: PayloadAction<Recurrence[]>) {
      state.list = action.payload;
      state.loading = false;
      state.error = "";
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  addRecurrence,
  updateRecurrence,
  setLoading,
  removeRecurrence,
  setRecurrences,
  setError,
} = recurrencesSlice.actions;

export const loadRecurrences =
  () => (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch(setLoading(true));
    RecurrencesApi.getRecurrences(getState)
      .then((recurrences) => {
        dispatch(setRecurrences(recurrences));
      })
      .catch((e) => {
        console.log(e);
        dispatch(setError(e.toString()));
      });
  };

export const createRecurrence =
  (recurrence: Recurrence) =>
  async (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch(setLoading(true));
    recurrence.id = getRandomId();
    RecurrencesApi.setRecurrence(recurrence, getState)
      .then(() => {
        dispatch(addRecurrence(recurrence));
      })
      .catch((e) => {
        console.log(e);
        dispatch(setError(e.toString()));
      });
  };

export const editRecurrence =
  (recurrence: Recurrence) =>
  async (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch(setLoading(true));
    RecurrencesApi.setRecurrence(recurrence, getState)
      .then(() => {
        dispatch(updateRecurrence(recurrence));
      })
      .catch((e) => {
        console.log(e);
        dispatch(setError(e.toString()));
      });
  };

export const deleteRecurrence =
  (id: string) =>
  async (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch(setLoading(true));

    RecurrencesApi.deleteRecurrence(id, getState)
      .then(() => {
        dispatch(removeRecurrence(id));
      })
      .catch((e) => {
        console.log(e);
        dispatch(setError(e.toString()));
      });
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

const error = (state: RootState) => state.recurrences.error;

export const recurrencesSelectors = { error, list, loading, total, byId };
export default recurrencesSlice;
