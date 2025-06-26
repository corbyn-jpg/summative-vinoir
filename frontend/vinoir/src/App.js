import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  CssBaseline, 
  Box, 
  Typography, 
  Button, 
  CircularProgress 
} from '@mui/material';
import { Link } from 'react-router-dom';

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { NotificationProvider } from './context/NotificationContext';

// Global Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// General Pages
import Home from './Pages/Home';
import CreateUser from './Pages/account/CreateUser';
import Login from './Pages/account/Login';
import AboutPage from './Pages/about/about';
import ContactPage from './Pages/contact/ContactPage';
import ShopPage from './Pages/Shop/ShopPage';
import FragranceDetail from './Pages/Fragrance/FragranceDetail';

// Account-related Pages
import AccountPage from './Pages/account/AccountPage';
import PersonalDataPage from './Pages/account/PersonalDataPage';
import OrdersPage from './Pages/account/OrdersPage';
import WishlistPage from './Pages/Shop/WishlistPage';
import CheckoutPage from './Pages/Checkout/CheckoutPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '80vh'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// PublicOnly Route Component (for login/register when already authenticated)
const PublicOnlyRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '80vh'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return !isLoggedIn ? children : <Navigate to="/" replace />;
};

// 404 Fallback Component
function NotFoundFallback() {
  return (
    <Box sx={{ 
      textAlign: 'center', 
      py: 10,
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        The page you're looking for doesn't exist.
      </Typography>
      <Button 
        variant="contained" 
        component={Link}
        to="/"
        sx={{
          backgroundColor: '#146e3a',
          '&:hover': { backgroundColor: '#0d5a2c' },
          px: 4,
          py: 1.5
        }}
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
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '100vh',
                backgroundColor: '#f9f9f9'
              }}>
                <Navbar />
                
                <Box 
                  component="main" 
                  sx={{ 
                    flexGrow: 1,
                    pt: { xs: '80px', sm: '90px' }, // Account for navbar height
                    pb: 6
                  }}
                >
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/fragrance/:id" element={<FragranceDetail />} />
                    
                    {/* Auth Routes (only accessible when not logged in) */}
                    <Route path="/register" element={
                      <PublicOnlyRoute>
                        <CreateUser />
                      </PublicOnlyRoute>
                    } />
                    <Route path="/login" element={
                      <PublicOnlyRoute>
                        <Login />
                      </PublicOnlyRoute>
                    } />
                    
                    {/* Protected Routes (only accessible when logged in) */}
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
                    <Route path="/checkout" element={
                      <ProtectedRoute>
                        <CheckoutPage />
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
      </NotificationProvider>
    </Router>
  );
}

export default App;