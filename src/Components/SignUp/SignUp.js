import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [error, setError] = useState(null);
  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!phone.trim()) {
      setPhoneError("Phone number is required");
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Invalid Phone number");
    } else {
      setPhoneError("");
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5000/signup", {
          name,
          email,
          phone,
          password,
        });

        const { data } = response;
        console.log(data.message);
        navigate("/");
      } catch (error) {
        console.error("Signup failed", error);
        console.error("Signup failed", error.response.data.error);
        setError(error.response.data.error);
      }
    }
  };
  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign up</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <div className="error-message">{nameError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneError && <div className="error-message">{phoneError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
        </div>
        <button type="submit">Signup</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default SignUp;
