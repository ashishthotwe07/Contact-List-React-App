// Importing configureStore from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Importing the ContactReducer from the contactsReducers file
import { ContactReducer } from "./reducers/contactsReducers";

// Creating the Redux store using configureStore
export const store = configureStore({
  reducer: {
    // Adding the ContactReducer to the store
    ContactReducer,
  },
});
