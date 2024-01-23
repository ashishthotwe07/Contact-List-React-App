import React, { useState, useEffect } from "react";
import "../Styles/AddContactForm.css";
import { actions, addContact } from "../redux/reducers/contactsReducers";
import { useDispatch } from "react-redux";

export default function AddContactForm({
  isAddContactModalOpen,
  index,
  onContactAdded,
  isEditForm,
  initialData,
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (isEditForm && initialData) {
      setFormData(initialData);
    }
  }, [isEditForm, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the 'add' or 'edit' action with the contact object
    if (isEditForm) {
      // If it's an edit form, dispatch the 'edit' action with the updated data

      dispatch(actions.edit({ index, data: formData }));
    } else {
      // If it's an add form, dispatch the 'add' action with the contact object
      dispatch(addContact(formData));
      // dispatch(actions.add(formData));
    }

    // Clear the form data after adding/editing the contact
    setFormData({ name: "", email: "", phone: "" });

    // Call the callback to close the modal
    onContactAdded();
  };

  const handleChange = (e) => {
    // Update the form data as the user types
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-contact-form">
      <h3>{isEditForm ? "Edit Contact" : "Add Contact"}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
        />

        <button type="submit">{isEditForm ? "Edit" : "Add"}</button>
      </form>
    </div>
  );
}
