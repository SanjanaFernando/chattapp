import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ChatRoom from './ChatRoom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

