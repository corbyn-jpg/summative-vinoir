import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

// Global Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// General Pages
import Home from './Pages/Home';
import CreateUser from './Pages/AccountPage/CreateUser';
import Login from './Pages/AccountPage/Login';
import AboutPage from './Pages/about/about';
import ContactPage from './Pages/contact/contact';

// Account-related Pages
import AccountPage from './Pages/AccountPage/AccountPage';
import PersonalDataPage from './Pages/AccountPage/PersonalDataPage';
import OrdersPage from './Pages/AccountPage/OrdersPage';
import WishlistPage from './Pages/WishlistPage/WishlistPage';

// Shop Page
import ShopPage from './Pages/shop/ShopPage';

// Services and Repositories
import CartService from './services/CartService';
import ProductRepository from './repositories/ProductRepository';
import ProductService from './services/ProductService';

// Initialize services and repositories
const cartService = new CartService();
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

function App() {
  return (
    <Router>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            {/* General Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Account Routes */}
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/personal-data" element={<PersonalDataPage />} />
            <Route path="/account/orders" element={<OrdersPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />

            {/* Shop Route */}
            <Route 
              path="/shop" 
              element={<ShopPage cartService={cartService} productService={productService} />} 
            />

            {/* Fallback Route */}
            <Route path="*" element={<div style={{ padding: '2rem', textAlign: 'center' }}>Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;