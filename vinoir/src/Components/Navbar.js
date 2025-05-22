import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <HamburgerMenu />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Vinoir
        </Typography>
        {/* Add other navbar items here */}
      </Toolbar>
    </AppBar>
  );
}