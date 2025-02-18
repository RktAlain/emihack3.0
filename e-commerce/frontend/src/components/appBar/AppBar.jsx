import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Fade,
  Paper,
  Dialog,
  DialogContent,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormGroup,
  DialogTitle,
  DialogContentText,
  Menu,
  MenuItem,
  ListItemIcon,
  Backdrop,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MicIcon from "@mui/icons-material/Mic";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";

export function AppBarr() {
  const [openLogin, setOpenLogin] = useState(false); // Pour afficher/fermer le formulaire de connexion
  const [isSignUp, setIsSignUp] = useState(false); // Pour basculer entre Sign In et Sign Up
  const [openDrawer, setOpenDrawer] = useState(false); // Pour le menu déroulant
  const [panier, setPanier] = useState([]);
  const [openPanier, setOpenPanier] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElAdd, setAnchorElAdd] = useState(null);
  const open = Boolean(anchorEl);
  const openAdd = Boolean(anchorElAdd);
  const [anchorLang, setAnchorLang] = useState(null);
  const [selectedLang, setSelectedLang] = useState("Français"); // Langue par défaut
  //Connexion au bd
  const API_URL = "http://127.0.0.1:8000"; // Change si nécessaire
  // Ouvrir/fermer le menu
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  // Ouvrir/fermer le panier
  const togglePanier = (open) => () => {
    setOpenPanier(open);
  };

  // Supprimer un article du panier
  const supprimerDuPanier = (index) => {
    const nouveauPanier = [...panier];
    nouveauPanier.splice(index, 1);
    setPanier(nouveauPanier);
  };

  // Ouvrir le formulaire de connexion
  const handleClickOpen = () => {
    setOpenLogin(true);
  };

  // Fermer le formulaire de connexion
  const handleClose = () => {
    setOpenLogin(false);
    setIsSignUp(false); // Réinitialiser à Sign In lors de la fermeture
  };

  // Basculer entre Sign In et Sign Up
  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  // Ajouter au panier
  const ajouterAuPanier = (produit) => {
    setPanier([...panier, produit]);
  };

  // Nouvel état pour afficher la popup après l'inscription
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);

  // Fonction pour gérer la fermeture de la popup
  const handleClosePopup = () => {
    setOpenSuccessPopup(false);
  };

  //Interration avec backend
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (openSuccessPopup) {
      setOpenLogin(false); // Ferme le formulaire quand la popup de succès est activée
    }
  }, [openSuccessPopup]);

  //Ahthentification
  const handleAuth = async () => {
    try {
      const endpoint = isSignUp ? "/register/" : "/login/";
      const payload = isSignUp
        ? credentials
        : { username: credentials.username, password: credentials.password };
      const response = await axios.post(`${API_URL}${endpoint}`, payload);

      console.log(
        isSignUp ? "Utilisateur inscrit :" : "Connexion réussie :",
        response.data
      );
      localStorage.setItem("token", response.data.token.access);

      if (isSignUp) {
        setOpenSuccessPopup(true); // Active la popup de succès et ferme la boîte de connexion via useEffect
      } else {
        setOpenLogin(false); // Ferme immédiatement après connexion
      }
    } catch (error) {
      console.error("Erreur :", error.response?.data?.error || error.message);
    }
  };

  const handleClickSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  const handleClickLang = (event) => {
    setAnchorLang(event.currentTarget);
  };

  const handleCloseLang = (lang) => {
    if (lang) setSelectedLang(lang);
    setAnchorLang(null);
  };

  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isWebCamActive, setIsWebCamActive] = useState(false); // Etat pour savoir si la webcam est activée
  const [webcamImage, setWebcamImage] = useState(null); // Etat pour la photo capturée via la webcam
  const videoRef = useRef(null); // Référence à la balise vidéo pour afficher le flux de la webcam
  const canvasRef = useRef(null); // Référence à la balise canvas pour capturer l'image de la webcam

  // Fonction pour démarrer ou arrêter la webcam
  const toggleWebCam = async () => {
    if (isWebCamActive) {
      // Si la webcam est déjà active, on l'arrête
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      setIsWebCamActive(false);
    } else {
      // Si la webcam n'est pas active, on l'active
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        // Vérifier que la référence vidéo est disponible avant d'affecter le flux
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsWebCamActive(true);
        }
      } catch (error) {
        console.error("Erreur lors de l'accès à la webcam", error);
      }
    }
  };

  // Fonction pour capturer l'image de la webcam
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      // Dessine le flux de la vidéo sur le canvas pour capturer l'image
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);

      // Récupère l'image capturée et l'affiche
      const imageUrl = canvas.toDataURL("image/png");
      setWebcamImage(imageUrl);
      setMessages([
        ...messages,
        { text: "Image envoyée", sender: "user", image: imageUrl },
      ]);
    }
  };

  // Fonction pour envoyer le message texte
  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");

      // Simuler une réponse automatique du bot après un délai
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Bonjour ! Comment puis-je vous aider ?", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  // Fonction pour envoyer un fichier image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setMessages([
        ...messages,
        { text: "Image envoyée", sender: "user", image: file },
      ]);
    }
  };

  // Fonction pour gérer le message vocal
  const handleVoiceMessage = () => {
    if (isRecording) {
      // Arrêter l'enregistrement et traiter le message vocal
      setIsRecording(false);
      // Vous pouvez ajouter ici une logique pour transformer la voix en texte.
      setMessages([
        ...messages,
        { text: "Message vocal reçu", sender: "user" },
      ]);
    } else {
      // Démarrer l'enregistrement
      setIsRecording(true);
      // Dans une application réelle, vous utiliseriez l'API de reconnaissance vocale ici.
    }
  };

  const handleAddClick = (event) => {
    setAnchorElAdd(event.currentTarget);
  };

  const handleCloseClick = () => {
    setAnchorElAdd(null);
  };

  //Map
  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const center = {
    lat: -18.8792, // Coordonnées de Madagascar
    lng: 47.5079,
  };

  const locations = [
    { lat: -18.8792, lng: 47.5079, label: "Antananarivo" },
    { lat: -21.4526, lng: 47.0857, label: "Fianarantsoa" },
  ];

  const [openContact, setOpenContact] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const handleOpenContact = () => setOpenContact(true);
  const handleCloseContact = () => setOpenContact(false);

  useEffect(() => {
    // Vérifier la disponibilité de la géolocalisation dans le navigateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
        }
      );
    }
  }, []);

  // Vérifier si la localisation de l'utilisateur est récupérée
  const renderMap = userLocation ? (
    <iframe
      src={`https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=12&output=embed`}
      width="100%"
      height="300"
      style={{ border: "0" }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  ) : (
    <Typography variant="body1">Chargement de votre position...</Typography>
  );

  return (
    <>
      {/* Barre de navigation */}
      <AppBar
        position="sticky" // Change de "fixed" à "sticky"
        sx={{
          top: 0, // Fixe l'AppBar en haut
          background: "white",
          color: "black",
          boxShadow: 2,
          padding: "10px 0",
          zIndex: 1100, // Assure que l'AppBar reste au-dessus des autres éléments
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight="bold">
            G-RTX
          </Typography>

          {/* Menu pour mobile */}
          <IconButton
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* Liens de navigation avec icônes */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {[
              { label: "Accueil", path: "/", icon: <HomeIcon /> },
              {
                label: "Boutique",
                path: "/boutique",
                icon: <StorefrontIcon />,
              },
              { label: "Blog", path: "/blog", icon: <ArticleIcon /> },
              { label: "FAQ", path: "/faq", icon: <LiveHelpIcon /> },
            ].map((item, index) => (
              <Box
                key={index}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {item.icon}
                <Typography
                  variant="body1"
                  component={Link}
                  to={item.path}
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "500",
                    transition: "color 0.3s ease-in-out",
                    "&:hover": { color: "#1976d2" },
                  }}
                >
                  {item.label}
                </Typography>

                {/* Animation de soulignement */}
                {hovered === index && (
                  <motion.div
                    layoutId="underline"
                    style={{
                      height: "3px",
                      width: "100%",
                      backgroundColor: "#1976d2",
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      borderRadius: "5px",
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Box>
            ))}
          </Box>

          {/* Icônes compte et panier */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton color="primary" onClick={handleClickOpen}>
              <AccountCircleIcon />
            </IconButton>
            <IconButton color="inherit" onClick={togglePanier(true)}>
              <Badge badgeContent={panier.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleClickSettings}>
              <SettingsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleClickLang}>
              <LanguageIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleOpenContact}>
              <LocationOnIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Menu déroulant des paramètres */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseSettings}
          sx={{ mt: 1 }}
        >
          <MenuItem onClick={handleCloseSettings}>Mon profil</MenuItem>
          <MenuItem onClick={handleCloseSettings}>Commandes</MenuItem>
          <MenuItem onClick={handleCloseSettings}>
            Adresse de livraison
          </MenuItem>
          <MenuItem onClick={handleCloseSettings}>Moyens de paiement</MenuItem>
          <MenuItem onClick={handleCloseSettings}>Préférences</MenuItem>
          <Divider sx={{ mt: 2, mb: 4 }} />
          <MenuItem onClick={handleCloseSettings} sx={{ color: "red" }}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "red" }} />{" "}
            </ListItemIcon>
            Déconnexion
          </MenuItem>
        </Menu>

        {/* Menu déroulant des langues */}
        <Menu
          anchorEl={anchorLang}
          open={Boolean(anchorLang)}
          onClose={() => handleCloseLang(null)}
          sx={{ mt: 1 }}
        >
          <MenuItem onClick={() => handleCloseLang("Français")}>
            <ListItemIcon>🇫🇷</ListItemIcon>
            <Typography>Français</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleCloseLang("Anglais")}>
            <ListItemIcon>🇬🇧</ListItemIcon>
            <Typography>Anglais</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleCloseLang("Malgache")}>
            <ListItemIcon>🇲🇬</ListItemIcon>
            <Typography>Malgache</Typography>
          </MenuItem>
        </Menu>

        {/* Menu latéral */}
        <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ width: 250, padding: 20 }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign="center"
              mb={2}
            >
              Menu
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {[
                { label: "Accueil", path: "/", icon: <HomeIcon /> },
                {
                  label: "Boutique",
                  path: "/boutique",
                  icon: <StorefrontIcon />,
                },
                { label: "Blog", path: "/blog", icon: <ArticleIcon /> },
                { label: "FAQ", path: "/faq", icon: <LiveHelpIcon /> },
              ].map((item, index) => (
                <ListItem
                  button
                  key={index}
                  component={Link}
                  to={item.path}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    padding: "10px",
                    borderRadius: 2,
                    transition: "background 0.3s",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <Box sx={{ color: "black" }}>
                    {" "}
                    {/* Forcer la couleur noire */}
                    {item.icon}
                  </Box>
                  <ListItemText primary={item.label} sx={{ color: "black" }} />
                </ListItem>
              ))}
            </List>
          </motion.div>
        </Drawer>

        {/* Panier Drawer */}
        <Drawer anchor="right" open={openPanier} onClose={togglePanier(false)}>
          <Box sx={{ width: 300, padding: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Mon Panier
            </Typography>
            <List>
              {panier.length > 0 ? (
                panier.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Typography variant="body1">{item.nom}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.prix} €
                      </Typography>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => supprimerDuPanier(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Votre panier est vide.
                </Typography>
              )}
            </List>
          </Box>
        </Drawer>
      </AppBar>
      {/* Formulaire de connexion - Dialog animé */}
      <Dialog open={openLogin} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            padding: 0,
          }}
        >
          {/* Section gauche - Formulaire */}
          <Box sx={{ flex: 1, padding: 4 }}>
            <motion.div
              key={isSignUp ? "signUp" : "logIn"}
              initial={{ x: isSignUp ? 300 : -300 }}
              animate={{ x: 0 }}
              exit={{ x: isSignUp ? -300 : 300 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
              >
                {isSignUp ? "Inscription" : "Connexion"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  marginBottom: 2,
                }}
              >
                <IconButton>
                  <GoogleIcon />
                </IconButton>
                <IconButton>
                  <FacebookIcon />
                </IconButton>
                <IconButton>
                  <InstagramIcon />
                </IconButton>
                <IconButton>
                  <LinkedInIcon />
                </IconButton>
              </Box>
              <Typography
                textAlign="center"
                color="text.secondary"
                gutterBottom
              >
                ou utilisez votre email pour vous inscrire
              </Typography>
              <FormGroup sx={{ gap: 2, width: "100%" }}>
                {isSignUp && (
                  <TextField
                    label="Nom d'utilisateur"
                    name="username"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                  />
                )}
                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  required={isSignUp}
                  onChange={handleChange}
                />
                <TextField
                  label="Mot de passe"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ padding: "12px", fontSize: "1.1rem" }}
                  onClick={handleAuth}
                >
                  {isSignUp ? "S'inscrire" : "Se connecter"}
                </Button>
              </FormGroup>
            </motion.div>
          </Box>

          {/* Section droite - Message */}
          <Box
            sx={{
              flex: 1,
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
            }}
          >
            <Typography variant="h4" fontWeight="bold" textAlign="center">
              Bonjour !
            </Typography>
            <Typography textAlign="center" sx={{ marginBottom: 2 }}>
              Créez un compte pour débloquer toutes les fonctionnalités et le
              contenu personnalisé qui vous attendent.
            </Typography>
            <Button variant="outlined" color="inherit" onClick={toggleForm}>
              {isSignUp ? "Connexion" : "Inscription"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      {/* Popup après inscription */}
      <Dialog
        open={openSuccessPopup}
        onClose={handleClosePopup}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            textAlign: "center",
          }}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircleIcon
            sx={{ fontSize: 60, color: "green", marginBottom: 2 }}
          />
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Inscription réussie ! 🎉
          </DialogTitle>
          <DialogContentText>
            Félicitations ! Votre compte a été créé avec succès. Vous pouvez
            maintenant vous connecter et profiter de nos services.
          </DialogContentText>
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: 3, padding: "10px 20px" }}
            onClick={handleClosePopup}
          >
            Continuer
          </Button>
        </DialogContent>
      </Dialog>

      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1200,
        }}
      >
        {/* Bouton pour ouvrir le chat */}
        {!openChat && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <IconButton
              color="primary"
              onClick={() => setOpenChat(!openChat)}
              sx={{
                backgroundColor: "white",
                boxShadow: 3,
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <ChatIcon />
            </IconButton>
          </motion.div>
        )}

        {/* Fenêtre du chat */}
        {openChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              elevation={4}
              sx={{
                width: 300,
                height: 400,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              {/* En-tête du chat */}
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  padding: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Discussion</Typography>
                <IconButton color="inherit" onClick={() => setOpenChat(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      alignSelf:
                        msg.sender === "user" ? "flex-end" : "flex-start",
                      backgroundColor:
                        msg.sender === "user" ? "#1976d2" : "#f0f0f0",
                      color: msg.sender === "user" ? "white" : "black",
                      padding: "8px 12px",
                      borderRadius: 2,
                      maxWidth: "80%",
                    }}
                  >
                    {msg.text}
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="sent"
                        style={{
                          width: "100%",
                          maxHeight: "150px",
                          objectFit: "cover",
                          marginTop: "8px",
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>

              {/* Champ de saisie */}
              <Box
                sx={{
                  display: "flex",
                  padding: 1,
                  borderTop: "1px solid #ddd",
                }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="Écrivez un message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <IconButton color="primary" onClick={handleSendMessage}>
                  <SendIcon />
                </IconButton>

                {/* Bouton "Plus" pour afficher les options */}
                <IconButton color="primary" onClick={handleAddClick}>
                  <AddIcon />
                </IconButton>

                {/* Menu déroulant avec les options */}
                <Menu
                  anchorEl={anchorElAdd}
                  open={openAdd}
                  onClose={handleCloseClick}
                >
                  {/* Sélectionner une image */}
                  <MenuItem>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="camera-upload"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="camera-upload"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <PhotoLibraryIcon style={{ marginRight: 10 }} />
                      Galerie
                    </label>
                  </MenuItem>

                  {/* Envoyer un message vocal */}
                  <MenuItem onClick={handleVoiceMessage}>
                    <MicIcon
                      style={{
                        marginRight: 10,
                        color: isRecording ? "red" : "inherit",
                      }}
                    />
                    Message vocal
                  </MenuItem>

                  {/* Ouvrir la webcam */}
                  <MenuItem onClick={toggleWebCam}>
                    <CameraAltIcon style={{ marginRight: 10 }} />
                    Webcam
                  </MenuItem>
                </Menu>
              </Box>

              {/* Affichage de la webcam */}
              {isWebCamActive && (
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    style={{ width: "100%", height: "auto" }}
                  />
                  <canvas ref={canvasRef} style={{ display: "none" }} />
                </Box>
              )}
              {/* Affichage de l'image capturée */}
              {webcamImage && (
                <Box sx={{ marginTop: 2 }}>
                  <img
                    src={webcamImage}
                    alt="Captured"
                    style={{
                      width: "100%",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}

              {/* Bouton pour capturer l'image */}
              {isWebCamActive && (
                <Box sx={{ padding: 1 }}>
                  <IconButton color="primary" onClick={captureImage}>
                    Prendre une photo
                  </IconButton>
                </Box>
              )}
            </Paper>
          </motion.div>
        )}
      </Box>

      {/* Modal Adresse*/}
      <Modal
        open={openContact}
        onClose={handleCloseContact} // Ce gestionnaire s'assure de fermer le modal si on clique en dehors
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          // On rend le backdrop transparent pour que la carte soit visible en dessous
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Rendre le fond transparent
          },
          onClick: (e) => e.stopPropagation(), // Empêche la fermeture du modal au clic sur le backdrop
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={openContact}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              width: "600px", // Agrandir le modal
              maxHeight: "90vh",
              overflowY: "auto",
              zIndex: 1301, // Positionner le modal au-dessus
            }}
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture du modal par clic interne
          >
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Notre adresse</Typography>
              <IconButton onClick={handleCloseContact}>
                {" "}
                {/* Icône pour fermer */}
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Contenu de votre modal */}
            <Box mt={4} sx={{ height: "300px", position: "relative" }}>
              {/* Carte */}
              {renderMap}
            </Box>
          </motion.div>
        </Fade>
      </Modal>
    </>
  );
}
