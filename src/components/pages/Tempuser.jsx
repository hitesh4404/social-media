import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./pagesCSS/profiles.css";

import ProfilePosts from "./ProfilePosts";

const Tempuser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${id}`);
        setUserData(res.data.user);
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/user/${id}`);
        setPosts(res.data);
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };

    fetchUser();
    fetchPosts();

  }, [id]);


  if (!userData) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div className="user-profile-container">
      <div className="header-user-temp">
        <p className="username-temp">{userData.username}</p>
      </div>
      <div className="user-profile-details">
        <img
          src={userData.profilePhoto}
          alt=""
          className="user-profile-image"
        />

        <h2 className="user-profile-name">{userData.name}</h2>
        <p className="user-profile-bio">{userData.bio}</p>


      </div>
      <div className="user-content">
        <ProfilePosts userId={id} hideDelete={true} />
      </div>

    </div>
  );
};

export default Tempuser;