import React, { useState, useEffect, Fragment } from "react";
import { makeStyles, StylesProvider } from "@material-ui/core";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { tryCreateOrderSkinsBack, getUserProfileData, listItemForSale, tryToWithdrawItemsMM2, cancelListing } from "../../../services/api.service.js";

// Components
import Bitcoin from "./deposit/Bitcoin";
import Ethereum from "./deposit/Ethereum";
import Litecoin from "./deposit/Litecoin";
import Dogecoin from "./deposit/Dogecoin";
import Usdt from "./deposit/Usdt";
import Usdc from "./deposit/Usdc";
import Card from "./deposit/Card";
import Cashapp from "./deposit/Cashapp";
import Giftcard from "./deposit/Giftcard";
import Sol from "./deposit/Sol";

// Assets
import bitcoin from "../../../assets/cashier/bitcoin.png";
import ethereum from "../../../assets/cashier/ether.png";
import litecoin from "../../../assets/cashier/litecoin.png";
import dogecoin from "../../../assets/cashier/dogecoin.png";
import usdtimg from "../../../assets/cashier/usdt-erc20.png";
import usdcimg from "../../../assets/cashier/usdc.png";
import solimg from "../../../assets/cashier/solanalogo.png";

import credit from  "../../../assets/cashier/credit.png";
import gift from  "../../../assets/cashier/giftcard.png";
import dota2 from "../../../assets/cashier/dota.png";
import rust from "../../../assets/cashier/rust.png";
import csgo from "../../../assets/cashier/csgo.png";
import cashapp from "../../../assets/cashier/cashapp.png";

import coin from "../../../assets/icons/coin.svg"
import { select } from "underscore";

// Custom Styles
const useStyles = makeStyles(theme => ({
  modal: {
    fontFamily: "Poppins",
    "& .MuiDialog-paperWidthSm": {
      scrollbarWidth: "none",
      maxWidth: "800px !important",
      width: "100%",
      background: "#0e1017",
      borderRadius: "0.5em",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        margin: "15px",
        marginTop: "80px",
        maxHeight: "80%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        margin: "15px",
        marginTop: "80px",
        maxHeight: "80%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
        margin: "15px",
        marginTop: "80px",
        maxHeight: "80%",
      },
    },
  },
  titleBox: {
    display: "flex",
    boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
    alignItems: "center",
    paddingTop: "1em",
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
    overflow: "hidden",
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
    marginBottom: "2em",
    display: "flex",
    borderBottom: "1px solid #272847",
  },
  tabButton: {
    color: "#9E9FBD",
    fontWeight: 500,
    userSelect: "none",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    paddingBottom: "0.5em",
    cursor: "pointer",
    transitionDuration: "300ms",
    borderBottom: "2px solid transparent"
  },
  buttonActive: {
    color: "hsl(220, 22%, 90%)",
    borderBottom: "2px solid hsl(220, 22%, 90%)"
  },
  lowerSection: {
    display: "grid",
    padding: "1.25rem",
    gap: "1.5rem"
  },
  container: {
    display: "flex",
    width: "100%",
    transition: "transform 0.75s",
  },
  sectionContainer: {
    gap: "0.75rem",
    gridTemplateColumns: "repeat(1,minmax(0,1fr))",
    width: "100%",
    display: "grid",
    paddingBottom: "0.5rem"
  },
  coin: {
    position: "absolute",
    top: 0,
    left: 0
  },
  grid: {
    gridTemplateColumns: "repeat(6,minmax(0,1fr))",
    gap: "0.75rem",
    width: "100%",
    display: "grid",
    outline: 0,
  },
  gridv2: {
    gridTemplateColumns: "repeat(3,minmax(0,1fr))",
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
    "&:hover" : {
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
  box: {
    userSelect: "none",
    cursor: "pointer",
    borderRadius: "0.5rem",
    height: "100px",
    width: "100%",
    backgroundColor: "#14151D",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: "0.5rem",
    textAlign: "center",
    transitionDuration: "300ms",
    "&:hover": {
      filter: "brightness(125%)"
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
  },
  image: {
    maxHeight: "100%",
    backgroundColor: "#020203",
    width: "70px",
    padding: "0.5rem",
    borderRadius: "0.5rem",
  },
  optionText: {
    color: "#fff",
    fontSize: "12px",
    zIndex: 3,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  gradientBitcoin: {
    position: "absolute",
    borderRadius: "0.5rem",
    background: "radial-gradient(1247.5% 175% at 0% 0%, #14151D 0%, #f4941c 100%)",
    transition: "0.5s all",
    zIndex: 2,
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradientEthereum: {
    position: "absolute",
    borderRadius: "0.5rem",
    background: "radial-gradient(1247.5% 175% at 0% 0%, #14151D 0%, #647cec 100%)",
    transition: "0.5s all",
    zIndex: 2,
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradientLitecoin: {
    position: "absolute",
    borderRadius: "0.5rem",
    background: "radial-gradient(1247.5% 175% at 0% 0%, #14151D 0%, #3389B9 100%)",
    transition: "0.5s all",
    zIndex: 2,
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradientUSDT: {
    position: "absolute",
    borderRadius: "0.5rem",
    background: "radial-gradient(1247.5% 175% at 0% 0%, #14151D 0%, #50b494 100%)",
    transition: "0.5s all",
    zIndex: 2,
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradientTRON: {
    position: "absolute",
    borderRadius: "0.5rem",
    background: "radial-gradient(1247.5% 175% at 0% 0%, #14151D 0%, #e1b303 100%)",
    transition: "0.5s all",
    zIndex: 2,
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradientDODA: {
    position: "absolute",
    borderRadius: "0.5rem",
    background: "radial-gradient(1247.5% 175% at 0% 0%, #14151D 0%, #a50809 100%)",
    transition: "0.5s all",
    zIndex: 2,
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradientUSDC: {
    position: "absolute",
    borderRadius: "0.5rem",
    background: "radial-gradient(1247.5% 175% at 0% 0%, #14151D 0%, #2474cc 100%)",
    transition: "0.5s all",
    zIndex: 2,
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradientRUST: {
    position: "absolute",
    borderRadius: "0.5rem",
    background: "radial-gradient(1247.5% 175% at 0% 0%, #14151D 0%, #ff5434 100%)",
    transition: "0.5s all",
    zIndex: 2,
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradientCSGO: {
    backgroundColor: "#14151D",
    backgroundBlendMode: "overlay",
    background: "radial-gradient(81% 81% at 50% 0%, #ff3f3f 0%, rgba(255, 63, 63, 0) 100%)",
    transition: "0.5s all",
    zIndex: 2,
  },
  gradientKINGUIN: {
    position: "absolute",
    borderRadius: "0.5rem",
    background: "radial-gradient(1247.5% 2300% at 0% 0%, #14151D 0%, #fff 100%)",
    transition: "0.5s all",
    zIndex: 2,
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradientCASHAPP: {
    position: "absolute",
    borderRadius: "0.5rem",
    background: "radial-gradient(1247.5% 175% at 0% 0%, #14151D 0%, #04d32c 100%)",
    transition: "0.5s all",
    zIndex: 2,
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradientCREDIT: {
    position: "absolute",
    borderRadius: "0.5rem",
    background: "radial-gradient(1247.5% 175% at 0% 0%, #14151D 0%, #113675 100%)",
    transition: "0.5s all",
    zIndex: 2,
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradientSolana: {
    position: "absolute",
    borderRadius: "0.5rem",
    background: "radial-gradient(1247.5% 175% at 0% 0%, #14151D 0%, #BABABA 100%)",
    transition: "0.5s all",
    zIndex: 2,
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
  slider: {
    width: '100%',
    appearance: 'none',
    height: '4px',
    borderRadius: '2px',
    background: '#282A3A',
    outline: 'none',
    opacity: '0.7',
    transition: 'opacity .2s',
    '&:hover': {
      opacity: '1',
    },
    '&::-webkit-slider-thumb': {
      appearance: 'none',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: '#B95FFF',
      cursor: 'pointer',
    },
    '&::-moz-range-thumb': {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: '#B95FFF',
      cursor: 'pointer',
    },
  },
  sliderContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  sliderValue: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '10px',
  },
  sliderLimits: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    color: '#898A8E',
    fontSize: '12px',
    marginTop: '5px',
  },
}));

const Deposit = ({ isLoading, isAuthenticated, user}) => {
  // Declare State
  const classes = useStyles();

  const [method, setMethod] = useState('deposit');
  const [animation, setAnimation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [listing, setListing] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [showPopup, setShowPopup] = useState(false);

  const buttonStyle = {
    background: 'linear-gradient(180deg, #b95fff 0%, #801bff 100%)',
    borderRadius: '10px',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  };

  const popupStyle = {
    alignSelf: "center",
    color: "#FFF",
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getUserProfileData(user._id);
      setProfile(data);
      setLoading(false);
      
      if (data && data.inventory) {
        const value = data.inventory.reduce((acc, item) => acc + (item.value || 0), 0);
        setTotalValue(value);
      }
    } catch (error) {
      console.log("There was an error while loading user profile data:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchData();
    }
  }, [isLoading, isAuthenticated, user?.username]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserProfileData(user._id);
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.log("There was an error while loading user profile data:", error);
      }
    };
    if (!isLoading && isAuthenticated) {
      fetchData();
    }
  }, [isLoading, isAuthenticated, user?.username]);

  const selectItem = (item) => {
    setSelectedItem(item);
    setSliderValue(0);
  };

  const listItem = async () => {
    if (selectedItem) {
      try {
        await listItemForSale(selectedItem, sliderValue);
        setShowPopup(true);
        setMethod('deposit');
        await fetchData();
      } catch (error) {
        console.log("Error listing item for sale:", error);
      }
    }
  };

  const withdrawMM2 = async () => {
    try {
      await tryToWithdrawItemsMM2(selectedItem);
      setShowPopup(true);
      setMethod('withdraw');

      await fetchData();
    } catch (error) {
      console.log("Error withdrawing MM2 items:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={classes.container} style={{ transform: animation ? "translateX(calc(-50%))" : "translateX(0)", display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
      <div style={{width: "100%", height: 450, display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row"}}>
      {!showPopup && (<>
        <div style={{width: "75%", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingTop: 10, flexDirection: "column"}}>
          <div style={{width: "100%", minHeight: 100, display: "grid", gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', alignItems: "center", paddingLeft: 20, paddingRight: 20}}>
            <div style={{backgroundColor: "#14151D", height: 100, borderRadius: 10, display: "flex", alignItems: "flex-start", justifyContent: "space-evenly", flexDirection: "column", paddingLeft: 10}}>
              <a style={{color: "#898A8E", fontWeight: "400", fontSize: 12}}>Total Items</a>
              <a style={{color: "#fff", fontWeight: "500", fontSize: 15}}>{profile && profile.inventory.length } Items</a>
            </div>
            <div style={{backgroundColor: "#14151D", height: 100, borderRadius: 10, display: "flex", alignItems: "flex-start", justifyContent: "space-evenly", flexDirection: "column", paddingLeft: 10}}>
              <a style={{color: "#898A8E", fontWeight: "400", fontSize: 12}}>Total Value</a>
              <a style={{color: "#B95FFF", fontWeight: "500", fontSize: 15, display: "flex", gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "center"}}><img src={coin} style={{width: 30, height: 30}} />{totalValue}</a>
            </div>
          </div>
          <div style={{width: "100%", minWidth: "100%", gap: "1%", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 40, marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
            <div style={{width: "100%", maxWidth: "40px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", backgroundColor: "#14151D", backgroundBlendMode: "overlay", backgroundImage: "linear-gradient(180deg, rgba(20, 21, 29, 0) 0%, #b95fff 100%)", minHeight: 40, color: "white", fontSize: 18, fontWeight: 400, borderRadius: 5, border: "1px solid #B95FFF" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.25 12H8.895M4.534 12H2.75M4.534 12C4.534 11.4218 4.76368 10.8673 5.17251 10.4585C5.58134 10.0497 6.13583 9.82001 6.714 9.82001C7.29217 9.82001 7.84666 10.0497 8.25549 10.4585C8.66432 10.8673 8.894 11.4218 8.894 12C8.894 12.5782 8.66432 13.1327 8.25549 13.5415C7.84666 13.9503 7.29217 14.18 6.714 14.18C6.13583 14.18 5.58134 13.9503 5.17251 13.5415C4.76368 13.1327 4.534 12.5782 4.534 12ZM21.25 18.607H15.502M15.502 18.607C15.502 19.1853 15.2718 19.7404 14.8628 20.1494C14.4539 20.5583 13.8993 20.788 13.321 20.788C12.7428 20.788 12.1883 20.5573 11.7795 20.1485C11.3707 19.7397 11.141 19.1852 11.141 18.607M15.502 18.607C15.502 18.0287 15.2718 17.4746 14.8628 17.0657C14.4539 16.6567 13.8993 16.427 13.321 16.427C12.7428 16.427 12.1883 16.6567 11.7795 17.0655C11.3707 17.4743 11.141 18.0288 11.141 18.607M11.141 18.607H2.75M21.25 5.39301H18.145M13.784 5.39301H2.75M13.784 5.39301C13.784 4.81484 14.0137 4.26035 14.4225 3.85152C14.8313 3.44269 15.3858 3.21301 15.964 3.21301C16.2503 3.21301 16.5338 3.2694 16.7983 3.37896C17.0627 3.48851 17.3031 3.64909 17.5055 3.85152C17.7079 4.05395 17.8685 4.29427 17.9781 4.55876C18.0876 4.82325 18.144 5.10673 18.144 5.39301C18.144 5.67929 18.0876 5.96277 17.9781 6.22726C17.8685 6.49175 17.7079 6.73207 17.5055 6.93451C17.3031 7.13694 17.0627 7.29751 16.7983 7.40707C16.5338 7.51663 16.2503 7.57301 15.964 7.57301C15.3858 7.57301 14.8313 7.34333 14.4225 6.93451C14.0137 6.52568 13.784 5.97118 13.784 5.39301Z" stroke="#B95FFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
              </svg>
            </div>
            <div style={{maxWidth: 410, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", backgroundColor: "#14151D", minHeight: 40, color: "white", fontSize: 12, paddingLeft: 10, paddingRight: 10, fontWeight: 400, borderRadius: 10 }}>
              <input 
                style={{
                  width: "100%", 
                  height: "100%", 
                  background: "none", 
                  outline: "none", 
                  border: "none", 
                  color: "#FFFFFF", 
                  fontWeight: 500, 
                  fontFamily: "Poppins"
                }} 
                placeholder="Search for an item..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
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
          <div style={{width: "100%", minWidth: "100%", gap: "1rem", display: "grid", paddingLeft: 20, paddingRight: 20, gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))', alignItems: "center", marginTop: 20, overflowY: "auto", minHeight: 200}}>
            {profile && profile.inventory !== null && profile.inventory
              .filter(item => item.display_name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((item, index) => {
                const isSelected = selectedItem && selectedItem.uid === item.uid;
                return (
                  <motion.div
                    key={index}
                    className={classes.itemBox}
                    whileHover={{scale: 1.02}}
                    onClick={() => selectItem(item)}
                    style={{
                      border: isSelected ? "2px solid #B95FFF" : "none",
                      borderBottom: `2px solid #B95FFF`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      backgroundBlendMode: "overlay",
                      backgroundImage: "linear-gradient(180deg, rgba(20, 21, 29, 0) 0%, #b95fff 100%)",
                    }}
                  >
                    <img src={item.thumbnail} className={classes.itemImage} />
                    <a style={{fontSize: 10, textAlign: "center", width: "80%", wordBreak: "wrap", color: "#FFFFFF", fontWeight: 500, marginTop: 20}}>{item.display_name}</a>
                    <div className={classes.itemPrice}>
                      <img src={coin} alt="Coin" style={{height: 20, width: 20}} />
                      {item.value}
                    </div>
                  </motion.div>
                );
            })}
            {profile && profile.inventory === null && (
              <>No available items</>
            )}
          </div>
        </div>
        <div style={{width: "25%", height: "100%", backgroundColor: "#14151D", borderLeft: "3px solid #282A3A", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingTop: 10, flexDirection: "column", paddingTop: 20, paddingBottom: 5, paddingLeft: 5, paddingRight: 5}}>
          <a style={{color: "#B95FFF", fontWeight: "500", textAlign: 'center', fontSize: 13 }}>Adjust Price</a>
          {selectedItem ? (
            <>
              <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20}}>
                <img src={selectedItem.thumbnail} style={{width: 100, height: 100, objectFit: "contain"}} />
                <a style={{color: "#FFFFFF", fontWeight: "500", fontSize: 16, marginTop: 10}}>{selectedItem.display_name}</a>
              </div>
              <div className={classes.sliderContainer}>
                <span className={classes.sliderValue}>{sliderValue}%</span>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  value={sliderValue}
                  className={classes.slider}
                  onChange={(e) => setSliderValue(parseInt(e.target.value))}
                />
                <div className={classes.sliderLimits}>
                  <span>-20%</span>
                  <span>+20%</span>
                </div>
              </div>
              <div style={{marginTop: 20, display: "flex", alignItems: "center"}}>
                <img src={coin} style={{width: 20, height: 20, marginRight: 5}} />
                <span style={{color: "#B95FFF", fontWeight: "500"}}>
                  {(selectedItem.value * (1 + sliderValue / 100)).toFixed(2)}
                </span>
              </div>
            </>
          ) : (
            <a style={{ color: "#C3C3C3", fontWeight: "400", textAlign: "center", fontSize: 13, wordBreak: "break-word"}}>Select an item to adjust the price of.</a>
          )}
          <div style={{backgroundBlendMode: "overlay", backgroundColor: "rgba(217,217,217,0.05)", height: 2, width: "100%", marginTop: "auto"}} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
            <a style={{color: "#898A8E", fontWeight: "400", fontSize: 13 }}>{selectedItem ? "1 Item" : "0 Items"}</a>
            <a style={{color: "#B95FFF", fontWeight: "500", fontSize: 13, display: "flex", gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
              <img src={coin} style={{width: 30, height: 30}} />
              {selectedItem ? selectedItem.value : "0"}
            </a>
          </div>
        </div>
        </>
      )}
      {showPopup && method === 'deposit' || showPopup && method === 'withdraw' ? (
        <div style={popupStyle}>
          <h3>
            {method === 'deposit' 
              ? "Your listing is now on the marketplace"
              : "Your item has been withdrawn from your inventory."}
          </h3>
          <p>
            {method === 'deposit'
              ? "You can manage it from your trades tab in the chat."
              : "You can claim it from any of our bots."}
          </p>
          {method === 'deposit'
              ? <></>
              : <div style={{ width: "100%", background: "#181923", borderRadius: 10, height: 75, display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 10, paddingRight: 10}}>
              <a style={{color: "#B95FFF", fontWeight: "500", fontSize: 15, display: "flex", gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "center"}}><div style={{width: 44, height: 44, borderRadius: 9, border: "2px solid #B95FFF", background: "linear-gradient(180deg, #202023 0%, #3b1956 100%)"}} />Stashstorage5</a>
              <a href='https://www.roblox.com/share?code=69e41d764b868b4d89ea22aa63f4718a&type=Server' style={{width: 100, height: 41, display: "flex", alignItems: 'center', justifyContent: 'center', borderRadius: 7, background: "linear-gradient(180deg, #b95fff 0%, #801cff 100%)", color: "#FFF", fontWeight: 400}}>Join</a>
            </div>}
          <button 
            onClick={() => setShowPopup(false)}
            style={{...buttonStyle, width: '100%', marginTop: '10px', fontFamily: "Poppins"}}
          >
            Return to Items
          </button>
        </div>
      ) : null}
      </div>
      <div style={{
        backgroundColor: "#1A1B26",
        borderTop: "3px solid #282A3A",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      }}>
        <button style={{
          background: "linear-gradient(0deg, #b95fff 100%, rgba(185, 95, 255, 0) 0%)",
          border: "2px solid #b95fff",
          borderRadius: "7px",
          color: "#FFFFFF",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "400",
          cursor: "pointer",
          width: "48%",
          fontFamily: "Poppins"
        }}
        onClick={withdrawMM2}>
          Withdraw
        </button>
        <button onClick={listItem} style={{
          background: "linear-gradient(180deg, #b95fff 0%, #801cff 100%)",
          border: "none",
          borderRadius: "7px",
          color: "#FFFFFF",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "400",
          cursor: "pointer",
          width: "48%",
          fontFamily: "Poppins"
        }}>
          {selectItem.length === 1 ? 'List Item' : 'Select Item'}
        </button>
      </div>
    </div>
  );
};

Deposit.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  user: state.auth.user,
  logout: PropTypes.func.isRequired,
});

export default Deposit;
