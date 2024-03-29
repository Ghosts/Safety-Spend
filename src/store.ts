import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import transactionsSlice from "./slices/transactionsSlice";
import recurrencesSlice from "./slices/recurrencesSlice";
import appSlice from "./slices/appSlice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { useDispatch } from "react-redux";

export const whiteList = ["app"];

const reducers = combineReducers({
  transactions: transactionsSlice.reducer,
  recurrences: recurrencesSlice.reducer,
  app: appSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: whiteList,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ["payload.date", "payload"],
      ignoredPaths: ["transactions.list", "app.currentDay"],
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const persistor = persistStore(store);
