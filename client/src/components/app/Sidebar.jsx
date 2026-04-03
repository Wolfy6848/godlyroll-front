import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "../../assets/home-icon.svg";
import ProfileIcon from "../../assets/profile-icon.svg";
import SettingsIcon from "../../assets/settings-icon.svg";

const Sidebar = ({ isMinimized }) => {
  return (
    <aside className={`sidebar ${isMinimized ? "minimized" : ""}`}>
      <nav>
        <NavLink to="/home" activeClassName="active" className="sidebar-link">
          <img src={HomeIcon} alt="Home" />
          {!isMinimized && <span>Home</span>}
        </NavLink>
        <NavLink to="/profile" activeClassName="active" className="sidebar-link">
          <img src={ProfileIcon} alt="Profile" />
          {!isMinimized && <span>Profile</span>}
        </NavLink>
        <NavLink to="/settings" activeClassName="active" className="sidebar-link">
          <img src={SettingsIcon} alt="Settings" />
          {!isMinimized && <span>Settings</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
