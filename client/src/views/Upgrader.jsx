import React, { useState, useEffect, Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect, useSelector, useStore } from "react-redux";
import { useToasts } from "react-toast-notifications";
import PropTypes from "prop-types";
import parseCommasToThousands from "../utils/parseCommasToThousands";
import cutDecimalPoints from "../utils/cutDecimalPoints";
import { useHistory } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import { motion, AnimatePresence, animationControls } from "framer-motion";
import { Divider, Grow, Slide, useScrollTrigger } from "@material-ui/core";
import Slider from '@mui/material/Slider';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getCurrentSeedPair } from "../services/api.service";
import Provably from "../components/modals/upgrader/ProvablyModal";
import { upgraderSocket } from "../services/websocket.service";
import CountUp from 'react-countup';
import confetti from 'canvas-confetti';
import confettiSound1 from "../assets/small_celebration.wav";
import upgraderSound from "../assets/sounds/upgrader.mp3";

import Coin from "../assets/icons/coin.svg";
import Gold from "../assets/colors/gold.png";
import Red from "../assets/colors/red.png";
import Purple from "../assets/colors/purple.png";
import Blue from "../assets/colors/blue.png";
import Grey from "../assets/colors/grey.png";
import GoldBG from "../assets/colors/goldbg.png";
import RedBG from "../assets/colors/redbg.png";
import PurpleBG from "../assets/colors/purplebg.png";
import BlueBG from "../assets/colors/bluebg.png";
import GreyBG from "../assets/colors/greybg.png";
import GoldBlob from "../assets/colors/goldblob.png";
import RedBlob from "../assets/colors/redblobber.png";
import PurpleBlob from "../assets/colors/purpleblob2.png";
import BlueBlob from "../assets/colors/blueblob1.png";
import GreyBlob from "../assets/colors/greyblob1.png";

const confettiAudio1 = new Audio(confettiSound1);
confettiAudio1.volume = 0.075;
const selectAudio = new Audio(upgraderSound);

const playSound = audioFile => {
  audioFile.play();
};

function calculateAngle(ticketNumber) {
  const maxTicketNumber = 1000000001;
  return (ticketNumber / maxTicketNumber) * 360;
};

function hexToRGBA(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const items = [
  {
    "name": "Nik's Scythe",
    "price": 200000,
    "color": "red",
    "image": "https://i.ibb.co/ysPx1Wf/niks.webp",
  },
  {
    "name": "Classy Fedora",
    "price": 150000,
    "color": "red",
    "image": "https://i.ibb.co/JdfKR55/image-24-1.png",
  },
  {
    "name": "Chroma Traveler Gun",
    "price": 100000,
    "color": "red",
    "image": "https://i.ibb.co/JQjzpZS/Chroma-Travelers-Gun-Replicate-AI.webp",
  },
  {
    "name": "Chroma Evergun",
    "price": 55000,
    "image": "https://i.ibb.co/t4LpTMP/Chroma-Evergun.webp",
    "color": "red",
  },
  {
    "name": "Chroma Evergreen",
    "price": 35000,
    "color": "red",
    "image": "https://cdn.nookazon.com/mm2/items/15694192241.png",
  },
  {
    "name": "Gingerscope",
    "price": 20000,
    "color": "red",
    "image": "https://i.ibb.co/vk2RdTt/gingerscope.webp",
  },
  {
    "name": "Traveler’s Axe",
    "price": 17500,
    "color": "purple",
    "image": "https://i.ibb.co/WDdTHsw/Travellers-Axe.webp",
  },

  {
    "name": "Corrupt",
    "price": 12500,
    "color": "purple",
    "image": "https://i.ibb.co/xjDpr8d/corrupt.webp",
  },
  {
    "name": "Traveler’s Gun",
    "price": 10500,
    "color": "purple",
    "image": "https://i.ibb.co/C8qXZ1y/Traveler-s-Gun-2023.webp",
  },
  {
    "name": "Turkey",
    "price": 7730,
    "color": "purple",
    "image": "https://i.ibb.co/Yd4pT7X/turkey.webp",
  },
  {
    "name": "Evergun",
    "price": 6350,
    "color": "purple",
    "image": "https://i.ibb.co/bBnmM46/evergun.webp",
  },
  {
    "name": "Harvester",
    "price": 5750,
    "color": "purple",
    "image": "https://i.ibb.co/DfHcrjR/Harvester-Improved.webp",
  },
  {
    "name": "Icepiercer",
    "price": 5750,
    "color": "purple",
    "image": "https://i.ibb.co/MZZcFY3/icepiercer.webp",
  },
  {
    "name": "Blossom",
    "price": 4750,
    "color": "purple",
    "image": "https://i.ibb.co/5n40wFW/blossom.webp",
  },
  {
    "name": "Sakura",
    "price": 4700,
    "color": "purple",
    "image": "https://i.ibb.co/TcfVfmM/sakura.webp",
  },
  {
    "name": "Evergreen",
    "price": 4700,
    "color": "purple",
    "image": "https://i.ibb.co/q9gGybS/evergreen.webp",
  },
  {
    "name": "Darkshot",
    "price": 4550,
    "color": "purple",
    "image": "https://i.ibb.co/tbHJ43q/Darkshot.webp",
  },
  {
    "name": "Darksword",
    "price": 4450,
    "color": "purple",
    "image": "https://i.ibb.co/DrRTHkz/darksword.webp",
  },
  {
    "name": "Swirly Axe",
    "price": 4000,
    "color": "blue",
    "image": "https://i.ibb.co/gw3jykq/SwirlAxe.webp",
  },
  {
    "name": "Bat",
    "price": 4000,
    "color": "blue",
    "image": "https://i.ibb.co/mtgfgmY/Zombie-Bat.webp",
  },
  {
    "name": "Swirly Gun",
    "price": 3525,
    "color": "blue",
    "image": "https://i.ibb.co/72X8Gck/SwirlGun.webp",
  },
  {
    "name": "Rainbow Gun",
    "price": 2850,
    "color": "blue",
    "image": "https://i.ibb.co/4g6ZZBP/rainbowgun.webp",
  },
  {
    "name": "Rainbow Knife",
    "price": 2750,
    "color": "blue",
    "image": "https://i.ibb.co/4mfyszd/rainbowknife.webp",
  },
  {
    "name": "Chroma Elderwood Blade",
    "price": 2500,
    "color": "blue",
    "image": "https://i.ibb.co/8c3MTZ1/Chroma-Elderwood-Blade.webp",
  },
  {
    "name": "Chroma Candleflame",
    "price": 2450,
    "color": "blue",
    "image": "https://i.ibb.co/1X2dxLn/Candleflame-Chroma.webp",
  },
  {
    "name": "Chroma Swirly Gun",
    "price": 2425,
    "color": "blue",
    "image": "https://i.ibb.co/mhFfL8y/CSwirl-improved.webp",
  },
  {
    "name": "Flowerwood Knife",
    "price": 2415,
    "color": "blue",
    "image": "https://i.ibb.co/6nkNQPZ/Flowerwood.webp",
  },
  {
    "name": "Flowerwood Gun",
    "price": 2400,
    "color": "blue",
    "image": "https://i.ibb.co/MMHTw6L/flowerwoodgun.webp",
  },
  {
    "name": "Chroma Cookiecane",
    "price": 2350,
    "color": "blue",
    "image": "https://i.ibb.co/qkwC8fc/chromacookiecane.webp",
  },
  {
    "name": "Ocean",
    "price": 2150,
    "color": "blue",
    "image": "https://i.ibb.co/F5QTrZx/Ocean-gun.webp",
  },
  {
    "name": "Waves",
    "price": 2050,
    "color": "blue",
    "image": "https://i.ibb.co/PGtFyjp/Waves-knife.webp",
  },
  {
    "name": "Makeshift",
    "price": 1750,
    "color": "blue",
    "image": "https://i.ibb.co/zSg6pXJ/makeshift.webp",
  },
  {
    "name": "Candleflame",
    "price": 1650,
    "color": "blue",
    "image": "https://i.ibb.co/dggBq7v/candleflame.webp",
  },
  {
    "name": "Elderwood Blade",
    "price": 1550,
    "color": "blue",
    "image": "https://i.ibb.co/vmf4kSH/elderwoodblade.webp",
  },
  {
    "name": "Chroma Darkbringer",
    "price": 1450,
    "color": "blue",
    "image": "https://i.ibb.co/5RMvSg7/Chroma-Darkbringer-29.webp",
  },
  {
    "name": "Chroma Lightbringer",
    "price": 1400,
    "color": "blue",
    "image": "https://i.ibb.co/YcJN2Nh/Chroma-Lightbringer-29.webp",
  },
  {
    "name": "Cookiecane",
    "price": 1250,
    "color": "blue",
    "image": "https://i.ibb.co/KVH0NdS/cookiecane.webp",
  },
  {
    "name": "Gingermint",
    "price": 1150,
    "color": "blue",
    "image": "https://i.ibb.co/6yFfb49/gingermint.webp",
  },
  {
    "name": "Phantom",
    "price": 1100,
    "color": "blue",
    "image": "https://i.ibb.co/RyXFKbh/Phantom2022.webp",
  },
  {
    "name": "Spectre",
    "price": 1050,
    "color": "blue",
    "image": "https://i.ibb.co/p1Hjgrt/Spectre.webp",
  },
  {
    "name": "Swirly Blade",
    "price": 1000,
    "color": "blue",
    "image": "https://i.ibb.co/jJMx40T/swirlyblade.webp",
  },
  {
    "name": "Candy",
    "price": 975,
    "color": "blue",
    "image": "https://i.ibb.co/YQnjc60/Updated-Candy.webp",
  },
  {
    "name": "Sugar",
    "price": 950,
    "color": "blue",
    "image": "https://i.ibb.co/fx3qP7V/Sugar-v2.webp",
  },
  {
    "name": "Chroma Laser",
    "price": 900,
    "color": "blue",
    "image": "https://i.ibb.co/3r90sg9/Chromalaser-0.webp",
  },
  {
    "name": "Elderwood Scythe",
    "price": 870,
    "color": "blue",
    "image": "https://i.ibb.co/wSwVQj3/Elderwood-Scythev2.webp",
  },
  {
    "name": "Icebreaker",
    "price": 855,
    "color": "blue",
    "image": "https://i.ibb.co/M5Byz0L/icebreaker.webp",
  },
  {
    "name": "Chroma Luger",
    "price": 850,
    "color": "blue",
    "image": "https://i.ibb.co/jT7525C/Chroma-Luger.webp",
  },
  {
    "name": "Chroma Heat",
    "price": 800,
    "color": "blue",
    "image": "https://i.ibb.co/TKYkqh0/Chroma-Heat.webp",
  },
  {
    "name": "Chroma Gemstone",
    "price": 775,
    "color": "blue",
    "image": "https://i.ibb.co/0ynNt3X/Chromagemstone.webp",
  },
  {
    "name": "Chroma Shark",
    "price": 750,
    "color": "blue",
    "image": "https://i.ibb.co/7t0NDbJ/chromashark.webp",
  },
  {
    "name": "Chroma Slasher",
    "price": 735,
    "color": "blue",
    "image": "https://i.ibb.co/kJZbsfK/Chromaslasher-0.webp",
  },
  {
    "name": "Chroma Tides",
    "price": 725,
    "color": "blue",
    "image": "https://i.ibb.co/wYFtFWL/Chromatides-0.webp",
  },
  {
    "name": "Chroma Fang",
    "price": 675,
    "color": "blue",
    "image": "https://i.ibb.co/n6hTwD6/Chromafang-improved.webp",
  },
  {
    "name": "Heartblade",
    "price": 650,
    "color": "blue",
    "image": "https://i.ibb.co/Z66hgw8/Heart-Blade.webp",
  },
  {
    "name": "Luger",
    "price": 630,
    "color": "blue",
    "image": "https://i.ibb.co/vP5vjc0/Luger-Updated.webp",
  },
  {
    "name": "Darkbringer",
    "price": 620,
    "color": "blue",
    "image": "https://i.ibb.co/zZbKVbb/Darkbringer-Updated.webp",
  },
  {
    "name": "Batwing",
    "price": 620,
    "color": "blue",
    "image": "https://i.ibb.co/8rNVSCX/Batwing-Updated2.webp",
  },
  {
    "name": "Lightbringer",
    "price": 615,
    "color": "blue",
    "image": "https://i.ibb.co/4SgzYdL/Lightbringer-Updated.webp",
  },
  {
    "name": "Chroma Deathshard",
    "price": 610,
    "color": "blue",
    "image": "https://i.ibb.co/FmLtwqw/Chromads.webp",
  },
  {
    "name": "Hallowscythe",
    "price": 600,
    "color": "blue",
    "image": "https://i.ibb.co/ZJL4Rks/hallowscythe.webp",
  },
  {
    "name": "Iceblaster",
    "price": 580,
    "color": "blue",
    "image": "https://i.ibb.co/D4jV6Wq/Iceblaster.webp",
  },
  {
    "name": "Chroma Gingerblade",
    "price": 550,
    "color": "blue",
    "image": "https://i.ibb.co/g38kMxk/Chroma-Gingerblade.webp",
  },
  {
    "name": "Elderwood Revolver",
    "price": 500,
    "color": "blue",
    "image": "https://i.ibb.co/QnJYKn2/Elderwood-Revolver.webp",
  },
  {
    "name": "Chrome Boneblade",
    "price": 470,
    "color": "blue",
    "image": "https://i.ibb.co/HPTdkfr/Chroma-Boneblade.webp",
  },
  {
    "name": "Chroma Seer",
    "price": 450,
    "color": "blue",
    "image": "https://i.ibb.co/cY1pJTq/Chromaseer.webp",
  },
  {
    "name": "Chroma Saw",
    "price": 400,
    "color": "blue",
    "image": "https://i.ibb.co/j3jvHJW/Chromasaw-0.webp",
  },
];

const ColorCircularProgress = withStyles({
  root: {
    color: "#fff !important",
  },
})(CircularProgress);

const BetInput = withStyles({
  root: {
    width: "100%",
    marginTop: "auto",
    border: "1px solid transparent",
    background: "#060911",
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

const useStyles = makeStyles(theme => ({
  root: {
    color: "#fff",
    fontFamily: "Poppins",
    overflowY: "scroll",
    scrollbarWidth: "none",
    height: "100%",
    width: "100%",
    maxWidth: "1355px",
    margin: "0 auto"
  },
  loader: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  itemsContainer: {
    marginTop: "0.5rem",
    //background: "#101123",
    borderRadius: "0.25rem",
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)", 
    gap: "1rem",
    //padding: "0.5rem",
  },
  bigItemBox: {
    width: "300px",
    height: "200px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative", 
    borderRadius: "0.5rem", 
    overflow: "hidden", 
    backgroundSize: "cover",
    backgroundPosition: "center", 
  },
  bigItemImage: {
    width: "200px",
    height: "200px",
    objectFit: "contain",
    zIndex: 2
  },
  bigItemColor: {
    width: "300px",
    height: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1
  },
  itemBox: {
    width: "210px",
    height: "120px",
    cursor: "pointer",
    backgroundColor: "#14151D",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative", 
    borderRadius: "0.5rem", 
    overflow: "hidden", 
    backgroundSize: "cover",
    backgroundPosition: "center", 
  },
  itemImage: {
    width: "100px",
    height: "75px",
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
    borderTopRightRadius: "0.25rem",
    borderBottomRightRadius: "0.25rem",
    bottom: 10,
    left: 0,
    fontWeight: 500
  },
  topContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem", 
    gap: "2rem",
  },
  balanceControllerBox: {
    position: "relative",
    background: "#14151D",
    borderRadius: "0.25rem",
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  upgraderBox: {
    height: "25rem",
    width: "25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative"
  },
  progressCircle: {
    position: "absolute",
    height: "290px",
    width: "290px",
  },
  spinnerMirror: {
    borderRadius: "50%",
    position: "absolute",
    height: "278px",
    width: "278px",
    zIndex: 1,
    transition: `all 5s cubic-bezier(0.05, 0.1, 0.1, 1)`
  },
  spinnerSelector: {
    position: "absolute",
    top: "-20px",
    left: "50%",
    transform: "translate(-50%, -25%)",
  },
  upgraderCircle: {
    background: "#14151D",
    borderRadius: "50%",
    height: "278px",
    width: "278px",
    border: "1px solid #222333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2
  },
  upgraderContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    width: "144px",
    textAlign: "center"
  },
  itemControllerBox: {
    borderRadius: "0.25rem",
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  inputIcon: {
    marginTop: "0 !important",
    color: "#fff",
    background: "transparent !important",
  },
  balanceContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    width: "20rem",
    textAlign: "center"
  },
  provablyFairButton: {
    padding: "0.5rem 0.75rem",
    backgroundColor: "hsl(274, 100%, 69%)",
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: "0.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },
  upgradeText: {
    fontWeight: 500,
    fontSize: 14,
    marginBottom: "0.5rem"
  },
  percentContainer: {
    display: "flex",
    gap: "0.25rem"
  },
  percentBox: {
    flexGrow: "1",
    borderRadius: "0.25rem",
    padding: "0.5rem 0",
    fontWeight: 500,
    cursor: "pointer",
    useSelect: "none"
  },
  OverAndUnder: {
    position: "absolute",
    bottom: -15,
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    cursor: "pointer",
    marginTop: "1.5rem",
    userSelect: "none"
  },
  upgradeButton: {
    padding: "0.5rem 0rem",
    width: "100%",
    backgroundColor: "hsl(266, 100%, 66%)",
    borderRadius: "0.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontWeight: 500
  },
  percentText: {
    fontWeight: 500,
    fontSize: 20
  },
  multiplierText: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 10,
    left: 10,
    fontWeight: 500
  },
  itemNameText: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    alignItems: "end",
    bottom: 10,
    right: 10,
    fontWeight: 500
  },
  canvas: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 10000,
  },
}));

const Upgrader = ({ user, isAuthenticated }) => {
  // Declare State
  const classes = useStyles();
  const { addToast } = useToasts();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [clientSeed, setClientSeed] = useState("clientseed");
  const [serverSeedHashed, setServerSeedHashed] = useState("serverseedhashed");
  const [nonce, setNonce] = useState(0);
  const [openProvably, setOpenProvably] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [isUnder, setIsUnder] = useState(true);
  const [rotateEndpoint, setRotateEndpoint] = useState(0);
  let ROTATE_ENDPOINT = 0;
  const [multiplier, setMultiplier] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [tickets, setTickets] = useState({
    low: 0,
    high: 0
  });
  const [lastTicket, setLastTicket] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [selectedItem, setSelectedItem] = useState({
    name: null,
    price: 0,
    image: null,
    color: null,
    blob: null,
    hex: null
  });

  const updateTicketRange = (perc, under) => {
    const maxTicketNumber = 1;
    if (!under) {
      setTickets({
        low: Math.abs((perc / 100) * maxTicketNumber - 1),
        high: maxTicketNumber - 1,
      });
    } else {
      setTickets({
        low: maxTicketNumber - 1,
        high: (perc / 100) * maxTicketNumber,
      });
    }
  };

  const triggerUpgrader = () => {
    try {
      setUpgrading(true);
      upgraderSocket.emit("upgrader:attempt", parseFloat(betAmount), selectedItem, isUnder);
    } catch (error) {
      addToast("An error occured when trying attempt the upgrade: " + error, { appearance: "error" });
    }
  };

  const triggerConfetti = () => {
    const containerCenter = document.querySelector(`#canvas-center`);
  
    if (containerCenter) {
      const confettiCenter = confetti.create(containerCenter, {
        resize: true,
      });
  
      playSound(confettiAudio1);
  
      confettiCenter({
        particleCount: 75,
        spread: 40,
        angle: 90,
        origin: {
          x: 0.5, 
          y: 1.1 
        },
      });
    }
  };

  const simulateAnimation = (data) => {
    const remainder = ROTATE_ENDPOINT % 360;
    const adding = 360 - remainder;
    const extra = 720 + ROTATE_ENDPOINT;
    const angle = calculateAngle(data.ticket)

    ROTATE_ENDPOINT = extra + angle + adding;
    setRotateEndpoint(ROTATE_ENDPOINT);
    setNonce(state => state + 1);
    setTimeout(() => {
      setPrevious(lastTicket)
      setLastTicket(data.ticket / 1000000001);
      if(data.success) triggerConfetti();
      setUpgrading(false);
    }, 5000);
  };

  const updateAll = (newBetAmount, newSliderValue, newPercentSelector) => {
    if(upgrading) return;
    if(!user || !isAuthenticated) return;
    if(!selectedItem.name) return;
    
    if(betAmount != newBetAmount) {
      if(((newBetAmount / selectedItem.price)*100).toFixed(2) > 80) return;
      setBetAmount(newBetAmount);
      newSliderValue = ((newBetAmount / user.wallet) * 100).toFixed(2);
      setSliderValue(newSliderValue);
    } else if(newSliderValue != sliderValue) {
      if((((user.wallet * (newSliderValue / 100) / selectedItem.price)*100).toFixed(2) > 80)) return;
      setSliderValue(newSliderValue);
      newBetAmount = (user.wallet * (newSliderValue / 100)).toFixed(2);
      setBetAmount((user.wallet * (newSliderValue / 100)).toFixed(2));
    } else if(newPercentSelector != sliderValue) {
      if((((user.wallet * (newPercentSelector / 100) / selectedItem.price)*100).toFixed(2) > 80)) return;
      setSliderValue(newPercentSelector);
      newBetAmount = (user.wallet * (newPercentSelector / 100)).toFixed(2);
      setBetAmount((user.wallet * (newPercentSelector / 100)).toFixed(2));
    }
    
    setMultiplier(parseCommasToThousands(((selectedItem.price / newBetAmount)*.9).toFixed(2)));
    setPercentage(parseCommasToThousands((((newBetAmount / selectedItem.price)*100)).toFixed(2)));
    updateTicketRange((((newBetAmount / selectedItem.price)*100)).toFixed(2), isUnder);
  };

  useEffect(() => {
    playSound(selectAudio);
    setMultiplier(0);
    setPercentage(0);
    setBetAmount(0.00);
    setSliderValue(0);
    updateTicketRange(0, isUnder);
  }, [selectedItem]);

  useEffect(() => {
    updateTicketRange(percentage, isUnder);
  }, [isUnder]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCurrentSeedPair();
  
        setClientSeed(response.clientSeed);
        setServerSeedHashed(response.serverSeedHash);
        setNonce(response.nonce);

        setBetAmount(0.00);
        setSliderValue(0);

        setLoading(false);
      } catch (error) {
        addToast("An error has occured when trying to get seed pair data.", { appearance: "error" });
        console.log("There was an error while loading upgrader data:", error);
      }
    };    

    const error = msg => {
      setUpgrading(false);
      addToast(msg, { appearance: "error" });
    };

    const success = msg => {
      addToast(msg, { appearance: "success" });
    };

    if(user && isAuthenticated) {
      fetchData();
    } else {
      setBetAmount(0.00);
      setSliderValue(100);
      setLoading(false);
    }

    upgraderSocket.on("upgrader:result", simulateAnimation);
    upgraderSocket.on("upgrader:success", success);
    upgraderSocket.on("upgrader:error", error);
    return () => {
      upgraderSocket.off("upgrader:result", simulateAnimation);
      upgraderSocket.off("upgrader:success", success);
      upgraderSocket.off("upgrader:error", error);
    };
  }, []);

  const getColorSet = (color) => {
    switch(color) {
      case "grey":
        return { Color: Grey, Background: GreyBG, Hex: "#91A0B1", Blob: GreyBlob }
      case "blue":
        return { Color: Blue, Background: BlueBG, Hex: "#4159CF", Blob: BlueBlob }
      case "purple":
        return { Color: Purple, Background: PurpleBG, Hex: "#703ECF", Blob: PurpleBlob }
      case "red":
        return { Color: Red, Background: RedBG, Hex: "#BF4141", Blob: RedBlob }
      case "gold":
        return { Color: Gold, Background: GoldBG, Hex: "#B69768", Blob: GoldBlob }
      default:
        return { Color: Grey, Background: GreyBG, Hex: "#91A0B1", Blob: GreyBlob }
    }
  };

  return loading ? (
    <div className={classes.loader}>
      <ColorCircularProgress />
    </div>
  ) : (
    <Grow in timeout={620}>
      <div className={classes.root}>
        <Provably 
          open={openProvably}
          handleClose={() => setOpenProvably(!openProvably)}
          serverSeedHash={serverSeedHashed}
          clientSeed={clientSeed}
          nonce={nonce}
        />
        <div className={classes.topContainer}>
          <div className={classes.balanceControllerBox}>
            <div className={classes.balanceContainer}>
              <div className={classes.upgradeText}>Use your balance to upgrade!</div>
              <BetInput
                type="number"
                label=""
                variant="filled"
                value={betAmount}
                onChange={(e) => updateAll(e.target.value, sliderValue, sliderValue)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      className={classes.inputIcon}
                      position="start"
                    >
                      <img style={{height: 17, width: 17}} src={Coin} />
                    </InputAdornment>
                  ),
                }}
              />
              <Slider
                value={sliderValue}
                onChange={(e) => updateAll(betAmount, e.target.value, e.target.value)}
                aria-label="My slider"
                defaultValue={50} 
                valueLabelDisplay="auto"
                step={0.01} 
                min={0} 
                max={100}
              />
              <div className={classes.percentContainer}> 
                <motion.div 
                  animate={{ filter: "brightness(100%)" }} 
                  whileHover={{ filter: "brightness(85%)" }} 
                  className={classes.percentBox} 
                  onClick={() => updateAll(betAmount, sliderValue, 10)}
                  style={{
                    color: sliderValue == 10 ? "#fff" : "#9E9FBD",
                    backgroundColor: sliderValue == 10 ? "hsl(215, 75%, 50%)" : "#4C1858"
                  }}
                >
                  10%
                </motion.div>
                <motion.div 
                  animate={{ filter: "brightness(100%)" }} 
                  whileHover={{ filter: "brightness(85%)" }} 
                  className={classes.percentBox} 
                  onClick={() => updateAll(betAmount, sliderValue, 25)}
                  style={{
                    color: sliderValue == 25 ? "#fff" : "#9E9FBD",
                    backgroundColor: sliderValue == 25 ? "hsl(215, 75%, 50%)" : "#4C1858"
                  }}
                >
                  25%
                </motion.div>
                <motion.div 
                  animate={{ filter: "brightness(100%)" }} 
                  whileHover={{ filter: "brightness(85%)" }} 
                  className={classes.percentBox} 
                  onClick={() => updateAll(betAmount, sliderValue, 30)}
                  style={{
                    color: sliderValue == 30 ? "#fff" : "#9E9FBD",
                    backgroundColor: sliderValue == 30 ? "hsl(215, 75%, 50%)" : "#4C1858"
                  }}
                >
                  30%
                </motion.div>
                <motion.div 
                  animate={{ filter: "brightness(100%)" }} 
                  whileHover={{ filter: "brightness(85%)" }} 
                  className={classes.percentBox} 
                  onClick={() => updateAll(betAmount, sliderValue, 50)}
                  style={{
                    color: sliderValue == 50 ? "#fff" : "#9E9FBD",
                    backgroundColor: sliderValue == 50 ? "hsl(215, 75%, 50%)" : "#4C1858"
                  }}
                >
                  50%
                </motion.div>
              </div>
            </div>
            <motion.div className={classes.provablyFairButton} whileTap={{ scale: 0.97 }} animate={{ filter: "brightness(100%)" }} whileHover={{ filter: "brightness(85%)" }} onClick={() => setOpenProvably(!openProvably)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none"><path d="M12.4702 6.75L9.30354 9.75L7.7202 8.25M16.4285 7.62375C16.4285 12.55 12.4955 14.7586 10.8281 15.4735L10.826 15.4744C10.6506 15.5496 10.5628 15.5873 10.3635 15.6197C10.2373 15.6403 9.95389 15.6403 9.8277 15.6197C9.62765 15.5872 9.53882 15.5494 9.36212 15.4735C7.69471 14.7586 3.76187 12.55 3.76187 7.62375V4.65015C3.76187 3.81007 3.76187 3.38972 3.93445 3.06885C4.08624 2.7866 4.32829 2.5573 4.62621 2.41349C4.9649 2.25 5.40861 2.25 6.29536 2.25H13.8954C14.7821 2.25 15.2249 2.25 15.5636 2.41349C15.8615 2.5573 16.1043 2.7866 16.2561 3.06885C16.4285 3.3894 16.4285 3.80924 16.4285 4.64768V7.62375Z" stroke="white" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round"/></svg>
            </motion.div>
          </div>
          <div className={classes.upgraderBox}>
            <canvas id={`canvas-center`} className={classes.canvas}></canvas>
            <motion.div className={classes.spinnerMirror} style={{ transform: `rotate(${rotateEndpoint}deg)`}}>
              <svg className={classes.spinnerSelector} width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.8233 0.25H2.98657C1.4147 0.25 0.442158 1.96294 1.24768 3.31273L12.666 22.4462C13.4516 23.7625 15.3582 23.7625 16.1438 22.4462L27.5622 3.31273C28.3677 1.96294 27.3951 0.25 25.8233 0.25Z" fill="white"></path></svg>            </motion.div>
              <div style={{ transform: isUnder ? "none" : "scaleX(-1)", height: "290px", width: "290px", position: "absolute" }}>
                <CircularProgressbar
                  value={percentage}
                  className={classes.progressCircle}
                  styles={buildStyles({
                    strokeLinecap: 'butt',
                    pathColor: `#9F2BBB`,
                    trailColor: '#0F0611',
                  })}
                />
              </div>
            <div className={classes.upgraderCircle}>
              <div className={classes.upgraderContainer}>
                <div className={classes.percentText}>{(parseFloat(percentage)).toFixed(2)}<span style={{ color: "hsl(266, 100%, 66%)" }}>%</span></div>
                <motion.div 
                  whileTap={{ scale: 0.97 }} 
                  className={classes.upgradeButton} 
                  onClick={() => triggerUpgrader()}
                  style={{
                    pointerEvents: upgrading ? "none" : "all", 
                    opacity: upgrading ? 0.5 : 1, 
                    cursor: upgrading ? "not-allowed" : "pointer" 
                  }}
                >
                  {upgrading ? "Upgrading..." : "Upgrade"}
                </motion.div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#9E9FBD", marginTop: "0.25rem"}}>{tickets.low.toFixed(4)} - {tickets.high.toFixed(4)}</div>
              </div>
            </div>
            <motion.div className={classes.OverAndUnder} whileTap={{ scale: 0.97 }} onClick={() => setIsUnder(state => upgrading ? state : !isUnder)}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 500, fontSize: 18, color: "#9E9FBD"}}>
                <motion.svg style={{ rotate: isUnder ? 180 : 0, transitionDuration: "200ms" }} xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M18.2205 4.18331C18.5796 3.83466 19.1533 3.8431 19.502 4.20218L23.6084 8.43134C23.9498 8.78297 23.9498 9.34232 23.6084 9.69396L19.502 13.9231C19.1533 14.2822 18.5796 14.2907 18.2205 13.9419C17.8615 13.5933 17.853 13.0196 18.2016 12.6605L20.8151 9.96888H6.04154C5.54103 9.96888 5.13529 9.56315 5.13529 9.06263C5.13529 8.56213 5.54103 8.15638 6.04154 8.15638H20.8151L18.2016 5.46481C17.853 5.10571 17.8615 4.53197 18.2205 4.18331ZM10.7792 15.058C11.1383 15.4067 11.1467 15.9804 10.7981 16.3395L8.18438 19.0313H22.9582C23.4587 19.0313 23.8645 19.4371 23.8645 19.9376C23.8645 20.4381 23.4587 20.8438 22.9582 20.8438H8.18485L10.7981 23.5351C11.1467 23.8943 11.1383 24.468 10.7792 24.8167C10.4201 25.1653 9.84637 25.1568 9.4977 24.7978L5.39131 20.5687C5.0499 20.2171 5.0499 19.6577 5.39131 19.306L9.4977 15.0769C9.84637 14.7178 10.4201 14.7094 10.7792 15.058Z" fill="#9D51FF"/></motion.svg>
                Over or Under
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#9E9FBD", display: "flex", gap: "0.3rem", justifyContent: "center"}}>Ticket: 
                <CountUp
                  delay={0}
                  duration={1}
                  decimals={9}
                  start={previous}
                  end={lastTicket}
                />
              </div>
            </motion.div>
          </div>
          <motion.div 
            className={classes.itemControllerBox}
            style={{
              background: selectedItem.name ? `linear-gradient(to right, ${hexToRGBA(selectedItem.hex, 0.2)} 0%, rgba(253, 27, 98, 0) 100%) #14151D` : "#14151D"
            }}
          >
            <AnimatePresence>
              {selectedItem.name && (
                <motion.div
                  initial={{ opacity: 0, y: 100, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 100  , scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={classes.bigItemBox} onClick={() => setSelectedItem(state => upgrading ? state : { name: null, price: 0, image: null, color: null, blob: null, hex: null })}>
                    <img src={selectedItem.image} className={classes.bigItemImage} />
                    <img src={selectedItem.blob} className={classes.bigItemColor} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className={classes.multiplierText}>
              <div style={{ fontSize: 13, color: ""}}>Your multiplier</div>
              <div style={{ fontSize: 16, color: ""}}>{(parseFloat(multiplier)).toFixed(2)}<span style={{color: selectedItem.hex}}>x</span></div>
              <div style={{ fontSize: 13, color: "#9E9FBD"}}>{(parseFloat(percentage)).toFixed(2)}%</div>
            </div>
            <div className={classes.itemNameText}>
              <div style={{ fontSize: 13, color: ""}}>{selectedItem.name ? selectedItem.name : "Select an item"}</div>
              <div style={{display: "flex", alignItems: "center", gap: "0.3rem", fontSize: 18, fontWeight: "bold"}}>
                <img src={Coin} style={{ height: 18, width: 18}} />
                {selectedItem.name ? selectedItem.price.toFixed(2) : "0.00"}
              </div>
            </div>
          </motion.div>
        </div>
        <div>
          <div>Choose an Item</div>
          <div className={classes.itemsContainer}>
            {items.map((item, index) => {
              const { Color, Background, Hex, Blob } = getColorSet(item.color);
              return (
                <motion.div
                  key={index}
                  className={classes.itemBox}
                  onClick={() => {
                    if(selectedItem.name == item.name) {
                      setSelectedItem({
                        name: null,
                        price: 0,
                        image: null,
                        color: null,
                        blob: null,
                        hex: null
                      });
                    } else {
                      setSelectedItem({
                        name: null,
                        price: 0,
                        image: null,
                        color: null,
                        blob: null,
                        hex: null
                      });     
                      setBetAmount(0);
                      setSliderValue(0);
                      setPercentage(0);
                      setMultiplier(0);
                      setSelectedItem({ ...item, blob: Blob, hex: Hex });
                    }
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    backgroundImage: `url(${Background})`,
                    filter: selectedItem.name == item.name ? "brightness(75%)" : "brightness(100%)",
                    border: selectedItem.name == item.name ? "1px solid #222333" : ""
                  }}
                >
                  <img src={item.image} alt={item.name} className={classes.itemImage} />
                  <img src={Blob} alt={item.color} className={classes.itemColor} />
                  <div className={classes.itemPrice} style={{ backgroundColor: Hex }}>
                    <img src={Coin} alt="Coin" style={{height: 12.5, width: 12.5}} />
                    {parseCommasToThousands(item.price.toFixed(2))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Grow>
  );
};

Upgrader.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Upgrader);
