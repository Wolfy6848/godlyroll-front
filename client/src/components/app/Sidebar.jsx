import React from "react";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isMinimized }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/home" },
    { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
  ];

  return (
    <List sx={{ width: isMinimized ? 80 : 240, p: 1 }}>
      {menuItems.map((item) => (
        <ListItemButton
          key={item.text}
          onClick={() => navigate(item.path)}
          sx={{ mb: 1, borderRadius: 1 }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
            {item.icon}
          </ListItemIcon>
          {!isMinimized && (
            <ListItemText primary={item.text} sx={{ color: "white" }} />
          )}
        </ListItemButton>
      ))}
    </List>
  );
};

export default Sidebar;
