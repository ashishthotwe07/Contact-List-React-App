import { configureStore } from "@reduxjs/toolkit";
import { ContactReducer } from "./reducers/contactsReducers";

export const store = configureStore({
  reducer: {
    ContactReducer,
  },
});
