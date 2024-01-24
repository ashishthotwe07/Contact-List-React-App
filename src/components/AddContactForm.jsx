import React, { useState, useEffect } from "react";
import "../Styles/AddContactForm.css";
import {  addContact, editContact } from "../redux/reducers/contactsReducers";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditForm && initialData) {
      setFormData(initialData);
    }
  }, [isEditForm, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
  
    try {
      if (isEditForm) {
        // dispatch(actions.edit({ index, data: formData }));
        await dispatch(editContact({ index, data: formData }));
        toast.success("Contact updated successfully");
      } else {
        await dispatch(addContact(formData));
        toast.success("Contact added successfully");
      }
  
      // Clear the form data after adding/editing the contact
      setFormData({ name: "", email: "", phone: "" });
  
      // Call the callback to close the modal
      onContactAdded();
    } catch (error) {
      console.error("Error adding/editing contact:", error);
      toast.error("Error adding/editing contact");
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e) => {
    // Update the form data as the user types
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-contact-form">
      <h3>{isEditForm ? "Edit Contact" : "Add Contact"}</h3>
      <button >close</button>
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

        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin />{" "}
              {isEditForm ? "Updating..." : "Adding..."}
            </>
          ) : isEditForm ? (
            "Edit"
          ) : (
            "Add"
          )}
        </button>
      </form>
    </div>
  );
}
