import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./EditUserModal.css";

function EditUserModal({ isOpen, onClose, userId }) {
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    if (isOpen && userId) {
      axios
        .get(`http://localhost:5000/admin/fetchUser?userId=${userId}`)
        .then((response) => {
          const { userData } = response.data;
          setEditedUserData(userData);
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, [isOpen, userId]);
  const handleInputChange = (e) => {
    setEditedUserData({
      ...editedUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditUser = async () => {
    console.log(`Editing user with ID: ${userId}`, editedUserData);
    const response = await axios.post(
      `http://localhost:5000/admin/editUser?userId=${userId}`,
      editedUserData
    );

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit User Modal"
    >
      <div className="modal-header">
        <h2>Edit User</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="modal-body">
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={editedUserData.name}
          onChange={handleInputChange}
        />
        <label>Email: </label>
        <input
          type="text"
          name="email"
          value={editedUserData.email}
          onChange={handleInputChange}
        />
        <label>Phone: </label>
        <input
          type="text"
          name="phone"
          value={editedUserData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="modal-footer">
        <button onClick={handleEditUser}>Save Changes</button>
      </div>
    </Modal>
  );
}

export default EditUserModal;
