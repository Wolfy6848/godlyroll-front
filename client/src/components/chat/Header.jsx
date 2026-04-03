import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from 'react-router-dom';
import { useToasts } from "react-toast-notifications";
import CountUp from 'react-countup';
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { chatSocket } from "../../services/websocket.service";
import Background1 from "../../assets/home/Background1.png";
import RainCAPTCHA from "../modals/rain/RainModal";
import { getChatData } from "../../services/api.service";
import coin from "../../assets/icons/coin.svg";
import Skeleton from "@material-ui/lab/Skeleton";
import TipRainModal from "../modals/rain/TipRainModal";
import EnglishChat from "../../assets/english.png"

const Input = withStyles({
  root: {
    zIndex: 100,
    width: "100px",
    background: "#0E1013",
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
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: ".1em",
      padding: "0.5rem 1rem",
    },
    "& div": {
      height: "31px",
      borderRadius: 4,
      paddingRight: 0
    },
    "&:hover": {
    }
  }
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    color: "rgb(72, 82, 97)",
    fontFamily: "Poppins",
    fontSize: "14px",
    height: "84px",
    padding: "15px",
    fontWeight: 500,
    alignContent: "center",
    letterSpacing: ".05em",
  },
  rainbutton: {
    background: "#1d2834",
    border: "1px solid #1d2834",
    display: "flex",
    padding: "5px 9px 6px 11px",
    minWidth: "0",
    minHeight: "0",
    flexShrink: "0",
    marginRight: "4px",
    marginTop: "2px",
    borderRadius: "50%",
    "& .MuiButton-startIcon": {
      marginLeft: "-3px",
      marginRight: "-1px",
      marginTop: "2px",
      marginBottom: "2px",
    },
    "&:hover": {
      background: "#1d2834",
      border: "1px solid #1d3a4b",
      cursor: "pointer",
    },
  },
  racebutton: {
    background: "#1d3428",
    border: "1px solid #1d3428",
    display: "flex",
    padding: "7px 10px 7px 12px",
    minWidth: "0",
    minHeight: "0",
    flexShrink: "0",
    marginLeft: "5px",
    marginRight: "4px",
    marginTop: "2px",
    borderRadius: "50%",
    "& .MuiButton-startIcon": {
      marginLeft: "-3px",
      marginRight: "-1px",
      marginTop: "2px",
      marginBottom: "2px",
    },
    "&:hover": {
      background: "#1d3432",
      border: "1px solid #285a31",
      cursor: "pointer",
    },
  },
  onlineOrNot1: {
    marginTop: "0px"
  },
  onlineOrNot2: {
    // marginTop: "180px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0px"
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px"
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "0px"
    },
  },
  user: {
    display: "flex",
    alignItems: "center",
    gridGap: "16px",
    borderRadius: "5px",
    color: "#5b6368",
    textDecoration: "none",
  },
  pfp: {
    // padding: "1rem 0rem 0rem 1.5rem",
    outline: "none",
    display: "flex",
    "& div": {
      outline: "none",
      height: "2.5rem",
      width: "2.5rem",
      borderRadius: "100%",
    },
  },
  avatar2: {
    outline: "none",
    "&:hover": {
      transition: "all 400ms",
      transform: "scale(1.06)",
      WebkitTransform: "scale(1.06)",
    },
  },
  price: {
    fontFamily: "Poppins",
    color: "hsl(230, 50%, 50%)",
    fontWeight: 500,
    letterSpacing: ".1em",
    margin: "auto",
    position: "absolute",
    marginTop: "-1px",
  },
  pfpp: {
    marginLeft: "45px",
    "& div": {
      height: "2.5rem",
      width: "2.5rem",
      borderRadius: "100%",
    },
    "& .usernamenav": {
      color: "#ffc107",
      fontSize: "11px",
      fontFamily: "Poppins",
      fontWeight: 500,
      textTransform: "uppercase",
    },
    "& .levelnav": {
      color: "#fff",
      fontSize: "11px",
      fontFamily: "Poppins",
      fontWeight: 500,
      textTransform: "uppercase",
      padding: "5px",
      marginLeft: "15px",
      borderRadius: "5px",
    },
    "& .levelnav:hover": {
      color: "#fff",
      filter: "drop-shadow(0px 0px 15px #2b2f34) invert(0%)",
    },
    "& .nonenav": {
      color: "#d5d6d8",
      fontSize: "11px",
      fontFamily: "Poppins",
      fontWeight: 500,
      textTransform: "uppercase",
    },
    "& .bronzenav": {
      color: "#C27C0E",
      fontSize: "11px",
      fontFamily: "Poppins",
      fontWeight: 500,
      textTransform: "uppercase",
    },
    "& .silvernav": {
      color: "#95A5A6",
      fontSize: "11px",
      fontFamily: "Poppins",
      fontWeight: 500,
      textTransform: "uppercase",
    },
    "& .goldnav": {
      color: "#b99309",
      fontSize: "11px",
      fontFamily: "Poppins",
      fontWeight: 500,
      textTransform: "uppercase",
    },
    "& .diamondnav": {
      color: "#3498DB",
      fontSize: "11px",
      fontFamily: "Poppins",
      fontWeight: 500,
      textTransform: "uppercase",
    },
  },
  logoImage: {
    alignContent: "center",
    height: "100%",
  },
  header: {
    zIndex: 100,
    backgroundColor: "#14151D",
    width: "100% - 2rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "1rem",
    borderRadius: "3px",
    alignItems: "center"
  },
  rainContainer: {
    display: "flex",
    flexDirection: "column",
    color: "#fff"
  },
  giveawayContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100% - 2rem",
    padding: "1rem",
  },
  giveaway: {
    zIndex: 100,
    backgroundColor: "#202229",
    width: "100%",
    padding: "0.5rem 1rem 1rem 1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "3px 3px 0px 0px",
  },
  joinButton: {
    zIndex: 100,
    backgroundColor: "#801BFF",
    width: "100%",
    padding: "5px 5px 5px 5px",
    color: "#000",
    borderRadius: "0px 0px 3px 3px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    userSelect: "none"
  },
  giveawayImage: {
    height: 100,
    width: 100
  },
  coinflip: {
    width: "85px",
    padding: "5px 0px",
    flexShrink: 0,
    borderRadius: "100px",
    background: "#00A0FF",
    textAlign: "center",
    fontWeight: 600,
    marginRight: "0.5rem",
    fontSize: "13px",
    cursor: "pointer"
  },
  jackpot: {
    width: "85px",
    padding: "5px 0px",
    flexShrink: 0,
    borderRadius: "100px",
    background: "#FCBF2D",
    textAlign: "center",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer"
  },
  gem: {
    height: "20px",
    width: "20px",
    display: "block",
    top: "-1px",
    position: "relative",
    marginRight: "0.2rem",
  },
  captcha: {
    padding: "0.5rem 0",
    position: "absolute",
    zIndex: 100,
    transition: "all .3s ease",
    userSelect: "none"
  },
  sectionalShit: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: "0.25rem",
    height: 35,
    width: "100%",
    marginBottom: 5,
    marginTop: 10,
  },
  rainBox: {
    position: "relative",
    backgroundColor: "#252734",
    backgroundBlendMode: "overlay",
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0%) 0%, rgba(255, 255, 255, 30%) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 0.75rem",
    width: 243,
    height: 56,
    maxWidth: "200px",
    maxHeight: "56px",
    borderRadius: "0.25rem",
    borderBottom: "2px solid #191e27",
  },
  rainText: {
    background: "linear-gradient(180deg, #B95FFF 0%, #801BFF 100%) text",
    backgroundClip: "text",
    ["-webkit-background-clip"]: "text",
    color: "#B95FFF",
    fontWeight: 500,
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    marginTop: 5,
    position: "absolute",
    left: 8,
    top: 0
  },
  rainDescription: {
    fontWeight: 500,
    fontSize: 14,
    color: "#FFF",
    fontSize: "10px",
    display: "flex",
    alignItems: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 1,
    position: "absolute",
    left: 0,
    bottom: -5
  },
  rainAmount: {
    borderTopLeftRadius: "0.25rem",
    borderBottomLeftRadius: "0.25rem",
    height: "fit-content",
    background: "#0e1017",
    display: "flex", 
    fontWeight: 500,
    fontSize: "14px",
    alignItems: "center", 
    justifyContent: "center",
    gap: "0.3rem",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {

    },
    [theme.breakpoints.down("md")]: {

    },
  },
  tipRainButton: {
    borderRadius: "0.25rem",
    color: "#B95FFF",
    backgroundColor: "#252734",
    backgroundBlendMode: "overlay",
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0%) 0%, rgba(255, 255, 255, 30%) 100%)",
    display: "flex", 
    flexDirection: "column",
    fontWeight: 500,
    fontSize: "12px",
    alignItems: "center", 
    justifyContent: "space-around",
    gap: "0.25rem", 
    padding: "0.5rem 0.75rem",
    cursor: "pointer", 
    userSelect: "none",
    height: 56,
    width: 65,
    maxWidth: 72,
    maxHeight: 56,
  },
  joinButton: {
    position: "absolute",
    fontWeight: 500,
    width: "3rem",
    padding: "0.05rem 0.15rem",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
    backgroundColor: "#B95FFF",
    color: "#fff",
    backgroundSize: "cover", 
    backgroundPosition: "right",
    borderRadius: "0.25rem",
    cursor: "pointer",
    userSelect: "none",
    right: 3,
    bottom: 3,
    fontSize: 12,
    zIndex: 100
  },
  tradesButton: {
    height: 35,
    width: 71,
    textTransform: "none",
    fontFamily: "Poppins",
    borderRadius: 5,
    background: "linear-gradient(180deg, #B95FFF 0%, #801BFF 100%)",
    fontSize: 12,
    color: "#FFF",
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tipContainer: {
    position: "relative",
    color: "#FFF",
    backgroundColor: "#252734",
    backgroundBlendMode: "overlay",
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0%) 0%, rgba(255, 255, 255, 30%) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "0.5rem 0.75rem",
    width: 243,
    height: 40,
    fontSize: 10,
    fontWeight: 500,
    maxWidth: "200px",
    maxHeight: "40px",
    borderRadius: "0.25rem",
    borderBottom: "2px solid #191e27",
  },
  textFeildButton: {
    borderRadius: "0.25rem",
    color: "#FFF",
    background: "linear-gradient(180deg, #B95FFF 0%, #801BFF 100%)",
    display: "flex", 
    flexDirection: "column",
    fontWeight: 500,
    fontSize: "12px",
    alignItems: "center", 
    justifyContent: "space-around",
    gap: "0.25rem", 
    padding: "0.5rem 0.75rem",
    cursor: "pointer", 
    userSelect: "none",
    height: 40,
    width: 65,
    maxWidth: 72,
    maxHeight: 40,
  },
  englishChat: {
    width: "calc(100% - 80px)",
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    textTransform: "none",
    fontFamily: "Poppins",
    fontWeight: 500,
    borderRadius: 5,
    background: "linear-gradient(180deg, #B95FFF 0%, #801BFF 100%)",
    fontSize: 12,
    color: "#FFF"
  },
  green: {
    backgroundColor: "rgb(104, 255, 79, 0.34)",
    borderRadius: 200,
    height: 14,
    width: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  greenInner: {
    backgroundColor: "#68FF4F",
    borderRadius: 200,
    height: 8,
    width: 8
  },
}));

function CountdownTimer({ seconds }) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return <div style={{color: "rgba(255, 255, 255, 0.50)", textAlign: "center", marginTop: "0.5rem"}}>{formatTime(time)}</div>;
}

const Header = ({ isAuthenticated, isLoading, user, giveaway, toggleMessages, isMessageVisible}) => {
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(true);
  const [usersOnline, setUsersOnline] = useState("0");
  const [previousTotal, setPreviousTotal] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [openRain, setOpenRain] = useState(false);
  const [rain, setRain] = useState(null);
  const [openTipRain, setOpenTipRain] = useState(false);
  const [amount, setAmount] = useState("");

  const onChanger = e => {
    setAmount(e.target.value);
  };

  const onClick = () => {
    chatSocket.emit(
      "send-chat-message",
      `/tip-rain ${amount}`
    );
    setAmount("");
  };
  
  const rainStateChanged = newState => {
    setRain(newState);
  };

  const updateRainAmount = (newAmount) => {
    setPreviousTotal(currentTotal);
    setCurrentTotal(newAmount); 
  };

  const updateUsersOnline = newCount => {
    setUsersOnline(newCount);
  };

  const onChange = value => {
    chatSocket.emit("enter-rain", value);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getChatData();
      setRain(response.rain);
      setLoading(false);
    } catch (error) {
      console.log("There was an error while fetching chat messages:", error);
    }
  };

  useEffect(() => {
    fetchData(); 

    const onError = message => {
      setLoading(false);
      addToast(message, { appearance: "error" });
      setOpenRain(state => !state);
    };

    const onSuccess = message => {
      setLoading(false);
      addToast(message, { appearance: "success" });
      setOpenRain(state => !state);
    };

    chatSocket.on("rain-update-amount", updateRainAmount);
    chatSocket.on("users-online", updateUsersOnline);
    chatSocket.on("rain-join-error", onError);
    chatSocket.on("rain-join-success", onSuccess);
    chatSocket.on("rain-state-changed", rainStateChanged);
    return () => {
      chatSocket.off("rain-update-amount", updateRainAmount);
      chatSocket.off("users-online", updateUsersOnline);
      chatSocket.off("rain-join-error", onError);
      chatSocket.off("rain-join-success", onSuccess);
      chatSocket.off("rain-state-changed", rainStateChanged);
    };
  }, [addToast]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (rain.joinable) {
        setRain(prevState => ({
          ...prevState,
          timeLeftToJoin: prevState.timeLeftToJoin - 1000,
        }));
      } else {
        setRain(prevState => ({
          ...prevState,
          timeLeft: prevState.timeLeft - 1000,
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [rain]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box>
      {loading ? (
        <Skeleton animation="wave" height={100} width={"100%"} />
      ) : (
        <>
          <RainCAPTCHA
            open={openRain}
            handleClose={() => setOpenRain(state => !state)}
            onChange={onChange}
            loading={loading}
          />
          <div className={classes.leftSection}>
            <Button onClick={toggleMessages} style={{gap: 5, display: "flex", justifyContent: "space-between", alignItems: "center"}} className={classes.tradesButton}>
            <svg style={{width: 40}} width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6.6H3.8V11.5H1V6.6ZM5.9 4.5H8.7V13.6H5.9V4.5Z" fill="white" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
            <path d="M7.29999 15.0001V13.6001V15.0001Z" fill="white"/>
            <path d="M7.29999 15.0001V13.6001" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.7999 3.80005H13.5999V6.95005H10.7999V3.80005Z" fill="white" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
            <path d="M2.3999 6.6V3.1V6.6ZM12.1999 11.5V6.95V11.5ZM12.1999 3.8V1V3.8Z" fill="white"/>
            <path d="M2.3999 6.6V3.1M12.1999 11.5V6.95M12.1999 3.8V1" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Trades
            </Button>
            <div className={classes.englishChat}>
              <span style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: 5}}><img src={EnglishChat} className={classes.englishImg} />English Chat:</span> <span style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: 5}}><div className={classes.green}><div className={classes.greenInner}/></div>{usersOnline}</span>
            </div>
          </div>

          {isMessageVisible && (
          <div className={classes.sectionalShit}>
          <motion.div className={classes.rainBox} >
          <div style={{display: "flex", flexDirection: "column", gap: "0.25rem"}}>
            <div className={classes.rainText}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.94147 11.2629H13.2905C15.6788 11.2629 17.5244 9.45482 17.5244 7.14214C17.5244 4.79893 15.5958 3.04393 13.0418 3.06643C12.0775 1.12275 10.3074 0 8.22033 0C5.44062 0 3.09772 2.19214 2.87915 5.00239C1.41762 5.40161 0.47583 6.62979 0.47583 8.11382C0.47583 9.98196 1.87726 11.2629 3.94147 11.2629ZM10.1338 14.8712L11.1132 13.1763C11.2488 12.9426 11.1736 12.6791 10.9477 12.5508C10.7217 12.4155 10.4655 12.4907 10.3299 12.7244L9.33537 14.4344C9.21483 14.653 9.27526 14.9165 9.50894 15.0522C9.56184 15.0814 9.61998 15.0998 9.68002 15.1066C9.74007 15.1133 9.80085 15.1081 9.85889 15.0913C9.91692 15.0744 9.97108 15.0464 10.0182 15.0086C10.0654 14.9708 10.1047 14.9242 10.1338 14.8712ZM11.8817 17.0258L14.1041 13.1686C14.2397 12.9426 14.1716 12.6865 13.9533 12.5508C13.7425 12.4229 13.4712 12.4907 13.3282 12.7167L11.1209 16.5587C10.9927 16.7924 11.0531 17.056 11.279 17.1916C11.4976 17.3121 11.7535 17.2443 11.8817 17.0258ZM4.13722 14.8786L5.11662 13.1837C5.25226 12.9504 5.18444 12.6865 4.95847 12.5585C4.72479 12.4229 4.46862 12.4981 4.33297 12.7318L3.34619 14.4418C3.21826 14.6604 3.28608 14.9239 3.51204 15.0522C3.56422 15.0829 3.62205 15.1028 3.68209 15.1107C3.74212 15.1186 3.80313 15.1143 3.86148 15.0981C3.91982 15.0819 3.9743 15.0541 4.02168 15.0164C4.06905 14.9787 4.10835 14.9318 4.13722 14.8786ZM5.88515 17.0335L8.1149 13.1763C8.24315 12.9504 8.17533 12.6942 7.96415 12.5585C7.91247 12.5274 7.85506 12.5069 7.79532 12.4984C7.73558 12.4899 7.67474 12.4935 7.61641 12.509C7.55808 12.5244 7.50346 12.5515 7.4558 12.5885C7.40814 12.6255 7.36841 12.6717 7.33897 12.7244L5.12433 16.5664C4.99608 16.7998 5.0639 17.0637 5.28987 17.199C5.50844 17.3195 5.76462 17.2517 5.88515 17.0335Z" fill="url(#paint0_linear_587_2128)"/>
            <defs>
            <linearGradient id="paint0_linear_587_2128" x1="9.00012" y1="0" x2="9.00012" y2="17.2582" gradientUnits="userSpaceOnUse">
            <stop stop-color="#B95FFF"/>
            <stop offset="1" stop-color="#801BFF"/>
            </linearGradient>
            </defs>
            </svg>
            {rain.joinable ? (
              <>Rain ends soon</>
            ) : (
              <>Live Rain Pool</>
            )}
            </div>
            <div className={classes.rainDescription}>
              <svg width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_dii_587_2133)">
              <path d="M22.0204 11H13.8724C13.832 11.0006 13.7923 11.0102 13.7563 11.0283C13.7202 11.0463 13.6886 11.0723 13.664 11.1042L11.0737 14.5232C11.0345 14.5697 11.013 14.6286 11.013 14.6894C11.013 14.7503 11.0345 14.8091 11.0737 14.8557L17.7429 21.9169C17.7671 21.9428 17.7963 21.9634 17.8287 21.9775C17.8611 21.9916 17.8961 21.9988 17.9315 21.9988C17.9669 21.9988 18.0018 21.9916 18.0343 21.9775C18.0667 21.9634 18.0959 21.9428 18.1201 21.9169L24.7893 14.8557C24.8285 14.8091 24.85 14.7503 24.85 14.6894C24.85 14.6286 24.8285 14.5697 24.7893 14.5232L22.2288 11.1042C22.2041 11.0723 22.1726 11.0463 22.1365 11.0283C22.1004 11.0102 22.0607 11.0006 22.0204 11Z" fill="#9D51FF"/>
              <path d="M17.7449 21.9178C17.8223 22.0002 17.9101 22.0052 17.9444 21.9972L17.9528 21.9491V14.0249H11.4508C11.3516 14.1569 11.1372 14.4402 11.0766 14.5191C11.0012 14.6184 10.9506 14.7266 11.0766 14.8605L17.7449 21.9178Z" fill="#7A1CD7"/>
              <path d="M17.9443 11H13.8723C13.8319 11.0006 13.7922 11.0102 13.7561 11.0283C13.7201 11.0463 13.6885 11.0723 13.6639 11.1042L11.2636 14.2726C11.1634 14.4011 11.0622 14.6259 11.5122 14.6259C13.1845 14.6269 14.567 14.6304 15.5346 14.6304C16.0537 13.8533 16.8863 12.6073 17.9443 11Z" fill="#AC43FF"/>
              <path d="M17.9464 21.9957L15.5347 14.6367H20.358L17.9464 21.9957Z" fill="#FDAEFF"/>
              <path d="M21.9395 11H17.9543V14.6214H24.8434C24.8336 14.5859 24.8167 14.5526 24.7937 14.5237C24.7471 14.4572 22.3211 11.2278 22.263 11.1464C22.2049 11.065 22.1002 11 21.9395 11Z" fill="#A57AFF"/>
              <path d="M17.9464 11L19.1522 12.8211L20.358 14.6373H15.5347L16.7406 12.8211L17.9464 11Z" fill="#FEDBFF"/>
              </g>
              <defs>
              <filter id="filter0_dii_587_2133" x="0.499939" y="0.5" width="34.85" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="5.25"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.72549 0 0 0 0 0.372549 0 0 0 0 1 0 0 0 0.35 0"/>
              <feBlend mode="plus-lighter" in2="BackgroundImageFix" result="effect1_dropShadow_587_2133"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_587_2133" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="1.25"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0"/>
              <feBlend mode="overlay" in2="shape" result="effect2_innerShadow_587_2133"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="-3"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"/>
              <feBlend mode="plus-lighter" in2="effect2_innerShadow_587_2133" result="effect3_innerShadow_587_2133"/>
              </filter>
              </defs>
              </svg>
              <motion.div>
              <CountUp
                delay={0}
                duration={0.5}
                decimals={2}
                start={previousTotal}
                end={currentTotal}
              />
              </motion.div>
            </div>
            {rain.joinable ? (
            <>
              <motion.div 
                whileTap={{ scale: 0.97 }} 
                style={{ 
                  filter: rain.players.includes(user?._id) ? "brightness(75%)" : "brightness(100%)", 
                  cursor: rain.players.includes(user?._id) ? "not-allowed" : "cursor", 
                  pointerEvents: rain.players.includes(user?._id) ? "none" : "all", 
                }} 
                initial={{ y: -20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className={classes.joinButton} 
                onClick={() => setOpenRain(!openRain)}
              >
                {rain.players.includes(user?._id) ? "Joined" : "Join"}
              </motion.div>
            </>
          ) : null}
          </div>  
        </motion.div>
          <div style={{display: "flex"}}>
            <motion.div whileTap={{ scale: 0.97 }} className={classes.tipRainButton} onClick={() => setOpenTipRain(state => !state)} ><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.06561 13.0522H15.0332C17.8348 13.0522 20 10.9569 20 8.27683C20 5.56135 17.7376 3.52752 14.7413 3.5536C13.6101 1.30112 11.5336 0 9.08522 0C5.82428 0 3.07579 2.54041 2.81938 5.79713C1.10483 6.25977 0 7.68307 0 9.40288C0 11.5678 1.64404 13.0522 4.06561 13.0522ZM11.3299 17.2338L12.4789 15.2697C12.638 14.9989 12.5498 14.6934 12.2847 14.5448C12.0196 14.388 11.7191 14.4751 11.56 14.7459L10.3933 16.7276C10.2519 16.9809 10.3228 17.2864 10.5969 17.4436C10.659 17.4774 10.7272 17.4988 10.7976 17.5066C10.8681 17.5143 10.9394 17.5083 11.0074 17.4888C11.0755 17.4694 11.1391 17.4368 11.1944 17.3931C11.2497 17.3493 11.2958 17.2952 11.3299 17.2338ZM13.3805 19.7307L15.9876 15.2607C16.1467 14.9989 16.0667 14.702 15.8107 14.5448C15.5633 14.3965 15.2451 14.4751 15.0773 14.737L12.4879 19.1894C12.3375 19.4602 12.4084 19.7657 12.6735 19.9229C12.9299 20.0626 13.23 19.984 13.3805 19.7307ZM4.29525 17.2424L5.44419 15.2782C5.60332 15.0078 5.52376 14.702 5.25867 14.5537C4.98454 14.3965 4.68401 14.4837 4.52489 14.7545L3.36727 16.7362C3.21719 16.9895 3.29676 17.2949 3.56184 17.4436C3.62305 17.4792 3.6909 17.5022 3.76132 17.5114C3.83175 17.5205 3.90332 17.5155 3.97176 17.4968C4.04021 17.478 4.10412 17.4458 4.1597 17.4021C4.21528 17.3584 4.26138 17.3041 4.29525 17.2424ZM6.34578 19.7396L8.96154 15.2697C9.11199 15.0078 9.03243 14.7109 8.78469 14.5537C8.72407 14.5176 8.65671 14.4939 8.58663 14.4841C8.51655 14.4742 8.44517 14.4783 8.37675 14.4963C8.30832 14.5142 8.24425 14.5456 8.18834 14.5884C8.13242 14.6313 8.08582 14.6849 8.05128 14.7459L5.45324 19.1984C5.30279 19.4688 5.38235 19.7746 5.64744 19.9314C5.90385 20.0711 6.20437 19.9925 6.34578 19.7396Z" fill="#B95FFF"/>
            </svg>
            Tip Rain
            </motion.div>
          </div>       
          </div>
          )}
          
          {isMessageVisible && openTipRain ? (
              <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10}}>
              <div className={classes.tipContainer}>
                Tip Amount
                <Input
                type="number"
                variant="filled"
                value={amount}
                onChange={onChanger}
                />
              </div>
              <motion.span whileTap={{ scale: 0.97 }} className={classes.textFeildButton} onClick={() => onClick()}>Submit</motion.span>
              </div>
          ) : null}
      </>
    )}
    
    </Box>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Header);