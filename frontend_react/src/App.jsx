import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Routes, Route,  useLocation, useNavigationType } from "react-router-dom";
import {OverlayProjectPage, HomePage, HockeyGameProjectPage} from "./Pages";
import { AnimatePresence } from "framer-motion";
import {AnimatedPage} from "components/AnimatedPage/AnimatedPage";
import NavigationManager from "components/NavigationManager/NavigationManager";
import {NavigationProvider} from "./components/NavigationContext/NavigationContext";
import {StickySocialMedia} from "./components";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />}/>
        <Route path="/project/OverlayProjectPage" element={<OverlayProjectPage />} />
        <Route path="/project/HockeyGameProjectPage" element={<HockeyGameProjectPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <NavigationProvider>
      <Router>
        <NavigationManager/>
        <StickySocialMedia />
        <AnimatedRoutes/>
      </Router>
    </NavigationProvider>
  );
}

export default App;