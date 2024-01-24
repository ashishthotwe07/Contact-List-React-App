// ContactList.js

import React, { useState, useEffect } from "react";
import "../Styles/ContactList.css";
import AddContactForm from "./AddContactForm";
import { useDispatch, useSelector } from "react-redux";
import {
  contactSelector,
  deleteContact,
  getInitialState,
} from "../redux/reducers/contactsReducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactList() {
  const [isAddContactModalOpen, setAddContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setEditContactModalOpen] = useState(false);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);
  const contacts = useSelector(contactSelector);
  const isLoadingDeleteInitial = Array(contacts.length).fill(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(
    isLoadingDeleteInitial
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetching initial state of contacts
    dispatch(getInitialState());
  }, [dispatch]);

  const handleEdit = (index) => {
    // Opening the modal for editing a contact
    setSelectedContactIndex(index);
    setEditContactModalOpen(true);
  };

  const handleDelete = async (index) => {
    // Handling the deletion of a contact
    setIsLoadingDelete((prev) => {
      const newLoadingState = [...prev];
      newLoadingState[index] = true;
      return newLoadingState;
    });

    try {
      await dispatch(deleteContact(index));
      // Displaying success notification on successful deletion
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      // Displaying error notification on deletion error
      toast.error("Error deleting contact");
    } finally {
      setIsLoadingDelete((prev) => {
        const newLoadingState = [...prev];
        newLoadingState[index] = false;
        return newLoadingState;
      });
    }
  };

  const openAddContactModal = () => {
    // Opening the modal for adding a new contact
    setAddContactModalOpen(true);
  };

  const closeAddContactModal = () => {
    // Closing the modal for adding a new contact
    setAddContactModalOpen(false);
  };

  const closeEditContactModal = () => {
    // Closing the modal for editing a contact
    setEditContactModalOpen(false);
    setSelectedContactIndex(null);
  };

  const handleContactAdded = () => {
    // Handling the event when a new contact is added
    closeAddContactModal();
  };

  return (
    <>
      <div className="header">
        <h3>Contact List</h3>
        <button onClick={openAddContactModal}>Add Contact</button>
      </div>

      {isAddContactModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={closeAddContactModal}>
              &times;
            </button>
            <AddContactForm
              isAddContactModalOpen={isAddContactModalOpen}
              onContactAdded={handleContactAdded}
            />
          </div>
        </div>
      )}

      {isEditContactModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={closeEditContactModal}>
              &times;
            </button>
            <AddContactForm
              isAddContactModalOpen={isEditContactModalOpen}
              onContactAdded={closeEditContactModal}
              isEditForm={true}
              index={selectedContactIndex}
              initialData={contacts[selectedContactIndex]}
            />
          </div>
        </div>
      )}

      <div className="user-info">
        <p className="user-label userName">Name</p>
        <p className="user-label userEmail">Email</p>
        <p className="user-label userPhone">Phone</p>
      </div>
      {contacts.map((contact, index) => (
        <div key={index} className="contact-card">
          <div className="user-info">
            <p className="user userName">{contact.name}</p>
            <p className="user userEmail">{contact.email}</p>
            <p className="user userPhone">{contact.phone}</p>
          </div>
          <div>
            <button className="edit-btn" onClick={() => handleEdit(index)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(index)}
              disabled={isLoadingDelete[index]}
            >
              {isLoadingDelete[index] ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
