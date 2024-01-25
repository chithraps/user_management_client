import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminSignUp";

function AdminSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/admin/signup", {         
          email,        
          password,
        });

        const { data } = response;
        console.log(data.message);
        navigate('/admin')
    } catch (error) {
        console.error("Signup failed", error);
        console.error("Signup failed", error.response.data.error);
        setError(error.response.data.error); 
    }
  };
  return (
    <div className="container">
      <h2>Admin Sign Up</h2>
      <form className="form">
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </label>
        <button type="button" onClick={handleSubmit} className="button">
          Sign Up
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default AdminSignUp;
