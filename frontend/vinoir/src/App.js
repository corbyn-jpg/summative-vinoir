import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from './Components/Navbar';
import ShrinkingTitle from './Components/ShrinkingTitle'; // new
import Home from './Pages/Home';
import CreateUser from './Pages/account/CreateUser';
import Login from './Pages/account/Login';
import './App.css';

function App() {
  return (
    <Router>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <ShrinkingTitle />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
