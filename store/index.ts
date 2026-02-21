import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { categoryApi } from "./services/categoryApi";
import { adminApi } from "./services/admin";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(categoryApi.middleware)
      .concat(adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
