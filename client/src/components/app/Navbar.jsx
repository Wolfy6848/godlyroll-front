import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ toggleChat }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#14151D",
        zIndex: 1300,
        boxShadow: "none",
        borderBottom: "1px solid #282A3A",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          FullSend
        </Typography>

        <IconButton color="inherit" onClick={toggleChat}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
