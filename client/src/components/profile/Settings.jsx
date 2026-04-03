import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import { getUserAffiliatesData, getUserRobloxInformation, updateRobloxUsername, updateUserAffiliateCode, uploadAvatar } from "../../services/api.service";
import { motion, AnimatePresence } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "1250px",
    margin: "0 auto",
    color: "#fff",
    marginTop: "1rem"
  },
  textField: {
    transitionDuration: "200ms",
    "& label": {
      color: "#e0e0e0",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: 300,
      letterSpacing: ".1em",
      transitionDuration: "200ms",
    },
    "& label.Mui-focused": {
      color: "#e0e0e0",
      fontFamily: "Poppins",
      fontWeight: "300",
      transitionDuration: "200ms",
    },
    "& .MuiInput-underline:after": {
      border: "2px solid #3d5564",
      fontFamily: "Poppins",
      fontWeight: "300",
      transitionDuration: "200ms",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid transparent",
        fontFamily: "Poppins",
        fontWeight: "300",
        transitionDuration: "200ms",
      },
      "&:hover fieldset": {
        border: "1px solid transparent",
        fontFamily: "Poppins",
        fontWeight: "300",
        transitionDuration: "200ms",
      },
      "&.Mui-focused fieldset": {
        border: "1px solid hsl(220, 22%, 62%)",
        fontFamily: "Poppins",
        fontWeight: "300",
        transitionDuration: "200ms",
      },
    },
    "& .MuiInput-root": {
      border: "1px solid hsl(220, 22%, 62%)",
      fontFamily: "Poppins",
      fontWeight: "300",
      transitionDuration: "200ms",
    },
    "&.MuiInputBase-root": {
      backgroundColor: "#14151D",
      
      borderRadius: "6px",
      marginBottom: "10px",
      color: "#e0e0e0",
      fontFamily: "Poppins",
      fontWeight: "300",
      padding: "10px 10px",
      border: "1px solid transparent",
      "& > div > input": {
        color: "#e0e0e0",
        fontFamily: "Poppins",
        fontWeight: "300",
        border: "1px solid hsl(220, 22%, 62%)",
      },
    },
    "& > div > input": {
      backgroundColor: "#14151D",
      borderRadius: "6px",
      transitionDuration: "200ms",
      color: "#e0e0e0",
      fontFamily: "Poppins",
      fontWeight: "300",
    },
  },
  buttonlogin: {
    color: "#fff",
    width: "100%",
    fontSize: "13px",
    background: "#8F36FF",
    fontFamily: "Poppins",
    fontWeight: "500",
    letterSpacing: ".02em",
    transition: "all 200ms",
    textTransform: "none",
    "&:hover": {
      filter: "brightness(50%)"
    },
  },
  avatarUpload: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  avatarPreview: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: 10,
  },
  fileInput: {
    display: "none",
  },
  uploadButton: {
    marginTop: 10,
  },
}));

const Settings = () => {
  const { addToast } = useToasts();
  const classes = useStyles();

  // State for affiliate code
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [affiliateCode, setAffiliateCode] = useState('');
  const [saving, setSaving] = useState(false);
  const [roblox, setRoblox] = useState('');
  const [saving2, setSaving2] = useState(false);
  const [code, setCode] = useState('');

  // Function to fetch affiliate code and other settings data
  const fetchData = async () => {
    try {
      const response = await getUserAffiliatesData();
      setAffiliateCode(response.affiliateCode);
      setLoading(false)
    } catch (error) {
      addToast(error.message, { appearance: "error" });
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await getUserRobloxInformation();
      setRoblox(response.username);
      setLoading2(false)
    } catch (error) {
      addToast(error.message, { appearance: "error" });
    }
  };

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  const handleUpdateAffiliateCode = async () => {
    try {
      setSaving(true);
      await updateUserAffiliateCode(affiliateCode);
      addToast("Affiliate code updated successfully!", { appearance: "success" });
    } catch (error) {
      addToast(error.message, { appearance: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateRobloxUser = async () => {
    try {
      setSaving2(true);
      let response = await updateRobloxUsername(roblox);
      if (response.code) {
        setCode(response.code)
        return addToast("Please set this code as your Roblox Description", { appearance: "success" });
      }
      addToast("Roblox username updated successfully!", { appearance: "success" });
    } catch (error) {
      addToast(error.message, { appearance: "error" });
    } finally {
      setSaving2(false);
    }
  };

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleAvatarUpload = async () => {
    try {
      setSaving(true);
      await uploadAvatar(avatar);
      addToast("Avatar updated successfully!", { appearance: "success" });
    } catch (error) {
      addToast(error.message, { appearance: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={classes.root}>
      <div style={{display: "flex", gap: "0.5rem", flexDirection: "column", maxWidth: "100%"}}>
        <label htmlFor="affiliate-code">Update Affiliate Code:</label>
        <TextField
          id="affiliate-code"
          className={classes.textField}
          name="code"
          variant="outlined"
          placeholder="Code"
          onChange={(e) => setAffiliateCode(e.target.value)}
          value={loading ? null : affiliateCode}
        />
        <Button
          size="medium"
          color="primary"
          className={classes.buttonlogin}
          disabled={saving || loading}
          onClick={handleUpdateAffiliateCode}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
      <div style={{display: "flex", gap: "0.5rem", flexDirection: "column", maxWidth: "100%", marginTop: 10}}>
        <label htmlFor="affiliate-code">Link Roblox Account</label>
        <TextField
          id="roblox-code"
          className={classes.textField}
          name="user"
          variant="outlined"
          placeholder="Username"
          onChange={(e) => setRoblox(e.target.value)}
          value={loading ? null : roblox}
        />
        <Button
          size="medium"
          color="primary"
          className={classes.buttonlogin}
          disabled={saving2 || loading2}
          onClick={handleUpdateRobloxUser}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
        <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 15, paddingBottom: 15, marginTop: 10, width: "100%", minWidth: "100%", backgroundColor: "#14151D", borderRadius: 5 }}>
          {code && (
            <a style={{color: "#C3C3C3"}}>Set this text as your <a style={{ color: "#FFF"}}>Roblox Description:</a><br style={{marginTop: 10}}/><a style={{ color: "purple"}}>{code}</a></a>
          )}
        </div>
      </div>
      <div className={classes.avatarUpload}>
        <label htmlFor="avatar-upload">Update Avatar:</label>
        {avatarPreview && (
          <img src={avatarPreview} alt="Avatar preview" className={classes.avatarPreview} />
        )}
        <input
          accept="image/*"
          className={classes.fileInput}
          id="avatar-upload"
          type="file"
          onChange={handleAvatarChange}
        />
        <label htmlFor="avatar-upload">
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.buttonlogin}
          >
            Choose File
          </Button>
        </label>
        <Button
          size="medium"
          color="primary"
          className={`${classes.buttonlogin} ${classes.uploadButton}`}
          disabled={saving || !avatar}
          onClick={handleAvatarUpload}
        >
          {saving ? "Uploading..." : "Upload Avatar"}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
