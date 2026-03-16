import axios from "axios";
import "./userLogin.css"
import { Link, Outlet } from 'react-router-dom';
import React, { useState } from 'react';





const register = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/register",
        {
          username,
          email,
          password
        }
      );

      setMessage(res.data.message);


      if (res.data.message === "User registered successfully") {
        // Save user in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const newUser = { id: users.length + 1, username, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        // Redirect to profile page
        navigate("/profile");
      }

    } catch (error) {

      setMessage("User already exists");

    }

  };

  return (
    <div className="user-details">

      <div className="register-container">
        <h1>Register</h1>
        <form className="register-form" onSubmit={handleRegister}>
          <input type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />

          <input type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <input type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Register</button>
        </form>
        <div className='Login-link'>
          <p>Already Account</p>
          <Link to="/login">Login</Link>
          <Outlet />
        </div>
        <p>{message}</p>
      </div>
    </div>

  )
}

export default register