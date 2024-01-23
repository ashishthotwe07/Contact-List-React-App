// contactsReducers.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [
    { name: "ashish", email: "ashishsthotwe@gmail.com", phone: 7821955932 },
  ],
};

export const getInitialState = createAsyncThunk(
  "contact/getInitialState",
  (_, thunkAPI) => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((json) => thunkAPI.dispatch(actions.setInitialState(json)));
  }
);

const ContactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.contacts = [...action.payload];
    },
    add: (state, action) => {
      state.contacts.push(action.payload);
    },
    delete: (state, action) => {
      const indexToDelete = action.payload;
      // Ensure the index is valid
      if (indexToDelete >= 0 && indexToDelete < state.contacts.length) {
        // Use splice to remove the contact at the specified index
        state.contacts.splice(indexToDelete, 1);
      }
    },
    edit: (state, action) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.contacts.length) {
        // Use map to update the contact at the specified index
        state.contacts = state.contacts.map((contact, i) =>
          i === index ? { ...contact, ...data } : contact
        );
      }

      console.log(data, index);
    },
  },
});

export const ContactReducer = ContactSlice.reducer;
export const actions = ContactSlice.actions;
export const contactSelector = (state) => state.ContactReducer.contacts;
