import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import './ViewProfile.css'

function ViewProfile({ isOpen, onRequestClose }) {
  const user = useSelector((state) => state.user);
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div>
        <h2>View Profile</h2>
       
        {user && (
          <div>
            <p>Name: {user.user.name}</p>
            <p>Email: {user.user.userEmail}</p>
            <p>Phone: {user.user.userPhone}</p>
           
          </div>
        )}
      </div>
      <button className="close-button" onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

export default ViewProfile;
