import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  Box,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ListItemText,
  FormGroup,
  DialogContentText,
} from "@mui/material";
import { motion } from "framer-motion";
import { AppBarr } from "../appBar/AppBar";

const products = [
  {
    image: "https://via.placeholder.com/350",
    title: "Le Cardigan en Laine",
    description:
      "Découvrez le summum du confort et du style avec notre cardigan en laine haut de gamme. Conçu pour offrir une chaleur incomparable tout en restant léger, il est idéal pour toutes les saisons. Son design intemporel et sa qualité de fabrication en font un incontournable de votre garde-robe.",
  },
  {
    image: "https://via.placeholder.com/350",
    title: "Veste Élégante",
    description:
      "Plongez dans l'élégance avec notre veste stylée qui allie modernité et sophistication. Fabriquée à partir de matériaux de première qualité, elle vous garantit un look raffiné en toutes circonstances. Idéale pour le travail comme pour les sorties en soirée.",
  },
  {
    image: "https://via.placeholder.com/350",
    title: "Pull Décontracté",
    description:
      "Appréciez le confort ultime avec notre pull doux et respirant. Sa coupe parfaite s'adapte à toutes les morphologies, et son tissu premium assure une sensation agréable sur la peau. Parfait pour une journée décontractée ou un look casual chic.",
  },
];

export function Home() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  // Gestion de l'auto-défilement
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval); // Nettoyer l'intervalle
  }, []);


  return (
    <>
      {/* Barre de navigation */}
      <AppBarr />
      {/* Section principale avec animation de défilement */}
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 5,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Image du produit */}
        <motion.img
          key={index}
          src={products[index].image}
          alt={products[index].title}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          style={{
            width: "100%",
            maxWidth: "400px",
            marginBottom: { xs: 20, md: 0 },
          }}
        />

        {/* Texte d'introduction */}
        <motion.div
          key={index + "text"}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <Typography variant="h6" color="primary" gutterBottom>
            #1 MEILLEURE VENTE
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
          >
            {products[index].title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {products[index].description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{
                padding: "12px 24px",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Acheter Maintenant
            </Button>
            <Button variant="text" color="inherit" sx={{ fontSize: "1.2rem" }}>
              Voir Détails →
            </Button>
          </Box>
        </motion.div>
      </Container>
      {/* Indicateurs de défilement */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        {products.map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: i === index ? "black" : "gray",
              margin: "0 5px",
              cursor: "pointer",
            }}
            onClick={() => setIndex(i)}
          />
        ))}
      </Box>
      {/* Section de cartes animées */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 1 }}
        style={{ marginTop: 50 }}
      >
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          textAlign="center"
        >
          Nos Produits Vedettes
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              style={{ width: { xs: "100%", sm: "45%", md: "30%" } }}
            >
              <Card sx={{ maxWidth: 345, boxShadow: 3, width: "100%" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description.substring(0, 100)}...
                  </Typography>
                  <Button size="small" variant="outlined" color="primary">
                    Voir Détails
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </motion.div>
      ;
    </>
  );
}
