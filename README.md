# Contact Management Application

## Overview

This project is a contact management application built using React, Redux, and Redux Toolkit. The application allows users to perform CRUD (Create, Read, Update, Delete) operations on contacts. It interacts with a mock backend API (JSONPlaceholder) for data retrieval and manipulation.

## Features

### 1. Contact List

- Displays a list of contacts with their names, emails, and phone numbers.
- Allows users to edit and delete contacts.

### 2. Add and Edit Contacts

- Provides a form for adding new contacts with fields for name, email, and phone number.
- Supports editing existing contacts with pre-filled form data.

### 3. Redux State Management

- Utilizes Redux and Redux Toolkit for efficient state management.
- Async thunks are used for handling API calls to fetch, add, edit, and delete contacts.

### 4. Notifications

- Displays notifications using the `react-toastify` library for success and error messages during contact operations.

## File Structure

```bash
|-- src
|   |-- components
|   |   |-- ContactList.js
|   |   |-- AddContactForm.js
|   |-- redux
|   |   |-- reducers
|   |   |   |-- contactsReducers.js
|   |   |-- store.js
|   |-- styles
|   |   |-- AddContactForm.css
|   |   |-- ContactList.css
|   |-- App.js
|-- README.md
