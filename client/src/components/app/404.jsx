import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0E0F15",
        color: "white",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: 100, fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/home")}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
