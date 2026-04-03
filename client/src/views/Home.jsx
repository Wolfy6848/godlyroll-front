import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import parseCommasToThousands from "../utils/parseCommasToThousands.js";
import { Grow, Slide, StylesProvider } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import { getRaceInformation, getLastRaceInformation, getRacePosition } from "../services/api.service";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import Box from "@material-ui/core/Box";
import Countdown from "react-countdown";
import { chatSocket } from "../services/websocket.service";
import CountUp from 'react-countup';
import TipRainModal from "../components/modals/rain/TipRainModal";
import Footer from "../components/app/Footer.jsx";
import { useSpring, animated } from 'react-spring';

import Slide1 from "../assets/home/slideshow1.png";

import coin from "../assets/icons/coin.svg";
import WideLogo from "../assets/navbar/logo.svg";
import FlagsLeft from "../assets/leaderboard/flags-left.png";
import FlagsRight from "../assets/leaderboard/flags-right.png";
import First from "../assets/leaderboard/first2.png";
import Second from "../assets/leaderboard/second2.png";
import Third from "../assets/leaderboard/third2.png";

// Other PNG's
import Leaderboard from "../assets/home/leaderboard.png";

// Game PNG's
import Battles from "../assets/home/battles.png";
import Cases from "../assets/home/casesBg.png";
import Crash from "../assets/home/crash.png";
import Limiteds from "../assets/home/limiteds.png";
import Roulette from "../assets/home/roulette.png";
import Upgrader from "../assets/home/upgrader.png";
import Dice from "../assets/home/dice.png";
import Limbo from "../assets/home/limbo.png";
import Mines from "../assets/home/mines.png";
import Slots from "../assets/home/slots.png";

// Payment PNG's
import btc from "../assets/icons/btc.png";
import eth from "../assets/icons/eth.png";
import ltc from "../assets/icons/ltc.png";
import visa from "../assets/icons/visa.png";
import mastercard from "../assets/icons/mastercard.png";
import rust from "../assets/icons/rust.png";
import cashapp from "../assets/icons/cashapp.png";

import Gamemodes from "../assets/banners/Gamemodes.png";
import Rewards from "../assets/banners/Rewards.png";
import Withdraw from "../assets/banners/Withdraw.png";

const cutDecimalPoints = (num) => {
  const roundedNum = parseFloat(num).toFixed(2);
  return roundedNum;
};

const ColorCircularProgress = withStyles({
  root: {
    color: "#fff !important",
  },
})(CircularProgress);

const useStyles = makeStyles(theme => ({
  slideshowBox: {
    width: "100%",
    maxHeight: "100%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    [theme.breakpoints.down("md")]: {
      display: "none"
    },
  },
  slideshowSlide: {
    width: "100%",
    height: "250px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.25rem",
  },
  rewardsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "1150px",
    height: "100%",
    gap: "1.5rem",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column"
    },
  },
  leaderboard: {
    cursor: "pointer",
    borderRadius: "0.5rem",
    overflow: "hidden",
    height: "113px",
    width: "506px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left",
    backgroundImage: `url(${Leaderboard})`,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  leaderboardText: {
    fontWeight: 600,
    color: "transparent",
    background: "linear-gradient(90deg, #E1B56F 0.23%, #E2C390 113.43%) text",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    [theme.breakpoints.down("sm")]: {
    },
    [theme.breakpoints.down("md")]: {
    },
  },
  rain: {
    borderRadius: "0.5rem",
    overflow: "hidden",
    height: "250px",
    width: "99%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    border: "2px solid #282A3A",
    backgroundBlendMode: "overlay",
    background: "#14151D",
    justifyContent: "space-evenly",
    backgroundRepeat: "no-repeat",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -6,
      left: -6,
      bottom: -6,
      right: -6,
      background: 'linear-gradient(90deg, #0074D9 0.23%, rgb(119, 192, 255) 113.43%)',
      zIndex: -1,
      borderRadius: '6px',
      padding: 6,
      boxSizing: 'border-box',
    },
  },
  marketplace: {
    borderRadius: "0.5rem",
    overflow: "hidden",
    height: "210px",
    width: "99%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundBlendMode: "overlay",
    background: "linear-gradient(89.973deg, rgba(128, 28, 255, 20%) 0%, rgba(128, 28, 255, 0%) 100%), linear-gradient(#14151D, #14151D);",
    justifyContent: "space-evenly",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -6,
      left: -6,
      bottom: -6,
      right: -6,
      background: 'linear-gradient(89.973deg, rgba(128, 28, 255, 20%) 0%, #14151D 100%)',
      zIndex: -1,
      borderRadius: '6px',
      padding: 6,
      boxSizing: 'border-box',
    },
  },
  marketImg: {
    scale: 0.95,
    position: "absolute",
    right: 0,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  marketTitle: {
    color: "#FFF",
    fontWeight: "400",
    fontSize: "17px"
  },
  marketDesc: {
    color: "#FFF",
    fontWeight: "400",
    fontSize: "13px",
    width: "40%",
    textAlign: "center"
  },
  marketSvg: {
    position: "absolute",
    left: "0",
    height: "100%",
    fill: "#801CFF",
    opacity: 0.15
  },
  marketLearn: {
    color: "#FFF",
    background: "linear-gradient(180deg, #B95FFF 0%, #801CFF 100%)",
    borderRadius: "5px",
    padding: "10px 1rem",
    fontWeight: 400,
    fontSize: "12px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rainText: {
    fontSize: "45px",
    letterSpacing: "0.2rem",
    fontWeight: 600,
    color: "transparent",
    background: "linear-gradient(90deg, #0074D9 0.23%, rgb(119, 192, 255) 113.43%) text",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "15px",
    },
  },
  rainAmount: {
    borderRadius: "0.25rem",
    height: "4rem",
    background: "#0e1017",
    display: "flex", 
    fontWeight: 500,
    fontSize: "1.5rem",
    letterSpacing: "0.5rem",
    alignItems: "center", 
    justifyContent: "space-around",
    gap: "1rem", 
    padding: "0.75rem 1.25rem",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      height: "2rem",
      fontSize: "0.5rem",
    },
    [theme.breakpoints.down("md")]: {
      height: "3rem",
      fontSize: "1rem",
    },
  },

  gamesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", 
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)", 
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)", 
    },
  },
  gameCard: {
    fontFamily: "Poppins",
    maxWidth: "100%",
    height: 180,
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#14151D;",
    cursor: "pointer",
    transition: "transform 0.05s ease-in-out",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  gameImage: {
    width: "105%",
    height: "105%",
    objectFit: "cover",
    position: "relative",
    zIndex: 1
  },
  gameInfo: {
    position: "absolute",
    zIndex: 2,
    padding: "12px",
    left: 10,
    top: 40
  },
  gameTitle: {
    position: "relative",
    zIndex: 2,
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "4px",
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: "8px",
    },
  },
  gameProvider: {
    position: "relative",
    zIndex: 2,
    color: "#8A8A8A",
    fontSize: "14px",
  },
  gameLabel: {
    zIndex: 2,
    position: "absolute",
    bottom: 0,
    background: "linear-gradient(180deg, #282A3A 0%, #232534 100%)",
    color: "#FFFFFF",
    width: "100%",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    fontSize: "14px",
  },
  comingSoon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    fontSize: "20px",
    fontWeight: "bold",
    zIndex: 3,
  },
  newText: {
    position: "absolute"
  },
  divider: {
    backgroundColor: "#282A3A",
    height: "1px",
    width: "100%", 
    margin: "2.5rem 0",
    [theme.breakpoints.down("xs")]: {
      backgroundColor: "transparent",
      margin: "1rem"
    },
  },

  bottomContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: 500
  },
  paymentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
    gap: "16px"
  },
  paymentImage: {
    height: 30
  },
  containera: {
    marginTop: "1rem",
    maxWidth: "1100px",
    display: "flex",
    alignSelf: "center",
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  raceTableOutline: {
    marginTop: "0.5rem",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.25rem",
  },
  raceTableContainer: {
    display: "flex",
    fontSize: 13,
    borderRadius: "0.25rem",
    width: "100%",
    padding: "0.5em 2em",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    opacity: 0.5,
    color: "#FFF",
    marginTop: -40
  },
  placementContainer: {
    display: "flex",
    justifyContent: "flex-start",
    width: "20%",
    alignItems: "center"
  },
  playerContainer: {
    display: "flex",
    justifyContent: "flex-start",
    width: "80%",
    alignItems: "center"
  },
  wageredContainer: {
    display: "flex",
    justifyContent: "center",
    width: "50%",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: 16
  },
  prizeContainer: {
    display: "flex",
    justifyContent: "center",
    width: "50%",
    alignItems: "center",
    gap: "0.25rem",
  },
  prizeBox: {
    background: "transparent",
    color: "#B95FFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.35rem 1rem",
    borderRadius: "0.25rem",
    fontSize: 16
  },
  players: {
    width: "100%",
    margin: "3rem 0 2rem 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    "& td:nth-child(even)": { 
      backgroundColor: "#fff !important",
    },
    "& td:nth-child(odd)": { 
      backgroundColor: "#fff !important",
    },
  },
  playerBox: {
    display: "flex",
    alignItems: "center",
    paddingTop: "1em",
    paddingBottom: "1em",
    paddingRight: "1em",
    paddingLeft: "1em",
    width: "100%",
    background: "#14151D",
    color: "#FFF",
    marginBottom: "12px",
    borderRadius: "0.25rem"
  },
  playerAvatar: {
    width: "35px",
    height: "35px",
    borderRadius: "8px",
  },
  loader: {
    width: "100%",
    height: "100%",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > h2": {
      fontSize: "30px",
      color: "#fff",
      letterSpacing: "2px",
      fontWeight: 600,
      margin: 0,
      padding: 0
    },
    "& > p": {
      fontSize: "12px",
      color: "#fff",
      fontWeight: 400,
      opacity: 0.5,
      margin: 0,
      padding: 0
    }
  },
  topThreeContainer: {
    width: "100%",
    height: 450,
    margin: "3rem 0 2rem 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "bottom",
  },
  firstPlaceContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "end",
  },
  first: {
    marginTop: "auto",
    height: 283,
    width: 247,
    alignSelf: "end",
    position: "relative",
    backgroundImage: `linear-gradient(180deg, #9B6C2F 0%, hsla(233, 18%, 10%, 1) 100%)`,
    borderRadius: 10,
    border: "1px solid #9B6C2F",
    color: "#FFF",
    textAlign: "center"
  },
  second: {
    height: 283,
    width: 247,
    alignSelf: "end",
    position: "relative",
    backgroundImage: `linear-gradient(180deg, #9D9892 0%, hsla(233, 18%, 10%, 1) 100%)`,
    borderRadius: 10,
    border: "1px solid #BFBAB5",
    color: "#FFF",
    textAlign: "center"
  },
  third: {
    height: 283,
    width: 247,
    alignSelf: "end",
    position: "relative",
    backgroundImage: `linear-gradient(180deg, #323667 0%, hsla(233, 18%, 10%, 1) 100%)`,
    borderRadius: 10,
    border: "1px solid #6067B5",
    color: "#FFF",
    textAlign: "center"
  },
  finalistAvatar: {
    height: 80,
    width: 80,
    borderRadius: "0.5rem",
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  usernameText: {
    fontSize: 21,
    marginTop: 50,
  },
  wageredText: {
    fontSize: 13,
    opacity: 0.5,
    marginTop: 55,
  },
  wagerAmountText: {
    fontSize: 20,
    marginTop: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.3rem",
  },
  winAmountText: {
    fontSize: 30,
    marginTop: 40,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.3rem"
  },
  arrowLeft: {
    position: 'absolute',
    left: '20px',
    top: '85%',
    cursor: 'pointer',
    zIndex: 2,
    background: "linear-gradient(180deg, #B95FFF 0%, #7F1AFF 100%)",
    width: 20,
    height: 20,
    borderRadius: "50%",
    padding: 5,
    fill: "#FFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowRight: {
    position: 'absolute',
    right: '20px',
    top: '85%',
    cursor: 'pointer',
    zIndex: 2,
    background: "linear-gradient(180deg, #B95FFF 0%, #7F1AFF 100%)",
    width: 20,
    height: 20,
    borderRadius: "50%",
    padding: 5,
    fill: "#FFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#D9D9D9',
    opacity: 0.35,
    margin: '0 5px',
    cursor: 'pointer',
  },
  activeDot: {
    backgroundColor: '#B95FFF',
    opacity: 1
  },
}));

const Home = ({ }) => {
  const classes = useStyles();
  const history = useHistory();

  const [previousTotal, setPreviousTotal] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [openTipRain, setOpenTipRain] = useState(false);
  const { addToast } = useToasts();
  const [images, setImages] = useState([Gamemodes, Rewards, Withdraw]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const arrowAnimation = useSpring({
    from: { filter: 'brightness(100%)' },
    to: { filter: 'brightness(85%)' },
    config: { duration: 200 },
  });
  
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  const [loading, setLoading] = useState(true);
  const [loadingPersonal, setLoadingPersonal] = useState(false);
  const [activeRace, setActiveRace] = useState(false);
  const [topWinners, setTopWinners] = useState(null);
  const [personalPosition, setPersonalPosition] = useState(0);
  const [personalProgress, setPersonalProgress] = useState(0);
  const [prizeDistribution, setPrizeDistribution] = useState([]);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [text, setText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getRaceInformation();
        const responseLast = await getLastRaceInformation();

        // If race is active
        if (response.active) {
          // Update state
          setTopWinners(response.topTen);
          setActiveRace(response.activeRace);
          setPrizeDistribution(response.prizeDistribution);
          setLoading(false);
          setTimeout(() => {
            setThird(true)
            setTimeout(() => {
              setSecond(true)
              setTimeout(() => {
                setFirst(true)
              }, 250)
            }, 250)
          }, 250)
          console.log(response)
        }
        // If Last Race
        else if (false) {
          // Update state
          setTopWinners(responseLast.topTen);
          setActiveRace(responseLast.activeRace);
          setPrizeDistribution(responseLast.prizeDistribution);
          setLoading(false);
        }
        else {
          setActiveRace(null);
          setLoading(false);
        }

      } catch (error) {
        console.log("There was an error while loading race data:", error);
        addToast(
          "There was an error while loading race data, please try again later!",
          { appearance: "error" }
        );
      }
    };
    
    fetchData();
  }, []);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      function z(t) {
        return t < 10 ? `0${t}` : t;
      }
      return (
        <div>
          <span>{days}d {z(hours)}h {z(minutes)}:{z(seconds)}</span>
        </div>
      );
    } else {
      function z(t) {
        return t < 10 ? `0${t}` : t;
      }
      return (
        <div style={{width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 0 0 0"}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M16.5 2.75C8.90608 2.75 2.75 8.90608 2.75 16.5C2.75 24.0938 8.90608 30.25 16.5 30.25C24.0938 30.25 30.25 24.0938 30.25 16.5C30.25 8.90608 24.0938 2.75 16.5 2.75ZM17.875 9.625C17.875 8.86561 17.2594 8.25 16.5 8.25C15.7406 8.25 15.125 8.86561 15.125 9.625V16.5C15.125 17.2594 15.7406 17.875 16.5 17.875C17.2594 17.875 17.875 17.2594 17.875 16.5V9.625Z" fill="#D7B949"/><path fillRule="evenodd" clipRule="evenodd" d="M26.5277 3.15272C25.9908 3.6897 25.9908 4.5603 26.5277 5.09728L27.9027 6.47228C28.4397 7.00924 29.3103 7.00924 29.8473 6.47228C30.3842 5.9353 30.3842 5.0647 29.8473 4.52772L28.4723 3.15272C27.9353 2.61576 27.0647 2.61576 26.5277 3.15272Z" fill="#D7B949"/></svg>
          <div style={{color: "#D7B949"}}>Ends In</div>
          <span>{days}d {z(hours)}h {z(minutes)}:{z(seconds)}</span>
        </div>
      );
    }
  };

  const updateRainAmount = (newAmount) => {
    setPreviousTotal(currentTotal);
    setCurrentTotal(newAmount); 
  };

  useEffect(() => {   
    chatSocket.on("rain-update-amount", updateRainAmount);
    return () => {
      chatSocket.off("rain-update-amount", updateRainAmount);
    };
  }, []);

  return (
    <Grow in timeout={620}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} className={classes.root}>
        <TipRainModal
          open={openTipRain}
          handleClose={() => setOpenTipRain(state => !state)}
        />

        {/*<div style={{fontSize: 12, fontWeight: 500, marginBottom: "-1rem"}}>Events</div>*/}
        <div className={classes.rewardsContainer}>
        <div className={classes.rain}>
        <animated.svg 
        className={classes.arrowLeft}
        style={arrowAnimation}
        onClick={goToPrevious}
        width="9" 
        height="11" 
        viewBox="0 0 9 11" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8.34883 10.0601V0.683043C8.34851 0.588105 8.32103 0.495047 8.26935 0.413883C8.21766 0.33272 8.14372 0.266526 8.05549 0.222426C7.96726 0.178327 7.86807 0.15799 7.76861 0.163608C7.66915 0.169225 7.57318 0.200583 7.49104 0.254306L0.383789 4.94281C0.0891114 5.13712 0.0891114 5.60493 0.383789 5.79977L7.49104 10.4883C7.57301 10.5425 7.66903 10.5744 7.76865 10.5803C7.86828 10.5862 7.9677 10.566 8.05612 10.5219C8.14454 10.4777 8.21857 10.4113 8.27018 10.3299C8.32178 10.2485 8.34898 10.1552 8.34883 10.0601Z" fill="white"/>
      </animated.svg>
      
      <animated.svg 
        className={classes.arrowRight}
        style={arrowAnimation}
        onClick={goToNext}
        width="9" 
        height="11" 
        viewBox="0 0 9 11" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.651174 10.0601V0.683043C0.651485 0.588105 0.678966 0.495047 0.730653 0.413883C0.782341 0.33272 0.85628 0.266526 0.944513 0.222426C1.03274 0.178327 1.13193 0.15799 1.23139 0.163608C1.33085 0.169225 1.42682 0.200583 1.50896 0.254306L8.61621 4.94281C8.91089 5.13712 8.91089 5.60493 8.61621 5.79977L1.50896 10.4883C1.42699 10.5425 1.33097 10.5744 1.23135 10.5803C1.13172 10.5862 1.0323 10.566 0.943879 10.5219C0.855459 10.4777 0.781425 10.4113 0.729821 10.3299C0.678217 10.2485 0.651016 10.1552 0.651174 10.0601Z" fill="white"/>
      </animated.svg>
          <div className={classes.slideshowSlide} style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundPosition: "center center" }} />
          <div className={classes.dotsContainer}>
            {images.map((_, index) => (
              <div 
                key={index} 
                className={`${classes.dot} ${index === currentImageIndex ? classes.activeDot : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className={classes.marketplace}>
          <svg className={classes.marketSvg} width="225" height="210" viewBox="0 0 225 210" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7799 0.333252C11.858 0.333741 7.98632 1.21584 4.45124 2.91431C0.916145 4.61278 -2.19192 7.08418 -4.64314 10.1458L-44.5473 60.0325C-54.8308 72.8803 -45.6725 91.9166 -29.2267 91.9166H-16.6667V183.5C-16.6667 190.44 -13.9099 197.095 -9.00268 202.003C-4.09548 206.91 2.56011 209.667 9.49994 209.667H114.167C121.106 209.667 127.762 206.91 132.669 202.003C137.576 197.095 140.333 190.44 140.333 183.5V91.9166H166.5V196.583C166.5 200.053 167.878 203.381 170.332 205.835C172.786 208.288 176.113 209.667 179.583 209.667C183.053 209.667 186.381 208.288 188.835 205.835C191.288 203.381 192.667 200.053 192.667 196.583V91.9166H205.227C221.685 91.9166 230.831 72.8803 220.547 60.0325L180.643 10.1588C178.193 7.09487 175.086 4.62098 171.55 2.92021C168.015 1.21944 164.143 0.335311 160.22 0.333252H15.7799ZM35.6666 91.9166C32.1967 91.9166 28.8689 93.295 26.4153 95.7486C23.9617 98.2022 22.5833 101.53 22.5833 105V157.333C22.5833 160.803 23.9617 164.131 26.4153 166.585C28.8689 169.038 32.1967 170.417 35.6666 170.417H88C91.4699 170.417 94.7977 169.038 97.2513 166.585C99.7049 164.131 101.083 160.803 101.083 157.333V105C101.083 101.53 99.7049 98.2022 97.2513 95.7486C94.7977 93.295 91.4699 91.9166 88 91.9166H35.6666Z" fill="#801CFF"/>
          </svg>
          <a style={{ position: "absolute", left: 50, fontWeight: 500, color: "#B95FFF" }}>Marketplace</a>

          <svg className={classes.personsvg} width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.7445 9.69948C23.1107 9.69948 25.1464 7.5639 25.1464 4.78287C25.1464 2.03541 23.1 0 20.7445 0C18.3895 0 16.3425 2.07981 16.3425 4.80507C16.3425 7.5639 18.3782 9.69948 20.7445 9.69948ZM8.0775 9.9556C10.1245 9.9556 11.9079 8.08642 11.9079 5.67251C11.9079 3.28135 10.1132 1.51235 8.0775 1.51235C6.03107 1.51235 4.22571 3.32575 4.23696 5.69526C4.23696 8.08642 6.01982 9.9556 8.07804 9.9556M1.93714 20H10.3007C9.15643 18.3203 10.5541 14.9388 12.9204 13.0924C11.6989 12.2693 10.1245 11.6575 8.06678 11.6575C3.10339 11.6569 0 15.3606 0 18.4422C0 19.4439 0.550179 20 1.93714 20ZM13.8225 20H27.6557C29.3834 20 30 19.4991 30 18.5201C30 15.6503 26.445 11.6905 20.7337 11.6905C15.0332 11.6905 11.4782 15.6503 11.4782 18.5207C11.4782 19.4991 12.0943 20 13.8225 20Z" fill="url(#paint0_linear_587_938)"/>
            <defs>
            <linearGradient id="paint0_linear_587_938" x1="15" y1="0" x2="15" y2="20" gradientUnits="userSpaceOnUse">
            <stop stop-color="#B95FFF"/>
            <stop offset="1" stop-color="#801CFF"/>
            </linearGradient>
            </defs>
          </svg>
          <a className={classes.marketTitle}>New Peer-to-Peer Marketplace</a>
          <a className={classes.marketDesc}>Deposit and withdraw MM2 items with no cookie required, 0% trading fees, and no balance holds.</a>
          <motion.div 
          className={classes.marketLearn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => history.push(`/marketplace`)}
          >Learn more</motion.div>
          <motion.img whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }} src={Limiteds} className={classes.marketImg}/>
        </div>
      </div>

        <div className={classes.divider} />

        <div className={classes.gamesContainer}>
          <motion.div 
            className={classes.gameCard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => history.push(`/cases`)}
          >
            <img src={Cases} alt="cases" className={classes.gameImage} />
            <div className={classes.gameInfo}>
              <div className={classes.gameTitle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.7597 12.3807L12.1719 13.5L20.5841 12.5L20.5841 18.7112C20.5841 21.0991 20.5841 22.2917 19.8799 23.0337C19.1757 23.7756 18.0436 23.7756 15.7772 23.7756H8.56668C6.30019 23.7756 5.16815 23.7756 4.46392 23.0337C3.7597 22.2917 3.7597 21.0991 3.7597 18.7112L3.7597 12.3807ZM1.13389 9.61421L3.7597 12.3807L8.84984 7.5L5.66927 5.28033C5.46225 5.13511 5.21757 5.06115 4.96896 5.06863C4.72035 5.07612 4.48007 5.16468 4.28126 5.32211L1.26247 7.70619C1.12476 7.81504 1.01086 7.95379 0.928468 8.11305C0.84608 8.27231 0.797132 8.44836 0.784939 8.62928C0.772746 8.81021 0.797593 8.99178 0.857796 9.16171C0.917999 9.33163 1.01215 9.48595 1.13389 9.61421ZM23.21 9.61421L20.5841 12.3807L15.494 7.5L18.6746 5.28033C18.8816 5.13511 19.1263 5.06115 19.3749 5.06863C19.6235 5.07612 19.8638 5.16468 20.0626 5.32211L23.0814 7.70619C23.2191 7.81504 23.333 7.95379 23.4154 8.11305C23.4978 8.27231 23.5467 8.44836 23.5589 8.62928C23.5711 8.81021 23.5463 8.99178 23.486 9.16171C23.4258 9.33163 23.3317 9.48595 23.21 9.61421Z" fill="white"/>
                <path d="M19.3825 12.3806V13.6467H4.96155V12.3806L8.37528 8.5H15.494L19.3825 12.3806Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <g filter="url(#filter0_f_587_476)">
                <path d="M20.7145 1L17.7088 12H6.54482L2.68036 1H3.60519H20.7145Z" fill="url(#paint0_linear_587_476)"/>
                </g>
                <path d="M19.2653 12.5V16.5H5.07867V12.5H19.2653Z" fill="white" stroke="white" stroke-linecap="round"/>
                <path d="M4.1041 13.5L3.62952 12H4.1041V13.5Z" fill="white"/>
                <path d="M20.2398 14L20.7144 12H20.2398V14Z" fill="white"/>
                <defs>
                <filter id="filter0_f_587_476" x="2.48036" y="0.8" width="18.4342" height="11.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="0.1" result="effect1_foregroundBlur_587_476"/>
                </filter>
                <linearGradient id="paint0_linear_587_476" x1="11.6974" y1="1" x2="11.6974" y2="12.5238" gradientUnits="userSpaceOnUse">
                <stop stop-color="#801CFF" stop-opacity="0"/>
                <stop offset="1" stop-color="#801CFF"/>
                </linearGradient>
                </defs>
                </svg>
                Cases
              </div>
              <div className={classes.gameProvider}>MM2STASH Originals</div>
            </div>
            <div className={classes.gameLabel}>Cases</div>
          </motion.div>
          <motion.div 
            className={classes.gameCard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => history.push(`/battles`)}
          >
            <img src={Battles} alt="battles" className={classes.gameImage} />
            <div className={classes.gameInfo}>
              <div className={classes.gameTitle}>
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.8214 18.715L14.3962 16.3105C14.2007 16.1167 13.8853 16.1174 13.6906 16.312L12.3062 17.6964C12.1109 17.8917 11.7943 17.8917 11.5991 17.6964L11.2876 17.385C10.9235 17.0208 10.7414 16.5696 10.7414 16.0312C10.7414 15.4929 10.9235 15.0417 11.2876 14.6775L15.3014 10.6638C15.6655 10.2996 16.1168 10.1175 16.6551 10.1175C17.1935 10.1175 17.6447 10.2996 18.0089 10.6638L18.3203 10.9752C18.5156 11.1705 18.5156 11.487 18.3203 11.6823L16.9359 13.0667C16.7412 13.2614 16.7406 13.5768 16.9344 13.7723L19.3389 16.1975C19.5289 16.3875 19.6239 16.6092 19.6239 16.8625C19.6239 17.1158 19.5289 17.3375 19.3389 17.5275L18.1514 18.715C17.9614 18.905 17.7397 19 17.4864 19C17.233 19 17.0114 18.905 16.8214 18.715ZM19.6239 3.59289C19.6239 3.7255 19.5712 3.85268 19.4774 3.94645L8.9489 14.475C8.89154 14.5323 8.89677 14.6268 8.96012 14.6775C9.32429 15.0417 9.50637 15.4929 9.50637 16.0312C9.50637 16.5696 9.32429 17.0208 8.96012 17.385L8.64867 17.6964C8.45341 17.8917 8.13683 17.8917 7.94157 17.6964L6.55716 16.312C6.36249 16.1174 6.04708 16.1167 5.85157 16.3105L3.42637 18.715C3.23637 18.905 3.0147 19 2.76137 19C2.50804 19 2.28637 18.905 2.09637 18.715L0.908871 17.5275C0.718871 17.3375 0.623871 17.1158 0.623871 16.8625C0.623871 16.6092 0.718871 16.3875 0.908871 16.1975L3.31335 13.7723C3.50718 13.5768 3.5065 13.2614 3.31183 13.0667L1.92742 11.6823C1.73216 11.487 1.73216 11.1705 1.92742 10.9752L2.23887 10.6638C2.60304 10.2996 3.05429 10.1175 3.59262 10.1175C4.13095 10.1175 4.5822 10.2996 4.94637 10.6638C4.99705 10.7271 5.09154 10.7323 5.1489 10.675L15.6774 0.146447C15.7712 0.0526783 15.8984 0 16.031 0H19.1239C19.4 0 19.6239 0.223858 19.6239 0.5V3.59289ZM5.67992 8.14895C5.48466 8.34421 5.16808 8.34421 4.97282 8.14895L0.770317 3.94645C0.676549 3.85268 0.623871 3.7255 0.623871 3.59289V0.5C0.623871 0.223857 0.847728 0 1.12387 0H4.21676C4.34937 0 4.47655 0.0526784 4.57032 0.146447L8.77282 4.34895C8.96808 4.54421 8.96808 4.86079 8.77282 5.05605L5.67992 8.14895Z" fill="#F8F8F8"/></svg>

                Case Battles
              </div>
              <div className={classes.gameProvider}>MM2STASH Originals</div>
            </div>
            <div className={classes.gameLabel}>Case Battles</div>
          </motion.div>
          <motion.div 
            className={classes.gameCard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => history.push(`/roulette`)}
          >
            <img src={Roulette} alt="roulette" className={classes.gameImage} />
            <div className={classes.gameInfo}>
              <div className={classes.gameTitle}>
                Roulette
              </div>
              <div className={classes.gameProvider}>MM2STASH Originals</div>
            </div>
            <div className={classes.gameLabel}>Roulette</div>
          </motion.div>
          <motion.div className={classes.gameCard} whileHover={{scale: 1.05}} whileTap={{ scale: 0.95}} onClick={() => history.push('/upgrader')} >
            <img src={Upgrader} alt="upgrader" className={classes.gameImage} />
            <div className={classes.gameInfo}>
              <div className={classes.gameTitle}>
              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.25107 10.1209C6.11967 10.2148 6.04169 10.3663 6.04169 10.5278V14.7364C6.04169 15.1431 6.50137 15.3797 6.83231 15.1433L14.2094 9.87393C14.3833 9.74975 14.6168 9.74975 14.7906 9.87393L22.1677 15.1433C22.4987 15.3797 22.9584 15.1431 22.9584 14.7364V10.5278C22.9584 10.3663 22.8804 10.2148 22.749 10.1209L14.7906 4.43643C14.6168 4.31225 14.3832 4.31225 14.2094 4.43643L6.25107 10.1209Z" fill="#F8F8F8"/>
              <path d="M6.25107 18.5794C6.11967 18.6733 6.04169 18.8248 6.04169 18.9863V23.1949C6.04169 23.6016 6.50137 23.8382 6.83231 23.6018L14.2094 18.3324C14.3833 18.2082 14.6168 18.2082 14.7906 18.3324L22.1677 23.6018C22.4987 23.8382 22.9584 23.6016 22.9584 23.1949V18.9863C22.9584 18.8248 22.8804 18.6733 22.749 18.5794L14.7906 12.8949C14.6168 12.7707 14.3832 12.7707 14.2094 12.8949L6.25107 18.5794Z" fill="#F8F8F8"/>
              </svg>

                Upgrader
              </div>
              <div className={classes.gameProvider}>MM2STASH Originals</div>
            </div>
            <div className={classes.gameLabel}>Upgrader</div>
            <div className={classes.comingSoonOverlay}>Coming Soon</div>
          </motion.div>
          <motion.div className={classes.gameCard}>
            <img src={Dice} alt="dice" className={classes.gameImage} />
            <div className={classes.gameInfo}>
              <div className={classes.gameTitle}>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.05078 0.251757C8.33926 0.0868409 8.6667 0 9.00004 0C9.33338 0 9.66082 0.0868409 9.9493 0.251757L17.0546 4.31384C17.3421 4.47821 17.5808 4.71436 17.7468 4.99859C17.9127 5.28282 18.0001 5.60515 18 5.93324V14.0668C17.9999 14.3947 17.9125 14.7168 17.7465 15.0009C17.5806 15.2849 17.342 15.5209 17.0546 15.6852L9.9493 19.7482C9.66082 19.9132 9.33338 20 9.00004 20C8.6667 20 8.33926 19.9132 8.05078 19.7482L0.945512 15.6862C0.657974 15.5218 0.41926 15.2856 0.253313 15.0014C0.087366 14.7172 2.06352e-05 14.3948 3.81496e-05 14.0668V5.93324C0.000186703 5.60531 0.0876107 5.28318 0.253549 4.99912C0.419488 4.71507 0.658113 4.47907 0.945512 4.31477L8.05078 0.251757ZM2.6053 6.34394C2.53327 6.30265 2.45149 6.28085 2.3682 6.28073C2.28491 6.28061 2.20306 6.30218 2.13091 6.34326C2.05876 6.38434 1.99885 6.44348 1.95722 6.51472C1.9156 6.58596 1.89373 6.66678 1.89383 6.74903V12.9881C1.89398 13.316 1.9814 13.6382 2.14734 13.9222C2.31328 14.2063 2.5519 14.4423 2.8393 14.6066L8.28762 17.7219C8.35958 17.7631 8.44128 17.7849 8.52448 17.7851C8.60769 17.7852 8.68947 17.7638 8.7616 17.7228C8.83372 17.6818 8.89365 17.6228 8.93534 17.5517C8.97703 17.4806 8.99902 17.3999 8.99909 17.3177V11.0787C8.99894 10.7507 8.91152 10.4286 8.74558 10.1445C8.57964 9.86049 8.34102 9.62449 8.05362 9.4602L2.6053 6.34394ZM12.5688 3.93495C12.1159 3.67674 11.3808 3.67674 10.9279 3.93495C10.4751 4.19315 10.4751 4.61227 10.9279 4.87048C11.3808 5.12868 12.1159 5.12868 12.5688 4.87048C13.0216 4.61227 13.0216 4.19315 12.5688 3.93495ZM7.07404 3.93495C6.6212 3.67674 5.88604 3.67674 5.4332 3.93495C4.98035 4.19315 4.98035 4.61227 5.4332 4.87048C5.88604 5.12868 6.6212 5.12868 7.07404 4.87048C7.52783 4.61227 7.52783 4.19315 7.07404 3.93495ZM13.7293 13.5971C14.2949 13.2744 14.7544 12.4894 14.7544 11.843C14.7544 11.1975 14.2949 10.9355 13.7293 11.2583C13.1628 11.581 12.7033 12.3669 12.7033 13.0124C12.7033 13.6579 13.1637 13.9199 13.7293 13.5971ZM3.66162 10.1871C4.11446 10.4462 4.48204 10.2367 4.48204 9.71934C4.48204 9.20293 4.11446 8.57518 3.66162 8.31604C3.20878 8.05783 2.8412 8.26739 2.8412 8.78381C2.8412 9.30116 3.20878 9.9289 3.66162 10.1871ZM7.76372 15.3307C7.76372 15.8471 7.3952 16.0566 6.94235 15.7984C6.48951 15.5402 6.12193 14.9115 6.12193 14.3951C6.12193 13.8787 6.48951 13.6692 6.94235 13.9274C7.3952 14.1856 7.76372 14.8142 7.76372 15.3307ZM4.48204 13.4615C4.48204 13.9788 4.11446 14.1884 3.66162 13.9292C3.20878 13.671 2.8412 13.0433 2.8412 12.5259C2.8412 12.0095 3.20878 11.8 3.66162 12.0582C4.11446 12.3173 4.48204 12.9451 4.48204 13.4615ZM7.76278 11.5904C7.76278 12.1078 7.3952 12.3173 6.94235 12.0582C6.48856 11.8009 6.12193 11.1722 6.12193 10.6549C6.12193 10.1394 6.48856 9.92983 6.94235 10.1871C7.3952 10.4462 7.76278 11.0749 7.76278 11.5904Z" fill="#F8F8F8"/></svg>
                Dice
              </div>
              <div className={classes.gameProvider}>Coming Soon</div>
            </div>
            <div className={classes.gameLabel}>Dice</div>
            <div className={classes.comingSoonOverlay}>Coming Soon</div>
          </motion.div>
          <motion.div className={classes.gameCard}>
            <img src={Mines} alt="mines" className={classes.gameImage} />
            <div className={classes.gameInfo}>
              <div className={classes.gameTitle}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.28958 21.8501C5.29305 21.8501 3.59616 21.1435 2.19892 19.7303C0.801665 18.317 0.102721 16.6118 0.102082 14.6147C0.101443 12.6175 0.792401 10.9283 2.17496 9.54701C3.55751 8.16574 5.24642 7.4751 7.24167 7.4751H7.55312L8.2 6.34906C8.39167 5.99767 8.67916 5.77022 9.0625 5.66672C9.44583 5.56322 9.81319 5.61497 10.1646 5.82197L10.8833 6.22926L11.0031 6.0376C11.3705 5.35079 11.9455 4.90357 12.7281 4.69593C13.5108 4.48829 14.2455 4.58413 14.9323 4.98343L15.7708 5.4626L14.8125 7.11572L13.974 6.63656C13.7503 6.50878 13.5066 6.48067 13.2427 6.55222C12.9789 6.62378 12.7834 6.77168 12.6562 6.99593L12.5365 7.1876L13.4948 7.73864C13.8302 7.93031 14.05 8.21781 14.1541 8.60114C14.2583 8.98447 14.2142 9.34385 14.0219 9.67926L13.375 10.8293C13.7424 11.4043 14.018 12.0154 14.202 12.6626C14.386 13.3098 14.4777 13.9764 14.4771 14.6626C14.4771 16.6591 13.7785 18.3563 12.3812 19.7542C10.984 21.1521 9.28675 21.8507 7.28958 21.8501ZM18.1667 8.43343V6.51676H21.0417V8.43343H18.1667ZM12.8958 3.1626V0.287598H14.8125V3.1626H12.8958ZM17.5677 5.10322L16.226 3.76156L18.2625 1.7251L19.6042 3.06676L17.5677 5.10322Z" fill="#F8F8F8"/>
                </svg>
                Mines
              </div>
              <div className={classes.gameProvider}>Coming Soon</div>
            </div>
            <div className={classes.gameLabel}>Mines</div>
            <div className={classes.comingSoonOverlay}>Coming Soon</div>
          </motion.div>
        </div>

        <div className={classes.divider} />

        {loading ?
        <Box className={classes.loader}>
          <ColorCircularProgress />
        </Box>
        : (
        <Grow in timeout={620}>
          <div className={classes.containera} style={{display: "flex", alignItems: "center", width: "100%"}} >
            {/*<motion.img src={FlagsLeft} style={{width: 250, position: "absolute", top: 0, left: 0}} />
            <motion.img src={FlagsRight} style={{width: 250, position: "absolute", top: 0, right: 0}} />*/}

            <div className={classes.textContainer}>
              <h2>R$25,000.00 WEEKLY RACE</h2>
              <p>The race is based on your wager amount every week.</p>
            </div>

            {!activeRace ? (
              <div className={classes.topThreeContainer} style={{display: "flex", alignItems: "center", justifyContent:"center", color: "#fff", marginTop: "15rem"}}>
                <div>No active race.</div>
              </div>
            ) : (
            <>
              <div className={classes.topThreeContainer}>
                <Slide in={second} direction="up" timeout={350}>
                  <div className={classes.second}>
                    <img className={classes.finalistAvatar} src={topWinners[1]._user.avatar} style={{border: "1px solid #C0C0C0"}}/>
                    <div className={classes.usernameText}>{topWinners[1]._user.username}</div>
                    <div className={classes.wageredText}>Wagered</div>
                    <div className={classes.wagerAmountText}><img style={{height: 17, width: 17}} src={coin} />{parseCommasToThousands(cutDecimalPoints(topWinners[1].value))}</div>
                    <div className={classes.winAmountText} style={{color: "#B95FFF"}}><img style={{height: 25, width: 25}} src={coin} />{parseCommasToThousands(cutDecimalPoints(activeRace.prize *(prizeDistribution[1] / 100)))}</div>
                  </div>
                </Slide>
                
                <div className={classes.firstPlaceContainer}>
                  <Slide in={first} direction="up" timeout={350}>
                    <div className={classes.first}>
                      <img className={classes.finalistAvatar} src={topWinners[0]._user.avatar} style={{border: "1px solid #E1B56F"}}/>
                      <div className={classes.usernameText}>{topWinners[0]._user.username}</div>
                      <div className={classes.wageredText}>Wagered</div>
                      <div className={classes.wagerAmountText}><img style={{height: 17, width: 17}} src={coin} />{parseCommasToThousands(cutDecimalPoints(topWinners[0].value))}</div>
                      <div className={classes.winAmountText} style={{color: "#B95FFF"}}><img style={{height: 25, width: 25}} src={coin} />{parseCommasToThousands(cutDecimalPoints(activeRace.prize *(prizeDistribution[0] / 100)))}</div>
                    </div>
                  </Slide>
                  <div style={{height: 40}} />
                </div>

                <Slide in={third} direction="up" timeout={350}>
                  <div className={classes.third}>
                    <img className={classes.finalistAvatar} src={topWinners[2]._user.avatar} style={{border: "1px solid #CD7F32"}}/>
                    <div className={classes.usernameText}>{topWinners[2]._user.username}</div>
                    <div className={classes.wageredText}>Wagered</div>
                    <div className={classes.wagerAmountText}><img style={{height: 17, width: 17}} src={coin} />{parseCommasToThousands(cutDecimalPoints(topWinners[2].value))}</div>
                    <div className={classes.winAmountText} style={{color: "#B95FFF"}}><img style={{height: 25, width: 25}} src={coin} />{parseCommasToThousands(cutDecimalPoints(activeRace.prize *(prizeDistribution[2] / 100)))}</div>
                  </div>
                </Slide>
                
              </div>
              <div className={classes.content} style={{    width: "100%",
    margin: "3rem 0 2rem 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "bottom",}}>
                <div className={classes.content} style={{display: "flex", alignItems: "center", minWidth: "100%"}}>
                  <div className={classes.raceTableOutline} style={{display: "flex", alignItems: "center", minWidth: "100%"}}>
                    <div className={classes.raceTableContainer} style={{display: "flex", alignItems: "center", minWidth: "100%"}}>
                      <div style={{display: "flex", width: "50%"}}>
                        <div className={classes.placementContainer}>#</div>
                        <div className={classes.playerContainer}>Player</div>
                      </div>
                      <div style={{display: "flex", width: "50%"}}>
                        <div className={classes.wageredContainer} style={{fontSize: 12}}>Wagered</div>
                        <div className={classes.prizeContainer}>Prize</div>
                      </div>
                    </div>
                    <div className={classes.players}>
                      {!topWinners ? "" : topWinners.map((entry, index) => {
                        if(index <= 2) return
                        return (
                          <div className={classes.playerBox}>
                            <div style={{display: "flex", width: "50%"}}>
                              <div className={classes.placementContainer}>{index + 1}</div>
                              <div className={classes.playerContainer} style={{gap: "0.5rem"}}>
                                <img className={classes.playerAvatar} src={entry._user.avatar} />
                                {entry._user.username}
                              </div>
                            </div>
                            <div style={{display: "flex", width: "50%"}}>
                              <div className={classes.wageredContainer}><img style={{height: 17, width: 17}} src={coin} />{parseCommasToThousands(cutDecimalPoints(entry.value))}</div>
                              <div className={classes.prizeContainer}><div className={classes.prizeBox}><img style={{height: 17, width: 17}} src={coin} />{parseCommasToThousands(cutDecimalPoints(activeRace.prize *(prizeDistribution[index] / 100)))}</div></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div> 
              </div>
            </>
            )}   
          </div>
        </Grow>
        )}  

        <Footer />
      </div>
    </Grow>
  );
};

export default Home;
