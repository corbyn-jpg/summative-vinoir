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

          <List>
            {['Home', 'Shop', 'About', 'Contact'].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}
