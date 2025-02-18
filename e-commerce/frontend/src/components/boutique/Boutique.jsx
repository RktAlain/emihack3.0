import React, { useState, useRef } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Select,
  MenuItem,
  Box,
  IconButton,
  Divider,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import MicIcon from "@mui/icons-material/Mic";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import Slider from "react-slick"; // Pour le carrousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AppBarr } from "../appBar/AppBar";
import * as cocossd from "@tensorflow-models/coco-ssd";

// Données des produits
const produits = [
  {
    id: 1,
    nom: "Sneakers",
    prix: 79,
    categorie: "Chaussures",
    image: "https://source.unsplash.com/200x200/?sneakers",
  },
  {
    id: 2,
    nom: "Montre",
    prix: 129,
    categorie: "Accessoires",
    image: "https://source.unsplash.com/200x200/?watch",
  },
  {
    id: 3,
    nom: "Sac à main",
    prix: 99,
    categorie: "Sacs",
    image: "https://source.unsplash.com/200x200/?handbag",
  },
  {
    id: 4,
    nom: "T-shirt",
    prix: 25,
    categorie: "Vêtements",
    image: "https://source.unsplash.com/200x200/?tshirt",
  },
  {
    id: 5,
    nom: "Casquette",
    prix: 20,
    categorie: "Accessoires",
    image: "https://source.unsplash.com/200x200/?cap",
  },
];

export function Boutique() {
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [listening, setListening] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Produits en promo pour le carrousel
  const bestSellers = [produits[0], produits[1], produits[2]];

  // 🎤 Démarrer la reconnaissance vocale
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setRecherche(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  };

  // 📷 Ouvrir la caméra
  const startCamera = async () => {
    setShowCamera(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) videoRef.current.srcObject = stream;
  };

  // 📸 Capture et analyse d'image
  const captureAndAnalyze = async () => {
    setLoading(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const model = await cocossd.load();
    const predictions = await model.detect(canvas);

    if (predictions.length > 0) {
      const detectedItem = predictions[0].class.toLowerCase();
      setRecherche(detectedItem);
      findMatchingProduct(detectedItem);
    } else {
      setDetectionResult("Aucun produit détecté.");
    }

    setLoading(false);
    stopCamera();
  };

  // 🔍 Trouver un produit correspondant
  const findMatchingProduct = (detectedItem) => {
    const match = produits.find((p) =>
      p.nom.toLowerCase().includes(detectedItem)
    );
    if (match) {
      setDetectionResult(`Produit détecté : ${match.nom}`);
    } else {
      setDetectionResult("Aucun produit correspondant trouvé.");
    }
  };

  // ❌ Fermer la caméra
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      let tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  // Paramètres du carrousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isSmallScreen ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      {/* Barre de navigation */}
      <AppBarr />

      {/* Bannière promotionnelle */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            backgroundColor: "#f50057",
            color: "white",
            textAlign: "center",
            padding: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            🔥 Offre spéciale : -30% sur les Sneakers aujourd’hui ! 🔥
          </Typography>
        </Box>

        <Container sx={{ mt: 4 }}>
          {/* Barre de recherche et filtre */}
          <Box
            display="flex"
            flexDirection={isSmallScreen ? "column" : "row"}
            justifyContent="space-between"
            mb={3}
            gap={2}
          >
            <TextField
              label="Rechercher..."
              variant="outlined"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              sx={{ flex: 1 }}
              InputProps={{
                endAdornment: (
                  <>
                    <IconButton color="primary" onClick={startCamera}>
                      <QrCodeScannerIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={startListening}
                      disabled={listening}
                    >
                      <MicIcon />
                    </IconButton>
                  </>
                ),
              }}
            />
            <Select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              displayEmpty
              variant="outlined"
              sx={{ width: isSmallScreen ? "100%" : 200 }}
            >
              <MenuItem value="">Toutes catégories</MenuItem>
              <MenuItem value="Chaussures">Chaussures</MenuItem>
              <MenuItem value="Accessoires">Accessoires</MenuItem>
              <MenuItem value="Sacs">Sacs</MenuItem>
              <MenuItem value="Vêtements">Vêtements</MenuItem>
            </Select>
          </Box>

          {/* Caméra */}
          {showCamera && (
            <Box sx={{ position: "relative", textAlign: "center", my: 3 }}>
              <video ref={videoRef} autoPlay playsInline width="100%" />
              <canvas ref={canvasRef} style={{ display: "none" }} />
              <IconButton
                color="secondary"
                onClick={captureAndAnalyze}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <QrCodeScannerIcon />
                )}
              </IconButton>
              <IconButton color="error" onClick={stopCamera}>
                <CloseIcon />
              </IconButton>
              {detectionResult && <Typography>{detectionResult}</Typography>}
            </Box>
          )}

          {/* Section Meilleures Ventes (Carrousel) */}
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            ⭐ Meilleures Ventes
          </Typography>
          <Slider {...carouselSettings}>
            {bestSellers.map((produit) => (
              <Card
                key={produit.id}
                sx={{ mx: 1, textAlign: "center", boxShadow: 3 }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={produit.image}
                  alt={produit.nom}
                />
                <CardContent>
                  <Typography variant="h6">{produit.nom}</Typography>
                  <Typography variant="h5" color="primary">
                    {produit.prix} MGA
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Slider>

          {/* Section Nos produits */}
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
            ⭐ ⭐ Nos produits
          </Typography>
          <Divider sx={{ mt: 2, mb: 4 }} />
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {produits.map((produit) => (
              <Grid item xs={12} sm={6} md={4} key={produit.id}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card sx={{ textAlign: "center", boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={produit.image}
                      alt={produit.nom}
                    />
                    <CardContent>
                      <Typography variant="h6">{produit.nom}</Typography>
                      <Typography variant="h5" color="primary">
                        {produit.prix} MGA
                      </Typography>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          justifyContent: "center",
                          gap: 2,
                        }}
                      >
                        <IconButton color="primary">
                          <ShoppingCartIcon />
                        </IconButton>
                        <IconButton color="secondary">
                          <InfoIcon />
                        </IconButton>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <StorefrontIcon color="action" />
                          <Typography variant="body2" color="text.secondary">
                            Indisponible
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </motion.div>
    </>
  );
}
