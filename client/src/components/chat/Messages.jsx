import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { getTrades, cancelWithdrawItemsMM2, cancelListing } from "../../services/api.service";
import CancelConfirmationModal from "../modals/cancelConfirmationModal"
// import ScrollToBottom from "react-scroll-to-bottom";
import PropTypes from "prop-types";

// Components
// MUI Components
import { Box, Typography, Button } from "@material-ui/core";
import ModeratedMessage from "./ModeratedMessage";
import SkeletonMessage from "./SkeletonMessage";

import coin from "../../assets/icons/coin.svg"

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "1 1",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "auto",
    maskImage: "linear-gradient(0deg,rgba(0,0,0,1) 80%,rgba(0,0,0,0))",
    scrollbarWidth: "none",
    transitionDuration: "300ms",
  },
  box: {
    background: "#848dad0a",
  },
  content: {
    color: "#707479",
    fontSize: 13,
    fontFamily: "Poppins",
    fontWeight: 500,
    letterSpacing: ".1em",
    whiteSpace: "normal",
    marginTop: 7,
    marginRight: "20px",
    wordWrap: "break-word",
    hyphens: "auto",
  },
  avatar: {
    width: 35,
    height: 35,
    border: "2px solid #3b4047",
    marginTop: "-5px",
    marginLeft: "20px",
    marginRight: "8px",
    margin: "0px 15px",
    borderRadius: "100%",
  },
  chatbox: {
    display: "flex",
    padding: "20px 0px 20px 0px",
    // borderTop: "1.5px solid #1b1f22",
    fontFamily: "Poppins",
    borderRadius: 0,
    "& .message": {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      "& > div": {
        maxWidth: "210px",
      },
    },
    "& .message .username": {
      color: "#e0e0e0",
      fontFamily: "Poppins",
      textTransform: "uppercase",
      fontWeight: 500,
      letterSpacing: ".1em",
      position: "relative",
      marginTop: "7px",
      fontSize: "9.6px",
    },
    "& .admin": {
      background: "#ca382d",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Poppins",
      fontWeight: 500,
      letterSpacing: ".15em",
    },
    "& .mod": {
      background: "#3e8441",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Poppins",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .dev": {
      background: "#0b655c",
      borderRadius: "5.1px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 4.5px",
      color: "#fff",
      fontFamily: "Poppins",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .partner": {
      background: "#791f84",
      borderRadius: "5.1px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 4.5px",
      color: "#fff",
      fontFamily: "Poppins",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .user": {
      background: "#31363c",
      borderRadius: 3,
      fontSize: "9.6px",
      marginRight: 10,
      padding: "5px 10px",
      color: "#fff",
      fontFamily: "Poppins",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .userlevel": {
      background: "#31363c",
      fontSize: "9px",
      padding: "5px 4.5px",
      color: "#9d9d9d",
      fontFamily: "Poppins",
      marginRight: "8px",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
      borderRadius: "2.5px",
    },
    "& .bronze": {
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Poppins",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .silver": {
      background: "#95A5A6",
      borderRadius: "5.1px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Poppins",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .gold": {
      background: "#b99309",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Poppins",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
    "& .diamond": {
      background: "#3498DB",
      borderRadius: "2.5px",
      fontSize: "9.4px",
      marginRight: 10,
      padding: "5px 5.1px",
      color: "#fff",
      fontFamily: "Poppins",
      fontWeight: 500,
      letterSpacing: ".15em",
      marginTop: "-4px",
    },
  },
  gif: {
    width: "100%",
    borderRadius: 5,
    marginTop: 5,
  },
  header: {
    zIndex: 100,
    backgroundColor: "#14151D",
    width: "100% - 2rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "1rem 1rem",
    borderRadius: "3px",
  },
  message: {
    fontWeight: 500,
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: "#898A8E",
    fontSize: 11,
    fontFamily: "Poppins",
    fontWeight: 500,
    letterSpacing: ".1em",
    whiteSpace: "normal",
    marginTop: 7,
    wordWrap: "break-word",
    width: "100%",
    width: 257.2,
    maxWidth: 257.2,
  },
  button: {
    background: "linear-gradient(180deg, #b95fff 0%, #801bff 100%)",
    color: 'white',
    padding: theme.spacing(1.5, 4),
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 267.2,
    maxWidth: 267.2,
    textDecoration: "none",
    '&:hover': {
      filter: 'brightness(90%)',
      cursor: 'pointer',
      scale: 1.02
    },
  },
}));

const Messages = ({ chatMessages, loading, user, blur, open }) => {
  const classes = useStyles();
  const emptyDiv = useRef(null);
  const [test, setTest] = useState(false);
  const [trades, setTrades] = useState(null);
  const [withdraws, setWithdraws] = useState(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cancelType, setCancelType] = useState("");

  useEffect(() => {
    const fetchTrades = async () => {
      if (!test) {
        setTest(true)
        let trader = await getTrades()

        if (trader.listings) {
          setTrades(trader.listings)
        }

        if (trader.withdrawals) {
          setWithdraws(trader.withdrawals)
        }
      }
    }

    fetchTrades();
  })

  // Scroll chat using ref
  const scrollChat = () => {
    // Call method on that element
    if (emptyDiv && emptyDiv.current)
      emptyDiv.current.scrollIntoView({ behavior: "smooth" });
      emptyDiv.current.scrollTop = emptyDiv.current.scrollHeight;
  };

  const cancelMM2 = async (item) => {
    try {
      await cancelWithdrawItemsMM2(item);
      let trader = await getTrades()

      if (trader.listings) {
        setTrades(trader.listings)
      }

      if (trader.withdrawals) {
        setWithdraws(trader.withdrawals)
      }
    } catch (error) {
      console.log("Error cancelling item", error);
    }
  }

  // When chat messages change
  useEffect(() => {
    scrollChat();
  }, [chatMessages]);

  // When messages load the first time
  useEffect(() => {
    // Set timeout for animation
    const timeout = setTimeout(() => {
      // If messages are loaded
      if (chatMessages) scrollChat();
    }, 500);

    // Clear function
    return () => {
      // Save memory and remove timeout
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, [loading]);

  const handleCancelClick = (item, type) => {
    setSelectedItem(item);
    setCancelType(type);
    setCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (cancelType === "withdrawal") {
      await cancelMM2(selectedItem);
    } else if (cancelType === "listing") {
      await cancelList(selectedItem);
    }
    setCancelModalOpen(false);
  };

  const cancelList = async (selectedItem) => {
    try {
      await cancelListing(selectedItem);
      let trader = await getTrades()

      if (trader.listings) {
        setTrades(trader.listings)
      }

      if (trader.withdrawals) {
        setWithdraws(trader.withdrawals)
      }
    } catch (error) {
      console.log("Error withdrawing MM2 items:", error);
    }
  };

  return (
    <Box className={classes.root} style={{ filter: blur ? "blur(5px)" : ""}}>
      {open ? (
        <Box style={{maxHeight: "100px"}}>
          {loading
            ? Array(15)
              .fill()
              .map((element, index) => <SkeletonMessage key={index} />)
            : chatMessages.map((message, idx) =>
              <ModeratedMessage rank={user && user.rank ? user.rank : null} key={message.msgId} message={message} />
            )}
            <Box style={{ float: "left", clear: "both" }} ref={emptyDiv}></Box>
        </Box>
      ) : (
        <div style={{display: "flex",
          marginTop: 10,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
          {trades === null && (
            <>
              <Typography variant="body1" className={classes.message}>
                You have no active trades, Select an item on the marketplace to begin a trade.
              </Typography>
              <a href="/marketplace" variant="contained" className={classes.button}>
                Go to marketplace
              </a>
            </>
          )}
          {withdraws !== null && withdraws.map((item, index) => {
            return (
              <div key={index} style={{backgroundColor: "#0E0F15", minHeight: "80px", width: "100%", marginTop: -10, borderRadius: 5, border: "1px solid #252734", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10, position: "relative" }} className={classes.message}>
                <div style={{width: "100%", maxWidth:"300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", flexDirection: "column", height: "100%", paddingTop: 10, position: "relative"}}>
                  <a style={{color: "#FFF", fontWeight: "400", fontSize: 11}}>{item}</a>
                  {item.price && (<a style={{color: "#B95FFF", fontWeight: "500", fontSize: 11, display: "flex", gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "center"}}><img src={coin} style={{width: 22, height: 22}} />{item.price}</a>)}
                  <a style={{color: "#898A8E", fontWeight: "400", fontSize: 11}}>Withdraw <span style={{color: "#D9D9D9", opacity: 0.05}}>|</span> <span style={{color: "#EEDD43"}}>Pending</span></a>
                  {/*<div style={{position: "absolute", top: 20, right: 10, fontWeight: 500, fontSize: 10, fontColor: "white", paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 5, background: "linear-gradient(180deg, #ff5f5f 0%, #ff1b1b 100%)", color: "#FFF"}} onClick={() => cancelMM2(item)}>Cancel</div>*/}
                </div>
              </div>
            )
          })}
          {trades !== null && trades.map((item, index) => {
            return (
              <div key={index} style={{backgroundColor: "#0E0F15", minHeight: "80px", width: "100%", marginTop: -10, borderRadius: 5, border: "1px solid #252734", display: "flex", alignItems: "center", justifyContent: "flex-start", position: "relative" }} className={classes.message}>
                <div style={{width: "100%", maxWidth:"60px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <img src={item.thumbnail} style={{width: 40, height: 40}} />
                </div>
                <div style={{width: "100%", maxWidth:"300px", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", flexDirection: "column", height: "100%", paddingTop: 10, position: "relative"}}>
                  <a style={{color: "#FFF", fontWeight: "400", fontSize: 11}}>{item.display_name}</a>
                  <a style={{color: "#B95FFF", fontWeight: "500", fontSize: 11, display: "flex", gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "center"}}><img src={coin} style={{width: 22, height: 22}} />{item.price}</a>
                  <a style={{color: "#898A8E", fontWeight: "400", fontSize: 11}}>Sale <span style={{color: "#D9D9D9", opacity: 0.05}}>|</span> <span style={{color: "#EEDD43"}}>Pending</span></a>
                  <div 
                    style={{position: "absolute", top: 20, right: 10, fontWeight: 500, fontSize: 10, fontColor: "white", paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 5, background: "linear-gradient(180deg, #ff5f5f 0%, #ff1b1b 100%)", color: "#FFF", cursor: "pointer"}} 
                    onClick={() => handleCancelClick(item, "listing")}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <CancelConfirmationModal
        open={cancelModalOpen}
        handleClose={() => setCancelModalOpen(false)}
        item={selectedItem}
        onConfirm={handleCancelConfirm}
        type={cancelType}
      />
      {/**/}
    </Box>
  );
};

Messages.propTypes = {
  chatMessages: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Messages);
