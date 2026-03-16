import Navbar from './Navbar.jsx'
import "./pagesCSS/explorestyle.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, useNavigate, Link } from 'react-router-dom';

const explore = ({ hideSearch }) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    // Fetch all posts from backend
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/explore");
        setPosts(res.data);
        setFilteredPosts(res.data);
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const filtered = posts.filter(
    post =>
      post.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLike = async (postId) => {

    const user = JSON.parse(localStorage.getItem("user"));

    try {

      const res = await axios.post(
        "http://localhost:5000/api/posts/toggle-like",
        {
          postId,
          userId: user.id
        }
      );

      setPosts(prev =>
        prev.map(post =>
          post.id === postId
            ? { ...post, likes: res.data.likes }
            : post
        )
      );

    } catch (err) {
      console.log("Like error:", err);
    }

  };


  return (
    <div className="explore-page">
      {!hideSearch && (
        <div className="explore-search">
          <input
            type="text"
            placeholder="Search posts or users..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      )}


      <div className="explore-container">
        {filtered.map((post) => (
          <div key={post.id} className="explore-item">
            <div className="post-header">

              <Link to={`/Tempuser/${post.userId}`}>
                <img src={post.profilePhoto} className="post-dp" />
              </Link>

              <Link to={`/Tempuser/${post.userId}`}>
                <span className="post-username">{post.username}</span>
              </Link>

            </div>

            <Link to={`/Tempuser/${post.userId}`}>
              <img src={post.imageUrl} alt={post.caption} />
              <p className="post-username">@{post.username}</p>
            </Link>

            <div className="post-actions">

              <button
                className="like-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(post.id);
                }}
              >
                ❤️
              </button>

              <span className="like-count">
                {post.likes ? post.likes.length : 0} likes
              </span>

            </div>

          </div>
        ))}
      </div>
      <Navbar />
    </div>
  );
};

export default explore;