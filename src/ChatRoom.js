import React, { useState, useEffect } from 'react';
import './ChatRoom.css'; // Import the new CSS file


const ChatRoom = () => {
	const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:5000/user'); // Adjust endpoint as per your backend setup
            const data = await response.json();
            setUser(data.username); // Set the username fetched from backend response
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5000/messages');
            const data = await response.json();
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
                body: JSON.stringify({ user, message }), // Ensure message state is defined elsewhere
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
        // Fetch user data on component mount
        fetchUserData();
        // Fetch messages on component mount
        fetchMessages();
        // Poll for new messages every 2 seconds
        const interval = setInterval(() => {
            fetchMessages();
        }, 2000);

        return () => clearInterval(interval);
    }, []); // Run only once on mount

    return (
        <div className="chat-container">
            <h2 className="chat-title">Chat Room</h2>
            <ul className="chat-messages">
                {messages.map((message) => (
                    <li key={message._id} className="chat-message">
                        <strong>{message.user}:</strong> {message.message}
                    </li>
                ))}
            </ul>
            <div className="chat-input-container">
                <input
                    type="text"
                    className="chat-input user-input"
                    placeholder="Your name"
                    value={user}
                    onChange={(e) => setUser(e.target.value)} // Ensure this is appropriate for user input or username display
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
