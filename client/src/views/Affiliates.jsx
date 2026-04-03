import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getUserAffiliatesData,
  updateUserAffiliateCode,
  claimUserAffiliateEarnings,
} from "../services/api.service";
import { Redirect } from "react-router-dom";
import parseCommasToThousands from "../utils/parseCommasToThousands";
import { useToasts } from "react-toast-notifications";
import { changeWallet } from "../actions/auth";
import Footer from "../components/app/Footer";

// Import images
import image13 from "../assets/image-13.png";
import image21 from "../assets/image-2-1.png";
import case1 from "../assets/case1.png";
import copyIcon from "../assets/352285_content_copy_icon.svg";

import Coin from "../assets/icons/coin.svg";
import MyGraphic from "../assets/affbanner12 (1).svg";  // <-- Import your image here

// MUI Components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from "@material-ui/lab/Skeleton";
import Grow from '@material-ui/core/Grow';

import success from "../assets/success.wav";
import error from "../assets/error.wav";

const errorAudio = new Audio(error);
const successAudio = new Audio(success);

const playSound = audioFile => {
  audioFile.play();
};

// Custom Styles
const useStyles = makeStyles(theme => ({
  profile: {
    color: "#e0e0e0",
    [theme.breakpoints.down("xs")]: {
      margin: "2rem 0",
      padding: "2rem 1.5rem 2rem 1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "2rem 0",
      padding: "2rem 1.5rem 2rem 1.5rem",
    },
    [theme.breakpoints.down("md")]: {
      margin: "2rem 0",
      padding: "2rem 1.5rem 2rem 1.5rem",
    },
    "& > h1": {
      color: "#e4e4e4",
      fontFamily: "Poppins",
      fontSize: "20px",
      fontWeight: 500,
      letterSpacing: ".1em",
      margin: 0,
      marginBottom: "1rem",
    },
    "& .saveBtn": {
      left: "1rem",
      height: 50,
      width: "6rem",
      background: "hsl(272, 86%, 47%)",
      color: "#000",
      fontFamily: "Poppins",
      fontSize: "13px",
      fontWeight: 500,
      letterSpacing: ".1em",
      [theme.breakpoints.down("xs")]: {
        left: "0rem",
        marginBottom: "50px",
      },
      [theme.breakpoints.down("sm")]: {
        left: "0rem",
        marginBottom: "50px",
      },
      [theme.breakpoints.down("md")]: {
        left: "0rem",
        marginBottom: "50px",
      },
      "& .MuiButton-label": {
      },
    },
  },
  userWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#14151D",
    minHeight: 300,
    borderRadius: "10px",
    // border: "2px solid #2f3947",
    padding: "2rem",
    height: "fit-content",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    "& input": {
      color: "#e4e4e4",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: ".05em",
    },
    "& label": {
      color: "#5f6368",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: ".1em",
    },
    "& label.Mui-focused": {
      color: "#5f6368",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: ".1em",
    },
    "& .MuiInput-underline:after": {
      border: "1px solid #2f3947",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid #2f3947",
      },
      "&:hover fieldset": {
        border: "1px solid #2f3947",
      },
      "&.Mui-focused fieldset": {
        border: "1px solid #2f3947",
      },
    },
    "& > div": {
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginBottom: 20,
      },
      "& > div": {
        width: "100%",
      },
    },
  },
  userWrap2: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      display: "unset",
    },
    [theme.breakpoints.down("sm")]: {
      display: "unset",
    },
    [theme.breakpoints.down("md")]: {
      display: "unset",
    },
  },
  grid: {
    flexWrap: "nowrap",
    justifyContent: "space-between",
    margin: "1rem 0 2rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    "& .stats": {
      width: "24%",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        width: "100%",
        marginTop: 20,
      },
    },
    "& .earnings": {
      width: "49%",
      background: "#1D2126",
      borderRadius: "10px",
      // border: "2px solid #2f3947",
      color: "#e0e0e0",
      fontFamily: "Poppins",
      fontSize: "13px",
      fontWeight: 500,
      letterSpacing: ".05em",
      position: "relative",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        fontSize: 11,
        marginTop: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        fontSize: 11,
        marginTop: "20px",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
        fontSize: 11,
        marginTop: "20px",
      },
      "& > button": {
        position: "absolute",
        background: "hsl(230, 50%, 50%)",
        color: "#e0e0e0",
        fontFamily: "Poppins",
        fontSize: "13px",
        fontWeight: 500,
        letterSpacing: ".05em",
        width: "6rem",
        right: "2rem",
        [theme.breakpoints.down("xs")]: {
          width: "5rem",
          right: "0.8rem",
        },
        [theme.breakpoints.down("sm")]: {
          width: "5rem",
          right: "0.8rem",
        },
        [theme.breakpoints.down("md")]: {
          width: "5rem",
          right: "0.8rem",
        },
        "& .MuiButton-label": {
        },
      },
    },
    "& > div": {
      
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      background: "#1D2126",
      borderRadius: "10px",
      // border: "2px solid #2f3947",
      height: "7rem",
      padding: "0 2rem",
      color: "#9d9d9d",
      fontFamily: "Poppins",
      fontSize: "13px",
      fontWeight: 500,
      letterSpacing: ".05em",
      "& svg": {
        marginRight: "0.25rem",
        color: "hsl(230, 50%, 50%)",
      },
      "& h1": {
        margin: 0,
        color: "#e0e0e0",
        fontFamily: "Poppins",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: ".05em",
      },
    },
  },
  tran: {
    
    background: "#1D2126",
    borderRadius: "10px",
    // border: "2px solid #2f3947",
    padding: "2rem",
    paddingTop: "1rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
    "& th": {
      borderBottom: "none",
      color: "#000",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: ".1em",
      textTransform: "uppercase",
      paddingLeft: 0,
    },
    "& .MuiAvatar-root": {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
    },
    "& td": {
      borderBottom: "1px #2f3947 solid",
      color: "#9d9d9d",
      fontFamily: "Poppins",
      fontSize: "13px",
      fontWeight: 500,
      letterSpacing: ".05em",
      paddingLeft: 0,
      "&:nth-child(1)": {
        paddingLeft: "1rem",
      },
    },
  },
  bgInput: {
    "& .MuiOutlinedInput-root": {
    },
  },
  desktop: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "36rem",
  },
  noAffiliates: {
    width: "100%",
    textAlign: "center",
    padding: "2rem 0 1rem 0",
    color: "#9d9d9d",
    fontFamily: "Poppins",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: ".05em",
  },
}));

// Custom Component
const ColorCircularProgress = withStyles({
  root: {
    color: "#4f79fd",
  },
})(CircularProgress);

const Affiliates = ({ isAuthenticated, isLoading, user, changeWallet }) => {
  // Declare State
  const classes = useStyles();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [affiliatesData, setAffiliatesData] = useState(null);
  const [affiliateCode, setAffiliateCode] = useState("Loading...");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addToast("Link copied to clipboard!", { appearance: "success" });
  };

  // Get affiliates data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getUserAffiliatesData();

      // Update state
      setAffiliatesData(data);
      setAffiliateCode(data.affiliateCode);
      setLoading(false);
    } catch (error) {
      console.log(
        "There was an error while loading user affiliates data:",
        error
      );
    }
  };

  // Save user affiliate code
  const saveAffiliateCode = async () => {
    setSaving(true);
    try {
      const response = await updateUserAffiliateCode(affiliateCode);

      // Update state
      setSaving(false);
      setAffiliateCode(response.newAffiliateCode);
      setAffiliatesData(state =>
        state ? { ...state, affiliateCode: response.newAffiliateCode } : null
      );
      addToast("Successfully updated your affiliate code!", {
        appearance: "success",
      });
      playSound(successAudio);
    } catch (error) {
      setSaving(false);

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
          playSound(errorAudio);
        }
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        addToast(error.response.data.error, { appearance: "error" });
        playSound(errorAudio);
      } else {
        console.log(
          "There was an error while updating user affiliate code:",
          error
        );
        addToast(
          "There was an error while updating your affiliate code. Please try again later!",
          { appearance: "error" }
        );
        playSound(errorAudio);
      }
    }
  };

  // Claim user affiliate earnings
  const claimEarnings = async () => {
    setClaiming(true);
    try {
      const response = await claimUserAffiliateEarnings();

      // Update state
      setClaiming(false);
      setAffiliatesData(state =>
        state ? { ...state, affiliateMoneyAvailable: 0 } : null
      );
      addToast(`Successfully claimed ${response.claimedAmount} gems!`, {
        appearance: "success",
      });
      playSound(successAudio);

      // Update redux state
      changeWallet({ amount: response.claimedAmount });
    } catch (error) {
      setClaiming(false);

      // Check if user caused this error
      if (error.response && error.response.data && error.response.data.error) {
        addToast(error.response.data.error, { appearance: "error" });
        playSound(errorAudio);
      } else {
        console.log(
          "There was an error while claiming user affiliate earnings:",
          error
        );
        addToast(
          "There was an error while claiming your affiliate earnings. Please try again later!",
          { appearance: "error" }
        );
        playSound(errorAudio);
      }
    }
  };

  // Input onChange event handler
  const onChange = (e, newValue) => {
    setAffiliateCode(e.target.value);
  };

  // componentDidMount
  useEffect(() => {
    if (!isLoading && isAuthenticated) fetchData();
  }, [isLoading, isAuthenticated]);

  // If user is not logged in
  if (!isLoading && !isAuthenticated) {
    return <Redirect to="/" />;
  }

  return isLoading || !user ? (
    <Box className={classes.loader}>
      <ColorCircularProgress />
    </Box>
  ) : (
    <Box>
      <Box>
        <Grow in timeout={420}>
          <Container>
            <Box className={classes.profile}>
              <Box className={classes.userWrap} style={{position: "relative"}}>
                <p style={{ marginLeft: "5px", fontWeight: 600, fontSize: 35, alignSelf: "flex-start"}}>Invite friends and<br/><span style={{color: "#B95FFF"}}>earn passive income!</span></p>
                <p style={{ marginLeft: "5px", fontWeight: 500, fontSize: 15, alignSelf: "flex-start"}}>Become a MM2Stash partner, invite people and earn money instantly.</p>
                <br />
                <img src={MyGraphic} style={{width: 600, height: 440, position: "absolute", right: 0, bottom: 0}} />  {/* <-- Update the src attribute */}
                <Box className={classes.userWrap2}>
                  <Box position="relative">
                    <TextField
                      className={classes.bgInput}
                      variant="filled"
                      label="SET YOUR CODE"
                      disabled={loading}
                      value={affiliateCode}
                      onChange={onChange}
                      style={{background: "#2B2D3D", outline: "none", color: "#FFF", borderRadius: 10, height: 50}}
                    />
                    <Button
                      className="saveBtn"
                      variant="contained"
                      disabled={saving || loading}
                      onClick={saveAffiliateCode}
                    >
                      {saving ? "SAVING..." : "SAVE"}
                    </Button>
                  </Box>
                  <Box display="flex" alignItems="center" marginTop="10px">
                    <span>{loading ? "LOADING..." : affiliatesData.affiliateLink}</span>
                    {!loading && (
                      <Button onClick={() => copyToClipboard(affiliatesData.affiliateLink)}>
                        <img src={copyIcon} alt="Copy" style={{ width: 24, height: 24, marginLeft: 8 }} />
                      </Button>
                    )}
                  </Box>
                </Box>
                </Box>
              <br /> <br />
              <Grid className={classes.grid} container>
                <Box style={{ display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: 'column', paddingBottom: 30, paddingTop: 30, width: "33%", height: 200, backgroundColor: "#14151D" }}>
                  <img src={image13} style={{width: 110, height: 110, marginTop: 30}} />
                  <a style={{color: "#FFF", fontSize: 14, fontWeight: 500, marginTop: 20}}>Step 1</a>
                  <a style={{color: "#C3C3C3", fontSize: 12, fontWeight: 400, marginTop: 10, marginBottom: 30}}>Set your affiliate code above.</a>
                </Box>
                <Box style={{ display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: 'column', paddingBottom: 30, paddingTop: 30, width: "33%", height: 200, backgroundColor: "#14151D" }}>
                  <img src={image21} style={{width: 110, height: 110, marginTop: 30}} />
                  <a style={{color: "#FFF", fontSize: 14, fontWeight: 500, marginTop: 20}}>Step 2</a>
                  <a style={{color: "#C3C3C3", fontSize: 12, fontWeight: 400, marginTop: 10, marginBottom: 30}}>Share your affiliate code with your friends.</a>
                </Box>
                <Box style={{ display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: 'column', paddingBottom: 30, paddingTop: 30, width: "33%", height: 200, backgroundColor: "#14151D" }}>
                  <img src={case1} style={{width: 110, height: 110, marginTop: 30}} />
                  <a style={{color: "#FFF", fontSize: 14, fontWeight: 500, marginTop: 20}}>Step 3</a>
                  <a style={{color: "#C3C3C3", fontSize: 12, fontWeight: 400, marginTop: 10, marginBottom: 30}}>Enjoy the riches</a>
                </Box>
              </Grid>
              <h1 style={{ marginLeft: "5px", }}>Your Current Stats</h1>
              <Grid className={classes.grid} container>
                <Box className="earnings" style={{backgroundColor: "#14151D"}}>
                  Claimable Earnings
                  <h1>
                    {loading ? (
                      <Skeleton animation="wave" height={40} width={150} />
                    ) : (
                      <span style={{color: "#B95FFF", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10}}><img src={Coin} style={{width: 15, height: 15}}/> {parseCommasToThousands(
                        affiliatesData.affiliateMoneyAvailable.toFixed(2)
                      )}</span>
                    )}
                  </h1>
                  <Button
                    variant="contained"
                    onClick={claimEarnings}
                    disabled={claiming || loading}
                    style={{
                      color: "#000",
                      backgroundColor: "#B95FFF"
                    }}
                  >
                    {claiming ? "CLAIMING..." : "CLAIM"}
                  </Button>
                </Box>
                <Box className="stats" style={{backgroundColor: "#14151D"}}>
                  Total Earned
                  <h1>
                    {loading ? (
                      <Skeleton animation="wave" height={40} width={150} />
                    ) : (
                      `R$${parseCommasToThousands(
                        affiliatesData.affiliateMoney.toFixed(2)
                      )}`
                    )}
                  </h1>
                </Box>
                <Box className="stats" style={{backgroundColor: "#14151D"}}>
                  Total Users
                  <h1>
                    {loading ? (
                      <Skeleton animation="wave" height={40} width={150} />
                    ) : (
                      parseCommasToThousands(affiliatesData.usersAffiliated)
                    )}
                  </h1>
                </Box>
              </Grid>
              <br />
            </Box>
            <Footer />
          </Container>
        </Grow>
      </Box>
    </Box>
  );
};

const LoadingTable = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User</TableCell>
          <TableCell>Total Wager</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array(3)
          .fill()
          .map((element, index) => (
            <TableLoader key={index} />
          ))}
      </TableBody>
    </Table>
  );
};

const TableLoader = () => {
  // Declare State
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Skeleton height={30} width={30} variant="rect" animation="wave" />
          <Box ml="1rem" className={classes.desktop}>
            <Skeleton animation="wave" height={25} width={50} />
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" height={25} width={50} />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" height={25} width={50} />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" height={25} width={100} />
      </TableCell>
    </TableRow>
  );
};

Affiliates.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { changeWallet })(Affiliates);
