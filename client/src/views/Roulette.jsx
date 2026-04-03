import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getRouletteSchema } from "../services/api.service";
import { rouletteSocket } from "../services/websocket.service";
import PropTypes from "prop-types";

// MUI Components
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/InputAdornment";
import Countdown from "react-countdown";
import Grow from '@material-ui/core/Grow';

import { TimerBar } from "./TimerBarR.js";

// Assets
import red from "../assets/red.png";
import black from "../assets/black.png";
import purple from "../assets/purple.png";

// Components
import BetsRed from "../components/roulette/BetsRed";
import BetsGreen from "../components/roulette/BetsGreen";
import BetsBlack from "../components/roulette/BetsBlack";
import HistoryEntry from "../components/roulette/HistoryEntry";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import coin from "../assets/icons/coin.svg";

import placebet from "../assets/sounds/place-bet.mp3";
import error from "../assets/sounds/error.mp3";
import { blue } from "@material-ui/core/colors";

const errorAudio = new Audio(error);
const placebetAudio = new Audio(placebet);

const playSound = audioFile => {
  audioFile.play();
};

// Custom Styled Component
const BetInput = withStyles({
  root: {
    width: "90%",
    minwidth: "90%",
    height: 60,
    marginTop: "auto",
    border: "1px solid transparent",
    background: "#0E1013",
    borderRadius: "5px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
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
  root: {
    width: "100%",
    maxWidth: "1250px",
    margin: "0 auto",
    color: "#fff"
  },
  box: {
    marginBottom: 5,
  },
  logo: {
    color: "#e4e4e4",
    fontFamily: "Poppins",
    fontSize: "19px",
    fontWeight: 500,
    letterSpacing: ".1em",
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
      marginTop: 5,
    },
  },
  countdown: {
    position: "absolute",
    zIndex: 1,
  },
  controls: {
    overflow: "visible",
    marginBottom: "34px",
    display: "flex",
    gap: "4rem",
    marginTop: "15px",
    backgroundColor: "#14151D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.5em",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "20px",
      marginTop: "-25px",
    },
  },
  history: {
    overflow: "hidden",
    padding: "0.5rem",
    display: "flex",
    backgroundColor: "#14151D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.5em",
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
    border: "1px solid transparent"
  },
  right: {
    display: "flex",
    marginLeft: "-23px",
    height: "2.25rem",
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
    alignItems: "center",
    transition: "all 800ms ease",
    marginRight: "-25px",
    paddingLeft: "5px",
    marginTop: "25px",
    maxWidth: "26rem",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      marginRight: "-21px",
    },
  },
  rouletteWrapper: {
    position: "relative",
    width: "100%",
    margin: "0 auto 0.5rem auto",
    overflow: "hidden",
    borderRadius: "0.5em",
    justifyContent: "center",
    backgroundColor: "#14151D",
    minHeight: 140,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&::before": {
      background: "linear-gradient(90deg,rgb(0,0,0) 0%,rgba(0,0,0,0) 100%)",
      content: '""',
      width: "1.5rem",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      opacity: .4,
      zIndex: 1,
    },
    "&::after": {
      background: "linear-gradient(270deg,rgb(0,0,0) 0%,rgba(0,0,0,0) 100%)",
      content: '""',
      width: "1.5rem",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      opacity: .4,
      zIndex: 1,
    }
  },
  selector: {
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    position: "absolute",
    left: "calc(50% - 10px)",
    zIndex: 2,
    transition: "opacity .5s",
  },
  selectorTop: {
    borderTop: "15px solid #fff",
    top: 0,
  },
  selectorBottom: {
    borderBottom: "15px solid #fff",
    bottom: 0,
  },
  wheelR: {
    display: "flex",
  },
  rowR: {
    display: "flex",
    padding: "15px 0",
    background: "rgb(15 15 16 / 8%)",
    //contain: "layout style paint",
  },
  cardRed: {
    height: "68px",
    width: "68px",
    margin: "2.5px",
    borderRadius: ".625rem",
    textShadow: "1px 2px rgb(0 0 0 / 35%)",
    transition: "text-shadow .5s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "1.5em",
    background: "#de4c41",
    boxShadow: "0 10px 27px #fa010133, inset 0 2px #e5564b, inset 0 -2px #ad362d",
  },
  cardBlack: {
    height: "68px",
    width: "68px",
    margin: "2.5px",
    borderRadius: ".625rem",
    textShadow: "1px 2px rgb(0 0 0 / 35%)",
    transition: "text-shadow .5s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "1.5em",
    background: "#1C69FF",
    boxShadow: "0 10px 27px #010a1d1f, inset 0 2px #3b3f47, inset 0 -2px #272b33",
  },
  cardGreen: {
    height: "68px",
    width: "68px",
    margin: "2.5px",
    borderRadius: ".625rem",
    textShadow: "1px 2px rgb(0 0 0 / 35%)",
    transition: "text-shadow .5s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "1.5em",
    background: "#831DFF",
  },
  game: {
    display: "flex",
    width: "56%",
    height: "75vh",
    maxHeight: "800px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxHeight: "500px",
    },
  },
  bets: {
    display: "flex",
    width: "43%",
    height: "75vh",
    maxHeight: "800px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  wheel: {
    maxHeight: "470px",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    margin: "auto",
    position: "relative",
    overflow: "hidden",
    background: "repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(0,0,0,.08) 0,rgba(0,0,0,.08) 20px)",
    border: "1px solid #161b21",
    boxShadow: "0 1.5px #191e24",
    marginTop: 0,
    borderRadius: 5,
    transition: "1s ease",
    maskImage: "linear-gradient(180deg,rgba(0,0,0,1) 88%,rgba(0,0,0,0) 98%)",
    [theme.breakpoints.down("xs")]: {
      maxHeight: "270px",
    },
  },
  disabled: {
    opacity: 0.25,
    transition: "0.25s ease",
    pointerEvents: "none",
    cursor: "not-allowed",
  },
  regular: {
    opacity: 1,
    transition: "0.25s ease",
    pointerEvents: "all",
    cursor: "pointer",
  },
  inputIcon: {
    marginTop: "0 !important",
    color: "#fff",
    background: "transparent !important",
  },
  contain: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  multiplier: {
    border: "1.5px solid #272847;",
    backgroundColor: "transparent",
    color: "#9E9FBD",
    marginRight: 7,
    marginTop: "0.5rem",
    boxShadow: "none",
    fontFamily: "Poppins",
    fontSize: "12px",
    transition: "all 300ms ease",
    padding: '3px 5px',
    minWidth: 35,
    maxWidth: 35,
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "#9E9FBD",
      boxShadow: "none",
      transform: "translateY(-2px)",
    },
  },
  amountbuttons: {
    display: "flex",
    paddingTop: "5px",
    marginTop: "-12px",
  },
  barContainer: {
    position: "relative",
  },
  bar: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    borderRadius: "0px",
    boxShadow: "0 1px #ffffff05, 0 1px 1px #0000001a inset",
    height: "0.25rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "-8px",
    },
  },
  sideButton: {
    flexDirection: "column",
    boxSizing: "border-box",
    display: "flex",
    placeContent: "stretch center",
    alignItems: "center",
    borderRadius: "0.5rem",
    background: "#14151D",
    boxShadow: "0 1px #ffffff05, 0 1px 1px #0000001a inset",
    maxWidth: "350px",
    minWidth: "350px",
  },
  sideButton2: {
    flexDirection: "row",
    boxSizing: "border-box",
    display: "flex",
    placeContent: "space-between",
    alignItems: "center",
    flex: "1 1 100%",
    maxHeight: "50%",
    minWidth: "90%",
    width: "90%",
    minHeight: "100px",
    fontWeight: 500,
    height: "100px",
    color: "#898A8E",
    border: "1px solid transparent",
    borderRadius: "0.25rem"
  },
  sideRoll: {
    marginRight: "1rem",
    height: "1.875rem",
    width: "1.875rem",
    minWidth: "30px",
    lineHeight: "inherit",
    borderRadius: "50%!important",
  },
  sideRollButtonRed: {
    minHeight: "50px",
    marginTop: "10px",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    minWidth: "90%",
    width: "90%",
    borderRadius: "0.5rem!important",
    flex: "1 1 100%",
    boxSizing: "border-box",
    maxHeight: "50%",
    color: "#fff!important",
    overflow: "visible",
    padding: "0 16px",
    outline: "none",
    border: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    textDecoration: "none",
    verticalAlign: "baseline",
    textAlign: "center",
    userSelect: "none",
    position: "relative",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    backgroundColor: "#801CFF!important", boxShadow: "0 10px 27px #2B0061,inset 0 2px #2B0061,inset 0 -2px #2B0061!important",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-2px)",
      transition: "all 300ms ease",
    },
    "&:active": {
      transform: "translateY(1px)",
      transition: "all 300ms ease",
      boxShadow: "none!important",
    },
  },
  sideRollButtonRedDisabled: {
    opacity: 0.25,
    transition: "0.25s ease",
    pointerEvents: "none",
    cursor: "not-allowed",
    minHeight: "50px",
    borderRadius: "0.5rem!important",
    flex: "1 1 100%",
    boxSizing: "border-box",
    maxHeight: "50%",
    color: "#fff!important",
    overflow: "visible",
    padding: "0 16px",
    outline: "none",
    border: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    textDecoration: "none",
    verticalAlign: "baseline",
    textAlign: "center",
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
    minWidth: "90%",
    width: "90%",
    userSelect: "none",
    position: "relative",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    backgroundColor: "#801CFF!important", boxShadow: "0 10px 27px #2B0061,inset 0 2px #2B0061,inset 0 -2px #2B0061!important",
    "&:hover": {
      transform: "translateY(-2px)",
      transition: "all 400ms ease",
    },
  },
  sideRollButtonGreen: {
    minHeight: "50px",
    borderRadius: "0.5rem!important",
    flex: "1 1 100%",
    boxSizing: "border-box",
    maxHeight: "50%",
    color: "#fff!important",
    overflow: "visible",
    padding: "0 16px",
    outline: "none",
    border: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    textDecoration: "none",
    verticalAlign: "baseline",
    textAlign: "center",
    margin: 0,
    userSelect: "none",
    position: "relative",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    backgroundColor: "rgb(58, 137, 235)!important", boxShadow: "0 10px 27px #1f83ad,0 -3px #1286b8 inset,0 2px #1eb8fa inset!important",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-2px)",
      transition: "all 300ms ease",
    },
    "&:active": {
      transform: "translateY(1px)",
      transition: "all 300ms ease",
      boxShadow: "none!important",
    },
  },
  sideRollButtonGreenDisabled: {
    opacity: 0.25,
    transition: "0.25s ease",
    pointerEvents: "none",
    cursor: "not-allowed",
    minHeight: "50px",
    borderRadius: "0.5rem!important",
    flex: "1 1 100%",
    boxSizing: "border-box",
    maxHeight: "50%",
    color: "#fff!important",
    overflow: "visible",
    padding: "0 16px",
    outline: "none",
    border: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    textDecoration: "none",
    verticalAlign: "baseline",
    textAlign: "center",
    margin: 0,
    userSelect: "none",
    position: "relative",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    backgroundColor: "rgb(58, 137, 235)!important", boxShadow: "0 10px 27px #1f83ad,0 -3px #1286b8 inset,0 2px #1eb8fa inset!important",
    "&:hover": {
      transform: "translateY(-2px)",
      transition: "all 400ms ease",
    },
  },
  sideRollButtonBlack: {
    minHeight: "50px",
    borderRadius: "0.5rem!important",
    flex: "1 1 100%",
    boxSizing: "border-box",
    maxHeight: "50%",
    color: "#fff!important",
    overflow: "visible",
    padding: "0 16px",
    outline: "none",
    border: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    textDecoration: "none",
    verticalAlign: "baseline",
    textAlign: "center",
    margin: 0,
    userSelect: "none",
    position: "relative",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    backgroundColor: "#1C69FF!important", boxShadow: "0 10px 27px #010a1d1f,inset 0 2px #3b3f47,inset 0 -2px #272b33!important",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-2px)",
      transition: "all 400ms ease",
    },
    "&:active": {
      transform: "translateY(1px)",
      transition: "all 300ms ease",
      boxShadow: "none!important",
    },
  },
  sideRollButtonBlackDisabled: {
    opacity: 0.25,
    transition: "0.25s ease",
    pointerEvents: "none",
    cursor: "not-allowed",
    minHeight: "50px",
    borderRadius: "0.5rem!important",
    flex: "1 1 100%",
    boxSizing: "border-box",
    maxHeight: "50%",
    color: "#fff!important",
    overflow: "visible",
    padding: "0 16px",
    outline: "none",
    border: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    textDecoration: "none",
    verticalAlign: "baseline",
    textAlign: "center",
    margin: 0,
    userSelect: "none",
    position: "relative",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    backgroundColor: "#1C69FF!important", boxShadow: "0 10px 27px #010a1d1f,inset 0 2px #3b3f47,inset 0 -2px #272b33!important",
    "&:hover": {
      transform: "translateY(-2px)",
      transition: "all 400ms ease",
    },
  },
  betsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    minHeight: 300
  },
  betsContainerRedBets: {
    width: "32%",
    height: "100%",
    minHeight: 300,
    transition: "opacity .4s cubic-bezier(.17,.67,.34,1.21)",
    backgroundColor: "#14151D",
    backgroundBlendMode: "overlay",
    backgroundImage: "linear-gradient(180deg, #ff3737 0%, rgba(255, 55, 55, 0.08) 31.01%, rgba(255, 55, 55, 0) 100%)",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
  },
  betsContainerGreenBets: {
    width: "32%",
    height: "100%",
    minHeight: 300,
    transition: "opacity .4s cubic-bezier(.17,.67,.34,1.21)",
    backgroundColor: "#14151D",
    backgroundBlendMode: "overlay",
    backgroundImage: "linear-gradient(180deg, #801cff 0%, rgba(128, 28, 255, 0.08) 31.01%, rgba(128, 28, 255, 0) 100%)",
    borderRadius: 10
  },
  betsContainerBlackBets: {
    width: "32%",
    height: "100%",
    minHeight: 300,
    transition: "opacity .4s cubic-bezier(.17,.67,.34,1.21)",
    backgroundColor: "#14151D",
    backgroundBlendMode: "overlay",
    backgroundImage: "linear-gradient(180deg, #1c69ff 0%, rgba(28, 105, 255, 0.08) 31.01%, rgba(28, 105, 255, 0) 100%)",
    borderRadius: 10
  },
  buttonIcon: {
    fill: "currentColor",
    color: "#9E9FBD",
    flex: "none",
    width: "1.5em",
    height: "1.5em",
    display: "inline-block",
    outline: "none",
    cursor: "pointer"
  },
  summary: {
    width: "20em",
    height: "100%",
    display: "flex",
    paddingTop: "0.75em",
    paddingLeft: "0.75em",
    borderRadius: "0.5em",
    paddingRight: "0.75em",
    flexDirection: "column",
    backgroundColor: "#14151D",
  }
}));

// Renderer callback with condition
const rendererR = ({ total, completed }, waitTime) => {
  if (completed) {
    // Render a completed state
    return "";
  } else {
    // Calculate remaining seconds and milliseconds
    const remainingTime = Math.max(waitTime - Date.now() + 50, 0); // add 50ms buffer
    const remainingSeconds = Math.floor(remainingTime / 1000);
    const displaySeconds = remainingSeconds % 60;
    const displayMilliseconds = (remainingTime % 1000).toString().padStart(3, "0").substring(0, 2);

    // Render a countdown
    return (
      <span style={{ letterSpacing: "0rem", width: "1px", }}>
        <span style={{ fontFamily: "Poppins", fontSize: "1.2em", lineHeight: "1.5em", fontWeight: "500", color: "#801BFF" }}>
          {displaySeconds}.{displayMilliseconds}
        </span>
      </span>
    );
  }
};

// Same game states as in backend
const GAME_STATES = {
  NotStarted: "Loading...",
  InProgress: "Rolling",
};

const Roulette = ({ user }) => {
  // Declare State
  const classes = useStyles();
  const { addToast } = useToasts();

  const [gameState, setGameState] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  const [history, setHistory] = useState([]);
  const [players, setPlayers] = useState([]);

  const [waitTime, setWaitTime] = useState(5000);
  const [betAmount, setBetAmount] = useState("0.00");

  const [gameId, setGameId] = useState(null);
  const [privateHash, setPrivateHash] = useState(null);

  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [redAmount, setRedAmount] = useState(0);
  const [blackAmount, setBlackAmount] = useState(0);
  const [greenAmount, setGreenAmount] = useState(0);

  const [selectedColor, setSelectedColor] = useState('red');

  const [transitionTimingFunction, setTransitionTimingFunction] = useState("");  // Wheel Transition
  const [transitionDuration, setTransitionDuration] = useState("");  // Wheel Transition Duration
  const [wheelTransform, setWheelTransform] = useState("");  // Wheel Transform

  const [wheelTransformNumber1, setWheelTransformNumber1] = useState("scale(1)");
  const [wheelTransformNumber14, setWheelTransformNumber14] = useState("scale(1)");
  const [wheelTransformNumber2, setWheelTransformNumber2] = useState("scale(1)");
  const [wheelTransformNumber13, setWheelTransformNumber13] = useState("scale(1)");
  const [wheelTransformNumber3, setWheelTransformNumber3] = useState("scale(1)");
  const [wheelTransformNumber12, setWheelTransformNumber12] = useState("scale(1)");
  const [wheelTransformNumber4, setWheelTransformNumber4] = useState("scale(1)");
  const [wheelTransformNumber0, setWheelTransformNumber0] = useState("scale(1)");
  const [wheelTransformNumber11, setWheelTransformNumber11] = useState("scale(1)");
  const [wheelTransformNumber5, setWheelTransformNumber5] = useState("scale(1)");
  const [wheelTransformNumber10, setWheelTransformNumber10] = useState("scale(1)");
  const [wheelTransformNumber6, setWheelTransformNumber6] = useState("scale(1)");
  const [wheelTransformNumber9, setWheelTransformNumber9] = useState("scale(1)");
  const [wheelTransformNumber7, setWheelTransformNumber7] = useState("scale(1)");
  const [wheelTransformNumber8, setWheelTransformNumber8] = useState("scale(1)");

  const [wheelTransformNumber1zIndex, setWheelTransformNumber1zIndex] = useState(1);
  const [wheelTransformNumber14zIndex, setWheelTransformNumber14zIndex] = useState(1);
  const [wheelTransformNumber2zIndex, setWheelTransformNumber2zIndex] = useState(1);
  const [wheelTransformNumber13zIndex, setWheelTransformNumber13zIndex] = useState(1);
  const [wheelTransformNumber3zIndex, setWheelTransformNumber3zIndex] = useState(1);
  const [wheelTransformNumber12zIndex, setWheelTransformNumber12zIndex] = useState(1);
  const [wheelTransformNumber4zIndex, setWheelTransformNumber4zIndex] = useState(1);
  const [wheelTransformNumber0zIndex, setWheelTransformNumber0zIndex] = useState(1);
  const [wheelTransformNumber11zIndex, setWheelTransformNumber11zIndex] = useState(1);
  const [wheelTransformNumber5zIndex, setWheelTransformNumber5zIndex] = useState(1);
  const [wheelTransformNumber10zIndex, setWheelTransformNumber10zIndex] = useState(1);
  const [wheelTransformNumber6zIndex, setWheelTransformNumber6zIndex] = useState(1);
  const [wheelTransformNumber9zIndex, setWheelTransformNumber9zIndex] = useState(1);
  const [wheelTransformNumber7zIndex, setWheelTransformNumber7zIndex] = useState(1);
  const [wheelTransformNumber8zIndex, setWheelTransformNumber8zIndex] = useState(1);

  const [selectorOpacity, setselectorOpacity] = useState("0.8");

  const [redResult, setredResult] = useState(false);
  const [blackResult, setblackResult] = useState(false);
  const [greenResult, setgreenResult] = useState(false);

  const getDisplayColor = (color) => {
    if (color === 'green') return 'PURPLE';
    if (color === 'red') return 'RED';
    if (color === 'black') return 'BLUE';
    return color.toUpperCase();
  };
  
  const getButtonColor = (color) => {
    if (color === 'green') return '#831DFF'; 
    if (color === 'red') return '#801CFF';
    if (color === 'black') return '#1C69FF'; 
    return '#801CFF';
  };
  
  const getButtonShadow = (color) => {
    if (color === 'green') return '0 10px 27px #2B0061,inset 0 2px #2B0061,inset 0 -2px #2B0061';
    if (color === 'red') return '0 10px 27px #010a1d1f,inset 0 2px #3b3f47,inset 0 -2px #272b33';
    if (color === 'black') return '0 10px 27px #010a1d1f,inset 0 2px #3b3f47,inset 0 -2px #272b33';
    return '0 10px 27px #2B0061,inset 0 2px #2B0061,inset 0 -2px #2B0061';
  };

  function spinWheel(roll, AnimationDuration, AnimationDurationTotal) {
    const order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4];
    const position = order.indexOf(roll);

    // determine position where to land
    const rows = 6;
    const card = 68 + 2.5 * 2;
    let landingPosition = (rows * 15 * card) + (position * card);

    const randomize = Math.floor(Math.random() * 68) - (68 / 2);
    landingPosition = landingPosition + randomize;

    const object = {
      x: Math.floor(Math.random() * 50) / 100,
      y: Math.floor(Math.random() * 20) / 100,
    };

    setTransitionTimingFunction(`cubic-bezier(0, ${object.x}, ${object.y}, 1)`);
    setTransitionDuration(`${AnimationDuration / 1000}s`);
    setWheelTransform(`translate3d(-${landingPosition}px, 0px, 0px)`);

    setTimeout(() => {
      setTransitionTimingFunction(`ease-in-out`);
      setTransitionDuration("1s");
      if (randomize >= 0 && randomize <= 34) {
        setWheelTransform(`translate3d(-${landingPosition - randomize}px, 0px, 0px)`);
      }
      if (randomize <= 0 && randomize >= -34) {
        setWheelTransform(`translate3d(-${landingPosition - randomize}px, 0px, 0px)`);
      }
    }, AnimationDuration + 1000);

    setTimeout(() => {
      setselectorOpacity("0");
      if (position === 0) {
        setWheelTransformNumber0("scale(1.28)");
        setWheelTransformNumber0zIndex(2);
        setgreenResult(true);
      }
      if (position === 1) {
        setWheelTransformNumber11("scale(1.28)");
        setWheelTransformNumber11zIndex(2);
        setblackResult(true);
      }
      if (position === 2) {
        setWheelTransformNumber5("scale(1.28)");
        setWheelTransformNumber5zIndex(2);
        setredResult(true);
      }
      if (position === 3) {
        setWheelTransformNumber10("scale(1.28)");
        setWheelTransformNumber10zIndex(2);
        setblackResult(true);
      }
      if (position === 4) {
        setWheelTransformNumber6("scale(1.28)");
        setWheelTransformNumber6zIndex(2);
        setredResult(true);
      }
      if (position === 5) {
        setWheelTransformNumber9("scale(1.28)");
        setWheelTransformNumber9zIndex(2);
        setblackResult(true);
      }
      if (position === 6) {
        setWheelTransformNumber7("scale(1.28)");
        setWheelTransformNumber7zIndex(2);
        setredResult(true);
      }
      if (position === 7) {
        setWheelTransformNumber8("scale(1.28)");
        setWheelTransformNumber8zIndex(2);
        setblackResult(true);
      }
      if (position === 8) {
        setWheelTransformNumber1("scale(1.28)");
        setWheelTransformNumber1zIndex(2);
        setredResult(true);
      }
      if (position === 9) {
        setWheelTransformNumber14("scale(1.28)");
        setWheelTransformNumber14zIndex(2);
        setblackResult(true);
      }
      if (position === 10) {
        setWheelTransformNumber2("scale(1.28)");
        setWheelTransformNumber2zIndex(2);
        setredResult(true);
      }
      if (position === 11) {
        setWheelTransformNumber13("scale(1.28)");
        setWheelTransformNumber13zIndex(2);
        setblackResult(true);
      }
      if (position === 12) {
        setWheelTransformNumber3("scale(1.28)");
        setWheelTransformNumber3zIndex(2);
        setredResult(true);
      }
      if (position === 13) {
        setWheelTransformNumber12("scale(1.28)");
        setWheelTransformNumber12zIndex(2);
        setblackResult(true);
      }
      if (position === 14) {
        setWheelTransformNumber4("scale(1.28)");
        setWheelTransformNumber4zIndex(2);
        setredResult(true);
      }

    }, AnimationDuration + 1800);

    setTimeout(() => {
      setWheelTransformNumber0("scale(1)");
      setWheelTransformNumber1("scale(1)");
      setWheelTransformNumber2("scale(1)");
      setWheelTransformNumber3("scale(1)");
      setWheelTransformNumber4("scale(1)");
      setWheelTransformNumber5("scale(1)");
      setWheelTransformNumber6("scale(1)");
      setWheelTransformNumber7("scale(1)");
      setWheelTransformNumber8("scale(1)");
      setWheelTransformNumber9("scale(1)");
      setWheelTransformNumber10("scale(1)");
      setWheelTransformNumber11("scale(1)");
      setWheelTransformNumber12("scale(1)");
      setWheelTransformNumber13("scale(1)");
      setWheelTransformNumber14("scale(1)");
      setWheelTransformNumber0zIndex(1);
      setWheelTransformNumber1zIndex(1);
      setWheelTransformNumber2zIndex(1);
      setWheelTransformNumber3zIndex(1);
      setWheelTransformNumber4zIndex(1);
      setWheelTransformNumber5zIndex(1);
      setWheelTransformNumber6zIndex(1);
      setWheelTransformNumber7zIndex(1);
      setWheelTransformNumber8zIndex(1);
      setWheelTransformNumber9zIndex(1);
      setWheelTransformNumber10zIndex(1);
      setWheelTransformNumber11zIndex(1);
      setWheelTransformNumber12zIndex(1);
      setWheelTransformNumber13zIndex(1);
      setWheelTransformNumber14zIndex(1);
      setselectorOpacity("0.8");
      setTransitionTimingFunction("");
      setTransitionDuration("");
      setTimeout(() => {
        setredResult(false);
        setblackResult(false);
        setgreenResult(false);
      }, 500);
      let resetTo = -(position * card);
      setWheelTransform(`translate3d(${resetTo}px, 0px, 0px)`);
    }, AnimationDurationTotal);
  }

  // Add new player to the current game
  const addNewPlayer = player => {
    setPlayers(state => [...state, player]);
  };

  // Button onClickRed event handler
  const onClickRed = () => {
    // Emit new bet event
    rouletteSocket.emit("join-game", "red", parseFloat(betAmount));
  };

  // Button onClickGreen event handler
  const onClickGreen = () => {
    // Emit new bet event
    rouletteSocket.emit("join-game", "green", parseFloat(betAmount));
  };

  // Button onClickBlack event handler
  const onClickBlack = () => {
    // Emit new bet event
    rouletteSocket.emit("join-game", "black", parseFloat(betAmount));
  };

  // TextField onChange event handler
  const onChange = e => {
    setBetAmount(e.target.value);
  };

  // New round started event handler
  const newRoundStarted = (countdownTime, gameId, privateHash) => {
    // Update state
    setPlayers([]);
    setGameId(gameId);
    setPrivateHash(privateHash);
    setWaitTime(Date.now() + countdownTime);
    setGameState("PLACE YOUR BETS");
    setTimeout(() => {
      setButtonsDisabled(false);
    }, 1000);
  };

  // Add game to history
  const addGameToHistory = game => {
    setHistory(state =>
      state.length >= 50
        ? [...state.slice(1, state.length), game]
        : [...state, game]
    );
  };

  // componentDidMount
  useEffect(() => {
    let unmounted = false;

    // Fetch roulette schema from API
    const fetchData = async () => {
      setLoading(true);
      try {
        const schema = await getRouletteSchema();

        // Update state
        setGameId(schema.current._id);
        setPrivateHash(schema.current.privateHash);
        setPlayers(schema.current.players);
        setWaitTime(Date.now() + schema.current.timeLeft);
        const previousWinningColors = schema.history.slice(0, 100).map((game) => game.winner);
        setRedAmount(previousWinningColors.filter((color) => color === "red").length);
        setBlackAmount(previousWinningColors.filter((color) => color === "black").length);
        setGreenAmount(previousWinningColors.filter((color) => color === "green").length);
        setHistory(schema.history.reverse());
        if (schema.current.timeLeft > 0) {
          setGameState("PLACE YOUR BETS");
          setWheelTransformNumber0("scale(1)");
          setWheelTransformNumber1("scale(1)");
          setWheelTransformNumber2("scale(1)");
          setWheelTransformNumber3("scale(1)");
          setWheelTransformNumber4("scale(1)");
          setWheelTransformNumber5("scale(1)");
          setWheelTransformNumber6("scale(1)");
          setWheelTransformNumber7("scale(1)");
          setWheelTransformNumber8("scale(1)");
          setWheelTransformNumber9("scale(1)");
          setWheelTransformNumber10("scale(1)");
          setWheelTransformNumber11("scale(1)");
          setWheelTransformNumber12("scale(1)");
          setWheelTransformNumber13("scale(1)");
          setWheelTransformNumber14("scale(1)");
          setWheelTransformNumber0zIndex(1);
          setWheelTransformNumber1zIndex(1);
          setWheelTransformNumber2zIndex(1);
          setWheelTransformNumber3zIndex(1);
          setWheelTransformNumber4zIndex(1);
          setWheelTransformNumber5zIndex(1);
          setWheelTransformNumber6zIndex(1);
          setWheelTransformNumber7zIndex(1);
          setWheelTransformNumber8zIndex(1);
          setWheelTransformNumber9zIndex(1);
          setWheelTransformNumber10zIndex(1);
          setWheelTransformNumber11zIndex(1);
          setWheelTransformNumber12zIndex(1);
          setWheelTransformNumber13zIndex(1);
          setWheelTransformNumber14zIndex(1);
          setselectorOpacity("0.8");
          setButtonsDisabled(false);
        }
        if (schema.current.rollStatus) {
          setButtonsDisabled(true);
          gameRolled(schema.current.rollStatus.winningIndex, schema.current.rollStatus.winningMultiplier, schema.current.AnimationDuration, schema.current.AnimationDurationTotal);
        }
        setLoading(false);
      } catch (error) {
        console.log("There was an error while loading roulette schema:", error);
      }
    };

    // Game has rolled, show animation
    const gameRolled = (index, multiplier, AnimationDuration, AnimationDurationTotal) => {
      // Update state
      spinWheel(multiplier, AnimationDuration, AnimationDurationTotal);

      setGameState(GAME_STATES.InProgress);
      setButtonsDisabled(true);
    };

    //const onFocus = async () => {
    //  try {
    //
    //  } catch (error) {
    //    console.log("There was an error while loading roulette schema:", error);
    //  }
    //};

    // Error event handler
    const joinError = msg => {
      addToast(msg, { appearance: "error" });
      playSound(errorAudio);
    };

    // Success event handler
    const joinSuccess = () => {
      playSound(placebetAudio);
    };

    if (!unmounted) {
      // Initially, fetch data
      fetchData();

      // Listeners
      rouletteSocket.on("new-player", addNewPlayer);
      rouletteSocket.on("game-join-error", joinError);
      rouletteSocket.on("game-join-success", joinSuccess);
      rouletteSocket.on("new-round", newRoundStarted);
      rouletteSocket.on("game-rolled", gameRolled);
      rouletteSocket.on("add-game-to-history", addGameToHistory);
      //window.addEventListener("focus", onFocus);
    }
    return () => {
      unmounted = true;
      // Remove Listeners
      rouletteSocket.off("new-player", addNewPlayer);
      rouletteSocket.off("game-join-error", joinError);
      rouletteSocket.off("game-join-success", joinSuccess);
      rouletteSocket.off("new-round", newRoundStarted);
      rouletteSocket.off("game-rolled", gameRolled);
      rouletteSocket.off("add-game-to-history", addGameToHistory);
      //window.removeEventListener("focus", onFocus);
    };
  }, [addToast, gameState]);

  const onClickColor = (color) => {
    if (color === 'red') {
      onClickRed();
    } else if (color === 'black') {
      onClickBlack();
    } else if (color === 'green') {
      onClickGreen();
    }
  };

  return (
      <Box className={classes.root}>
        <Grow in timeout={620}>
          <div >
            <h3>Roulette</h3>
            <div className={classes.rouletteWrapper}>
              <Box className={classes.countdown} alignItems="center" display="flex">
                {gameState != GAME_STATES.InProgress ? (
                    <Box style={{ display: "flex", textAlign: "center", margin: "40px auto"}}>
                      <div style={{ fontFamily: "Poppins", fontSize: "1.2em", lineHeight: "1.5em", fontWeight: "500", color: "#fff", marginRight: "8px", }}>
                        Starting in
                      </div>
                      <Countdown style={{ color: "#801BFF" }} key={waitTime} date={waitTime} renderer={(props) => rendererR(props, waitTime)} intervalDelay={0} precision={3} />
                    </Box>
                  ) : ""}
              </Box>
              <div 
                className={`${classes.selector} ${classes.selectorTop}`} 
                style={{ 
                  opacity: gameState != GAME_STATES.InProgress ? 0 : selectorOpacity,
                }}
              ></div>
              <div className={classes.wheelR} 
                style={{ 
                  transitionTimingFunction: transitionTimingFunction, 
                  transitionDuration: transitionDuration, 
                  transform: wheelTransform,
                  opacity: gameState != GAME_STATES.InProgress ? 0.2 : 1
                }}>
                {[...Array(15)].map((row, i) => (
                  <div key={i} className={classes.rowR}>
                    <div className={classes.cardRed} style={{ zIndex: wheelTransformNumber1zIndex, transition: "all 400ms", transform: `${wheelTransformNumber1}`, WebkitTransform: `${wheelTransformNumber1}`, }}><img src={red}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                    <div className={classes.cardBlack} style={{ zIndex: wheelTransformNumber14zIndex, transition: "all 400ms", transform: `${wheelTransformNumber14}`, WebkitTransform: `${wheelTransformNumber14}`, }}><img src={black}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                    <div className={classes.cardRed} style={{ zIndex: wheelTransformNumber2zIndex, transition: "all 400ms", transform: `${wheelTransformNumber2}`, WebkitTransform: `${wheelTransformNumber2}`, }}><img src={red}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                    <div className={classes.cardBlack} style={{ zIndex: wheelTransformNumber13zIndex, transition: "all 400ms", transform: `${wheelTransformNumber13}`, WebkitTransform: `${wheelTransformNumber13}`, }}><img src={black}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                    <div className={classes.cardRed} style={{ zIndex: wheelTransformNumber3zIndex, transition: "all 400ms", transform: `${wheelTransformNumber3}`, WebkitTransform: `${wheelTransformNumber3}`, }}><img src={red}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                    <div className={classes.cardBlack} style={{ zIndex: wheelTransformNumber12zIndex, transition: "all 400ms", transform: `${wheelTransformNumber12}`, WebkitTransform: `${wheelTransformNumber12}`, }}><img src={black}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                    <div className={classes.cardRed} style={{ zIndex: wheelTransformNumber4zIndex, transition: "all 400ms", transform: `${wheelTransformNumber4}`, WebkitTransform: `${wheelTransformNumber4}`, }}>
                      <img src={red}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} />
                    </div>
                    <div className={classes.cardGreen} style={{ zIndex: wheelTransformNumber0zIndex, transition: "all 400ms", transform: `${wheelTransformNumber0}`, WebkitTransform: `${wheelTransformNumber0}`, }}>
                      <img src={purple}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} />
                    </div>
                    <div className={classes.cardBlack} style={{ zIndex: wheelTransformNumber11zIndex, transition: "all 400ms", transform: `${wheelTransformNumber11}`, WebkitTransform: `${wheelTransformNumber11}`, }}><img src={black}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                    <div className={classes.cardRed} style={{ zIndex: wheelTransformNumber5zIndex, transition: "all 400ms", transform: `${wheelTransformNumber5}`, WebkitTransform: `${wheelTransformNumber5}`, }}><img src={red}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                    <div className={classes.cardBlack} style={{ zIndex: wheelTransformNumber10zIndex, transition: "all 400ms", transform: `${wheelTransformNumber10}`, WebkitTransform: `${wheelTransformNumber10}`, }}><img src={black}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                    <div className={classes.cardRed} style={{ zIndex: wheelTransformNumber6zIndex, transition: "all 400ms", transform: `${wheelTransformNumber6}`, WebkitTransform: `${wheelTransformNumber6}`, }}><img src={red}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                    <div className={classes.cardBlack} style={{ zIndex: wheelTransformNumber9zIndex, transition: "all 400ms", transform: `${wheelTransformNumber9}`, WebkitTransform: `${wheelTransformNumber9}`, }}><img src={black}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                    <div className={classes.cardRed} style={{ zIndex: wheelTransformNumber7zIndex, transition: "all 400ms", transform: `${wheelTransformNumber7}`, WebkitTransform: `${wheelTransformNumber7}`, }}><img src={red}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                    <div className={classes.cardBlack} style={{ zIndex: wheelTransformNumber8zIndex, transition: "all 400ms", transform: `${wheelTransformNumber8}`, WebkitTransform: `${wheelTransformNumber8}`, }}><img src={black}  style={{ height: "100%", width: "100%", padding: "0.5rem", marginTop: "-3px", verticalAlign: "middle", borderStyle: "none", }} /></div>
                  </div>
                ))}
              </div>
              <div 
                className={`${classes.selector} ${classes.selectorBottom}`} 
                style={{ 
                  opacity: gameState != GAME_STATES.InProgress ? 0 : selectorOpacity,
                }}
              ></div>
            </div>
            <Box>
              <Box style={{ display: "flex", flexDirection: "row", alignItems: "flex-start",
                justifyContent: "space-between", gap: "0.5rem", marginTop: "0.5rem", width: "100%"}}>
                <Box style={{ maxWidth: "350px", margin: "0 auto" }}>
                  <div className={classes.sideButton} style={{ padding: "20px" }}>
                    <div className={classes.sideButton2} style={{ marginBottom: "15px" }}>
                      <span style={{ marginRight: "10px" }}>Bet on Color:</span>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div 
                          className={classes.sideRoll} 
                          style={{ 
                            background: "#FF3838",
                            border: selectedColor === 'red' ? '5px solid rgba(255, 56, 56, 0.5)' : 'none',
                            cursor: 'pointer'
                          }}
                          onClick={() => setSelectedColor('red')}
                        />
                        <div 
                          className={classes.sideRoll} 
                          style={{ 
                            background: "#1C69FF",
                            border: selectedColor === 'black' ? '5px solid rgba(96, 60, 239, 0.5)' : 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setSelectedColor('black')}
                        />
                        <div 
                          className={classes.sideRoll} 
                          style={{ 
                            background: "#831DFF",
                            border: selectedColor === 'green' ? '5px solid rgba(131, 29, 255, 0.5)' : 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setSelectedColor('green')}
                        />
                      </div>
                    </div>
                    <BetInput
                      label=""
                      variant="filled"
                      value={betAmount}
                      onChange={onChange}
                      style={{ marginBottom: "15px" }}
                      InputProps={{
                        endAdornment: (
                          <Box className={classes.amountbuttons}>
                            <Button
                              className={classes.multiplier}
                              color="primary"
                              variant="contained"
                              style={{ maxWidth: 20}}
                              onClick={() => setBetAmount(state => (parseFloat(state) / 2).toFixed(2) || 0)}
                            >
                              <span className={classes.reverse}>1/2</span>
                            </Button>
                            <Button
                              className={classes.multiplier}
                              size="small"
                              color="primary"
                              variant="contained"
                              onClick={() => setBetAmount(state => (parseFloat(state) * 2).toFixed(2) || 0)}
                            >
                              <span className={classes.reverse}>X2</span>
                            </Button>
                            <Button
                              className={classes.multiplier}
                              size="small"
                              color="primary"
                              variant="contained"
                              onClick={() => setBetAmount(user ? user.wallet.toFixed(2) : 0)}
                            >
                              <span className={classes.reverse}>Max</span>
                            </Button>
                          </Box>
                        ),
                        startAdornment: (
                          <InputAdornment className={classes.inputIcon} position="start">
                            <img style={{height: 17, width: 17}} src={coin} />                  
                          </InputAdornment>
                        ),
                      }}
                    />
                    <button 
                      className={buttonsDisabled ? classes.sideRollButtonRedDisabled : classes.sideRollButtonRed} 
                      onClick={() => onClickColor(selectedColor)}
                      disabled={!selectedColor || buttonsDisabled}
                      style={{
                        backgroundColor: getButtonColor(selectedColor),
                        boxShadow: getButtonShadow(selectedColor)
                      }}
                    >
                      <span style={{ fontFamily: "Poppins", fontWeight: "500" }}>
                        JOIN GAME ({getDisplayColor(selectedColor)})
                      </span>
                    </button>
                  </div>
                </Box>
                <Box className={classes.betsContainer}>
                  <Box className={classes.betsContainerGreenBets} style={{ opacity: buttonsDisabled && !greenResult ? "0.3" : buttonsDisabled && greenResult ? "1" : "1" }}><BetsGreen players={players} greenResult={greenResult} redResult={redResult} blackResult={blackResult} /></Box>
                  <Box className={classes.betsContainerRedBets} style={{ opacity: buttonsDisabled && !redResult ? "0.3" : buttonsDisabled && redResult ? "1" : "1" }}><BetsRed players={players} redResult={redResult} blackResult={blackResult} greenResult={greenResult} /></Box>
                  <Box className={classes.betsContainerBlackBets} style={{ opacity: buttonsDisabled && !blackResult ? "0.3" : buttonsDisabled && blackResult ? "1" : "1" }}><BetsBlack players={players} blackResult={blackResult} greenResult={greenResult} redResult={redResult} /></Box>
                </Box>
                  </Box>
                </Box>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </Grow>
      </Box>
  );
};

Roulette.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Roulette);