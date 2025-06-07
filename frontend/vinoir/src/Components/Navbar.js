import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Stack, Drawer, Box, Typography,
  Button, Divider, TextField
} from '@mui/material';
import {
  Search, PersonOutline, ShoppingBagOutlined, FavoriteBorder
} from '@mui/icons-material';
import axios from 'axios';
import ShrinkingTitle from './ShrinkingTitle';
import HamburgerMenu from './HamburgerMenu';
import EmojiSelector from './EmojiSelector';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(null);
  const [email, setEmail] = useState('');
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleDrawer = (drawerName) => (event) => {
    if (event?.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setOpenDrawer(drawerName);
    setLoginError('');
    setEmojiPassword([]);
  };

  const closeDrawer = () => {
    setOpenDrawer(null);
    setLoginError('');
    setEmojiPassword([]);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setLoginError('');
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: email.trim(),
        password: emojiPassword.join(''),
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      closeDrawer();
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Invalid email or emoji password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    closeDrawer();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#146e3a',
          boxShadow: 'none',
          color: 'white',
          zIndex: 1200,
          height: scrolled ? '80px' : '160px',
          transition: 'height 0.4s ease',
        }}
      >
        <Toolbar
          sx={{
            height: '100%',
            position: 'relative',
            justifyContent: 'space-between',
            px: 3,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', zIndex: 1400 }}>
            <HamburgerMenu />
          </div>

          <ShrinkingTitle scrolled={scrolled} />

          <Stack direction="row" spacing={3} sx={{ alignItems: 'center', zIndex: 1400 }}>
            <IconButton color="inherit" onClick={toggleDrawer('search')}>
              <Search sx={{ fontSize: '1.25rem' }} />
            </IconButton>
            <IconButton color="inherit" onClick={toggleDrawer('account')}>
              <PersonOutline sx={{ fontSize: '1.25rem' }} />
            </IconButton>
            <IconButton color="inherit" onClick={toggleDrawer('wishlist')}>
              <FavoriteBorder sx={{ fontSize: '1.25rem' }} />
            </IconButton>
            <IconButton color="inherit" onClick={toggleDrawer('cart')}>
              <ShoppingBagOutlined sx={{ fontSize: '1.3rem' }} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* === Account Drawer === */}
      <Drawer
        anchor="right"
        open={openDrawer === 'account'}
        onClose={closeDrawer}
        PaperProps={{
          sx: { width: 350, backgroundColor: '#f8f8f8' }
        }}
      >
        <Box sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{
            fontWeight: 'bold', mb: 2, fontFamily: 'Playfair Display, serif'
          }}>
            {isLoggedIn ? 'My Account' : 'Welcome Back'}
          </Typography>

          {isLoggedIn ? (
            <>
              <Typography variant="body1" sx={{ mb: 3 }}>
                You are logged in.
              </Typography>
              <Button variant="outlined" fullWidth onClick={handleLogout}
                sx={{
                  color: '#333', borderColor: '#333',
                  '&:hover': { backgroundColor: '#ffebee', borderColor: '#c62828', color: '#c62828' }
                }}
              >
                Logout
              </Button>
              <Button variant="contained" fullWidth sx={{
                mt: 2, backgroundColor: '#333',
                '&:hover': { backgroundColor: '#555' }
              }} href="/account">
                Account Settings
              </Button>
            </>
          ) : (
            <form onSubmit={handleLogin}>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Select your emoji password:
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
                disabled={isLoading || emojiPassword.length < 3}
                sx={{
                  mt: 3, padding: '12px',
                  backgroundColor: '#146e3a',
                  '&:hover': { backgroundColor: '#0d5a2c' },
                  '&:disabled': { backgroundColor: '#e0e0e0' }
                }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              <Divider sx={{ my: 3 }} />
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Don't have an account?{' '}
                <a href="/register" style={{
                  color: '#146e3a', fontWeight: 'bold', textDecoration: 'none'
                }}>
                  Register here
                </a>
              </Typography>
            </form>
          )}
        </Box>
      </Drawer>

      {/* === Search Drawer === */}
      <Drawer
        anchor="right"
        open={openDrawer === 'search'}
        onClose={closeDrawer}
        PaperProps={{
          sx: { width: 350, backgroundColor: '#f8f8f8', padding: 3 }
        }}
      >
        <Box>
          <Typography variant="h5" sx={{
            fontWeight: 'bold', mb: 2, fontFamily: 'Playfair Display, serif'
          }}>
            Search Products
          </Typography>
          <TextField
            fullWidth
            placeholder="Search Vinoir collection..."
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#146e3a', '&:hover': { backgroundColor: '#0d5a2c' } }}
          >
            Search
          </Button>
        </Box>
      </Drawer>

      {/* === Wishlist Drawer === */}
      <Drawer
        anchor="right"
        open={openDrawer === 'wishlist'}
        onClose={closeDrawer}
        PaperProps={{
          sx: { width: 350, backgroundColor: '#f8f8f8', padding: 3 }
        }}
      >
        <Box>
          <Typography variant="h5" sx={{
            fontWeight: 'bold', mb: 2, fontFamily: 'Playfair Display, serif'
          }}>
            Your Wishlist
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#777' }}>
            {isLoggedIn ?
              "Your saved items will appear here" :
              "Sign in to view your wishlist"}
          </Typography>
          {!isLoggedIn && (
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {
                closeDrawer();
                toggleDrawer('account')();
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Drawer>

      {/* === Cart Drawer === */}
      <Drawer
        anchor="right"
        open={openDrawer === 'cart'}
        onClose={closeDrawer}
        PaperProps={{
          sx: { width: 350, backgroundColor: '#f8f8f8', padding: 3 }
        }}
      >
        <Box>
          <Typography variant="h5" sx={{
            fontWeight: 'bold', mb: 2, fontFamily: 'Playfair Display, serif'
          }}>
            Your Cart
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#777' }}>
            {isLoggedIn ?
              "Your cart items will appear here" :
              "Sign in to view your cart"}
          </Typography>
          {!isLoggedIn && (
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {
                closeDrawer();
                toggleDrawer('account')();
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
}
