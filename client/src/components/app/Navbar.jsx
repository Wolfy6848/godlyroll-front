import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png"; // your logo image import
import UserIcon from "../../assets/user-icon.svg"; // user icon image

const Navbar = ({ toggleChat }) => {
  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-logo">
        <img src={Logo} alt="Logo" height="40" />
      </Link>
      <ul className="navbar-menu">
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><button onClick={toggleChat}>Chat</button></li>
      </ul>
      <div className="navbar-user">
        <img src={UserIcon} alt="User" height="30" />
      </div>
    </nav>
  );
};

export default Navbar;
