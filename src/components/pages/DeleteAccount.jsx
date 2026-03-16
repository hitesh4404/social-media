import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./pagesCSS/settings.css"

const DeleteAccount = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const deleteUser = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/users/delete-user",
        { username, password }
      );

      if (res.data.success) {

        // remove login data
        localStorage.removeItem("user");

        // redirect to login
        navigate("/login");

      }


    } catch (err) {

      alert("Error deleting account");

    }

  };

  return (

    <div className="delete-acc-container">

      <h2>Delete Account</h2>

      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={deleteUser}>
        Delete Account
      </button>

    </div>

  );

};

export default DeleteAccount;