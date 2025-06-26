import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CssBaseline, CircularProgress, Box, Typography, Button } from '@mui/material'; 

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';
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


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// 404 Fallback
function NotFoundFallback() {
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: '2rem', textAlign: 'center', minHeight: '60vh' }}>
      <Typography variant="h4" gutterBottom>404 - Page Not Found</Typography>
      <Button 
        variant="contained" 
        sx={{ mt: 2 }}
        onClick={() => navigate('/')}
      >
        Return Home
      </Button>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <HamburgerMenu />
              
              <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<CreateUser />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/fragrance/:id" element={<FragranceDetail />} />

                  {/* Protected Routes */}
                  <Route path="/account" element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/account/personal-data" element={
                    <ProtectedRoute>
                      <PersonalDataPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/account/orders" element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/wishlist" element={
                    <ProtectedRoute>
                      <WishlistPage />
                    </ProtectedRoute>
                  } />
                 
                
                  {/* Fallback */}
                  <Route path="*" element={<NotFoundFallback />} />
                </Routes>
              </Box>
              
              <Footer />
            </Box>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;