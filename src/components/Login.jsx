import axios from "axios";
import "./userLogin.css"
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


const login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/login",
        {
          username: username,
          password: password
        }
      );

      setMessage(res.data.message);

      console.log("User:", res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");

    } catch (error) {

      setMessage("Invalid username or password");

    }

  };

  return (
    <div className="user-details">

      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>

          <input type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />

          <input type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className='submit-button-l'>Login</button>
        </form>
        <div className='register-link'>
          <p>If Don't have account then</p>
          <Link to="/register">Register</Link>
        </div>
        <p>{message}</p>

      </div>
    </div>

  )
}

export default login