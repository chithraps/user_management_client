import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../../Features/AdminAction";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        email,
        password,
      });
      const { token, admin } = response.data;
      console.log(token,admin.email);
      dispatch(loginAdmin(admin, token));
      navigate("/admin/home");
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
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
        <button type="button" onClick={handleLogin} className="button">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
