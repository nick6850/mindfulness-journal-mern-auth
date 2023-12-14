import { configureStore } from "@reduxjs/toolkit";
import authAndRecords from "./authAndRecords";

export const store = configureStore({
  reducer: { authAndRecords },
});
