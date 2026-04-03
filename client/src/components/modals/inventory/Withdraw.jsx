import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import { withdrawCrypto } from "../../../services/api.service";
import { changeWallet } from "../../../actions/auth";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import cutDecimalPoints from "../../../utils/cutDecimalPoints";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// MUI Components
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

// Components
import Bitcoin from "./withdraw/Bitcoin";
import Ethereum from "./withdraw/Ethereum";
import Litecoin from "./withdraw/Litecoin";

// Assets
import bitcoin from "../../../assets/cashier/bitcoin.png";
import ethereum from "../../../assets/cashier/ether.png";
import litecoin from "../../../assets/cashier/litecoin.png";
import cashapp from "../../../assets/cashier/cashapp.png";
import coin from "../../../assets/icons/coin.svg";
import error from "../../../assets/sounds/error.mp3";

const errorAudio = new Audio(error);

const playSound = audioFile => {
  audioFile.play();
};

const Input = withStyles({
  root: {
    width: "100%",
    marginTop: "auto",
    border: "1px solid transparent",
    background: "#020203",
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

const AddressInput = withStyles({
  root: {
    width: "100%",
    marginTop: "auto",
    border: "1px solid transparent",
    background: "#020203",
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
      padding: "0rem 1rem",
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
    maxWidth: "100% !important",
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
  sectionContainer: {
    gap: "0.5rem",
    gridTemplateColumns: "repeat(1,minmax(0,1fr))",
    width: "100%",
    display: "grid",
  },
  coin: {
    position: "absolute",
    top: 0,
    left: 0
  },
  grid: {
    gridTemplateColumns: "repeat(4,minmax(0,1fr))",
    gap: "0.5rem",
    width: "100%",
    display: "grid",
    outline: 0,
  },
  choiceBox: {
    cursor: "pointer",
    borderRadius: "0.25rem",
    height: "88px",
    width: "100%",
    backgroundColor: "#14151D",
    padding: "1rem 0.75rem",
    display: "flex",
    alignItems: "center",
    border: "1px solid transparent",
    textAlign: "center",
    transitionDuration: "300ms",
    "&:hover": {
      filter: "brightness(130%)"
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
  },
  optionImage: {
    maxHeight: "100%",
  },
  optionText: {
    color: "#fff",
    fontSize: "15px",
    marginLeft: "10px",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  conversionContainer: {
    backgroundColor: "#14151D",
    border: "1px solid transparent",
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "0.25rem",
    marginTop: "1rem",
    flexDirection: "column"
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    width: "100%"
  },
  cashapp: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  coinHeader: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    fontSize: "1.25rem",
    gap: "0.5rem"
  },
  coinImage: {
    height: 30,
    width: 30
  },
  converterContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: "0.5rem",
  },
  inputIcon: {
    marginTop: "0 !important",
    color: "#fff",
    background: "transparent !important",
  },
  addressContainer: {
    backgroundColor: "#14151D",
    border: "1px solid transparent",
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "0.25rem",
    marginTop: "1rem",
    flexDirection: "column"
  },
  networkBox: {
    color: "#6CDE07",
    border: "1px solid #6CDE07",
    padding: "0.25rem",
    borderRadius: "0.25rem"
  },
  finalContainer: {
    backgroundColor: "#14151D",
    border: "1px solid transparent",
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "0.25rem",
    marginTop: "1rem",
    flexDirection: "column"
  },
  termsContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "0.75rem 0",
    alignItems: "center"
  },
  termsCheckbox: {
    maxHeight: 25,
    maxWidth: 25,
    minHeight: 25,
    minWidth: 25,
    borderRadius: "5px",
    transition: "all .3s ease",
    display: "flex",
    padding: "0.5rem",
    alignItems: "center",
    justifyContent: "center"
  },
  terms: {
    fontSize: "12px",
    color: "rgb(208, 214, 225)",
    marginLeft: "0.5rem",
    textAlign: "left",
  },
  confirmButton: {
    backgroundColor: "hsl(215, 75%, 50%)",
    width: "100%",
    padding: "0.5rem 0.75rem",
    marginTop: 0,
    color: "#fff",
    fontSize: "17px",
    textAlign: "center",
    fontWeight: 500,
    borderRadius: "0.25rem",
    cursor: "pointer",
    transition: "all .3s ease",
    "&:hover": {

    }
  },
  choiceBox: {
    userSelect: "none",
    cursor: "pointer",
    borderRadius: "0.5rem",
    height: "120px",
    width: "100%",
    backgroundColor: "#14151D",
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
    backgroundColor: "#020203",
    borderRadius: "0.5rem",
    padding: "1rem",
    width: "100%",
    overflow: "visible",
    display: "flex",
    position: "relative",
    alignItems: "center",
    zIndex: 3,
    justifyContent: "center"
  },
  optionImage: {
    maxHeight: "100%",
    zIndex: 4
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
}));

const Withdraw = ({ user, changeWallet }) => {
  // Declare State
  const classes = useStyles();
  const { addToast } = useToasts();

  const [coinData, setCoinData] = useState({
    name: "Litecoin",
    slug: "LTC",
    network: "LTC",
    image: litecoin
  });
  const [coinPrice, setCoinPrice] = useState(39982.32)
  const [amount, setAmount] = useState(0);
  const [usd, setUsd] = useState(0);
  const [address, setAddress] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);

  const updateAmount = (val) => {
    const regex = /^[0-9]*$/;

    if (regex.test(val)) {
      setAmount(val);
      setUsd(cutDecimalPoints(val/2));
    }
   
  };

  const updateUsd = (val) => {
    const regex = /^[0-9]*$/;

    if (regex.test(val)) {
      setUsd(val);
      setAmount(cutDecimalPoints(val*2));
    }
    
  };
  
  const changeCoin = (coin) => {
    if(coin == "BTC") {
      setCoinData({
        name: "Bitcoin",
        slug: "BTC",
        network: "BTC",
        image: bitcoin
      });
    } else if(coin == "ETH") {
      setCoinData({
        name: "Ethereum",
        slug: "ETH",
        network: "ERC-20",
        image: ethereum
      });
    } else if(coin == "LTC") {
      setCoinData({
        name: "Litecoin",
        slug: "LTC",
        network: "LTC",
        image: litecoin
      });
    } else if(coin == "CASHAPP") {
      setCoinData({
        name: "CashApp",
        slug: "CASH",
        network: "Cash",
        image: cashapp
      });
    }
  };

  const onClick = async () => {
    setWithdrawing(true);
    try {
      const response = await withdrawCrypto(coinData.slug, address, parseFloat(amount));

      // Update state
      changeWallet({ amount: -Math.abs(response.siteValue) });

      // Check transaction status
      if (response.state === 1) {
        addToast(
          `Successfully withdrawed ${response.siteValue.toFixed(
            2
          )} credits for ${response.usdValue.toFixed(
            8
          )} ${coinData.name}! Your withdrawal should manual confirm within a few minutes!`,
          { appearance: "success" }
        );
      } else {
        addToast(
          `Successfully withdrawed ${response.siteValue.toFixed(
            2
          )} credits for ${coinData.name}! Your withdrawal should manual confirm within a few minutes!`,
          { appearance: "success" }
        );
      }
      setWithdrawing(false);
    } catch (error) {
      setWithdrawing(false);

      // If user generated error
      if (error.response && error.response.data && error.response.data.errors) {
        // Loop through each error
        for (
          let index = 0;
          index < error.response.data.errors.length;
          index++
        ) {
          const validationError = error.response.data.errors[index];
          addToast(validationError.msg, { appearance: "error" });
        }
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        addToast(error.response.data.error, { appearance: "error" });
        playSound(errorAudio);
      } else {
        console.log("There was an error while withdrawing crypto:", error);
        addToast(
          "There was an error while requesting this withdrawal. Please try again later!",
          { appearance: "error" }
        );
        playSound(errorAudio);
      }
    }
  };

  return (
    <div style={{margin: "0 auto"}}>
      <div className={classes.finalContainer} style={{background: "none"}}>
        <div style={{ width: "100%", background: "#181923", borderRadius: 10, height: 75, display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 10, paddingRight: 10}}>
        <a style={{color: "#B95FFF", fontWeight: "500", fontSize: 15, display: "flex", gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "center"}}><div style={{width: 44, height: 44, borderRadius: 9, border: "2px solid #B95FFF", background: "linear-gradient(180deg, #202023 0%, #3b1956 100%)"}} />Stashstorage5</a>
        <a href='https://www.roblox.com/share?code=69e41d764b868b4d89ea22aa63f4718a&type=Server' style={{width: 100, height: 41, display: "flex", alignItems: 'center', justifyContent: 'center', borderRadius: 7, background: "linear-gradient(180deg, #b95fff 0%, #801cff 100%)", color: "#FFF", fontWeight: 400}}>Join</a>
        </div>
      </div>
    </div>
  );
};

Withdraw.propTypes = {
  user: PropTypes.object,
  changeWallet: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { changeWallet })(Withdraw);
