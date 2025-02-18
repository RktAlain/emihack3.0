import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Badge,
} from "@mui/material";
import { AccountCircle, Notifications } from "@mui/icons-material";

export function NavbarAdmin() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#333",
          width: `calc(100% - 240px)`,
          marginLeft: "240px",
        }}
      >
        <Toolbar>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{ ml: 2, backgroundColor: "white", borderRadius: 1 }}
          />
          <Box flexGrow={1} />
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Déconnexion</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {/* Espacement pour éviter que le contenu soit caché sous la navbar */}
      <Toolbar />
    </>
  );
}
