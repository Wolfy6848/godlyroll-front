import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import MM2 from "./deposit/MM2.jsx";

// Assets
import csgo from "../../../assets/cashier/csgo.png";

// Custom Styles
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    width: "calc(200% + 3rem)",
    gap: "3rem",
    transition: "transform 0.75s",
    padding: "1.5em",
  },
  sectionContainer: {
    gap: "0.75rem",
    gridTemplateColumns: "repeat(1,minmax(0,1fr))",
    width: "100%",
    display: "grid",
    paddingBottom: "0.5rem"
  },
  grid: {
    gridTemplateColumns: "repeat(6,minmax(0,1fr))",
    gap: "0.75rem",
    width: "100%",
    display: "grid",
    outline: 0,
  },
  choiceBox: {
    userSelect: "none",
    cursor: "pointer",
    borderRadius: "0.5rem",
    height: "120px",
    width: "100%",
    backgroundColor: "#14151D",
    backgroundBlendMode: "overlay",
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0%) 49%, rgba(255, 255, 255, 20%) 100%)",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "0.75rem",
    textAlign: "center",
    transitionDuration: "300ms",
    position: "relative",
    zIndex: 1,
    "&:hover": {
      "& > div": {
        opacity: 1
      },
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
  },
  imageContainer: {
    backgroundColor: "#14151D",
    backgroundBlendMode: "overlay",
    borderRadius: "0.5rem",
    padding: "1rem",
    width: "100%",
    overflow: "visible",
    display: "flex",
    position: "relative",
    alignItems: "center",
    zIndex: 3,
    justifyContent: "center",
    userSelect: "none"
  },
  optionImage: {
    maxHeight: "100%",
    zIndex: 4,
    width: "50px",
  },
  optionText: {
    color: "#fff",
    fontSize: "12px",
    zIndex: 3,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  gradientCSGO: {
    backgroundColor: "#14151D",
    backgroundBlendMode: "overlay",
    background: "radial-gradient(81% 81% at 50% 0%, #ff3f3f 0%, rgba(255, 63, 63, 0) 100%)",
    transition: "0.5s all",
    zIndex: 2,
  },
}));

const Withdraw = () => {
  const classes = useStyles();
  const [method, setMethod] = useState(null);
  const [animation, setAnimation] = useState(false);

  const handleClose = () => {
    setAnimation(false);
    setTimeout(() => {
      setMethod(null);
    }, 750);
  };

  const renderPaymentComponent = () => {
    switch (method) {
      case "mm2":
        return <MM2 handleClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <div className={classes.container} style={{ transform: animation ? "translateX(calc(-50%))" : "translateX(0)" }}>
      <div style={{ width: "50%" }}>
        <div className={classes.sectionContainer} style={{ marginTop: "1rem" }}>
          <h4 style={{ color: "#fff", fontWeight: 500, margin: 0, padding: 0 }}>MM2 Items</h4>
          <div className={classes.grid}>
            <a href="/marketplace" className={classes.choiceBox}>
              <div className={`${classes.imageContainer} ${classes.gradientCSGO}`}>
                <img className={classes.optionImage} src={csgo} />
              </div>
              <span className={classes.optionText}>MM2</span>
            </a>
          </div>
        </div>
      </div>
      <div style={{ width: animation ? "" : "3rem" }} />
      <div style={{ width: "50%" }}>
        {renderPaymentComponent()}
      </div>
    </div>
  );
};

export default Withdraw;
