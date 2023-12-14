import { configureStore } from "@reduxjs/toolkit";
import recordsSlice from "./recordsSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: { records: recordsSlice, auth: authSlice },
});
