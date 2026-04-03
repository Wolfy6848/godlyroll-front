import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getCrashSchema, getMarketplaceItems, purchaseItem } from "../services/api.service";
import { crashSocket } from "../services/websocket.service";
import PropTypes from "prop-types";
import _ from "underscore";
import { motion } from "framer-motion";
import parseCommasToThousands from "../utils/parseCommasToThousands";
import cutDecimalPoints from "../utils/cutDecimalPoints";
import { TransitionGroup } from 'react-transition-group';
import { Line } from 'react-chartjs-2';

// MUI Components
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";

import MonetizationOnOutlined from "@material-ui/icons/MonetizationOnOutlined";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import Grow from '@material-ui/core/Grow';
import { TimerBar } from "./TimerBar.js";

import Multi from "../components/crash/Multi.jsx";

import InventoryModal from "../components/modals/inventory/InventoryModal.jsx";
import PurchaseModal from "../components/modals/PurchaseModal.jsx"

// Icons
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
// Components
import Bets from "../components/crash/Bets";
import CrashGraph from "../components/crash/CrashGraph";
import HistoryEntry from "../components/crash/HistoryEntry";

import placebet from "../assets/sounds/place-bet.mp3";
import error from "../assets/sounds/error.mp3";
import success from "../assets/success.wav";
import crash from "../assets/sounds/crash.mp3";
import coin from "../assets/icons/coin.svg";

const playSound = audioFile => {
  audioFile.play();
};

const BetInput = withStyles({
  root: {
    width: "100%",
    marginTop: "auto",
    border: "1px solid transparent",
    background: "#14151D",
    borderRadius: "5px",
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

const TargetInput = withStyles({
  root: {
    width: "50%",
    borderRadius: "10px",
    background: "#32363c",
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
      marginLeft: "-15px",
      fontWeight: 500,
      letterSpacing: ".1em",
      padding: "0.5rem 1rem",
      "&.MuiFilledInput-root.Mui-focused": {
        background: "#32363c",
      },
    },
    "& div": {
      background: "#0D1116",
      height: "2.25rem",
      borderRadius: "10px",
      "&:hover": {
        background: "#0D1116",
        "&.MuiFilledInput-root.Mui-focused": {
          background: "#0D1116",
        },
      },
      "&.MuiFilledInput-root.Mui-focused": {
        background: "#0D1116",
      },
    },
    "&:hover": {
      background: "#0D1116",
    },
  },
})(TextField);

// Custom Styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%",
    maxWidth: "1250px",
    margin: "0 auto",
    overflowY: "auto",
    scrollbarWidth: "none"
  },
  container: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: "140px",
    },
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  itemBox: {
    height: '210px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: "#101217",
    '&:hover': {
      filter: "brightness(90%)",
      cursor: "pointer"
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#14151D',
    border: '2px solid #282A3A',
    borderRadius: '10px',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalButton: {
    margin: theme.spacing(1),
    width: '120px',
  },
  purchaseButton: {
    backgroundColor: '#B95FFF',
    color: 'white',
    '&:hover': {
      backgroundColor: '#9B4FD5',
    },
  },
  cancelButton: {
    backgroundColor: '#4A4D5E',
    color: 'white',
    '&:hover': {
      backgroundColor: '#3A3D4E',
    },
  },
  itemImage: {
    width: "100px",
    height: "90px",
    objectFit: "contain",
    zIndex: 2
  },
  itemColor: {
    width: "150px",
    height: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1
  },
  itemPrice: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    padding: "0.25rem 0.5rem",
    fontSize: "12px",
    borderRadius: "0.25rem",
    backgroundColor: "#B95FFF",
    color: "white",
    bottom: 10,
    fontWeight: 500
  },
  percentText: {
    position: "absolute",
    fontWeight: 500,
    fontSize: 12,
    top: 10,
    right: 10,
    color: "#fff",
    opacity: 0.36
  },
}));

const Marketplace = ({ user, isAuthenticated }) => {
  // Declare State
  const classes = useStyles();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [openInventory, setInventoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("priceHighest");
  const [totalValue, setTotalValue] = useState(0);
  const [totalItemsToday, setTotalItemsToday] = useState(0);
  const [totalPriceToday, setTotalPriceToday] = useState(0);
  const [adjustmentSortOrder, setAdjustmentSortOrder] = useState("none");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredAndSortedItems = listing
  ?.filter(item => 
    item.display_name.toLowerCase().includes(searchTerm.toLowerCase()))
  ?.sort((a, b) => {
    switch (sortOrder) {
      case "priceHighest":
        return b.price - a.price;
      case "priceLowest":
        return a.price - b.price;
      case "adjustmentHighest":
        return (b.adjustment || 0) - (a.adjustment || 0);
      case "adjustmentLowest":
        return (a.adjustment || 0) - (b.adjustment || 0);
      default:
        return 0;
    }
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };  

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const data = await getMarketplaceItems();
  
        setListing(data.listings);

        if (data && data.listings) {
          const value = data.listings.reduce((acc, item) => acc + (item.price || 0), 0);
          setTotalValue(value);
          setTotalItemsToday(data.totalItems)
          setTotalPriceToday(data.totalValue)
        }
      } catch (error) {
        console.log(
          "There was an error while loading user affiliates data:",
          error
        );
      }
    };
    if (!loading) {
      fetchListings();
    }
  }, [loading, isAuthenticated]);

  const handlePurchase = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const confirmPurchase = async () => {
    try {
      await purchaseItem(selectedItem._id);
      addToast("Purchase successful!", { appearance: 'success' });
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.status === "Insufficient-Funds"
          ? "Insufficient funds. Please add more funds to complete the purchase."
          : `${error.response.data.status}`;
        addToast(errorMessage, { appearance: 'error' });
      } else {
        console.log("Error during purchase:", error);
        addToast("Error during purchase. Please try again.", { appearance: 'error' });
      }
    } finally {
      setModalOpen(false);
    }
  };
  
  return (
  <Grow in timeout={620}>
    <Box className={classes.barContainer}>
      <InventoryModal open={openInventory} handleClose={() => setInventoryOpen(!openInventory)}/>

      <h3 style={{maxWidth: "1250px", display: "flex", justifyContent: "flex-start", alignItems: "center", alignSelf: "center", position: "relative", left: "50%", transform: "translateX(-50%)", paddingLeft: 10, backgroundColor: "#14151D", minHeight: 80, color: "white", fontSize: 18, fontWeight: 400, borderRadius: 5, border: "2px solid #282A3A" }}>Marketplace</h3>
      <Box className={classes.root}>
        <div className={classes.mainContainer}>
          <div style={{minWidth: "100%", gap: "1%", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(312.5, 1fr))", alignItems: "center", minHeight: 80}}>
            <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "flex-start", flexDirection: "column", paddingLeft: 10, backgroundColor: "#14151D", minHeight: 80, color: "white", fontSize: 18, fontWeight: 400, borderRadius: 5 }}>
              <a style={{color: "#898A8E", fontWeight: "400", fontSize: 12}}>Marketplace</a>
              <a style={{color: "#fff", fontWeight: "500", fontSize: 15}}>{listing && listing.length} Items</a>
            </div>
            <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "flex-start", flexDirection: "column", paddingLeft: 10, backgroundColor: "#14151D", minHeight: 80, color: "white", fontSize: 18, fontWeight: 400, borderRadius: 5 }}>
              <a style={{color: "#898A8E", fontWeight: "400", fontSize: 12}}>Total Value</a>
              <a style={{color: "#B95FFF", fontWeight: "500", fontSize: 15, display: "flex", gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "center"}}><img src={coin} style={{width: 30, height: 30}} /> {totalValue.toLocaleString()}</a>
            </div>
            <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "flex-start", flexDirection: "column", paddingLeft: 10, backgroundColor: "#14151D", minHeight: 80, color: "white", fontSize: 18, fontWeight: 400, borderRadius: 5 }}>
              <a style={{color: "#898A8E", fontWeight: "400", fontSize: 12}}>Items Traded Today</a>
              <a style={{color: "#fff", fontWeight: "500", fontSize: 15}}>{totalItemsToday} Items</a>
            </div>
            <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "flex-start", flexDirection: "column", paddingLeft: 10, backgroundColor: "#14151D", minHeight: 80, color: "white", fontSize: 18, fontWeight: 400, borderRadius: 5 }}>
            <a style={{color: "#898A8E", fontWeight: "400", fontSize: 12}}>Total Volume Today</a>
            <a style={{color: "#B95FFF", fontWeight: "500", fontSize: 15, display: "flex", gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "center"}}><img src={coin} style={{width: 30, height: 30}} />{totalPriceToday.toLocaleString()}</a>
            </div>
          </div>
          <div style={{width: "100%", minWidth: "100%", gap: "1%", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 40, marginTop: 20 }}>
            <div style={{width: "100%", maxWidth: "40px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", backgroundColor: "#14151D", backgroundBlendMode: "overlay", backgroundImage: "linear-gradient(180deg, rgba(20, 21, 29, 0) 0%, #b95fff 100%)", minHeight: 40, color: "white", fontSize: 18, fontWeight: 400, borderRadius: 5, border: "1px solid #B95FFF" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.25 12H8.895M4.534 12H2.75M4.534 12C4.534 11.4218 4.76368 10.8673 5.17251 10.4585C5.58134 10.0497 6.13583 9.82001 6.714 9.82001C7.29217 9.82001 7.84666 10.0497 8.25549 10.4585C8.66432 10.8673 8.894 11.4218 8.894 12C8.894 12.5782 8.66432 13.1327 8.25549 13.5415C7.84666 13.9503 7.29217 14.18 6.714 14.18C6.13583 14.18 5.58134 13.9503 5.17251 13.5415C4.76368 13.1327 4.534 12.5782 4.534 12ZM21.25 18.607H15.502M15.502 18.607C15.502 19.1853 15.2718 19.7404 14.8628 20.1494C14.4539 20.5583 13.8993 20.788 13.321 20.788C12.7428 20.788 12.1883 20.5573 11.7795 20.1485C11.3707 19.7397 11.141 19.1852 11.141 18.607M15.502 18.607C15.502 18.0287 15.2718 17.4746 14.8628 17.0657C14.4539 16.6567 13.8993 16.427 13.321 16.427C12.7428 16.427 12.1883 16.6567 11.7795 17.0655C11.3707 17.4743 11.141 18.0288 11.141 18.607M11.141 18.607H2.75M21.25 5.39301H18.145M13.784 5.39301H2.75M13.784 5.39301C13.784 4.81484 14.0137 4.26035 14.4225 3.85152C14.8313 3.44269 15.3858 3.21301 15.964 3.21301C16.2503 3.21301 16.5338 3.2694 16.7983 3.37896C17.0627 3.48851 17.3031 3.64909 17.5055 3.85152C17.7079 4.05395 17.8685 4.29427 17.9781 4.55876C18.0876 4.82325 18.144 5.10673 18.144 5.39301C18.144 5.67929 18.0876 5.96277 17.9781 6.22726C17.8685 6.49175 17.7079 6.73207 17.5055 6.93451C17.3031 7.13694 17.0627 7.29751 16.7983 7.40707C16.5338 7.51663 16.2503 7.57301 15.964 7.57301C15.3858 7.57301 14.8313 7.34333 14.4225 6.93451C14.0137 6.52568 13.784 5.97118 13.784 5.39301Z" stroke="#B95FFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
              </svg>
            </div>
            <div onClick={() => setInventoryOpen(!openInventory)} style={{maxWidth: 114, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", backgroundColor: "#B95FFF", minHeight: 40, color: "white", fontSize: 12, paddingLeft: 10, paddingRight: 10, fontWeight: 400, borderRadius: 10 }}>
              List your MM2
            </div>
            <div style={{maxWidth: 450, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", backgroundColor: "#14151D", minHeight: 40, color: "white", fontSize: 12, paddingLeft: 10, paddingRight: 10, fontWeight: 400, borderRadius: 10 }}>
              <input
                style={{width: "100%", height: "100%", background: "none", outline: "none", border: "none", color: "#FFFFFF", fontWeight: 500, fontFamily: "Poppins"}}
                placeholder="Search for an item..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div style={{maxWidth: 350, width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", backgroundColor: "#14151D", minHeight: 40, color: "#898A8E", fontSize: 12, paddingLeft: 10, paddingRight: 10, fontWeight: 400, borderRadius: 5 }}>
              Sort:
              <select 
                style={{ maxWidth: "100%", width: "100%", outline: "none", border: 0, background: "rgb(20, 21, 29)", color: "white", fontFamily: "Poppins", fontWeight: "400", fontSize: 12 }}
                value={sortOrder} 
                onChange={(e) => handleSortOrderChange(e.target.value)}
              >
                <option value="priceHighest">Price: Highest to Lowest</option>
                <option value="priceLowest">Price: Lowest to Highest</option>
                <option value="adjustmentHighest">Adjustment: Highest to Lowest</option>
                <option value="adjustmentLowest">Adjustment: Lowest to Highest</option>
              </select>
            </div>
            <div style={{display: "flex", width: "100%", maxWidth: 240, justifyContent: "space-between", alignItems: "flex-start", flexDirection: "row", minHeight: 40, color: "white", fontSize: 12, fontWeight: 400, borderRadius: 5 }}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.725 25.7575C36.225 25.7575 38.25 27.7825 38.25 30.2825V32.005H38.2375C38.1525 33.955 37.6175 36.3975 35.43 38.3925C33.04 40.575 28.9125 42 22 42C15.085 42 10.96 40.575 8.57 38.3925C6.3825 36.3975 5.8475 33.9525 5.7625 32.005H5.75V30.28C5.75 27.7825 7.775 25.7575 10.275 25.7575H33.725ZM13.25 4.49999C12.2554 4.49999 11.3016 4.89508 10.5983 5.59834C9.89509 6.3016 9.5 7.25543 9.5 8.24999V18.25C9.5 19.2446 9.89509 20.1984 10.5983 20.9016C11.3016 21.6049 12.2554 22 13.25 22H30.75C31.7446 22 32.6984 21.6049 33.4017 20.9016C34.1049 20.1984 34.5 19.2446 34.5 18.25V8.24999C34.5 7.25543 34.1049 6.3016 33.4017 5.59834C32.6984 4.89508 31.7446 4.49999 30.75 4.49999H23.25V3.24999C23.2571 3.08395 23.2296 2.91825 23.1693 2.76339C23.109 2.60853 23.0171 2.46789 22.8996 2.35037C22.7821 2.23286 22.6415 2.14103 22.4866 2.08072C22.3317 2.0204 22.166 1.99291 22 1.99999C21.31 1.99999 20.75 2.57499 20.75 3.24999V4.49999H13.25ZM14.5 13.25C14.5 12.5869 14.7634 11.9511 15.2322 11.4822C15.7011 11.0134 16.337 10.75 17 10.75C17.663 10.75 18.2989 11.0134 18.7678 11.4822C19.2366 11.9511 19.5 12.5869 19.5 13.25C19.5 13.913 19.2366 14.5489 18.7678 15.0178C18.2989 15.4866 17.663 15.75 17 15.75C16.337 15.75 15.7011 15.4866 15.2322 15.0178C14.7634 14.5489 14.5 13.913 14.5 13.25ZM24.5 13.25C24.5 12.5869 24.7634 11.9511 25.2322 11.4822C25.7011 11.0134 26.337 10.75 27 10.75C27.663 10.75 28.2989 11.0134 28.7678 11.4822C29.2366 11.9511 29.5 12.5869 29.5 13.25C29.5 13.913 29.2366 14.5489 28.7678 15.0178C28.2989 15.4866 27.663 15.75 27 15.75C26.337 15.75 25.7011 15.4866 25.2322 15.0178C24.7634 14.5489 24.5 13.913 24.5 13.25Z" fill="#B95FFF"/>
              </svg>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-evenly", height: "100%", maxWidth: "180", paddingLeft: 10}}>
                <a style={{color: "#898A8E", fontWeight: "400", fontSize: 11}}>Your trades are protected by our</a>
                <a style={{color: "#B95FFF", fontWeight: "500", fontSize: 12, display: "flex", gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>LUA BOT SYSTEM</a>
              </div>
            </div>
          </div>
          <div style={{width: "100%", minWidth: "100%", gap: "1rem", display: "grid", gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))', alignItems: "center", marginTop: 20, overflowY: "auto", minHeight: 200}}>
            {listing !== null && filteredAndSortedItems.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  onClick={() => handlePurchase(item)}
                  className={classes.itemBox}
                  whileHover={{scale: 1.02}}
                  style={{
                    borderBottom: `2px solid #B95FFF`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    backgroundBlendMode: "overlay",
                    backgroundImage: "linear-gradient(180deg, rgba(20, 21, 29, 0) 0%, #b95fff 100%)",
                  }}
                >
                  {item.adjustment && item.adjustment >= 1 && (
                    <div className={classes.percentText} style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      width: "60px",
                      backgroundColor: "#FF3A3A",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      opacity: 1,
                      color: '#FFFFFF',
                    }}>
                      +{item.adjustment}%
                    </div>
                  )}
                  {item.adjustment && item.adjustment <= 1 && (
                    <div className={classes.percentText} style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      width: "60px",
                      backgroundColor: "#6BE861",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      opacity: 1,
                      color: '#FFFFFF',
                    }}>
                      {item.adjustment}%
                    </div>
                  )}
                  <img src={item.thumbnail} className={classes.itemImage} />
                  <a style={{fontSize: 10, textAlign: "center", width: "80%", wordBreak: "wrap", color: "#FFFFFF", fontWeight: 500, marginTop: 20}}>{item.display_name}</a>
                  <div className={classes.itemPrice}>
                    <img src={coin} alt="Coin" style={{height: 20, width: 20}} />
                    {item.price}
                  </div>
                </motion.div>
              );
            })}
            {listing === null && (
              <>No available items</>
            )}
          </div>
        </div>
      </Box>
      <PurchaseModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        item={selectedItem}
        onConfirm={confirmPurchase}
      />
    </Box>
  </Grow>
  );
};

Marketplace.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default Marketplace;