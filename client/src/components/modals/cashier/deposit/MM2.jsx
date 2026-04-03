import React, { Fragment, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

// MUI Components
import TextField from "@material-ui/core/TextField";

const Input = withStyles({
  root: {
    width: "100%",
    marginTop: "auto",
    background: "#14151D",
    borderRadius: "0.25rem",
    overflow: "hidden",
    "& :before": {
      display: "none",
    },
    "& :after": {
      display: "none",
    },
    "& label": {
      color: "#323956",
      fontSize: 15,
    },
    "& div input": {
      color: "#e4e4e4",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: ".1em",
      padding: "0rem 0rem",
    },
    "& div": {
      height: "2.5rem",
      borderRadius: 4,
    },
    "&:hover": {
    }
  }
})(TextField);

// Custom Styles
const useStyles = makeStyles(theme => ({
  modal: {
    fontFamily: "Poppins",
    width: "100%",
    maxWidth: "800px"
  },
  titleBox: {
    display: "flex",
    alignItems: "center",
    paddingTop: "1em",
    paddingLeft: "1.5em",
    paddingRight: "1em",
    fontFamily: "Poppins", 
    justifyContent: "center",
    width: "100%"
  },
  content: {
    padding: "1.5em",
    display: "block",
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
  inputs: {
    display: "flex",
    flexDirection: "column",
    height: "10rem",
    justifyContent: "space-around",
    marginTop: "25px",
    "& > div": {
      "& label": {
        color: "#e4e4e4",
        fontFamily: "Poppins",
        fontSize: "15px",
        fontWeight: 300,
      },
      "& label.Mui-focused": {
        color: "#e4e4e4",
      },
      "& .MuiInput-underline:after": {
        borderRadius: "6px",
        borderColor: "#2f3947",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderRadius: "6px",
          borderColor: "#2f3947",
        },
        "&:hover fieldset": {
          borderRadius: "6px",
          borderColor: "#2f3947",
        },
        "&.Mui-focused fieldset": {
          borderRadius: "6px",
          borderColor: "#2f3947",
        },
      },
      "& > div > input": {
      },
    },
    "& > div > div": {
    },
  },
  value: {
    position: "relative",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "& > div": {
      width: "100%",
      "& > div": {
      },
      "& > div > input": {
        width: "70%",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    "& button": {
      color: "#e4e4e4",
      fontFamily: "Poppins",
      fontSize: "13px",
      fontWeight: 300,
      backgroundColor: "#1d76bd !important",
      position: "absolute",
      right: 0,
      top: "0.65rem",
      width: "6rem",
    },
  },
  Depvalue: {
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "& > div": {
      width: "100%",
      "& > div": {
      },
      "& > div > input": {
        width: "70%",
        color: "#fff",
        fontSize: "14px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    "& button": {
      color: "#e4e4e4",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: 300,
      position: "absolute",
      right: "0.65rem",
      top: "0.65rem",
      width: "6rem",
    },
  },
  withdraw: {
    color: "#e4e4e4",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 300,
    width: "100%",
    marginTop: "1rem",
    height: "3rem",
  },
  qr: {
    position: "absolute",
    width: 140,
    right: 0,
    top: 0,
    background: "white",
    borderRadius: 5,
    padding: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  qrcopy: {
    height: 140,
    width: 140,
    background: "white",
    borderRadius: 5,
    padding: "0.5rem",
  },
  flexbox: {
    alignItems: "center",
    "& img": {
      margin: "0 0 0 2em",
      marginTop: "25px",
      marginLeft: "-5px",
    },
  },
  cryptocolor: {
    color: "#f8931a",
  },
  depositRate: {
    color: "#fff",
    fontSize: "17px",
    margin: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  addressBox: {
    backgroundColor: "#14151D",
    border: "1px solid transparent",
    display: "flex",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "0.25rem",
    color: "rgb(208, 214, 225)",
    fontSize: "13px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "9px",
    },
  },
  infoText: {
    textAlign: "center",
    color: "rgb(208, 214, 225)", 
    fontSize: "0.75rem",
    margin: "0.3rem"
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    margin: "0 3rem 0 0 "
  },
  converterContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: "0.5rem",
    marginTop: "1rem"
  },
  inputIcon: {
    marginTop: "0 !important",
    color: "#fff",
    background: "transparent !important",
  },
  popupButton: {
    position: "absolute",
    top: 0,
    left: "50%",
    flex: "none",
    border: "none",
    cursor: "pointer",
    height: "2.25rem",
    display: "inline-flex",
    outline: "none",
    padding: "0 0.75rem",
    alignItems: "center",
    fontWeight: "bold",
    userSelect: "none",
    whiteSpace: "nowrap",
    willChange: "opacity",
    borderRadius: "0.25rem",
    justifyContent: "center",
    transitionDuration: "350ms",
    fontWeight: 500,
    color: "#9E9FBD",
    backgroundColor: "hsla(220, 100%, 82%, 0)",
    "&:hover": {
      backgroundColor: "#313A4D",
      filter: "brightness(130%)"
    }
  },
  buttonIcon: {
    marginRight: ".5em",
    fill: "#9E9FBD",
    flex: "none",
    display: "inline-block",
    outline: "none",
  },
  warningContainer: {
    borderLeft: "2px solid rgb(249 115 22)",
    backgroundColor: "rgba(253, 186, 116, 0.1)",
    padding: "0.75rem",
    color: "rgb(253 186 116)",
    textAlign: "center"
  },
  addressContainer: {
    display: "flex", 
    width: "100%", 
    gap: "3rem",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      gap: "1rem",
      justifyContent: "center",
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: "1rem",
      justifyContent: "center",
      alignItems: "center",
    },
  }
}));

const MM2 = ({ open, handleClose }) => {
  // Declare State
  const classes = useStyles();
  const { addToast } = useToasts();

  return (
    <div className={classes.container}>
        <div style={{ width: "100%", background: "#181923", borderRadius: 10, height: 75, display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 10, paddingRight: 10}}>
        <a style={{color: "#B95FFF", fontWeight: "500", fontSize: 15, display: "flex", gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "center"}}><div style={{width: 44, height: 44, borderRadius: 9, border: "2px solid #B95FFF", background: "linear-gradient(180deg, #202023 0%, #3b1956 100%)"}} />Stashstorage5</a>
        <a href='https://www.roblox.com/share?code=69e41d764b868b4d89ea22aa63f4718a&type=Server' style={{width: 100, height: 41, display: "flex", alignItems: 'center', justifyContent: 'center', borderRadius: 7, background: "linear-gradient(180deg, #b95fff 0%, #801cff 100%)", color: "#FFF", fontWeight: 400}}>Join</a>
        </div>
    </div>
  );
};

export default MM2;