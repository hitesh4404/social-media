import './pagesCSS/profiles.css'
import Navbar from './Navbar.jsx'
import axios from 'axios'
import ProfilePosts from './ProfilePosts.jsx'
import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IoSettingsOutline } from "react-icons/io5";




const profile = () => {

  const [userData, setUserData] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        try {
          const res = await axios.get(`http://localhost:5000/api/profile/get-profile/${user.id}`);
          if (res.data.success) {
            setUserData(res.data.user);
          }
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
        }
      }
    };

    fetchUser();
  }, []);

  if (!userData) return <p>Loading...</p>;





  return (
    <div className="profile-container">
      <div className="profile-update">
        <h1>{userData?.username}</h1>
        <Link to={"/settings"} >
          <IoSettingsOutline className='setting-logo' />

        </Link>
        <Outlet />


      </div>
      <div className="profile-details">
        <img
          src={userData?.profilePhoto}
          alt=""
          className="profile-image"
        />
        <h2 className="profile-name">{userData?.name}</h2>
        <p className="profile-bio">{userData?.bio}</p>

      </div>
      <div className="user-content">
        <ProfilePosts />
      </div>
      <Navbar />

    </div>
  )
}

export default profile