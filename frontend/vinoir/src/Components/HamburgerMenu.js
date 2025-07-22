import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function DiorHamburgerMenu() {
  const [open, setOpen] = useState(false);
  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // Dior-style brand wordmark
  const BrandHeader = () => (
    <Typography
      variant="h4"
      sx={{
        fontFamily: '"Playfair Display", serif',
        color: "#146e3a ", // Gold
        fontWeight: 700,
        letterSpacing: "0.25em",
        textAlign: "center",
        mt: 3,
        mb: 2,
        textTransform: "uppercase",
        fontSize: "2rem",
      }}
    >
      VINOIR
    </Typography>
  );

  return (
    <>
      <IconButton
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        sx={{
          color: "#ffffffff ",
          fontSize: 32,
          p: 1.2,
          bgcolor: "transparent",
          borderRadius: "50%",
          border: "2px solid #146e3a ",
          transition: "background 0.3s, color 0.3s",
          "&:hover": {
            color: "#fff",
            backgroundColor: "#146e3a ",
          },
        }}
        size="large"
      >
        <MenuIcon fontSize="inherit" />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            bgcolor: "#161616",
            color: "#f9f5f0",
            boxShadow: "0 0 48px 0 rgba(0,0,0,0.4)",
            borderTopRightRadius: "36px",
            borderBottomRightRadius: "36px",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, pb: 0 }}>
          <IconButton
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            sx={{
              color: "#146e3a ",
              borderRadius: "50%",
              transition: "transform 0.3s, background 0.3s",
              "&:hover": {
                bgcolor: "#146e3a ",
                color: "#161616",
                transform: "scale(1.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <BrandHeader />
        <Divider
          sx={{
            bgcolor: "rgba(212, 175, 55, 0.15)",
            mb: 2,
            mx: 4,
            height: 2,
            borderRadius: 1,
          }}
        />
        <List disablePadding>
          {menuLinks.map(({ label, path }) => (
            <ListItem
              key={label}
              button
              component={Link}
              to={path}
              onClick={() => setOpen(false)}
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                fontSize: "1.3rem",
                letterSpacing: ".1em",
                py: 2.2,
                px: 4,
                color: "#f9f5f0",
                borderRadius: 2,
                mx: 3,
                mb: 1.5,
                textTransform: "uppercase",
                justifyContent: "center",
                transition: "background 0.2s, color 0.2s, letter-spacing 0.2s",
                "&:hover, &:focus-visible": {
                  background: "rgba(212, 175, 55, 0.06)",
                  color: "#146e3a ",
                  letterSpacing: "0.18em",
                  outline: "none",
                  boxShadow: "0 0 0 2px #146e3a ",
                },
              }}
            >
              <ListItemText
                primary={label}
                sx={{
                  '.MuiTypography-root': {
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
