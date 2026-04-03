import React, { useEffect, useState, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core";
import { chatSocket } from "../../services/websocket.service";
import { useToasts } from "react-toast-notifications";
import debounce from "lodash.debounce";

import PropTypes from "prop-types";
import { connect } from "react-redux";

// MUI Components
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// Components
import ChatRulesModal from "../modals/ChatRulesModal";
import ChatCommandsModal from "../modals/ChatCommandsModal";
import ControlsOnline from "./ControlsOnline";

// Components
import Rain from "./Rain";
import Trivia from "./Trivia";

import notifySound from "../../assets/sounds/notification.mp3";
const notifyAudio = new Audio(notifySound);

// Custom styles
const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
    "& .MuiIconButton-root.Mui-disabled": {
      color: "rgb(91 99 104)",
    },
  },
  icon: {
    color: "#343a5b",
    marginLeft: "auto",
    fontSize: 15,
  },
  online: {
    display: "flex",
    alignItems: "center",
    marginLeft: "1rem",
    color: "#4b4f51",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: ".1em",
    "& span": {
      marginRight: 5,
      color: "#234224",
      fontFamily: "Poppins",
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: ".1em",
    },
    "& p": {
      marginRight: 3,
    },
  },
  giphy: {
    background: "#3c4046",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    width: "285px",
    zIndex: 100,
    fontFamily: "Poppins",
    fontWeight: "500",
    bottom: "4rem",
    left: "10rem",
    opacity: 1,
    pointerEvents: "all",
    transition: "opacity 0.25s ease",
    "& input": {
      background: "#14151D",
      border: "none",
      borderRadius: "6px",
      color: "white",
      fontFamily: "Poppins",
      fontWeight: "500",
      paddingLeft: 10,
      "&::placeholder": {
        fontFamily: "Poppins",
        fontWeight: "500",
        color: "#9d9d9d6b",
      },
    },
  },
  removed: {
    background: "#14151D",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    zIndex: 100,
    bottom: "4rem",
    left: "10rem",
    "& input": {
      background: "#14151D",
      border: "none",
      color: "#e0e0e0",
      fontFamily: "Poppins",
      fontSize: "13px",
      fontWeight: 500,
      letterSpacing: ".1em",
      paddingLeft: 10,
      "&::placeholder": {
        color: "#9d9d9d6b",
        fontFamily: "Poppins",
        fontSize: "13px",
        fontWeight: 500,
        letterSpacing: ".1em",
      },
    },
    opacity: 0,
    pointerEvents: "none",
    transition: "opacity 0.25s ease",
  },
  subFaq: {
    textDecoration: "none",
    "& > button": {
      color: "#707479",
      fontFamily: "Poppins",
      fontSize: "12.5px",
      fontWeight: 500,
      letterSpacing: ".05em",
      "& img": {
        opacity: 0.15,
      },
      "&:hover": {
        backgroundColor: "#14151D",
        color: "#e0e0e0",
        "& span .MuiButton-startIcon": {
          color: "hsl(230, 50%, 50%)",
        },
      },
      "&:active": {
        color: "#e0e0e0",
      },
      "& span .MuiButton-startIcon": {
        marginRight: "20px",
        marginLeft: "21px",
      },
    },
  },
  reverse5: {
    marginTop: "30px",
    right: "29px",
    position: "absolute",
    color: "rgb(91 99 104)",
    "&:hover": {
      backgroundColor: "#14151D",
      transition: "125ms ease",
      transform: "scale(1.07)",
    },
    "& .MuiIconButton-root.Mui-disabled": {
      color: "rgb(91 99 104)",
    },
  },
  reverse: {
    textTransform: "capitalize",
  },
  reverse2: {
    display: "flex",
    outline: "none",
    minWidth: 0,
    minHeight: 0,
    flexShrink: 0,
    padding: "8px 9px 2px 9px",
    borderRadius: "50%",
    marginRight: "4px",
    "&:hover": {
      backgroundColor: "#29363d",
    },
  },
  reverse3: {
    display: "flex",
    minWidth: 0,
    minHeight: 0,
    flexShrink: 0,
    padding: "8px 9px 2px 9px",
    borderRadius: "50%",
    marginRight: "80px",
    [theme.breakpoints.down("xs")]: {
      marginRight: "160px",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "160px",
    },
    [theme.breakpoints.down("md")]: {
      marginRight: "160px",
    },
    "&:hover": {
      backgroundColor: "#29363d",
    },
  },
  lower: {
    display: "flex",
    background: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 0 0 0",
    color: "#fff",
    textAlign: "center",
    fontWeight: 500,
  },
  popupButton: {
    flex: "none",
    border: "none",
    cursor: "pointer",
    height: "2.25rem",
    display: "inline-flex",
    outline: "none",
    padding: "0 0.75rem",
    position: "relative",
    alignItems: "center",
    fontWeight: "bold",
    userSelect: "none",
    whiteSpace: "nowrap",
    willChange: "opacity",
    borderRadius: "0.25rem",
    justifyContent: "center",
    transitionDuration: "350ms",
    fontWeight: 500,
    color: "#9E9FBD",
    backgroundColor: "hsla(220, 100%, 82%, 0)",
    "&:hover": {
      backgroundColor: "#313A4D",
      filter: "brightness(130%)"
    }
  },
  buttonIcon: {
    marginRight: ".5em",
    fill: "currentColor",
    flex: "none",
    width: "1.25em",
    height: "1.25em",
    display: "inline-block",
    outline: "none",
  },
  boxed: {
    width: "calc(100% - 2rem)",
    borderRadius: "0.25rem",
    margin: "1rem",
    padding: "1rem",
    paddingBottom: 0,
    marginBottom: 10,
    fontWeight: 400,
    color: "hsl(220, 22%, 90%)",
    background: "#14151D"
  },
  sendButton: {
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    cursor: "pointer",
    transitionDuration: "300ms",
    "&:hover": {
      filter: "brightness(125%)"
    }
  },
  emojiBox: {
    backgroundColor: "#14151D",
    borderRadius: "0.75rem",
    padding: "0.75rem",
    margin: "0.5rem 0",
    display: "flex",
    gap: "0.45rem"
  },
  image: {
    height: 24,
    width: 24,
    cursor: "pointer",
  },
  onlineContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    color: "#9E9FBD",
  }
}));

const ChatInput = withStyles({
  root: {
    width: "100%",
    background: "#0D0F13",
    borderRadius: "0.25rem",
    "& :before": {
      display: "none",
    },
    "& :after": {
      display: "none",
    },
    "& label": {
      color: "#fff",
      fontSize: 15,
    },
    "& .MuiInputLabel-root": {
      display: "none"
    },
    "& .MuiInputBase-root": {
      padding: "1.5rem 0.4rem"
    },
    "& div input": {
      color: "#fff",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: ".1em",
      padding: "1rem 0.25rem",
    },
    "& div": {
      height: "2.5rem",
      borderRadius: 4,
    },
  }
})(TextField);

const Controls = ({ isAuthenticated, rain, trivia }) => {
  // Declare state
  const classes = useStyles();
  const { addToast } = useToasts();

  const [input, setInput] = useState("");
  const [usersOnline, setUsersOnline] = useState(0);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [createRainVisible, setCreateRainVisible] = useState(false);
  const [notificationOn, setNotificationOn] = useState(true);
  const [openCommands, setOpenCommands] = useState(false);

  // TextField onKeyPress event handler
  const sendMessage = useCallback(
    debounce((message) => {
      chatSocket.emit("send-chat-message", message);
    }, 1500),
    []
  );

  const onKeyPress = (es) => {
    if (es.key === "Enter") {
      sendMessage(input);
      setInput("");
      return false;
    }
  };

  const onClick = () => {
    sendMessage(input);
    setInput("");
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onEmoji = (e) => {
    sendMessage(e);
  };

  const onFocus = () => {
    const agreed = Boolean(window.localStorage.getItem("chat-rules-agreed"));

    if (!agreed) {
      setChatModalVisible(state => !state);
      window.localStorage.setItem("chat-rules-agreed", "true");
    }
  };


  const notify = (msg) => {
    notifyAudio.play();
    addToast(msg, { appearance: "info" });
  };

  const updateUsersOnline = newCount => {
    setUsersOnline(newCount+10);
  };

  useEffect(() => {
    chatSocket.on("users-online", updateUsersOnline);
    chatSocket.on("notification", notify);
    return () => {
      chatSocket.off("users-online", updateUsersOnline);
      chatSocket.off("notification", notify);
    };
  }, []);


  return (
    <Box>
      <ChatRulesModal
        open={chatModalVisible}
        handleClose={() => setChatModalVisible(!chatModalVisible)}
      />
      <ChatCommandsModal
        open={openCommands}
        handleClose={() => setOpenCommands(!openCommands)}
      />
      {trivia && trivia.active && <Trivia trivia={trivia} />}
      <Box className={classes.input}>
        <ChatInput
          label={isAuthenticated ? "Type your message..." : "Sign in or Sign up to chat"}
          variant="filled"
          onChange={onChange}
          onFocus={onFocus}
          onKeyPress={onKeyPress}
          value={input}
          InputProps={{
            endAdornment: (
            <svg className={classes.sendButton} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.94011 8.19915L3.69211 7.44243C1.33911 6.65035 0.162109 6.25431 0.162109 5.52588C0.162109 4.79845 1.33911 4.4014 3.69211 3.60932L12.2051 0.742061C13.8611 0.184371 14.6891 -0.0944744 15.1261 0.347031C15.5631 0.788536 15.2871 1.62507 14.7361 3.29713L11.8971 11.8989C11.1131 14.2762 10.7211 15.4653 10.0001 15.4653C9.28011 15.4653 8.88711 14.2762 8.10311 11.8989L7.35311 9.62874L11.7071 5.22986C11.8893 5.03931 11.9901 4.7841 11.9878 4.5192C11.9855 4.2543 11.8803 4.0009 11.6949 3.81358C11.5095 3.62627 11.2587 3.52001 10.9965 3.51771C10.7343 3.51541 10.4817 3.61724 10.2931 3.80128L5.94011 8.19915Z" fill="#B95FFF"/>
            </svg>
            ),
            startAdornment: (<></>),
          }}
        />
        <div className={classes.lower}>
          <div className={classes.popupButton} onClick={() => setOpenCommands(!openCommands)}>
            <svg className={classes.buttonIcon} xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V18C22 19.6569 20.6569 21 19 21H5C3.34315 21 2 19.6569 2 18V6ZM5 5C4.44772 5 4 5.44772 4 6V7H20V6C20 5.44772 19.5523 5 19 5H5ZM4 18V9H20V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18ZM7.70711 11.2929C7.31658 10.9024 6.68342 10.9024 6.29289 11.2929C5.90237 11.6834 5.90237 12.3166 6.29289 12.7071L7.58579 14L6.29289 15.2929C5.90237 15.6834 5.90237 16.3166 6.29289 16.7071C6.68342 17.0976 7.31658 17.0976 7.70711 16.7071L9.70711 14.7071C10.0976 14.3166 10.0976 13.6834 9.70711 13.2929L7.70711 11.2929Z" fill="currentColor"/></svg>
            Commands      
          </div>
          <div className={classes.popupButton} onClick={() => setChatModalVisible(!chatModalVisible)} >
            <svg className={classes.buttonIcon} tabIndex="-1" viewBox="0 0 448 512"><path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg>
            Rules
          </div>
        </div>
      </Box>
    </Box>
  );
};

Controls.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Controls);