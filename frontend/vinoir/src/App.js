import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import './App.css';

// Import your page components
import CreateUser from './Pages/account/CreateUser'; // Signup
import Login from './Pages/account/Login'; // Login

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<CreateUser />} /> {/* Signup */}
        <Route path="/login" element={<Login />} /> {/* Login */}
      </Routes>
    </Router>
  );
}

export default App;