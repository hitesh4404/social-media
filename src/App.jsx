import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import "./app.css"
import { BrowserRouter } from "react-router";
import Login from "./components/login.jsx"
import Register from "./components/Register.jsx"
import Home from "./components/pages/home.jsx"
import Explore from "./components/pages/explore.jsx";
import Upload from "./components/pages/upload.jsx"
import Profile from './components/pages/profile.jsx';
import Messages from './components/pages/Messages.jsx';
import Updateprofile from './components/Updateprofile.jsx';
import Settings from './components/pages/Settings.jsx';
import Tempuser from './components/pages/Tempuser.jsx';
import Chat from './components/pages/Chat.jsx';
import DeleteAccount from './components/pages/DeleteAccount.jsx';
import Loader from './components/pages/Loader.jsx';


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);

  }, []);

  if (loading) {
    return <Loader />;
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/updateprofile" element={<Updateprofile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path='/Tempuser/:id' element={<Tempuser />} />
        <Route path="/user/:id" element={<Tempuser />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path='/deleteAccount' element={<DeleteAccount />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App