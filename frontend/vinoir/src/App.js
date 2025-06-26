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
import CreateUser from './Pages/account/CreateUser';
import Login from './Pages/account/Login';
import AboutPage from './Pages/about/about';
import ContactPage from './Pages/contact/ContactPage';

// Account-related Pages
import AccountPage from './Pages/account/AccountPage';
import PersonalDataPage from './Pages/account/PersonalDataPage';
import OrdersPage from './Pages/account/OrdersPage';
import WishlistPage from './Pages/Shop/WishlistPage';

// Shop Pages
import ShopPage from './Pages/Shop/ShopPage';
import FragranceDetail from './Pages/Fragrance/FragranceDetail';

// 404 Fallback as a nested component to use useNavigate
function NotFoundFallback() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h4">404 - Page Not Found</Typography>
      <Button 
        variant="contained" 
        sx={{ mt: 2 }}
        onClick={() => navigate('/')}
      >
        Return Home
      </Button>
    </div>
  );
}

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
