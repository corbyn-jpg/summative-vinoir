import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import './App.css';

// Import your page components
import SearchPage from './Pages/Search/SearchPage';
import AccountPage from './Pages/account/AccountPage';
import WishlistPage from './Pages/wishlist/WishlistPage';
import CartPage from './Pages/cart/CartPage';
import CreateUser from './Pages/account/CreateUser'; // Import CreateUser

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<CreateUser />} /> {/* Add route */}
      </Routes>
    </Router>
  );
}

export default App;