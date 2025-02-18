import React from "react";
import { 
  Box, Grid, Card, CardContent, Typography, Avatar, List, ListItem, ListItemText, 
  Divider, AppBar, Toolbar, IconButton, Drawer, ListItemIcon, ListItemButton, 
  Menu, MenuItem, TextField, Badge 
} from "@mui/material";
import { motion } from "framer-motion";
import { 
  Menu as MenuIcon, ShoppingCart, Money, TrendingUp, TrendingDown, ExitToApp, 
  AccountCircle, Notifications, Search, BarChart, Home, Favorite, Sell, History, 
  HelpOutline, Settings, Dashboard 
} from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const menuItems = [
    { text: "Tableau de bord", icon: <Dashboard /> },
    { text: "Ventes et produits", icon: <Sell /> },
    { text: "Administrateurs / clients", icon: <AccountCircle /> },
    { text: "Historique", icon: <History /> },
    { text: "Paramètres", icon: <Settings /> },
  ];

export function AppBarAdmin() {
  return (
    <>
      {/* Barre latérale permanente */}
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <Box
          sx={{ padding: 2, display: "flex", alignItems: "center", height: 64 }}
        >
          <Typography variant="h6" fontWeight="bold" color="primary">
            G-RTX
          </Typography>
        </Box>
        <Divider/>
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
