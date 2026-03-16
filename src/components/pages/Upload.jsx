import Navbar from './Navbar.jsx'
import React, { useState } from 'react';
import axios from "axios";
import './pagesCSS/uploadpost.css'

const Upload = () => {

  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);

  const handleUpload = async () => {

    if (!imageUrl) {
      alert("Please enter image URL");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    try {

      const res = await axios.post(
        "http://localhost:5000/api/posts/create-post",
        {
          userId: user.id,
          username: user.username,
          imageUrl: imageUrl,
          caption: caption
        }
      );

      const post = {
        imageUrl: res.data.post.imageUrl,
        caption: res.data.post.caption,
        date: new Date(res.data.post.createdAt).toLocaleDateString(),
        time: new Date(res.data.post.createdAt).toLocaleTimeString()
      };

      setPreview(post);

      setImageUrl("");
      setCaption("");

    } catch (error) {

      console.log(error);
      alert("Upload failed");

    }

  };

  return (

    <div className="upload-container">

      <h2>Upload Post</h2>

      <input
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <textarea
        className='post-caption'
        placeholder="Write caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <button onClick={handleUpload}>
        Upload
      </button>

      {preview && (

        <div className="post-preview">

          <img src={preview.imageUrl} alt="post" />

          <p className="caption">{preview.caption}</p>

          <p className="date">
            {preview.date} • {preview.time}
          </p>

        </div>

      )}

      <Navbar />

    </div>

  );

}

export default Upload;