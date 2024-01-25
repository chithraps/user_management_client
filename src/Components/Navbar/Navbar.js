import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Features/Actions";
import ViewProfile from "../ViewProfile/ViewProfile";
import EditProfile from "../EditProfile/EditProfile";
import "./Navbar.css";
function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [viewProfileModalOpen, setViewProfileModalOpen] = useState(false)
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false)
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const openViewProfileModal = () => {
    setViewProfileModalOpen(true);
  };

  const closeViewProfileModal = () => {
    setViewProfileModalOpen(false);
  };

  const openEditProfileModal = () => {
    setEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setEditProfileModalOpen(false);
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {user && user.user?.name && (
          <div className="navbar-user">
            <p>Welcome, {user.user.name}!</p>
            <div className="dropdown" onClick={toggleDropdown}>
              <button  className="dropbtn">My Profile</button> 
              <div className="dropdown-content">
                <button  onClick={openViewProfileModal}>View Profile</button>
                <button  onClick={openEditProfileModal}>Edit Profile</button>
              </div>
            </div>

            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <ViewProfile isOpen={viewProfileModalOpen} onRequestClose={closeViewProfileModal} user={user.user} />

      {/* Render the EditProfile modal */}
      <EditProfile isOpen={editProfileModalOpen} onRequestClose={closeEditProfileModal} />
    </nav>
  );
}

export default Navbar;
