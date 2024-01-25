import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { login } from '../../Features/Actions';
import axios from 'axios';
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      const { token,user } = response.data;
        
      dispatch(login(user, token)); 
      navigate('/home');
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
  }

};
  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
