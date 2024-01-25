import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from '../../../Features/AdminSlice'; 
import './AdminNavBar.css';

function NavBar() {
    const admin = useSelector((state)=>state.admin)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () =>{
        dispatch(logoutAdmin());
        navigate("/admin");
    }
  return (
    <nav>
      <div className="left-section">
        <p>Welcome, Admin!</p>
      </div>
      <div className="right-section">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default NavBar