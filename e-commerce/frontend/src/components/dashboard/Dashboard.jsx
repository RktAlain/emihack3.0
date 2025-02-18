import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Menu as MenuIcon,
  ShoppingCart,
  Money,
  TrendingDown,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AppBarAdmin } from "../appBar/AppBarAdmin";
import { NavbarAdmin } from "../appBar/NavbarAdmin";

const stats = [
  {
    title: "Ventes totales",
    value: "25,024 MGA",
    icon: <ShoppingCart />,
    percentage: "81%",
    color: "#1976d2",
  },
  {
    title: "Dépenses totales",
    value: "14,160 MGA",
    icon: <TrendingDown />,
    percentage: "62%",
    color: "#d32f2f",
  },
  {
    title: "Bénéfice",
    value: "10,864 MGA",
    icon: <Money />,
    percentage: "44%",
    color: "#388e3c",
  },
];

const orders = [
  {
    name: "Drone Mini Pliant",
    number: 85631,
    payment: "En attente",
    status: "En cours",
  },
  {
    name: "Drone LARVENDER KF102",
    number: 36378,
    payment: "Remboursé",
    status: "Refusé",
  },
  {
    name: "Drone Ruko F11 Pro",
    number: 49347,
    payment: "En attente",
    status: "En cours",
  },
  {
    name: "Drone avec caméra",
    number: 96996,
    payment: "Payé",
    status: "Livré",
  },
];

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 7000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 8000 },
];

export function DashboardPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box display="flex">
      {/* Barre de navigation */}
      <AppBarAdmin />

      {/* Contenu principal */}
      <Box component="main" flexGrow={1} p={isMobile ? 1 : 3}>
        <NavbarAdmin />
        {/* Statistiques */}
        <Grid container spacing={isMobile ? 1 : 3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ backgroundColor: stat.color, color: "white" }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: "white", color: stat.color }}>
                        {stat.icon}
                      </Avatar>
                      <Typography variant={isMobile ? "subtitle1" : "h6"}>
                        {stat.title}
                      </Typography>
                    </Box>
                    <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography>{stat.percentage}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Graphique des ventes */}
        <Box mt={4}>
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
            Aperçu des ventes
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#1976d2"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Commandes récentes */}
        <Box mt={4}>
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
            Commandes récentes
          </Typography>
          <List>
            {orders.map((order, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={order.name}
                    secondary={`Order #${order.number} | Payment: ${order.payment} | Status: ${order.status}`}
                  />
                </ListItem>
                {index < orders.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}