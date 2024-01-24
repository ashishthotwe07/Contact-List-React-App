// Importing necessary modules from Redux Toolkit and Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state of the contacts
const initialState = {
  contacts: [
    { name: "ashish", email: "ashishsthotwe@gmail.com", phone: 7821955932 },
  ],
};

// Async thunk to fetch the initial state of contacts
export const getInitialState = createAsyncThunk(
  "todo/getInitialState",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
);

// Async thunk to add a new contact
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

// Async thunk to delete a contact
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (index) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${index}`, {
      method: "DELETE",
    });
    return index; // Return the index of the deleted contact
  }
);

// Async thunk to edit/update a contact
export const editContact = createAsyncThunk(
  "contact/editContact",
  async ({ index, data }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${index + 1}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log("Response from API:", response);
    const updatedContact = await response.json();
    console.log("Updated Contact:", updatedContact);
    return { index, data: updatedContact };
  }
);

// Redux Toolkit slice for managing the contact state
const ContactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // Reducer to handle editing a contact
    edit: (state, action) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.contacts.length) {
        // Update the contact at the specified index
        state.contacts = state.contacts.map((contact, i) =>
          i === index ? { ...contact, ...data } : contact
        );
      }
    },
  },
  extraReducers: (builder) => {
    // Reducers for handling asynchronous actions (fulfilled actions)
    builder.addCase(getInitialState.fulfilled, (state, action) => {
      // Update contacts with the fetched data
      state.contacts = [...action.payload];
    });
    builder.addCase(addContact.fulfilled, (state, action) => {
      // Add the newly created contact to the state
      state.contacts.push(action.payload);
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      const indexToDelete = action.payload;
      if (indexToDelete >= 0 && indexToDelete < state.contacts.length) {
        // Remove the contact at the specified index
        state.contacts.splice(indexToDelete, 1);
      }
    });
    builder.addCase(editContact.fulfilled, (state, action) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.contacts.length) {
        // Update the contact at the specified index
        state.contacts = state.contacts.map((contact, i) =>
          i === index ? { ...contact, ...data } : contact
        );
      }
    });
  },
});

// Exporting reducer, actions, and selector
export const ContactReducer = ContactSlice.reducer;
export const actions = ContactSlice.actions;
export const contactSelector = (state) => state.ContactReducer.contacts;
