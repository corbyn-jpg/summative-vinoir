import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Stack, Drawer, Box, Typography, TextField, Button } from '@mui/material';
import { Search, PersonOutline, ShoppingBagOutlined, FavoriteBorder } from '@mui/icons-material';
import ShrinkingTitle from './ShrinkingTitle';
import HamburgerMenu from './HamburgerMenu'; // your existing hamburger menu component
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = (drawerName) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setOpenDrawer(drawerName);
  };

  const closeDrawer = () => setOpenDrawer(null);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Logging in with:', { email, password });
    window.location.href = '/';
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
          overflow: 'visible',
        }}
      >
        <Toolbar
          sx={{
            height: '100%',
            position: 'relative',
            justifyContent: 'space-between',
            px: 3,
            overflow: 'visible',
          }}
        >
          {/* Left side hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', zIndex: 1400 }}>
            <HamburgerMenu />
          </div>

          {/* Center shrinking title */}
          <ShrinkingTitle scrolled={scrolled} />

          {/* Right side icons */}
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

            <IconButton color="inherit" onClick={toggleDrawer('cart')} sx={{ mr: 1 }}>
              <ShoppingBagOutlined sx={{ fontSize: '1.3rem' }} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* DRAWERS */}
      <Drawer anchor="right" open={openDrawer === 'search'} onClose={closeDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6">Search</Typography>
          <p>Search functionality goes here.</p>
        </Box>
      </Drawer>

      <Drawer anchor="right" open={openDrawer === 'account'} onClose={closeDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6">My Account</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don&apos;t have an account?{' '}
            <a href="/register" style={{ textDecoration: 'none', color: 'blue' }}>
              Register here
            </a>
          </Typography>
        </Box>
      </Drawer>

      <Drawer anchor="right" open={openDrawer === 'wishlist'} onClose={closeDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6">My Wishlist</Typography>
          <p>Your wishlist is empty.</p>
        </Box>
      </Drawer>

      <Drawer anchor="right" open={openDrawer === 'cart'} onClose={closeDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6">My Cart</Typography>
          <p>Your cart is empty.</p>
        </Box>
      </Drawer>
    </>
  );
}
