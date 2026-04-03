import React, { useState, useEffect, Fragment } from "react";
import { Tab, makeStyles } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import BackgroundImage from '../../../assets/background.png'

// Custom Styles
const useStyles = makeStyles(theme => ({
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
    boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
    alignItems: "center",
    paddingLeft: "1.5em",
    paddingRight: "1em",
    paddingBottom: "1em",
    fontFamily: "Poppins", 
    backgroundColor: "#14151D", 
    justifyContent: "space-between",
    width: "100%"
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
    marginRight: "0.5em",
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
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0%) 49%, rgba(255, 255, 255, 20%) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottom: "3px solid #282A3A",
    height: 80,
    paddingLeft: 15,
    paddingRight: 15
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
    paddingBottom: 5
  },
}));

const Inventory = ({ user, isAuthenticated, open, handleClose, }) => {
  // Declare State
  const classes = useStyles();
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("deposit");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setLoading(false);
      } catch (error) {

      }
    };
    
    if (open) {
      fetchData();
    } else {

    }
  }, [open]);

  return (
      <Dialog
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >    
        <div className={classes.content} >
          <div className={classes.tabContainer}>
            <div className={`${classes.tabButton} ${tab == "deposit" ? classes.buttonActive : ""}`} onClick={() => setTab("deposit")}>
              Inventory
            </div>
            <div style={{marginLeft: "auto"}} className={`${classes.tabButton} ${classes.buttonActive}`} onClick={() => setTab("withdraw")}>
              Bots
            </div>
          </div>
          {
            !user || !isAuthenticated ? (
              <div style={{display: "flex", color: "#9E9FBD", gap: "0.2rem"}}>
                Please{" "}<a style={{color: "inherit", textTransform: "none"}}>log in</a>{" "}to view your inventory.
              </div>
            ) :
            tab == "deposit" 
            ? <Deposit user={user} isAuthenticated={isAuthenticated} isLoading={false} handleClose={handleClose} />
            : tab == "withdraw"
            ? <Withdraw />
            : tab == ""
            ? <div />
            : ""
          }
        </div> 
      </Dialog>
  );
};

Inventory.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Inventory);
