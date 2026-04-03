import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import BackgroundImage from "../../../assets/background.png";
import Tip from "./Tip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  getUserRobloxInformation,
  updateRobloxUsername,
} from "../../../services/api.service";

// Custom Styles
const useStyles = makeStyles((theme) => ({
  modal: {
    fontFamily: "Poppins",
    maxWidth: "100% !important",
    "& .MuiDialog-paperWidthSm": {
      scrollbarWidth: "none",
      maxWidth: "1000px !important",
      width: "100%",
      background: "#101117",
      borderRadius: "0.5em",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        margin: "15px",
        maxHeight: "80%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        margin: "15px",
        maxHeight: "80%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
        margin: "15px",
        maxHeight: "80%",
      },
    },
  },
  titleBox: {
    display: "flex",
    boxShadow:
      "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
    alignItems: "center",
    paddingLeft: "1.5em",
    paddingRight: "1em",
    paddingBottom: "1em",
    fontFamily: "Poppins",
    backgroundColor: "#14151D",
    justifyContent: "space-between",
    width: "100%",
  },
  content: {
    display: "block",
    background: "#0E0F15",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundBlendMode: "overlay",
  },
  buttonIcon: {
    color: "#9E9FBD",
    marginRight: ".5em",
    fill: "currentColor",
    flex: "none",
    width: "1.25em",
    height: "1.25em",
    display: "inline-block",
    outline: "none",
  },
  tabContainer: {
    backgroundColor: "#14151D",
    backgroundBlendMode: "overlay",
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0%) 49%, rgba(255, 255, 255, 20%) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottom: "3px solid #282A3A",
    height: 80,
    paddingLeft: 15,
    paddingRight: 15,
  },
  tabButton: {
    color: "#9E9FBD",
    fontWeight: 500,
    userSelect: "none",
    cursor: "pointer",
    transitionDuration: "300ms",
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonActive: {
    background: "linear-gradient(180deg, #B95FFF 0%, #801CFF 100%)",
    color: "#FFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
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
      filter: "brightness(50%)",
    },
  },
}));

const Cashier = ({ user, isAuthenticated, open, handleClose }) => {
  // Declare State
  const classes = useStyles();
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("deposit");
  const [robloxUsername, setRobloxUsername] = useState("");
  const [handledUsername, setHandlerUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    const fetchRobloxUsername = async () => {
      try {
        const response = await getUserRobloxInformation();
        setRobloxUsername(response.username || "");
      } catch (error) {
        addToast(error.message, { appearance: "error" });
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      setLoading(true);
      fetchRobloxUsername();
    }
  }, [open, addToast]);

  // Function to handle the Roblox username update
  const handleUpdateRobloxUsername = async () => {
    try {
      setSaving(true);
      const response = await updateRobloxUsername(handledUsername);
      if (response.code) {
        setCode(response.code);
        return addToast(
          "Please set this code as your Roblox Description",
          { appearance: "success" }
        );
      }
      addToast("Roblox username updated successfully!", {
        appearance: "success",
      });
    } catch (error) {
      addToast(error.message, { appearance: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      className={classes.modal}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <div className={classes.content}>
        {robloxUsername === "Set Roblox Username" && !loading ? (
          <div style={{ padding: "1em" }}>
            <h2 style={{ color: "#FFF", fontFamily: "Poppins" }}>
              Set Roblox Username
            </h2>
            <TextField
              label="Roblox Username"
              variant="outlined"
              value={handledUsername}
              onChange={(e) => setHandlerUsername(e.target.value)}
              className={classes.textField}
              fullWidth
            />
            <Button
              variant="contained"
              className={classes.buttonlogin}
              onClick={handleUpdateRobloxUsername}
              disabled={saving || handledUsername.length === 0}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
            {code && (
              <p
                style={{
                  color: "#FFF",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  marginTop: "1em",
                }}
              >
                Your verification code: <strong>{code}</strong>
              </p>
            )}
          </div>
        ) : (
          <React.Fragment>
            <div className={classes.tabContainer}>
              <div
                className={`${classes.tabButton} ${
                  tab === "deposit" ? classes.buttonActive : ""
                }`}
                onClick={() => setTab("deposit")}
              >
                Deposit
              </div>
              <div
                className={`${classes.tabButton} ${
                  tab === "withdraw" ? classes.buttonActive : ""
                }`}
                onClick={() => setTab("withdraw")}
                style={{ marginLeft: "0.5em" }}
              >
                Withdraw
              </div>
              <div
                className={`${classes.tabButton} ${
                  tab === "tip" ? classes.buttonActive : ""
                }`}
                onClick={() => setTab("tip")}
                style={{ marginLeft: "0.5em" }}
              >
                Tipping
              </div>
            </div>
            {!user || !isAuthenticated ? (
              <div
                style={{ display: "flex", color: "#9E9FBD", gap: "0.2rem" }}
              >
                Please{" "}
                <a
                  style={{ color: "inherit", textTransform: "none" }}
                  onClick={() => console.log("Implement login logic here")}
                >
                  log in
                </a>{" "}
                to view cashier.
              </div>
            ) : tab === "deposit" ? (
              <Deposit user={user} />
            ) : tab === "tip" ? (
              <Tip user={user} />
            ) : tab === "withdraw" ? (
              <Withdraw />
            ) : (
              ""
            )}
          </React.Fragment>
        )}
      </div>
    </Dialog>
  );
};

Cashier.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Cashier);