import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useToasts } from "react-toast-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import { getUserProfileData } from "../../../services/api.service";
import parseCommasToThousands from "../../../utils/parseCommasToThousands";
import { Line } from 'react-chartjs-2';
import { chatSocket } from "../../../services/websocket.service";
import coin from "../../../assets/icons/coin.svg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";

const ColorCircularProgress = withStyles({
  root: {
    color: "#9E9FBD !important",
  },
})(CircularProgress);

const useStyles = makeStyles(theme => ({
  modal: {
    "& .MuiDialog-paperWidthSm": {
      scrollbarWidth: "none",
      background: "#101117",
      borderRadius: "0.5em",
      width: "50%",
      color: "#fff",
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
    paddingBottom: "1em",
    fontFamily: "Poppins", 
    backgroundColor: "#14151D", 
    justifyContent: "space-between",
    width: "100%"
  },
  content: {
    display: "block",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
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
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "15rem",
    gap: "0.75rem",
    color: "#9E9FBD"
  },
  upperInfo: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "0.5rem"
  },
  userContainer: {
    margin: "auto",
    display: "flex",
    alignItems: "center",
    gap: "1rem",  
    marginBottom: "1rem",
    width: "100%",
    height: "120px",
    backgroundColor: "#14151D",
    backgroundBlendMode: "overlay",
    paddingLeft: 30,
    paddingRight: 30,
  },
  avatar: {
    height: 75,
    width: 75,
    borderRadius: 300,
    border: "2px solid #EF3939",
    padding: 10
  },
  boxesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20
  },
  box: {
    display: "flex",
    padding: "1rem",
    // border: "1px solid hsl(220, 22%, 62%)",
    borderRadius: "0.25rem",
    backgroundColor: "#181923",
    fontSize: "10px",
    color: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "calc(50% - 0.25rem)",
    gap: "0.2rem"
  },
  number: {
    fontSize: "15px", 
    color: "#B95FFF", 
    display: "flex", 
    alignItems: "center", 
    gap: "0.2rem",
  },
  lowerInfo: { 

  }
}));

const Profile = ({ open, handleClose, userid, isLoading, isAuthenticated, user, logout }) => {
  // Declare State
  const classes = useStyles();
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getUserProfileData(userid);
      setProfile(response);
      setLoading(false);
    } catch (error) {
      console.log("Error getting user profile data: " + error);
    }
  };


  useEffect(() => {
    if(open) fetchData();
  }, [open])

  const formatDate = (date) => {
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric' 
    };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return (
      <Dialog
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >  
        <div className={classes.content} >
          {loading ? (
            <div className={classes.loader}>
              <ColorCircularProgress />
              Loading...
            </div>
          ) : (
            <>
              <div className={classes.upperInfo}>
                <div className={classes.userContainer}>
                  <img className={classes.avatar} src={profile.avatar} alt="avatar" />
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: 5,
                  }}>
                    <a>{profile.username} <a style={{color: "#C3C3C3"}}>(ID: {profile._id})</a></a>
                    <a style={{color: "#C3C3C3"}}>Joined {formatDate(profile.created)}</a>
                  </div>
                </div>
                <div className={classes.boxesContainer}>
                  <div className={classes.box}>
                    <a style={{display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: 'flex-start',
                      gap: "0.3rem"
                    }}>
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.67 2.15001C17.89 0.850012 16.46 0.200012 14.9 0.200012H7.10002C5.54002 0.200012 4.11002 0.850012 3.33002 2.15001C0.340024 6.70001 -0.309976 13.59 1.77002 15.02C3.85002 16.45 8.53002 10.21 11 10.21C13.47 10.21 18.02 16.45 20.23 15.02C22.31 13.59 21.66 6.70001 18.67 2.15001ZM8.40002 6.70001H7.10002V8.00001H5.80002V6.70001H4.50002V5.40001H5.80002V4.10001H7.10002V5.40001H8.40002V6.70001ZM15.42 7.35001C15.42 8.00001 14.9 8.52001 14.25 8.52001C13.6 8.52001 13.08 8.00001 13.08 7.35001C13.08 6.70001 13.6 6.18001 14.25 6.18001C14.9 6.18001 15.42 6.70001 15.42 7.35001ZM17.89 4.75001C17.89 5.40001 17.37 5.92001 16.72 5.92001C16.07 5.92001 15.55 5.40001 15.55 4.75001C15.55 4.10001 16.07 3.58001 16.72 3.58001C17.37 3.58001 17.89 4.10001 17.89 4.75001Z" fill="#B95FFF"/>
                    </svg>
                    Games Played
                    </a>
                    <div className={classes.number}>
                      {profile.gamesPlayed}
                    </div>
                  </div>
                  {profile.robloxUsername &&
                  <div className={classes.box}>
                    <a style={{display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: 'flex-start',
                      gap: "0.3rem"
                    }}>
                    <svg style={{width: 16, height: 16}} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_4172_2)">
                    <path d="M5.57317 12.5662C0.444001 11.2435 0.023122 11.1325 0.027747 11.1093C0.032372 11.0816 2.87215 0.0231187 2.87677 0.0184937C2.87677 0.0184937 5.3743 0.656749 8.4222 1.44301C11.4701 2.22926 13.9722 2.86752 13.9769 2.86752C13.9861 2.86752 13.9861 2.88602 13.9815 2.90914C13.9722 2.97852 11.1371 13.9769 11.1278 13.9861C11.1278 13.9907 8.6257 13.3525 5.57317 12.5662ZM8.08919 7.30756C8.2372 6.7248 8.36207 6.23917 8.3667 6.2253C8.37132 6.20217 8.26032 6.1698 7.29369 5.92005C6.70168 5.76742 6.2068 5.64717 6.20218 5.65179C6.1883 5.66567 5.64255 7.80706 5.64717 7.81169C5.65642 7.82094 7.80707 8.37594 7.81169 8.37132C7.81169 8.36669 7.93657 7.89031 8.08919 7.30756Z" fill="#B95FFF"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_4172_2">
                    <rect width="14" height="14" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                    Roblox Username
                    </a>
                    <div className={classes.number}>
                      {profile.robloxUsername && profile.robloxUsername}
                    </div>
                  </div>
                  }
                  <div className={classes.box}>
                    <a style={{display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: 'flex-start',
                      gap: "0.3rem"
                    }}>
                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 11.25V14.5M17.5 14.5V17.75M17.5 14.5H14.25M17.5 14.5H20.75" stroke="#B95FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.41663 0.416687C2.55467 0.416687 1.72802 0.759097 1.11853 1.36859C0.509036 1.97808 0.166626 2.80473 0.166626 3.66669V12.3334C0.166626 13.1953 0.509036 14.022 1.11853 14.6315C1.72802 15.2409 2.55467 15.5834 3.41663 15.5834H11.0899C11.0299 15.2254 10.9998 14.863 11 14.5C11 13.2564 11.3488 12.095 11.9544 11.1081C11.4682 11.2572 10.9539 11.2902 10.4527 11.2044C9.95145 11.1187 9.47734 10.9165 9.06844 10.6142C8.65953 10.312 8.32724 9.91798 8.09825 9.46396C7.86926 9.00993 7.74997 8.50852 7.74996 8.00002C7.75061 7.53282 7.85198 7.07126 8.04716 6.64678C8.24235 6.22231 8.52675 5.84491 8.88099 5.5403C9.23524 5.23569 9.65099 5.01104 10.0999 4.88165C10.5488 4.75227 11.0204 4.7212 11.4824 4.79055C11.9444 4.85991 12.3861 5.02806 12.7772 5.28355C13.1684 5.53904 13.4998 5.87585 13.749 6.27104C13.9982 6.66623 14.1593 7.11051 14.2213 7.57358C14.2832 8.03665 14.2446 8.50764 14.108 8.95444C15.1286 8.3286 16.3028 7.99821 17.5 8.00002C19.165 8.00002 20.6839 8.62619 21.8333 9.65535V3.66669C21.8333 2.80473 21.4909 1.97808 20.8814 1.36859C20.2719 0.759097 19.4452 0.416687 18.5833 0.416687H3.41663ZM11 6.91669C10.7126 6.91669 10.4371 7.03082 10.2339 7.23399C10.0308 7.43715 9.91663 7.7127 9.91663 8.00002C9.91663 8.28734 10.0308 8.56289 10.2339 8.76605C10.4371 8.96922 10.7126 9.08335 11 9.08335C11.2873 9.08335 11.5628 8.96922 11.766 8.76605C11.9692 8.56289 12.0833 8.28734 12.0833 8.00002C12.0833 7.7127 11.9692 7.43715 11.766 7.23399C11.5628 7.03082 11.2873 6.91669 11 6.91669Z" fill="#B95FFF"/>
                    </svg>

                    Wagered
                    </a>
                    <div className={classes.number}>
                      <img style={{height: 17, width: 17}} src={coin} />                      
                      {parseCommasToThousands(profile.wager)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}     
        </div> 
      </Dialog>
  );
};

Profile.propTypes = {
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

export default connect(mapStateToProps, { logout })(Profile);