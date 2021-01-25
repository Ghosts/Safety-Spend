/* eslint-disable no-param-reassign */
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Transaction } from "../models/transaction";

type TransactionsState = {
  loading: boolean;
  list: Transaction[];
};

const initialState: TransactionsState = {
  loading: false,
  list: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      action.payload.id = state.list.length + 1;
      state.list = [...state.list, action.payload];
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      state.list = state.list.map((transaction) => {
        if (transaction.id === action.payload.id) {
          return action.payload;
        }
        return transaction;
      });
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  setLoading,
} = transactionsSlice.actions;

export const createTransaction = (transaction: Transaction) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(setLoading(true));
  dispatch(addTransaction(transaction));
  dispatch(setLoading(false));
};

export const editTransaction = (transaction: Transaction) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(setLoading(true));
  dispatch(updateTransaction(transaction));
  dispatch(setLoading(false));
};

const list = (state: RootState) => state.transactions.list;
const loading = (state: RootState) => state.transactions.loading;
const total = (state: RootState) =>
  state.transactions.list.length > 0
    ? state.transactions.list
        .map((item) => item.amount)
        .reduce((prev, next) => prev + next)
    : 0;

const byId = (id: number) => (state: RootState) =>
  state.transactions.list.find((t) => t.id === id);
export const transactionsSelectors = { list, loading, total, byId };
export default transactionsSlice;
