import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./pagesCSS/chatstyle.css";

const Chat = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    try {

      const res = await axios.get(
        `https://localhost:5000/api/messages/chat/${currentUser.id}/${id}`
      );

      setMessages(res.data.messages);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async () => {

    const res = await axios.get(
      `https://localhost:5000/api/profile/${id}`
    );

    setChatUser(res.data.user);

  };

  useEffect(() => {

    const fetchMessages = () => {
      axios.get(
        `https://localhost:5000/api/messages/chat/${currentUser.id}/${id}`
      )
        .then(res => {
          setMessages(res.data.messages);
        })
        .catch(err => console.log(err));
    };

    fetchMessages();
    fetchUser();

    const interval = setInterval(fetchMessages, 2000); // refresh every 2 sec

    return () => clearInterval(interval);

  }, [id]);



  const sendMessage = async () => {

    if (!text.trim()) return;

    const res = await axios.post(
      "http://localhost:5000/api/messages/send",
      {
        senderId: currentUser.id,
        receiverId: id,
        text
      }
    );

    setMessages(prev => [...prev, res.data.message]);
    setText("");

  };

  const deleteChat = async () => {



    await axios.delete(
      `http://localhost:5000/api/messages/delete-chat/${currentUser.id}/${id}`
    );

    setMessages([]);

  };


  return (

    <div className="chat-container">
      <div className="chat-header">

        <div className="chat-user-info">

          <img
            src={chatUser?.profilePhoto || "/default-avatar.png"}
            alt="dp"
            className="chat-user-dp"
            onClick={() => navigate(`/user/${id}`)}
          />

          <span className="chat-username">
            {chatUser ? chatUser.username : "Loading..."}
          </span>

        </div>

        <button className="delete-chat-btn" onClick={deleteChat}>
          Delete
        </button>

      </div>
      <div className="chat-messages">

        {messages.map(msg => (

          <div
            key={msg.id}
            className={
              msg.senderId === currentUser.id
                ? "message-right"
                : "message-left"
            }
          >

            {msg.text}

          </div>

        ))}

      </div>


      <div className="chat-input">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>

  );

};

export default Chat;