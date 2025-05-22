import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Stack,
  Drawer,
  Box,
} from '@mui/material';
import {
  Search,
  PersonOutline,
  ShoppingBagOutlined,
  FavoriteBorder,
} from '@mui/icons-material';

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(null); // Tracks which drawer is open

  const toggleDrawer = (drawerName) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(drawerName);
  };

  const closeDrawer = () => setOpenDrawer(null);

  return (
    <>
      {/* AppBar with icons */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          color: 'black', // Dark icons like Dior
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            padding: '0 24px', // Add horizontal padding
          }}
        >
          {/* Left side - Hamburger menu and logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <HamburgerMenu />
            <Typography
              variant="h6"
              component="div"
              sx={{
                ml: 2,
                fontWeight: 'medium',
                letterSpacing: '0.05em',
                fontSize: '1.25rem',
              }}
            >
             
            </Typography>
          </div>

          {/* Right side - Icons with spacing */}
          <Stack
            direction="row"
            spacing={3} // Adjust spacing between icons
            sx={{
              alignItems: 'center',
              '& .MuiIconButton-root': {
                padding: '8px', // Smaller padding for elegance
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)', // Subtle hover effect
                },
              },
            }}
          >
            {/* Search */}
            <IconButton color="inherit" onClick={toggleDrawer('search')}>
              <Search sx={{ fontSize: '1.25rem' }} />
            </IconButton>

            {/* Account */}
            <IconButton color="inherit" onClick={toggleDrawer('account')}>
              <PersonOutline sx={{ fontSize: '1.25rem' }} />
            </IconButton>

            {/* Wishlist */}
            <IconButton color="inherit" onClick={toggleDrawer('wishlist')}>
              <FavoriteBorder sx={{ fontSize: '1.25rem' }} />
            </IconButton>

            {/* Cart with badge */}
            <IconButton color="inherit" onClick={toggleDrawer('cart')} sx={{ mr: 1 }}>
              <Badge badgeContent={0} color="error" overlap="circular">
                <ShoppingBagOutlined sx={{ fontSize: '1.3rem' }} />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawers for each icon */}
      {/* Search Drawer */}
      <Drawer anchor="right" open={openDrawer === 'search'} onClose={closeDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6">Search</Typography>
          <p>Search functionality goes here.</p>
        </Box>
      </Drawer>

      {/* Account Drawer */}
      <Drawer anchor="right" open={openDrawer === 'account'} onClose={closeDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6">My Account</Typography>
          <p>Login or create an account to access your profile.</p>
        </Box>
      </Drawer>

      {/* Wishlist Drawer */}
      <Drawer anchor="right" open={openDrawer === 'wishlist'} onClose={closeDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6">My Wishlist</Typography>
          <p>Your wishlist is empty.</p>
        </Box>
      </Drawer>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={openDrawer === 'cart'} onClose={closeDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6">My Cart</Typography>
          <p>Your cart is empty.</p>
        </Box>
      </Drawer>
    </>
  );
}