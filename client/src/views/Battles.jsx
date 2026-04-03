import React, { useState, useEffect, Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getActiveBattlesGame } from "../services/api.service";
import { battlesSocket } from "../services/websocket.service";
import Countdown from "react-countdown";
import PropTypes from "prop-types";
import _, { create, findLastIndex } from "underscore";
import parseCommasToThousands from "../utils/parseCommasToThousands";
import cutDecimalPoints from "../utils/cutDecimalPoints";
import { useHistory } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import { motion, AnimatePresence } from "framer-motion";

import Tooltip from "@material-ui/core/Tooltip";
import CreateBattle from "../components/battles/CreateBattle";
import Box from "@material-ui/core/Box";

import coin from "../assets/icons/coin.svg";

// components
import Preloader from "../Preloader";
import { Grow, Slide } from "@material-ui/core";

const ColorCircularProgress = withStyles({
  root: {
    color: "#fff !important",
  },
})(CircularProgress);

const useStyles = makeStyles(theme => ({
  root: {
    color: "#fff",
    fontFamily: "Poppins",
    overflowY: "scroll",
    scrollbarWidth: "none",
    height: "100%",
    width: "100%",
    maxWidth: "1250px",
    margin: "0 auto"
  },
  topBar: {
    width: "100%",
    margin: "0 auto 0.5rem auto",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    gap: "0.5rem",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column"
    },
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0.5rem 0 1rem 0"
  },
  left: {
  },
  right: {
    display: "flex",
  },
  counterWhite: {
    color: "#fff",
    borderRight: "2px solid hsla(0,0%,100%,.5)",
    paddingRight: "1rem",
    fontWeight: 500,
  },
  counterGreen: {
    paddingLeft: "1rem",
    marginRight: ".5rem",
    color: "#FFC440",
    fontWeight: 500,
  },
  rowBattleList: {
    
  },
  rowOverview: {
    color: "#fff",
    textAlign: "center",
    fontSize: ".9rem",
    letterSpacing: "1px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },  
  roundsCol: {
    display: "flex",
    width: "9.5rem"
  },
  casesCol: {
    width: "100%",
    padding: 0,
    margin: 0,
  },
  priceCol: {
    display: "flex",
    width: "8rem"
  },
  playersCol: {
    margin: "auto",
    marginRight: "3rem"
  },
  statusCol: {
    display: "flex",
    width: "10rem",
    marginRight: "1.25rem",
    justifyContent: "flex-end",
  },
  noGames: {
    display: "flex",
    flexDirection: "column",
    height: "40rem",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  container: {
    width: "100%",
    minHeight: "32.5rem",
    paddingTop: 50,
    paddingBottom: 120,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 25,
    },
    "& > div": {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        margin: "auto",
      },
    },
  },
  a: {
    textDecoration: "none",
    color: "inherit",
    width: "100%",
    color: "#007bff",
    textDecoration: "none",
    backgroundColor: "initial",
  },
  square: {
    border: "1px solid #272847",
    background: "#0e1017",
    borderRadius:" 4px",
    width: "4rem",
    height: "4rem",
    margin: "auto",
  },
  number: {
    color: "#fff",
    display: "block",
    margin: "auto 0",
    textAlign: "center",
    padding: "calc(1rem - 2px)",
    lineHeight: "2rem",
    fontSize: "1.4rem",
    fontWeight: 500,
  },
  text: {
    color: "#838b8d",
    display: "block",
    margin: "6px 0 auto",
    textAlign: "center",
  },
  svgDot: {
    position: "absolute",
    top: 0,
    right: "15%",
    width: "2rem",
    ["-webkit-animation"]: "blink-b4490708 1.25s infinite",
    animation: "blink-b4490708 1.25s infinite",
    transition: "all .25s ease-in-out",
  },
  caseDisplay: {
    background: "#0e1017",
    borderRadius: "4px",
    overflow: "hidden",
    gridArea: "cases",
    padding: "8px 0",
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: "100%",
    width: "100%"
  },
  caseRight: {
    background: "linear-gradient(90deg,rgba(21,23,25,.8),rgba(31,34,37,0))",
    borderRadius: "4px 0 0 4px",
    ["-webkit-transform"]: "matrix(-1,0,0,1,0,0)",
    transform: "matrix(-1,0,0,1,0,0)",
    height: "100%",
    width: "30%",
    right: "-1px",
    position: "absolute",
    zIndex: 1,
    top: 0,
  },
  scroller: {
    //overflowY: "scroll",
    height: "100%",
  },
  caseList: {  
    display: "flex",
    height: "100%",
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  newPrice: {
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    fontSize: "1.15rem",
    margin: "auto",
    marginLeft: "auto",
    marginLeft: "1rem",
  },
  newPriceWrapper: {
    display: "inline-flex",
    alignItems: "baseline",
    color: "#eee !important",
  },
  newPriceWrapperImg: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    height: "1rem",
    width: "1rem",
    marginRight: "6px",
  },
  imageCol: {
    boxShadow: "0 0 0 1px #272847",
    background: "#fff",
    borderRadius: "4px",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    height: "44px",
    width: "44px",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGreenStripe: {
    fontWeight: 600,
    textTransform: "uppercase",
    padding: ".5rem 1.75rem",
    border: "1px solid #4ea24d",
    background: "#4ea24d",
    backgroundImage: "none",
    backgroundSize: "auto",
    backgroundColor: "#4ea24d",
    color: "#fff",
    fontSize: ".95rem",
    borderRadius: "4px",
    letterSpacing: "1px",
    cursor: "pointer",
    marginLeft: "1.25rem",
    transition: "all .15s ease-in-out",
    verticalAlign: "middle",
    display: "inline-block",
    boxSizing: "border-box"
  },
  noOne: {
    background: "#1a1d20;",
    backgroundBlendMode: "hue",
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
    borderRadius: "4px",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    height: "44px",
    width: "44px",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
    cursor: "pointer"
  },
  activeBattle: {
    border: "none",
  },
  topBarLeft:  {
    display: "flex",
    marginRight: "32px",
    flexShrink: 0,
  },
  topBarRight: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  topBar2: {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
  },
  optionButton: {
    padding: "11px 16px",
    fontWeight: 400,
    lineHeight: "130%",
    letterSpacing: ".1px",
    color: "#fff",
    transition: "all .2s ease",
    whiteSpace: "nowrap",
    cursor: "pointer",
    textDecoration: "none",
    border: "none",
    background: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      filter: "brightness(130%)",
    }
  },
  button: {  
    textTransform: "none",
    width: "100px",
    padding: "0 16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "8px",
    borderRadius: "4px",
    fontSize: "15px",
    fontWeight: 400,
    color: "rgba(239,250,251,.72)",
    background: "#14151D",
    transition: "all .3s ease",
    fontFamily: "Poppins",
    border: "1px solid #161D26",
    backgroundSize: "24px auto",
    height: "42px",
  },
  selected: {
    color: "#effafb",
    background: "#2a2a38",
    border: "2px solid #FFC440 !important",
  },
  selected2: {
    color: "#effafb",
    background: "#2a2a38",
    border: "2px solid #FFC440 !important",
  },
  box: {
    color: "hsl(220, 22%, 100%) !important",
    backgroundColor: "#14151D",
    flex: 1,
    border: "1px solid transparent",
    height: "auto",
    paddingTop: "1em",
    paddingBottom: "1em",
    display: "inline-flex",
    outline: "none",
    padding: "0 0.75em",
    position: "relative",
    alignItems: "center",
    fontWeight: "bold",
    userSelect: "none",
    whiteSpace: "nowrap",
    willChange: "opacity",
    borderRadius: "0.25rem",
    justifyContent: "center",
    transitionDuration: "300ms",
    textDecoration: "none",
    fontWeight: 500,
    [theme.breakpoints.down("xs")]: {
      width: "calc(50% - 0.25rem)",
      flex: "none"
    },
  },
  createBattle: {
    background: "linear-gradient(180deg, #B95FFF 0%, #8F36FF 100%)",
    cursor: "pointer",
    display: "inline-flex",
    outline: "none",
    height: "fit-content",
    padding: "0.75rem",
    alignItems: "center",
    userSelect: "none",
    borderRadius: "0.25rem",
    justifyContent: "center",
    cursor: "pointer",
    fontWeight: 500,
    gap: "0.5rem",
  },
  rowBattleRunning: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    backgroundColor: "#14151D",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid transparent",
    padding: "1rem",
    transition: "all .3s ease-in-out",
    marginBottom: "0.5rem",
    gap: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      gap: ".5rem",
    },
  },
  squareWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "0.75rem 0 0.5rem 0",
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  rowSquareShort: {
    display: "flex",
    borderRadius: "4px",
    gap: ".4rem",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  img:{
    width: "100%",
    position: "absolute",
    height: "44px",
    width: "44px",
  },
  modeBox: {
    backgroundColor: "#020203",
    display: "flex",
    textAlign: "center",
    borderRadius: "0.25rem",
    color: "#9E9FBD",
    width: "fit-content",
    padding: "0.25rem",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px"
    },
  },
  joinBox: {
    background: "linear-gradient(180deg, #B95FFF 0%, #8F36FF 100%)",
    display: "flex",
    textAlign: "center",
    borderRadius: "0.25rem",
    color: "#9E9FBD",
    width: "fit-content",
    padding: "0.5rem",
    alignItems: "center",
    cursor: "pointer",
    transitionDuration: "300ms",
    "&:hover": {
      filter: "brightness(140%)"
    }
  },
  case: {
    flexGrow: 0,
    height: 55,
    width: 55,
    minWidth: 55,
    minHeight: 55,
    borderRadius: "0.25rem",
    backgroundColor: "#1a1b33",
    padding: "0.5rem",
    userSelect: "none",
    transition: "all .3s ease-in-out",
  },
  mobilePrice: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
  playerBoxMobile: {
    backgroundColor: "#020203",
    display: "none",
    textAlign: "center",
    borderRadius: "0.25rem",
    color: "#9E9FBD",
    width: "fit-content",
    padding: "0.25rem",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
  battleCost: {
    display: "flex", 
    gap: "0.5rem",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  roundText: {
    color: "#838b8d" ,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  firstDivider: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px",
      width: "30%",
    },
  },
  secondDivider: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px",
      width: "40%",
    },
  },
  thirdDivider: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px",
      width: "20%",
    },
  },
  loader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "25rem",
  },
  rowTop: {
    padding: "1rem 1.5rem",
    borderRadius: "0.5rem",
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#14151D",
    marginBottom: "0.5rem",
    transitionDuration: "300ms",
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(125%)"
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      gap: "1rem"
    },
  },
  topLeftCol: {
    minWidth: 0,
    display: "flex",
    flexDirection: 'column',
    padding: "0.5rem 0.75rem",
    borderRadius: "0.5rem",
    justifyContent: "center",
    minWidth: "115.14px"
  },
  topRightCol: {
    display: "flex",
    flexDirection: "row",
  },
  priceWrapper: {
    display: "inline-flex",
    alignItems: "center",
    color: "#eee !important",
    gap: "0.25rem",
    fontWeight: "550",
  },
  caseViewContainer: {
    display: "flex", 
    alignItems: "center", 
    height: "fit-content", 
    width: "fit-content", 
    justifyContent: "center", 
    padding: "0.5rem",
    borderRadius: "0.5rem",
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    },
  },
  casesContainer: {
    display: "flex", 
    flexDirection: "row",
    gap: "3px",
    width: 400,
    maxWidth: 400,
    overflow: "hidden",
  },
  case: {
    flexGrow: 0,
    height: 75,
    width: 75,
    minWidth: 75,
    minHeight: 75,
    borderRadius: "0.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#1a1b33",
    padding: "0.5rem",
    userSelect: "none",
    transition: "all .3s ease-in-out",
  },
  crazyBox: {
    backgroundColor: "#252734",
    color: "#ff0000",
    padding: "0.5rem",
    borderRadius: "0.25rem",
    marginRight: "1rem",
    maxHeight: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: "0.3rem",
    "& svg": {
      height: "1rem",
      width: "1rem",
    }
  },
  terminalBox: {
    backgroundColor: "#cc6666",
    color: "#990000",
    padding: "0.5rem",
    maxHeight: 50,
    borderRadius: "0.25rem",
    marginRight: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: "0.3rem",
    "& svg": {
      height: "1rem",
      width: "1rem",
    }
  },
  regularBox: {
    backgroundColor: "#252734",
    color: "#B95FFF",
    padding: "0.75rem",
    borderRadius: "0.25rem",
    marginRight: "1rem",
    maxHeight: 50,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    gap: "0.3rem",
    "& svg": {
      height: "1rem",
      width: "1rem",
    }
  },
}));

const Battles = ({ user, isAuthenticated }) => {
  // Declare State
  const classes = useStyles();
  const { addToast } = useToasts();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [spinningBattlesCount, setSpinningBattlesCount] = useState(0);
  const [joinableBattlesCount, setJoinableBattlesCount] = useState(0);
  const [createOpen, setCreateOpen] = useState(false);


  // componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedGames = await getActiveBattlesGame();
        
        const sortedGames = fetchedGames.sort((a, b) => {
          if (a.status === 1 && b.status === 2) {
            return -1; 
          } else if (a.status === 2 && b.status === 1) {
            return 1; 
          }
          return 0; 
        });        
        
        setGames(fetchedGames);
    
        let jbc = 0;
        let sbc = 0;
        for (let i = 0; i < fetchedGames.length; i++) {
          if (fetchedGames[i].status === 1) {
            jbc++;
          } else {
            sbc++;
          }
        }
    
        setJoinableBattlesCount(jbc);
        setSpinningBattlesCount(sbc);
    
        setLoading(false);
      } catch (error) {
        console.log("There was an error while loading case battles data:", error);
      }
    };    

    // Initially, fetch data
    fetchData();

    // Error event handler
    const error = msg => {
      addToast(msg, { appearance: "error" });
    };

    // Error event handler
    const success = msg => {
      addToast(msg, { appearance: "success" });
    };

    const newBattle = data => {
      setJoinableBattlesCount(prev => prev + 1);
      setGames(state => (state ? [data, ...state] : null));
    }

    const battlesStart = data => {
      setJoinableBattlesCount(prev => prev-1);
      setSpinningBattlesCount(prev => prev+1);

      setGames(prevGames => {
        const updatedGames = prevGames.map(game => {
          if (game.id === data.battleId) {
            return { ...game, status: 2 };
          }
          return game;
        });
        return updatedGames;
      });
    }

    const battlesRound = data => {
      setGames(prevGames => {
        const updatedGames = prevGames.map(game => {
          if (game.id === data.battleId) {
            return { ...game, casesRoundResults: [...game.casesRoundResults, data.result] };
          }
          return game;
        });
        return updatedGames;
      });
    }

    const battlesJoin = data => {
      setGames(prevGames => {
        const updatedGames = prevGames.map(game => {
          if (game.id === data.battleId) {
            return { ...game, players: data.newPlayers };
          }
          return game;
        });
        return updatedGames;
      });
    }

    const battlesFinised = data => {
      setGames(prevGames => prevGames.filter(game => game.id !== data.battleId));
      setSpinningBattlesCount(prev => prev-1);
    }

    // Listeners
    battlesSocket.on("battles:new", newBattle);
    battlesSocket.on("battles:start", battlesStart);
    battlesSocket.on("battles:round", battlesRound);
    battlesSocket.on("battles:join", battlesJoin);
    battlesSocket.on("battles:finished", battlesFinised);

    return () => {
      // Remove Listeners
      battlesSocket.off("battles:new", newBattle)
      battlesSocket.off("battles:start", battlesStart);
      battlesSocket.off("battles:round", battlesRound);
      battlesSocket.off("battles:join", battlesJoin);
      battlesSocket.off("battles:finished", battlesFinised);
    };
  }, [addToast]);

  const fwd = (item) => {
    history.push(`/battles/${item.id}`);
  };

  const renderGamesBoxes = () => {
    let sortedGames = [...games]; 
    let allBoxes = [];
    try {
      const boxes = sortedGames.map((item, index) => {
        const elements = [];
        for (let i = 1; i < item.playerCount; i++) {
          if (item.players[i]?.id) {
            elements.push(
              <Tooltip
                key={i}
                interactive
                title={
                  <span>
                    {item.players[i].username}
                  </span>
                }
              >
                <div className={classes.imageCol}>  
                  <img className={classes.img} src={item.players[i].pfp} />
                </div>
              </Tooltip>
            );
          } else {
            elements.push(<div key={`player-${i}-${index}`} className={classes.noOne}>+</div>);
          };
        };

        return (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className={classes.rowTop} 
              onClick={() => fwd(item)}
              key={`battle-${index}`}
              style={{
                background: item.status == 2 ? `linear-gradient(45deg, ${item.isCrazyMode ? "#13112C" : "#0C132E"}, #14151D 70%)` : ""
              }}
            >
              <div>
                <div className={classes.topLeftCol}>
                  <div className={classes.priceWrapper}>
                    <img style={{height: 14, width: 14}} src={coin} />
                    {parseCommasToThousands((item?.price).toFixed(2))}
                  </div>
                  <span style={{color:"#838b8d"}}>{item.casesRoundResults.length}<span style={{color:"#838b8d"}}>/</span>{item.cases.length} rounds</span>
                </div>
              </div>
              <div className={classes.caseViewContainer} >
                <div className={classes.casesContainer}>
                  {item.cases.map((caseItem, index) => (        
                    <div key={index} style={{position: 'relative'}}>
                    <img 
                      className={classes.case} 
                      style={{
                        opacity: item.casesRoundResults.length - 1 == index ? 1 : 0.5,
                        transform: `translateX(-${(item.casesRoundResults.length - 1) * 78}px)`,
                      }}
                      src={caseItem.image}
                    />
                    {item.casesRoundResults.length - 1 == index && (
                      <>
                        <div 
                          style={{
                            position: 'absolute',
                            top: '-15px',
                            left: '50%',
                            width: 0,
                            height: 0,
                            borderTop: '10px solid #FFC440',
                          }}
                        />
                        <div 
                          style={{
                            position: 'absolute',
                            bottom: '-15px',
                            left: '50%',
                            width: 0,
                            height: 0,
                            borderBottom: '10px solid #FFC440',
                          }}
                        />
                      </>
                    )}
                  </div>
                  ))}
                </div>
              </div>
              <div className={classes.topRightCol}>
                <div className={classes.squareWrapper} style={{marginRight: 20}}>
                  <div className={classes.rowSquareShort}>
                    <Tooltip
                      interactive
                      title={
                        <span>
                          {item.players[0].username}
                        </span>
                      }
                    >
                      <div className={classes.imageCol} ><img className={classes.img} src={item.players[0].pfp} /></div>
                    </Tooltip>
                    {elements}
                      <div className={classes.noOne} style={{backgroundColor: "#252734", marginLeft: 30}}>
                      <svg width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_4089_125)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.998 17.78C19.729 16.345 22.198 15 25 15C27.802 15 30.27 16.345 32.002 17.78C32.7852 18.4215 33.4888 19.1544 34.098 19.963C34.351 20.307 34.563 20.645 34.716 20.96C34.856 21.246 35 21.618 35 22C35 22.382 34.855 22.754 34.716 23.04C34.54 23.39 34.3332 23.7237 34.098 24.037C33.4888 24.8456 32.7852 25.5785 32.002 26.22C30.271 27.655 27.802 29 25 29C22.198 29 19.73 27.655 17.998 26.22C17.2148 25.5785 16.5112 24.8456 15.902 24.037C15.6668 23.7237 15.46 23.39 15.284 23.04C15.144 22.754 15 22.382 15 22C15 21.618 15.145 21.246 15.284 20.96C15.437 20.645 15.649 20.307 15.902 19.963C16.5112 19.1544 17.2148 18.4215 17.998 17.78ZM25 25C25.7956 25 26.5587 24.6839 27.1213 24.1213C27.6839 23.5587 28 22.7956 28 22C28 21.2044 27.6839 20.4413 27.1213 19.8787C26.5587 19.3161 25.7956 19 25 19C24.2044 19 23.4413 19.3161 22.8787 19.8787C22.3161 20.4413 22 21.2044 22 22C22 22.7956 22.3161 23.5587 22.8787 24.1213C23.4413 24.6839 24.2044 25 25 25Z" fill="#B95FFF"/>
                        </g>
                        <defs>
                        <filter id="filter0_d_4089_125" x="0" y="0" width="50" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset/>
                        <feGaussianBlur stdDeviation="7.5"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.72549 0 0 0 0 0.372549 0 0 0 0 1 0 0 0 0.4 0"/>
                        <feBlend mode="plus-lighter" in2="BackgroundImageFix" result="effect1_dropShadow_4089_125"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4089_125" result="shape"/>
                        </filter>
                        </defs>
                      </svg>
                    </div>
                    {item.isCrazyMode ? (
                  <div className={`${classes.crazyBox}`} style={{maxHeight: 50}}>
                    <svg fill="currentColor" viewBox="0 0 512.001 512.001" xmlns="http://www.w3.org/2000/svg" width="24" height="24" ><g><path d="m59.603 384.898h45v90h-45z" transform="matrix(.707 -.707 .707 .707 -279.94 183.975)"></path><path  d="m13.16 498.841c17.547 17.545 46.093 17.545 63.64 0l-63.64-63.64c-17.547 17.547-17.547 46.093 0 63.64z"></path><path  d="m384.898 407.398h90v45h-90z" transform="matrix(.707 -.707 .707 .707 -178.07 429.898)"></path><path d="m435.201 498.841c17.547 17.545 46.093 17.545 63.64 0 17.547-17.547 17.547-46.093 0-63.64z"></path><path d="m424.595 360.955-21.213-21.215 31.818-31.818c5.863-5.863 5.863-15.352 0-21.215-5.863-5.861-15.35-5.861-21.213 0l-127.278 127.28c-5.863 5.863-5.863 15.35 0 21.213 5.861 5.863 15.35 5.863 21.213 0l31.82-31.82 21.213 21.213z"></path><path d="m128.722 277.214-19.102 19.102-10.607-10.607c-5.863-5.861-15.35-5.861-21.213 0-5.863 5.863-5.863 15.352 0 21.215l31.82 31.818-22.215 22.215 63.64 63.638 22.213-22.213 31.82 31.82c5.863 5.863 15.352 5.863 21.213 0 5.863-5.863 5.863-15.35 0-21.213l-10.605-10.607 19.102-19.102z"></path><path  d="m497.002.001h-84.853c-3.977 0-7.789 1.575-10.607 4.391l-124.329 124.33 106.066 106.066 124.329-124.331c2.818-2.816 4.393-6.628 4.393-10.605v-84.853c-.001-8.287-6.713-14.998-14.999-14.998z"></path><path d="m110.459 4.392c-2.818-2.816-6.63-4.391-10.607-4.391h-84.853c-8.286 0-14.999 6.711-14.999 14.998v84.853c0 3.977 1.575 7.789 4.393 10.605l271.711 271.713 106.066-106.066z"></path></g></svg>
                    {" "}
                    {item.gameType === 1 ? "1v1" : item.gameType === 2 ? "1v1v1" : item.gameType === 3 ? "1v1v1v1" : item.gameType === 4 ? "2v2" : 0}
                  </div>
                ) : item.isTerminalMode ? (
                  <div className={`${classes.terminalBox}`} style={{maxHeight: 50}}>
                    <svg fill="currentColor" viewBox="0 0 512.001 512.001" xmlns="http://www.w3.org/2000/svg" width="24" height="24" ><g><path d="m59.603 384.898h45v90h-45z" transform="matrix(.707 -.707 .707 .707 -279.94 183.975)"></path><path  d="m13.16 498.841c17.547 17.545 46.093 17.545 63.64 0l-63.64-63.64c-17.547 17.547-17.547 46.093 0 63.64z"></path><path  d="m384.898 407.398h90v45h-90z" transform="matrix(.707 -.707 .707 .707 -178.07 429.898)"></path><path d="m435.201 498.841c17.547 17.545 46.093 17.545 63.64 0 17.547-17.547 17.547-46.093 0-63.64z"></path><path d="m424.595 360.955-21.213-21.215 31.818-31.818c5.863-5.863 5.863-15.352 0-21.215-5.863-5.861-15.35-5.861-21.213 0l-127.278 127.28c-5.863 5.863-5.863 15.35 0 21.213 5.861 5.863 15.35 5.863 21.213 0l31.82-31.82 21.213 21.213z"></path><path d="m128.722 277.214-19.102 19.102-10.607-10.607c-5.863-5.861-15.35-5.861-21.213 0-5.863 5.863-5.863 15.352 0 21.215l31.82 31.818-22.215 22.215 63.64 63.638 22.213-22.213 31.82 31.82c5.863 5.863 15.352 5.863 21.213 0 5.863-5.863 5.863-15.35 0-21.213l-10.605-10.607 19.102-19.102z"></path><path  d="m497.002.001h-84.853c-3.977 0-7.789 1.575-10.607 4.391l-124.329 124.33 106.066 106.066 124.329-124.331c2.818-2.816 4.393-6.628 4.393-10.605v-84.853c-.001-8.287-6.713-14.998-14.999-14.998z"></path><path d="m110.459 4.392c-2.818-2.816-6.63-4.391-10.607-4.391h-84.853c-8.286 0-14.999 6.711-14.999 14.998v84.853c0 3.977 1.575 7.789 4.393 10.605l271.711 271.713 106.066-106.066z"></path></g></svg>
                    {item.gameType === 1 ? "1v1" : item.gameType === 2 ? "1v1v1" : item.gameType === 3 ? "1v1v1v1" : item.gameType === 4 ? "2v2" : 0}
                  </div>
                ) : (
                  <div className={classes.regularBox} style={{maxHeight: 50, color: "ffcccc"}}>
                    <svg fill="currentColor" viewBox="0 0 512.001 512.001" xmlns="http://www.w3.org/2000/svg" width="24" height="24" ><g><path d="m59.603 384.898h45v90h-45z" transform="matrix(.707 -.707 .707 .707 -279.94 183.975)"></path><path  d="m13.16 498.841c17.547 17.545 46.093 17.545 63.64 0l-63.64-63.64c-17.547 17.547-17.547 46.093 0 63.64z"></path><path  d="m384.898 407.398h90v45h-90z" transform="matrix(.707 -.707 .707 .707 -178.07 429.898)"></path><path d="m435.201 498.841c17.547 17.545 46.093 17.545 63.64 0 17.547-17.547 17.547-46.093 0-63.64z"></path><path d="m424.595 360.955-21.213-21.215 31.818-31.818c5.863-5.863 5.863-15.352 0-21.215-5.863-5.861-15.35-5.861-21.213 0l-127.278 127.28c-5.863 5.863-5.863 15.35 0 21.213 5.861 5.863 15.35 5.863 21.213 0l31.82-31.82 21.213 21.213z"></path><path d="m128.722 277.214-19.102 19.102-10.607-10.607c-5.863-5.861-15.35-5.861-21.213 0-5.863 5.863-5.863 15.352 0 21.215l31.82 31.818-22.215 22.215 63.64 63.638 22.213-22.213 31.82 31.82c5.863 5.863 15.352 5.863 21.213 0 5.863-5.863 5.863-15.35 0-21.213l-10.605-10.607 19.102-19.102z"></path><path  d="m497.002.001h-84.853c-3.977 0-7.789 1.575-10.607 4.391l-124.329 124.33 106.066 106.066 124.329-124.331c2.818-2.816 4.393-6.628 4.393-10.605v-84.853c-.001-8.287-6.713-14.998-14.999-14.998z"></path><path d="m110.459 4.392c-2.818-2.816-6.63-4.391-10.607-4.391h-84.853c-8.286 0-14.999 6.711-14.999 14.998v84.853c0 3.977 1.575 7.789 4.393 10.605l271.711 271.713 106.066-106.066z"></path></g></svg>
                    {item.gameType === 1 ? "1v1" : item.gameType === 2 ? "1v1v1" : item.gameType === 3 ? "1v1v1v1" : item.gameType === 4 ? "2v2" : 0}
                  </div>
                )}
                  </div>
                </div>
              </div>
            </div> 
          </motion.div>
        );
      });
      allBoxes.push(boxes);
    } catch (error) {
      console.log(error)
    }
    return allBoxes;
  };

  return (
      <Grow in timeout={620}>
        <div className={classes.root}>
          <CreateBattle 
            handleClose={() => setCreateOpen(!createOpen)}
            open={createOpen}
          />
          <div className={classes.topBar}>
            <div className={classes.topBarContainer}>
              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                <h3 style={{margin:0,padding:0}}>Case Battles</h3>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5em"}}>
                  <span style={{display: "flex", alignItems: "center", color: "#9E9FBD", fontSize: "12px"}}>Total Value:</span>
                  <span style={{color: "#fff", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "12px"}}>
                    <img style={{height: 10, width: 10}} src={coin} />
                    {loading ? 0 : (parseCommasToThousands(cutDecimalPoints(games.reduce((a, b) => a + b.price, 0))))}
                  </span>
                </div>
              </div>
              
              <motion.div whileTap={{ scale: 0.97 }} className={classes.createBattle} onClick={() => setCreateOpen(!createOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white"><path d="M10 4.79169V15.2084" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15.2083 10H4.79163" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <span>Create Battle</span>
              </motion.div>
            </div>

            
          </div>
          <div maxWidth="lg" className={classes.rowBattleList}>
            <div spacing={3}>
              {loading ? (
                <Box className={classes.loader}>
                  <ColorCircularProgress />
                </Box>
              ) : games.length > 0 ? (
                <AnimatePresence exitBeforeEnter>
                  {renderGamesBoxes()}
                </AnimatePresence>
              ) : (
                <div className={classes.noGames}>
                  <p>No current active games!</p>
                </div>
              )}
            </div>
          </div>
        </div>     
      </Grow>
  );
};
  
Battles.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Battles);