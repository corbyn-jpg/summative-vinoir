import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <>
      <IconButton
        color="inherit"
        edge="start"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button >

            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Link>
          </ListItem>

          <ListItem button>
            <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>
              Shop
            </Link>
          </ListItem>

          <ListItem button>
            <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
              About
            </Link>
          </ListItem>
          
          <ListItem button>
            <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
              Contact
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}