import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pagesCSS/profiles.css";

const ProfilePosts = ({ userId, hideDelete }) => {

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserId = userId ? userId : user.id;

  const userLiked = selectedPost?.likes?.includes(user.id);

  const likePost = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    try {

      const res = await axios.post(
        "http://localhost:5000/api/posts/toggle-like",
        {
          postId: selectedPost.id,
          userId: user.id
        }
      );

      setSelectedPost({
        ...selectedPost,
        likes: res.data.likes
      });



    } catch (error) {
      console.log(error);
    }

  };


  const addComment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!commentText) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts/add-comment",
        {
          postId: selectedPost.postId,
          userId: user.id,
          username: user.username,
          text: commentText
        }
      );

      setSelectedPost({
        ...selectedPost,
        comments: res.data.comments
      });

      setCommentText(""); // clear input

    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/posts/delete-comment/${selectedPost.id}/${commentId}`
      );

      // Update UI with returned comments
      setSelectedPost((prev) => ({
        ...prev,
        comments: res.data.comments,
      }));
    } catch (error) {
      console.log("Delete comment error:", error);
    }
  };


  useEffect(() => {

    axios
      .get(`http://localhost:5000/api/posts/user-posts/${currentUserId}`)
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err));

  }, [currentUserId]);



  const openPost = (post) => {
    setSelectedPost(post);
  };



  const deletePost = async (postId) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/posts/delete-post/${postId}`
      );

      setPosts(posts.filter((p) => p.id !== postId));

      setSelectedPost(null);

    } catch (error) {
      console.log(error);
    }

  };



  return (

    <div className="grid-container">

      {posts.map((post) => (

        <div
          key={post.postId}
          className="grid-item"
          onClick={() => openPost(post)}
        >

          <img src={post.imageUrl} alt="post" />

        </div>

      ))}


      {selectedPost && (
        <div className="post-modal" onClick={() => setSelectedPost(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <img src={selectedPost.imageUrl} alt="post" />

            <div className="details">
              <p><strong>{selectedPost.username}</strong></p>
              <p>{selectedPost.caption}</p>
              <p>{selectedPost.likes?.length || 0} Likes</p>

              <button onClick={likePost}>
                {userLiked ? "❤️ Liked" : "🤍 Like"}
              </button>

              <div className="comments-section">
                {selectedPost.comments?.map((c) => (
                  <p key={c.commentId}>
                    <strong>{c.username}:</strong> {c.text}
                    {c.userId.toString() === user.id.toString() && (
                      <button onClick={() => deleteComment(c.commentId)}>Delete</button>
                    )}
                  </p>
                ))}
              </div>

              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button onClick={addComment}>Post</button>
              {!hideDelete && (
                <button
                  className="delete-post-btn"
                  onClick={() => deletePost(selectedPost.id)}
                >
                  Delete Post
                </button>
              )}

              <button className="close-btn" onClick={() => setSelectedPost(null)}>Close</button>
            </div>
          </div>
        </div>
      )}



    </div>

  );

};

export default ProfilePosts;