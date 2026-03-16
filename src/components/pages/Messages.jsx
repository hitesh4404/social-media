import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pagesCSS/chatstyle.css";
import { useNavigate } from "react-router-dom";
import "./Navbar"
import Navbar from "./Navbar";

const Messages = () => {

  const [users, setUsers] = useState([])
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  useEffect(() => {

    axios.get("http://localhost:5000/api/profile/all-users")
      .then(res => {
        const filtered = res.data.users.filter(
          u => u.id !== currentUser.id
        )
        setUsers(filtered)
      })

  }, [])

  const openChat = (id) => {
    navigate(`/chat/${id}`)
  }

  return (

    <div className="messages-container">

      <h2 className="msg-title">Messages</h2>

      <div className="users-list">

        {users.map(user => (

          <div
            key={user.id}
            className="user-row"
            onClick={() => openChat(user.id)}
          >

            <img
              src={user.profilePhoto}
              alt=""
              className="user-avatar"
            />

            <span className="username">
              {user.username}
            </span>

          </div>

        ))}

      </div>
      <Navbar />
    </div>

  )

}

export default Messages;