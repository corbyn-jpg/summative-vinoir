import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './HamburgerMenu.css';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    if (isOpen) {
      setAnimating(true);
      setTimeout(() => {
        setOpen(true);
        setAnimating(false);
      }, 300); // match transition time
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <IconButton
        className={`hamburger-icon ${animating ? 'animating' : ''}`}
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon sx={{ color: '#ffffff' }} />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div className="luxury-menu">
          <IconButton
            className="close-icon"
            onClick={toggleDrawer(false)}
            sx={{ alignSelf: 'flex-start', m: 1 }}
          >
            <CloseIcon />
          </IconButton>

          <div className="separator-line" />

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
        </div>
      </Drawer>
    </>
  );
}
