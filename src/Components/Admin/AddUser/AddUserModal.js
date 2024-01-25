import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

function AddUserModal({ isOpen, onClose }) {
    const initialUserData = {
        name: '',
        email: '',
        phone: '',
        password: "",
      };
  const [newUserData, setNewUserData] = useState(initialUserData);

  const handleInputChange = (e) => {
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/addUser",
        newUserData
      );

      console.log("User added successfully:", response.data);
      setNewUserData(initialUserData);
      onClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add User Modal"
    >
      <div className="modal-header">
        <h2>Add User</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="modal-body">
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={newUserData.name}
          onChange={handleInputChange}
        />
        <label>Email: </label>
        <input
          type="text"
          name="email"
          value={newUserData.email}
          onChange={handleInputChange}
        />
        <label>Phone: </label>
        <input
          type="text"
          name="phone"
          value={newUserData.phone}
          onChange={handleInputChange}
        />
        <label>Password:</label>
          <input
            type="password"            
            name="password"
            value={newUserData.password}
            onChange={handleInputChange}
          />
      </div>
      <div className="modal-footer">
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </Modal>
  );
}

export default AddUserModal;
