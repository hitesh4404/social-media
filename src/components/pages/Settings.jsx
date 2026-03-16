import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./Navbar"
import Navbar from './Navbar'
import "./pagesCSS/settings.css"

const Settings = () => {
  return (
    <div className='setting-container'>
      <div className="header">
        <h1>Settings</h1>
      </div>
      <div className="update-profile-btn">
        <Link to={"/updateprofile"} ><p>Update Profile</p></Link>
      </div>
      <div className="delete-account-btn">
        <Link to={"/deleteAccount"}> <p>Delete Account</p></Link>
        <Outlet />
      </div>
      <footer>&copy; All Rights Reserved To Hitesh Patil</footer>
      <Navbar />
    </div>
  )
}

export default Settings