// contactsReducers.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  contacts: [
    { name: "ashish", email: "ashishsthotwe@gmail.com", phone: 7821955932 },
  ],
};

export const getInitialState = createAsyncThunk(
  "todo/getInitialState",
  // (args, thunkAPI) => {
  //   axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
  //     console.log(res.data);

  //     thunkAPI.dispatch(actions.setInitializeState(res.data));
  //   });
  // }

  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  "contact/addContact",
  async (payload) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return response.json();
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (index) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${index}`, {
      method: "DELETE",
    });
    return index; // Return the index of the deleted contact
  }
);


const ContactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(getInitialState.fulfilled, (state, action) => {
      state.contacts = [...action.payload];
    });
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.contacts.push(action.payload);
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      const indexToDelete = action.payload;
      // Ensure the index is valid
      if (indexToDelete >= 0 && indexToDelete < state.contacts.length) {
        // Use splice to remove the contact at the specified index
        state.contacts.splice(indexToDelete, 1);
      }
    });
    
  },
});

export const ContactReducer = ContactSlice.reducer;
export const actions = ContactSlice.actions;
export const contactSelector = (state) => state.ContactReducer.contacts;
