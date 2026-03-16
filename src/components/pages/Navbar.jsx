import React from 'react'
import './pagesCSS/navstyle.css'
import { Link } from 'react-router-dom'

import { IoHomeOutline } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { MdOutlineCloudUpload } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";



const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to="/home" >
        <IoHomeOutline className='nav-link' />
      </Link>
      <Link to="/messages" >
        <LuMessagesSquare className='nav-link' />
      </Link>
      <Link to="/upload" >
        <MdOutlineCloudUpload className='nav-link' />
      </Link>
      <Link to="/explore" >
        <MdOutlineExplore className='nav-link' />
      </Link>
      <Link to="/profile" >
        <CgProfile className='nav-link' />
      </Link>
    </div>
  )
}

export default Navbar