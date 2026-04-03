import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        p: 2,
        mt: "auto",
        backgroundColor: "#14151D",
        textAlign: "center",
        color: "#888",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} FullSend. All rights reserved.{" "}
        <Link href="/terms" color="inherit">
          Terms
        </Link>{" "}
        |{" "}
        <Link href="/privacy" color="inherit">
          Privacy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
