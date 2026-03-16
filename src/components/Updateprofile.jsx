import React, { useState, useEffect } from "react";
import axios from "axios";
import './pages/pagesCSS/profiles.css'

function Updateprofile() {

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));



  useEffect(() => {

    if (!user) return;

    axios
      .get(`http://localhost:5000/api/profile/get-profile/${user.id}`)
      .then((res) => {

        const data = res.data.user;

        setUsername(data.username || "");
        setName(data.name || "");
        setBio(data.bio || "");
        setProfilePhoto(data.profilePhoto || "");


      })
      .catch((err) => {
        console.log(err);

        setMessage(
          error.response?.data?.message || "Update failed");
        setTimeout(() => {
          setMessage("");
        }, 5000);
        setMessageType("error");
      });

  }, []); // runs only once

  const updateProfile = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/profile/update-profile",
        {
          id: user.id,
          username,
          name,
          bio,
          profilePhoto
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage(res.data.message);
      setMessageType("success");

      setTimeout(() => {
        setMessage("");
      }, 5000);



    } catch (error) {

      console.log(error);
      alert("Update failed");

    }

  };


  return (

    <div className="update-profile-container">

      <h2 className="profile-name">Update Profile</h2>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="profile photo url"
        value={profilePhoto}
        onChange={(e) => setProfilePhoto(e.target.value)}
      />
      <button
        className="clear-btn"
        onClick={() => setProfilePhoto("")}
      >
        Clear Photo URL
      </button>

      <textarea
        placeholder="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <button onClick={updateProfile}>
        Update Profile
      </button>

      <p>{message && <p>{message}</p>}</p>

    </div>
  );

}

export default Updateprofile;