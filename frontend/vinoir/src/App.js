import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CssBaseline, Typography, Button } from '@mui/material';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Global Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HamburgerMenu from './Components/HamburgerMenu';

// General Pages
import Home from './Pages/Home';
import CreateUser from './Pages/AccountPage/CreateUser';
import Login from './Pages/AccountPage/Login';
import AboutPage from './Pages/about/about';
import ContactPage from './Pages/contact/ContactPage';

// Account-related Pages
import AccountPage from './Pages/AccountPage/AccountPage';
import PersonalDataPage from './Pages/AccountPage/PersonalDataPage';
import OrdersPage from './Pages/AccountPage/OrdersPage';
import WishlistPage from './Pages/WishlistPage/WishlistPage';

// Shop Pages
import ShopPage from './Pages/shop/ShopPage';
import FragranceDetail from './Pages/Fragrance/FragranceDetail'; 



function App() {
  return (
    <Router>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="App">
              <Navbar />
              <HamburgerMenu />
              <main style={{ minHeight: '80vh' }}>
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

                  {/* Shop Routes */}
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/fragrance/:id" element={<FragranceDetail />} />

                  {/* Fallback */}
                  <Route path="*" element={<NotFoundFallback />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
