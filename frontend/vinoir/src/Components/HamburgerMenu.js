import React, { useState } from "react";
import { Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./HamburgerMenu.css";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    // Ignore tab and shift key presses during drawer toggle for focus handling
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(isOpen);
  };

  // Drawer content separated for clarity
  const drawerContent = (
    <div className="luxury-menu" role="presentation">
      <IconButton
        className="close-icon"
        onClick={toggleDrawer(false)}
        sx={{ alignSelf: "flex-start", m: 1 }}
        aria-label="Close menu"
      >
        <CloseIcon />
      </IconButton>

      <div className="separator-line" />

      <List sx={{ width: 250 }}>
        <ListItem
          button
          component={Link}
          to="/"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/shop"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="Shop" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/about"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="About" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/contact"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        className="hamburger-icon"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2, color: "#ffffff" }}
        aria-label="Open menu"
      >
        <MenuIcon sx={{ color: "#ffffff" }} />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
