/* eslint-disable no-param-reassign */
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Transaction } from "../models/transaction";
import { getWeekEnd, getWeekStart } from "../utils/dates";
import { getRandomId } from "./../utils/common";
import { TransactionsApi } from "../api/transactions";

type TransactionsState = {
  loading: boolean;
  error: string;
  list: Transaction[];
};

const initialState: TransactionsState = {
  loading: false,
  error: "",
  list: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.list = [...state.list, action.payload];
      state.loading = false;
      state.error = "";
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      state.list = state.list.map((transaction) => {
        if (transaction.id === action.payload.id) {
          return action.payload;
        }
        return transaction;
      });
      state.loading = false;
      state.error = "";
    },
    removeTransaction(state, action: PayloadAction<string>) {
      state.list = [...state.list.filter((t) => t.id !== action.payload)];
      state.loading = false;
      state.error = "";
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.list = action.payload;
      state.loading = false;
      state.error = "";
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      state.error = "";
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  removeTransaction,
  setError,
  setLoading,
  setTransactions,
} = transactionsSlice.actions;

export const loadTransactions =
  (date?: Date) => (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch(setLoading(true));
    if (!date) date = new Date();
    const start = getWeekStart(date);
    const end = getWeekEnd(date);
    TransactionsApi.getTransactions(start, end, getState)
      .then((transactions) => {
        dispatch(setTransactions(transactions));
      })
      .catch((e: { toString: () => string }) => {
        console.log(e);
        dispatch(setError(e.toString()));
      });
  };

export const createTransaction =
  (transaction: Transaction) =>
  async (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch(setLoading(true));
    transaction.id = getRandomId();
    TransactionsApi.setTransaction(transaction, getState)
      .then((t: any) => {
        dispatch(addTransaction(transaction));
      })
      .catch((e: { toString: () => string }) => {
        console.log(e);
        dispatch(setError(e.toString()));
      });
  };

export const editTransaction =
  (transaction: Transaction) =>
  async (dispatch: Dispatch<any>, getState: () => RootState) => {
    TransactionsApi.setTransaction(transaction, getState)
      .then((t: any) => {
        dispatch(updateTransaction(transaction));
      })
      .catch((e: { toString: () => string }) => {
        console.log(e);
        dispatch(setError(e.toString()));
      });
  };

export const deleteTransaction =
  (id: string) =>
  async (dispatch: Dispatch<any>, getState: () => RootState) => {
    TransactionsApi.deleteTransaction(id, getState)
      .then((t: any) => {
        dispatch(removeTransaction(id));
      })
      .catch((e: { toString: () => string }) => {
        console.log(e);
        dispatch(setError(e.toString()));
      });
  };

const list = (state: RootState) => state.transactions.list;
const loading = (state: RootState) => state.transactions.loading;
const total = (state: RootState) =>
  state.transactions.list.length > 0
    ? state.transactions.list
        .map((item) => item.amount)
        .reduce((prev, next) => prev + next)
    : 0;

const byId = (id: string) => (state: RootState) =>
  state.transactions.list.find((t) => t.id === id);

const error = (state: RootState) => state.transactions.error;

export const transactionsSelectors = {
  error,
  list,
  loading,
  total,
  byId,
};
export default transactionsSlice;
