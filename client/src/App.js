import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import EventHandler from "./EventHandler";
import { getSiteSchema } from "./services/api.service";
import Navbar from "./components/app/Navbar";
import Sidebar from "./components/app/Sidebar";
import Chat from "./components/chat/Chat";
import Preloader from "./Preloader";
import BackgroundImage from "./assets/background.png";

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

import metadata from "./metadata.json";

const RootContainer = styled("div")({
  backgroundColor: "#0D0F13",
  fontFamily: "Poppins",
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const MainBody = styled("main")({
  display: "flex",
  flex: "1 1 auto",
  position: "relative",
});

const ContentWrapper = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: "2rem 1rem",
  overflowY: "auto",
  background: "#0E0F15",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundBlendMode: "overlay",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
  [theme.breakpoints.down("xs")]: {
    padding: "1rem",
  },
}));

const drawerStyles = {
  minimized: {
    width: 80,
    padding: "1rem",
  },
  expanded: {
    width: 222,
    padding: "1rem",
  },
  full: {
    width: 300,
    padding: "1rem",
  },
};

const App = () => {
  const [isSidebarMinimized, setSidebarMinimized] = useState(false);
  const [finalCountdown, setFinalCountdown] = useState(0);
  const [loading, setLoading] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [chatVisible, setChatVisible] = useState(true);

  const toggleSidebar = () => setSidebarMinimized(!isSidebarMinimized);

  const fetchData = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      let sec = 1;
      setFinalCountdown(sec);
      let interval = setInterval(() => {
        sec -= 1;
        setFinalCountdown(sec);
        if (sec <= 0) {
          clearInterval(interval);
          setFinalCountdown("");
          resolve();
        }
      }, 1300);
    });
    try {
      const schema = await getSiteSchema();
      if (schema.maintenanceEnabled) setMaintenance(true);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 503) {
        setMaintenance(true);
        setLoading(false);
      } else {
        console.error(err);
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    store.dispatch(loadUser());
    fetchData();
    // eslint-disable-next-line
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
        <Toaster position="bottom-left" />

        <RootContainer>
          <CssBaseline />
          <Navbar toggleChat={() => setChatVisible(!chatVisible)} />

          <MainBody>
            <Drawer
              variant="permanent"
              PaperProps={{
                sx: isSidebarMinimized
                  ? drawerStyles.minimized
                  : drawerStyles.expanded,
              }}
            >
              <Sidebar isMinimized={isSidebarMinimized} />
              <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
                {isSidebarMinimized ? ">" : "<"}
              </div>
            </Drawer>

            <ContentWrapper>
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/affiliates" element={<Affiliates />} />
                <Route path="/battles/:battleId" element={<BattlePage />} />
                <Route path="/battles" element={<Battles />} />
                <Route path="/blackjack" element={<Blackjack />} />
                <Route path="/upgrader" element={<Upgrader />} />
                <Route path="/cases" element={<Cases />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/cases/:caseSlug" element={<CasePage />} />
                <Route path="/roulette" element={<Roulette />} />
                <Route path="/crash" element={<Crash />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/mines" element={<Mines />} />
                <Route path="/slots" element={<Slots />} />
                <Route path="/slots/:identifier2" element={<SlotDetail />} />
                <Route path="/provably-fair" element={<Provablyfair />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/banned" element={<Banned />} />
                <Route path="/a/:affiliateCode" element={<AffiliatesRedirect />} />
                <Route path="/login/:provider?" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ContentWrapper>

            {chatVisible && (
              <Drawer
                variant="permanent"
                PaperProps={{ sx: drawerStyles.full }}
              >
                <Chat />
              </Drawer>
            )}
          </MainBody>
        </RootContainer>
      </Router>
    </Provider>
  );
};

export default App;
