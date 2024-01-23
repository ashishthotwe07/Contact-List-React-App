import React, { useEffect, useState } from "react";
import "../Styles/ContactList.css";
import AddContactForm from "./AddContactForm";
import { useDispatch, useSelector } from "react-redux";

import {
  actions,
  contactSelector,
  getInitialState,
} from "../redux/reducers/contactsReducers";

function ContactList() {
  const [isAddContactModalOpen, setAddContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setEditContactModalOpen] = useState(false);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);
  const contacts = useSelector(contactSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialState());
  }, []);

  const handleEdit = (index) => {
    setSelectedContactIndex(index);
    setEditContactModalOpen(true);
  };

  const handleDelete = (index) => {
    dispatch(actions.delete(index));
  };

  const openAddContactModal = () => {
    setAddContactModalOpen(true);
  };

  const closeAddContactModal = () => {
    setAddContactModalOpen(false);
  };

  const closeEditContactModal = () => {
    setEditContactModalOpen(false);
    setSelectedContactIndex(null);
  };

  const handleContactAdded = () => {
    closeAddContactModal();
  };

  return (
    <>
      <div className="header">
        <h3>Contact List</h3>
        <button onClick={openAddContactModal}>Add Contact</button>
      </div>

      {/* AddContactForm as a modal */}
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
            <button className="delete-btn" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ContactList;
