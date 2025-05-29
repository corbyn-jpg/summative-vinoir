import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './HamburgerMenu.css';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleOpen = () => {
    setAnimating(true);
    setTimeout(() => {
      setOpen(true);
      setAnimating(false);
    }, 300);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        className={`hamburger-icon ${animating ? 'animating' : ''}`}
        onClick={handleOpen}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={handleClose}>
        <Box className="drawer-header">
          <IconButton onClick={handleClose} className="close-icon">
            <CloseIcon />
          </IconButton>
          <div className="separator-line" />
        </Box>

        <Box className="luxury-menu-container">
          <List className="luxury-menu">
            {['Home', 'Shop', 'About', 'Contact'].map((text) => (
              <ListItem button key={text} className="menu-item">
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
