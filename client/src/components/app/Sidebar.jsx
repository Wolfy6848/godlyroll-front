import React, { useState } from "react";
import { Box, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import StorefrontIcon from '@material-ui/icons/Storefront';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import TimerIcon from '@material-ui/icons/Timer';
import { useHistory } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Dice from '@material-ui/icons/Casino';
import Mine from '@material-ui/icons/Adjust';
import Upgrader from '@material-ui/icons/KeyboardCapslock';
import HelpIcon from '@material-ui/icons/Help';
import Roulette from '@material-ui/icons/AddCircle';

import RewardsModal from "../modals/rewards/RewardsModal";
import AffiliatesModal from "../modals/affiliates/AffiliatesModal";
import Support from "../modals/user/SupportModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "222px",
    backgroundColor: '#14151D',
    color: '#fff',
    fontFamily: "Poppins, sans-serif",
    padding: theme.spacing(2),
    position: "absolute",
    top: -20,
  },
  menuTitle: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    letterSpacing: 4
  },
  listItem: {
    fontFamily: "Poppins",
    color: '#fff',
    fontWeight: 500,
    fontSize: 14,
    padding: theme.spacing(0.5, 1),
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
  comingSoon: {
    fontFamily: "Poppins",
    color: '#9CA3AF',
    fontSize: 10,
    marginLeft: theme.spacing(1),
  },
  disabledItem: {
    pointerEvents: 'none',
    opacity: 0.5,
  }
}));

const Sidebar = ({ isMinimized }) => {
  const classes = useStyles();
  const history = useHistory();

  const [openRewards, setOpenRewards] = useState(false);
  const [openAffiliates, setOpenAffiliates] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);

  const handleReferFriendClick = () => {
    history.push("/affiliates");
  };

  return (
    <Box className={classes.root}>
      <RewardsModal open={openRewards} handleClose={() => setOpenRewards(!openRewards)}/>
      <AffiliatesModal open={openAffiliates} handleClose={() => setOpenAffiliates(!openAffiliates)}/>
      <Support open={openSupport} handleClose={() => setOpenSupport(!openSupport)}/>

      {!isMinimized ? (
        <>
          <Typography variant="h6" className={classes.menuTitle}>MENU</Typography>
          <List>
            <ListItem button className={classes.listItem} onClick={() => history.push("/home")}>
              <HomeIcon className={classes.icon} />
              Home
            </ListItem>
            <ListItem button className={classes.listItem} onClick={() => history.push("/marketplace")}>
              <StorefrontIcon className={classes.icon} />
              Marketplace
            </ListItem>
          </List>
          
          <Typography variant="h6" className={classes.menuTitle}>GAMES</Typography>
          <List>
            <ListItem button className={classes.listItem} onClick={() => history.push("/cases")}>
              <svg width="24" className={classes.icon} height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </ListItem>
            <ListItem button className={classes.listItem} onClick={() => history.push("/battles")}>
              <svg width="20" className={classes.icon} height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.8214 18.715L14.3962 16.3105C14.2007 16.1167 13.8853 16.1174 13.6906 16.312L12.3062 17.6964C12.1109 17.8917 11.7943 17.8917 11.5991 17.6964L11.2876 17.385C10.9235 17.0208 10.7414 16.5696 10.7414 16.0312C10.7414 15.4929 10.9235 15.0417 11.2876 14.6775L15.3014 10.6638C15.6655 10.2996 16.1168 10.1175 16.6551 10.1175C17.1935 10.1175 17.6447 10.2996 18.0089 10.6638L18.3203 10.9752C18.5156 11.1705 18.5156 11.487 18.3203 11.6823L16.9359 13.0667C16.7412 13.2614 16.7406 13.5768 16.9344 13.7723L19.3389 16.1975C19.5289 16.3875 19.6239 16.6092 19.6239 16.8625C19.6239 17.1158 19.5289 17.3375 19.3389 17.5275L18.1514 18.715C17.9614 18.905 17.7397 19 17.4864 19C17.233 19 17.0114 18.905 16.8214 18.715ZM19.6239 3.59289C19.6239 3.7255 19.5712 3.85268 19.4774 3.94645L8.9489 14.475C8.89154 14.5323 8.89677 14.6268 8.96012 14.6775C9.32429 15.0417 9.50637 15.4929 9.50637 16.0312C9.50637 16.5696 9.32429 17.0208 8.96012 17.385L8.64867 17.6964C8.45341 17.8917 8.13683 17.8917 7.94157 17.6964L6.55716 16.312C6.36249 16.1174 6.04708 16.1167 5.85157 16.3105L3.42637 18.715C3.23637 18.905 3.0147 19 2.76137 19C2.50804 19 2.28637 18.905 2.09637 18.715L0.908871 17.5275C0.718871 17.3375 0.623871 17.1158 0.623871 16.8625C0.623871 16.6092 0.718871 16.3875 0.908871 16.1975L3.31335 13.7723C3.50718 13.5768 3.5065 13.2614 3.31183 13.0667L1.92742 11.6823C1.73216 11.487 1.73216 11.1705 1.92742 10.9752L2.23887 10.6638C2.60304 10.2996 3.05429 10.1175 3.59262 10.1175C4.13095 10.1175 4.5822 10.2996 4.94637 10.6638C4.99705 10.7271 5.09154 10.7323 5.1489 10.675L15.6774 0.146447C15.7712 0.0526783 15.8984 0 16.031 0H19.1239C19.4 0 19.6239 0.223858 19.6239 0.5V3.59289ZM5.67992 8.14895C5.48466 8.34421 5.16808 8.34421 4.97282 8.14895L0.770317 3.94645C0.676549 3.85268 0.623871 3.7255 0.623871 3.59289V0.5C0.623871 0.223857 0.847728 0 1.12387 0H4.21676C4.34937 0 4.47655 0.0526784 4.57032 0.146447L8.77282 4.34895C8.96808 4.54421 8.96808 4.86079 8.77282 5.05605L5.67992 8.14895Z" fill="#F8F8F8"/>
              </svg>
              Case Battles
            </ListItem>
            <ListItem button className={classes.listItem} onClick={() => history.push("/roulette")}>
              <Roulette className={classes.icon} />
              Roulette
            </ListItem>
            <div className={`${classes.listItem}`} onClick={() => history.push('/upgrader')}>
              <Upgrader className={classes.icon} />
              Upgrader
            </div>
            <div className={`${classes.listItem} ${classes.disabledItem}`}>
              <Dice className={classes.icon} />
              Dice
              <Typography variant="body2" className={classes.comingSoon}>
                Coming Soon
              </Typography>
            </div>
            <div className={`${classes.listItem} ${classes.disabledItem}`}>
              <Mine className={classes.icon} />
              Mines
              <Typography variant="body2" className={classes.comingSoon}>
                Coming Soon
              </Typography>
            </div>
          </List>
          
          <Typography variant="h6" className={classes.menuTitle}>EARN</Typography>
          <List>
            <ListItem button className={classes.listItem} onClick={() => setOpenRewards(!openRewards)}>
              <EmojiEventsIcon className={classes.icon} />
              Level Rewards
            </ListItem>
            <a href="/leaderboard"button className={classes.listItem}>
              <TimerIcon className={classes.icon} />
              Weekly race
            </a>
            <ListItem button className={classes.listItem} onClick={handleReferFriendClick}>
              <PersonAddIcon className={classes.icon} />
              Refer a friend
            </ListItem>
          </List>
          
          <Typography variant="h6" className={classes.menuTitle}>MARKETPLACE</Typography>
          <List>
            <a button className={classes.listItem} onClick={() => setOpenSupport(!openSupport)}>
              <HelpIcon className={classes.icon} />
              Support
            </a>
          </List>
        </>
      ) : (
        <>
          <List style={{display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 40,
            gap: "10px"
          }}>
            <a href="/home" button className={classes.listItem}>
              <HomeIcon className={classes.icon} />
            </a>
            <a href="/marketplace" button className={classes.listItem}>
              <StorefrontIcon className={classes.icon} />
            </a>
            <a href="/cases" button className={classes.listItem}>
              <svg width="24" className={classes.icon} height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </a>
            <a href="/battles" button className={classes.listItem}>
              <svg width="20" className={classes.icon} height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.8214 18.715L14.3962 16.3105C14.2007 16.1167 13.8853 16.1174 13.6906 16.312L12.3062 17.6964C12.1109 17.8917 11.7943 17.8917 11.5991 17.6964L11.2876 17.385C10.9235 17.0208 10.7414 16.5696 10.7414 16.0312C10.7414 15.4929 10.9235 15.0417 11.2876 14.6775L15.3014 10.6638C15.6655 10.2996 16.1168 10.1175 16.6551 10.1175C17.1935 10.1175 17.6447 10.2996 18.0089 10.6638L18.3203 10.9752C18.5156 11.1705 18.5156 11.487 18.3203 11.6823L16.9359 13.0667C16.7412 13.2614 16.7406 13.5768 16.9344 13.7723L19.3389 16.1975C19.5289 16.3875 19.6239 16.6092 19.6239 16.8625C19.6239 17.1158 19.5289 17.3375 19.3389 17.5275L18.1514 18.715C17.9614 18.905 17.7397 19 17.4864 19C17.233 19 17.0114 18.905 16.8214 18.715ZM19.6239 3.59289C19.6239 3.7255 19.5712 3.85268 19.4774 3.94645L8.9489 14.475C8.89154 14.5323 8.89677 14.6268 8.96012 14.6775C9.32429 15.0417 9.50637 15.4929 9.50637 16.0312C9.50637 16.5696 9.32429 17.0208 8.96012 17.385L8.64867 17.6964C8.45341 17.8917 8.13683 17.8917 7.94157 17.6964L6.55716 16.312C6.36249 16.1174 6.04708 16.1167 5.85157 16.3105L3.42637 18.715C3.23637 18.905 3.0147 19 2.76137 19C2.50804 19 2.28637 18.905 2.09637 18.715L0.908871 17.5275C0.718871 17.3375 0.623871 17.1158 0.623871 16.8625C0.623871 16.6092 0.718871 16.3875 0.908871 16.1975L3.31335 13.7723C3.50718 13.5768 3.5065 13.2614 3.31183 13.0667L1.92742 11.6823C1.73216 11.487 1.73216 11.1705 1.92742 10.9752L2.23887 10.6638C2.60304 10.2996 3.05429 10.1175 3.59262 10.1175C4.13095 10.1175 4.5822 10.2996 4.94637 10.6638C4.99705 10.7271 5.09154 10.7323 5.1489 10.675L15.6774 0.146447C15.7712 0.0526783 15.8984 0 16.031 0H19.1239C19.4 0 19.6239 0.223858 19.6239 0.5V3.59289ZM5.67992 8.14895C5.48466 8.34421 5.16808 8.34421 4.97282 8.14895L0.770317 3.94645C0.676549 3.85268 0.623871 3.7255 0.623871 3.59289V0.5C0.623871 0.223857 0.847728 0 1.12387 0H4.21676C4.34937 0 4.47655 0.0526784 4.57032 0.146447L8.77282 4.34895C8.96808 4.54421 8.96808 4.86079 8.77282 5.05605L5.67992 8.14895Z" fill="#F8F8F8"/>
              </svg>
            </a>
            <div className={`${classes.listItem} ${classes.disabledItem}`}>
              <Dice className={classes.icon} />
            </div>
            <div className={`${classes.listItem} ${classes.disabledItem}`}>
              <Upgrader className={classes.icon} />
            </div>
            <div className={`${classes.listItem} ${classes.disabledItem}`}>
              <Mine className={classes.icon} />
            </div>
            <a href="/roulette" button className={classes.listItem}>
              <Roulette className={classes.icon} />
            </a>
            <a button className={classes.listItem} onClick={() => setOpenRewards(!openRewards)}>
              <EmojiEventsIcon className={classes.icon} />
            </a>
            <a button className={classes.listItem}>
              <TimerIcon className={classes.icon} />
            </a>
            <a button className={classes.listItem} onClick={handleReferFriendClick}>
              <PersonAddIcon className={classes.icon} />
            </a>
            <a button className={classes.listItem} onClick={() => setOpenSupport(!openSupport)}>
              <HelpIcon className={classes.icon} />
            </a>
          </List>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
