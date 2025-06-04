import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from "./Components/Navbar";
import ShrinkingTitle from './Components/ShrinkingTitle'; // new
import Home from './Pages/Home';
import CreateUser from './Pages/account/CreateUser';
import Login from './Pages/account/Login';
import './App.css';
import ShopPage from './Pages/shop/shop.js';
import AboutPage from './Pages/about/about.js';
import ContactPage from './Pages/contact/contact.js';
import HeroSection from "./Components/HeroSection";

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
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
