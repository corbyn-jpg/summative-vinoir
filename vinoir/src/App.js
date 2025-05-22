import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import './App.css';

// Import your page components (you'll need to create these)
import SearchPage from './Pages/Search/SearchPage';
import AccountPage from './Pages/account/AccountPage';
import WishlistPage from './Pages/wishlist/WishlistPage';
import CartPage from './Pages/cart/CartPage';

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
      </Routes>
    </Router>
  );
}

export default App;