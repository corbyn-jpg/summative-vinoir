import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, IconButton, Stack, Drawer, Box, 
  Typography, Button, TextField, Divider, Badge, 
  Tooltip, Snackbar, Alert 
} from '@mui/material';
import {
  Search, PersonOutline, ShoppingBagOutlined, 
  FavoriteBorder, Close, ArrowForward, Favorite
} from '@mui/icons-material';
import axios from 'axios';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Components
import HamburgerMenu from './HamburgerMenu';
import EmojiSelector from './EmojiSelector';

// Context
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [drawer, setDrawer] = useState(null);
  const [email, setEmail] = useState('');
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('');
  const [notification, setNotification] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn, login, logout } = useAuth();
  const { cart, addToCart, removeFromCart, updateCartItem, cartCount } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, wishlistCount } = useWishlist();

  useEffect(() => {
    const token = localStorage.getItem('vinoir_token');
    if (token) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('vinoir_token')}`
        }
      });
      setUserName(res.data.name || res.data.email.split('@')[0]);
      login();
    } catch (err) {
      console.error('Failed to fetch user data', err);
    }
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ message, severity });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleDrawer = (type) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(type);
    setLoginError('');
    setEmojiPassword([]);
  };

  const closeDrawer = () => {
    setDrawer(null);
    setLoginSuccess(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    try {
      const res = await axios.post('/api/users/login', {
        email: email.trim(),
        password: emojiPassword.join('')
      });
      localStorage.setItem('vinoir_token', res.data.token);
      await fetchUserData();
      setLoginSuccess(true);
      showNotification(`Welcome back, ${res.data.user.name || email.split('@')[0]}!`);
      
      setTimeout(() => {
        closeDrawer();
        navigate('/');
      }, 1500);
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    try {
      const res = await axios.post('/api/users/register', {
        name: userName,
        email: email.trim(),
        password: emojiPassword.join('')
      });
      localStorage.setItem('vinoir_token', res.data.token);
      await fetchUserData();
      setLoginSuccess(true);
      showNotification(`Welcome ${userName}! Account created successfully`);
      
      setTimeout(() => {
        closeDrawer();
        navigate('/');
      }, 1500);
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUserName('');
    closeDrawer();
    navigate('/');
    showNotification('Logged out successfully');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      closeDrawer();
    }
  };

  const handleAddToWishlist = (product) => {
    if (!isLoggedIn) {
      toggleDrawer('account')();
      return;
    }
    addToWishlist(product);
    showNotification('Added to wishlist!');
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    showNotification('Removed from wishlist', 'info');
  };

  const renderAccountDrawer = () => (
    <Box sx={{ width: 350, p: 3 }} role="presentation">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          {isLoggedIn ? 'My Account' : loginSuccess ? 'Success!' : 'Welcome'}
        </Typography>
        <IconButton onClick={closeDrawer}>
          <Close />
        </IconButton>
      </Box>

      {loginSuccess ? (
        <Box textAlign="center">
          <Typography variant="h6" color="success.main" mb={2}>
            {isLoggedIn ? `Welcome back, ${userName}!` : `Welcome ${userName}!`}
          </Typography>
          <Typography variant="body1" mb={3}>
            {isLoggedIn 
              ? 'You have successfully logged in' 
              : 'Your account has been created'}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={closeDrawer}
            sx={{
              backgroundColor: '#146e3a',
              '&:hover': { backgroundColor: '#0d5a2c' }
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : isLoggedIn ? (
        <>
          <Typography variant="h6" mb={2}>Hello, {userName}!</Typography>
          <Stack spacing={2}>
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              to="/account"
              onClick={closeDrawer}
              sx={{
                color: '#146e3a',
                borderColor: '#146e3a',
                '&:hover': {
                  backgroundColor: '#146e3a',
                  color: 'white'
                }
              }}
            >
              Manage Account
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogout}
              sx={{
                backgroundColor: '#146e3a',
                '&:hover': { backgroundColor: '#0d5a2c' }
              }}
            >
              Logout
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <form onSubmit={handleRegister}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
              Create your emoji password:
            </Typography>
            <EmojiSelector
              selectedEmojis={emojiPassword}
              setSelectedEmojis={setEmojiPassword}
              maxLength={5}
            />
            {loginError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {loginError}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading || emojiPassword.length < 3 || !userName}
              sx={{
                mt: 3,
                backgroundColor: '#146e3a',
                '&:hover': { backgroundColor: '#0d5a2c' }
              }}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" textAlign="center" mb={2}>
            Already have an account?
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              setLoginSuccess(false);
              setLoginError('');
            }}
            sx={{
              color: '#146e3a',
              borderColor: '#146e3a',
              '&:hover': {
                backgroundColor: '#146e3a',
                color: 'white'
              }
            }}
          >
            Login Instead
          </Button>
        </>
      )}
    </Box>
  );

  const renderWishlistDrawer = () => (
    <Box sx={{ width: 350, p: 3 }} role="presentation">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Your Wishlist ({wishlistCount})
        </Typography>
        <IconButton onClick={closeDrawer}>
          <Close />
        </IconButton>
      </Box>

      {!isLoggedIn ? (
        <Box textAlign="center">
          <Typography variant="body1" mb={3}>
            Sign in to view and manage your wishlist
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={toggleDrawer('account')}
            sx={{
              backgroundColor: '#146e3a',
              '&:hover': { backgroundColor: '#0d5a2c' }
            }}
          >
            Sign In
          </Button>
        </Box>
      ) : wishlist.length === 0 ? (
        <Box textAlign="center">
          <Typography variant="body1" mb={3}>
            Your wishlist is empty
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            onClick={closeDrawer}
            sx={{
              color: '#146e3a',
              borderColor: '#146e3a',
              '&:hover': {
                backgroundColor: '#146e3a',
                color: 'white'
              }
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ maxHeight: '60vh', overflowY: 'auto', mb: 2 }}>
            {wishlist.map((item) => (
              <Box
                key={item._id}
                sx={{
                  display: 'flex',
                  mb: 2,
                  p: 2,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.images?.[0]?.url || '/images/fallback.jpg'}
                  alt={item.name}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
                <Box sx={{ ml: 2, flexGrow: 1 }}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    R {item.price.toFixed(2)}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0.5}>
                  <Tooltip title="Add to cart">
                    <IconButton
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                      size="small"
                      color="primary"
                    >
                      <ShoppingBagOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove">
                    <IconButton
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      size="small"
                      color="error"
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            ))}
          </Box>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: '#146e3a',
              borderColor: '#146e3a',
              '&:hover': {
                backgroundColor: '#146e3a',
                color: 'white'
              }
            }}
            onClick={() => {
              closeDrawer();
              navigate('/wishlist');
            }}
          >
            View Full Wishlist
          </Button>
        </>
      )}
    </Box>
  );

  const renderCartDrawer = () => (
    <Box sx={{ width: { xs: '100%', sm: 400 }, p: 3 }} role="presentation">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Your Cart ({cartCount})
        </Typography>
        <IconButton onClick={closeDrawer}>
          <Close />
        </IconButton>
      </Box>

      {cart.length === 0 ? (
        <Box textAlign="center">
          <Typography variant="body1" mb={3}>
            Your cart is empty
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            onClick={closeDrawer}
            sx={{
              color: '#146e3a',
              borderColor: '#146e3a',
              '&:hover': {
                backgroundColor: '#146e3a',
                color: 'white'
              }
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ maxHeight: '60vh', overflowY: 'auto', mb: 3 }}>
            {cart.map((item) => (
              <Box
                key={item._id}
                sx={{
                  display: 'flex',
                  mb: 2,
                  p: 2,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.images?.[0]?.url || '/images/fallback.jpg'}
                  alt={item.name}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
                <Box sx={{ ml: 2, flexGrow: 1 }}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    R {item.price.toFixed(2)} × {item.quantity}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1} alignItems="center">
                    <IconButton
                      size="small"
                      onClick={() => updateCartItem(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body1">{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateCartItem(item._id, item.quantity + 1)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
                <IconButton
                  onClick={() => removeFromCart(item._id)}
                  color="error"
                  sx={{ alignSelf: 'flex-start' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              backgroundColor: 'white',
              p: 3,
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1">Subtotal:</Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                R {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              component={Link}
              to="/checkout"
              onClick={closeDrawer}
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: '#146e3a',
                '&:hover': { backgroundColor: '#0d5a2c' }
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );

  const renderSearchDrawer = () => (
    <Box sx={{ width: 350, p: 3 }} role="presentation">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Search Fragrances
        </Typography>
        <IconButton onClick={closeDrawer}>
          <Close />
        </IconButton>
      </Box>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          placeholder="Search by name, notes, or brand..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 3 }}
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!searchQuery.trim()}
          sx={{
            backgroundColor: '#146e3a',
            '&:hover': { backgroundColor: '#0d5a2c' }
          }}
        >
          Search
        </Button>
      </form>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#146e3a',
          boxShadow: 'none',
          zIndex: 1200,
          height: '80px',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
          <HamburgerMenu />
          
          <Box sx={{ 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'block' } 
          }}>
            {location.pathname === '/' && (
              <Typography variant="h6" component={Link} to="/" sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontFamily: 'Playfair Display, serif',
                fontWeight: 'bold',
                letterSpacing: '1px'
              }}>
                Vinoir
              </Typography>
            )}
          </Box>
          
          <Stack direction="row" spacing={3} alignItems="center">
            <Tooltip title="Search">
              <IconButton onClick={toggleDrawer('search')} color="inherit">
                <Search />
              </IconButton>
            </Tooltip>
            
            <Tooltip title={isLoggedIn ? userName : "Account"}>
              <IconButton onClick={toggleDrawer('account')} color="inherit">
                <PersonOutline />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Wishlist">
              <IconButton onClick={toggleDrawer('wishlist')} color="inherit">
                <Badge badgeContent={wishlistCount} color="error">
                  <FavoriteBorder />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Cart">
              <IconButton onClick={toggleDrawer('cart')} color="inherit">
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingBagOutlined />
                </Badge>
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawers */}
      <Drawer
        anchor="right"
        open={drawer === 'account'}
        onClose={closeDrawer}
      >
        {renderAccountDrawer()}
      </Drawer>

      <Drawer
        anchor="right"
        open={drawer === 'wishlist'}
        onClose={closeDrawer}
      >
        {renderWishlistDrawer()}
      </Drawer>

      <Drawer
        anchor="right"
        open={drawer === 'cart'}
        onClose={closeDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 },
            backgroundColor: '#f9f9f9',
          },
        }}
      >
        {renderCartDrawer()}
      </Drawer>

      <Drawer
        anchor="right"
        open={drawer === 'search'}
        onClose={closeDrawer}
      >
        {renderSearchDrawer()}
      </Drawer>
      
      {/* Notification System */}
      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNotification(null)} 
          severity={notification?.severity || 'success'}
          sx={{ width: '100%' }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </>
  );
}