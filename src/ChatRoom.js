import React, { useState, useEffect } from 'react';
import './ChatRoom.css'; // Import the new CSS file

const ChatRoom = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(localStorage.getItem('username') || ''); // Use localStorage to keep the user session

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5000/messages');
            const data = await response.json();
            console.log(data); // Log the data to check its structure
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            await fetch('http://localhost:5000/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, message }),
            });

            // Clear the message input after sending
            setMessage('');
            // Fetch messages to update the list
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(() => {
            fetchMessages();
        }, 2000);
        return () => clearInterval(interval);
    }, []); // Run only once on mount

    return (
        <div className="chat-container">
            <h2 className="chat-title">Chat Room</h2>
            <ul className="chat-messages">
                {messages.map((msg) => (
                    <li key={msg._id} className="chat-message">
                        <strong>{msg.user}:</strong> {msg.message}
                    </li>
                ))}
            </ul>
            <div className="chat-input-container">
                <input
                    type="text"
                    className="chat-input user-input"
                    placeholder="Your name"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    readOnly // Prevents editing by user
                />
                <input
                    type="text"
                    className="chat-input message-input"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="chat-send-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
