import React, { useEffect, useState } from 'react'
import './pagesCSS/homes.css'
import Navbar from './Navbar.jsx'
import Explore from './Explore.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/profile/all-users"
        )

        setUsers(res.data.users)

      } catch (error) {
        console.log(error)
      }

    }

    fetchUsers()

  }, [])

  const openUserProfile = (id) => {

    navigate(`/user/${id}`)

  }

  return (

    <div className="home-container">
      <div className="header-home">
        <h1 className='socialmedia-title'>SOCIAL MEDIA APP</h1>
        <p>&copy; All Rights Reserved To Hitesh Patil</p>
      </div>

      <div className="home-profiles">

        {users.map(user => (

          <div
            key={user.id}
            className="profile-card"
            onClick={() => openUserProfile(user.id)}
          >

            <img
              src={user.profilePhoto}
              alt={user.username}
              className="profile-img"
            />

            <p>{user.username}</p>

          </div>

        ))}

      </div>

      <div className="home-content">
        <Explore hideSearch={true} />
      </div>

      <Navbar />

    </div>

  )
}

export default Home