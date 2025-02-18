import React, { useState } from "react";
import { AppBarAdmin } from "../appBar/AppBarAdmin";
import { NavbarAdmin } from "../appBar/NavbarAdmin";
import { Container, Typography, Button, Card, CardContent, CardActions, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, useTheme, useMediaQuery } from "@mui/material";
import { Delete, Edit, Add, Person } from "@mui/icons-material";
import { motion } from "framer-motion";

const initialAdmins = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const initialClients = [
  { id: 1, name: "Alice Brown", email: "alice@example.com" },
  { id: 2, name: "Bob White", email: "bob@example.com" },
];

export function AdminCli() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDeleteAdmin = (id) => {
    setAdmins(admins.filter(admin => admin.id !== id));
    setSnackbarOpen(true);
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id));
    setSnackbarOpen(true);
  };

  const handleAddAdmin = () => {
    setAdmins([...admins, { id: admins.length + 1, ...newAdmin }]);
    setNewAdmin({ name: "", email: "" });
    setOpen(false);
  };

  return (
    <>
      <AppBarAdmin />
      <NavbarAdmin />
      <Container>
        <Typography variant={isMobile ? "h4" : "h3"} gutterBottom align="center" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Admin/cli</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card component={motion.div} whileHover={{ scale: 1.05 }}>
              <CardContent>
                <Typography variant={isMobile ? "h6" : "h5"}>Total Administrateurs</Typography>
                <Typography variant={isMobile ? "h5" : "h4"}>{admins.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card component={motion.div} whileHover={{ scale: 1.05 }}>
              <CardContent>
                <Typography variant={isMobile ? "h6" : "h5"}>Total Clients</Typography>
                <Typography variant={isMobile ? "h5" : "h4"}>{clients.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant={isMobile ? "h5" : "h4"} gutterBottom style={{ marginTop: 30 }}>Gestion des Administrateurs</Typography>
        <TextField fullWidth label="Rechercher un administrateur" variant="outlined" margin="normal" onChange={(e) => setSearch(e.target.value)} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.filter(admin => admin.name.toLowerCase().includes(search.toLowerCase())).map(admin => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <IconButton color="primary"><Edit /></IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteAdmin(admin.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpen(true)} style={{ marginTop: 10 }}>Ajouter un Administrateur</Button>

        <Typography variant={isMobile ? "h5" : "h4"} gutterBottom style={{ marginTop: 30 }}>Gestion des Clients</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map(client => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    <IconButton color="secondary" onClick={() => handleDeleteClient(client.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Ajouter un Administrateur</DialogTitle>
        <DialogContent>
          <TextField label="Nom" fullWidth margin="dense" value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} />
          <TextField label="Email" fullWidth margin="dense" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleAddAdmin} color="primary">Ajouter</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} message="Action réussie" onClose={() => setSnackbarOpen(false)} />
    </>
  );
}