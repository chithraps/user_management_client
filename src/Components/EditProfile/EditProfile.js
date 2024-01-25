import React,{useState} from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import '../ViewProfile/ViewProfile.css'

function EditProfile({ isOpen, onRequestClose }) {
    const user = useSelector((state) => state.user);
    const [editedUser,setEditedUser] = useState({
       name: user.user.name || '',
       email:user.user.userEmail||'',
       phone : user.user.userPhone || ''
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
          ...prevUser,
          [name]: value
        }));
      };
    
      
      const handleSubmit = (e) => {
        e.preventDefault();
        
        onRequestClose();
      };
    
      return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
              />
            </div>
            <button className="submit" type="submit">Submit</button>
          </form>
          <button className="close-button" onClick={onRequestClose}>
            Close
          </button>
        </Modal>
      );
}

export default EditProfile