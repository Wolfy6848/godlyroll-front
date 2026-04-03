import React from "react";
import Logo from "../../assets/logo.png"; // original image import

const Footer = () => {
  return (
    <footer className="app-footer">
      <img src={Logo} alt="Site Logo" style={{ height: 50 }} />
      <p>© {new Date().getFullYear()} GodlyRoll. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
