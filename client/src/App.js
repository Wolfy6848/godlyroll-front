import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer"; // MUI v5
import { styled } from "@mui/material/styles"; // replaces makeStyles
import { getSiteSchema } from "./services/api.service";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import EventHandler from "./EventHandler";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast"; // replaced react-toast-notifications
import BackgroundImage from "./assets/background.png";

// Components
import Navbar from "./components/app/Navbar";
import NotFound from "./components/app/404";
import Sidebar from "./components/app/Sidebar";
import Chat from "./components/chat/Chat";
import Preloader from "./Preloader";

// Views
import Home from "./views/Home";
import Affiliates from "./views/Affiliates";
import Profile from "./views/Profile";
import Battles from "./views/Battles";
import Blackjack from "./views/Blackjack";
import Upgrader from "./views/Upgrader";
import BattlePage from "./views/BattlePage";
import Cases from "./views/Cases";
import CasePage from "./views/CasePage";
import Roulette from "./views/Roulette";
import Crash from "./views/Crash";
import Limbo from "./views/Limbo";
import Dice from "./views/Dice";
import Mines from "./views/Mines";
import Slots from "./views/Slots";
import SlotDetail from "./views/SlotDetail";
import Marketplace from "./views/Marketplace";

import Login from "./views/Login";
import Leaderboard from "./views/Leaderboard";
import Provablyfair from "./views/ProvablyFair";
import Banned from "./views/Banned";
import AffiliatesRedirect from "./views/AffiliatesRedirect";
import Maintenance from "./views/Maintenance";

// App Metadata
import metadata from "./metadata.json";

// ========================= Styled Components =========================
const Root = styled("div")(({ theme }) => ({
  backgroundColor: "#0D0F13",
  fontFamily: "Poppins",
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const Body = styled("main")({
  display: "flex",
  flex: "1 1 auto",
  position: "relative",
  height: "100%",
});

const Content = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: "2rem 1rem",
  overflowY: "auto",
  background: "#0E0F15",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundBlendMode: "overlay",
  [theme.breakpoints.down("md")]: { margin: 0 },
  [theme.breakpoints.down("xs")]: { padding: "1rem" },
}));

const drawerStyles = {
  drawerPaperMinimized: {
    zIndex: 1000,
    borderRight: "1px solid #282A3A",
    height: "100%",
    width: 80,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#14151D",
  },
  drawerPaperExpanded: {
    zIndex: 1000,
    borderRight: "1px solid #282A3A",
    height: "100%",
    width: 222,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#14151D",
  },
  drawerPaperFull: {
    zIndex: 2,
    height: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundBlendMode: "overlay",
    borderLeft: "1px solid #282A3A",
    width: 300,
  },
};

// ========================= App Component =========================
const App = () => {
  const [isSidebarMinimized, setSidebarMinimized] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileChat, setMobile] = useState(false);
  const [finalCountdown, setFinalCountdown] = useState(0);

  const [loading, setLoading] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [isChatVisible, setChatVisible] = useState(true);

  const toggleSidebar = () => setSidebarMinimized(!isSidebarMinimized);
  const toggleChat = () => setChatVisible(!isChatVisible);

  const fetchData = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      let secunde = 1;
      setFinalCountdown(secunde);
      let int = setInterval(() => {
        secunde -= 1;
        setFinalCountdown(secunde);
        if (secunde <= 0) {
          clearInterval(int);
          setFinalCountdown("");
          resolve();
        }
      }, 1300);
    });

    try {
      const schema = await getSiteSchema();
      if (schema.maintenanceEnabled) setMaintenance(true);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 503) {
        setMaintenance(true);
        setLoading(false);
      } else {
        console.log(error);
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const buildId = metadata.build;
    const buildNumber = buildId.split("@")[1] || "Unknown";
    console.warn(
      `%cStop!%c BUILD: ${buildNumber}`,
      "font-weight:bold;font-size:30px;color:red",
      "color:black;margin-top:1rem"
    );
    store.dispatch(loadUser());
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setChatVisible(window.innerWidth > 960);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (maintenance) return <Maintenance />;
  if (loading) return <Preloader finalCountdown={finalCountdown} />;

  return (
    <Provider store={store}>
      <Router>
        <Toaster position="bottom-left" reverseOrder={false} />

        <Root>
          <CssBaseline />
          <Navbar style={{ zIndex: 3 }} toggleChat={toggleChat} />

          <Body>
            <Drawer
              variant="permanent"
              PaperProps={{
                sx: isSidebarMinimized
                  ? drawerStyles.drawerPaperMinimized
                  : drawerStyles.drawerPaperExpanded,
              }}
            >
              <Sidebar isMinimized={isSidebarMinimized} />
              <div
                style={{ position: "absolute", top: 10, right: 10, cursor: "pointer" }}
                onClick={toggleSidebar}
              >
                {isSidebarMinimized ? ">" : "<"}
              </div>
            </Drawer>

            <Content>
              <Switch>
                <Redirect exact from="/" to="home" />
                <Route exact path="/affiliates" component={Affiliates} />
                <Route exact path="/battles/:battleId" component={BattlePage} />
                <Route exact path="/battles" component={Battles} />
                <Route exact path="/blackjack" component={Blackjack} />
                <Route exact path="/upgrader" component={Upgrader} />
                <Route exact path="/cases" component={Cases} />
                <Route exact path="/leaderboard" component={Leaderboard} />
                <Route exact path="/cases/:caseSlug" component={CasePage} />
                <Route exact path="/roulette" component={Roulette} />
                <Route exact path="/crash" component={Crash} />
                <Route exact path="/marketplace" component={Marketplace} />
                <Route exact path="/mines" component={Mines} />
                <Route exact path="/slots" component={Slots} />
                <Route exact path="/slots/:identifier2" component={SlotDetail} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/provably-fair" component={Provablyfair} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/banned" component={Banned} />
                <Route exact path="/a/:affiliateCode" component={AffiliatesRedirect} />
                <Route exact path="/login/:provider?" component={Login} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Content>

            {isChatVisible && (
              <Drawer
                variant="permanent"
                PaperProps={{ sx: drawerStyles.drawerPaperFull }}
                open={open}
              >
                <Chat />
              </Drawer>
            )}
          </Body>
        </Root>
      </Router>
    </Provider>
  );
};

export default App;
