import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Routes, Route,  useLocation, useNavigationType } from "react-router-dom";
import {OverlayProjectPage, HomePage} from "./Pages";
import { AnimatePresence } from "framer-motion";
import {AnimatedPage} from "components/AnimatedPage/AnimatedPage";
import NavigationManager from "components/NavigationManager/NavigationManager";
import {NavigationProvider} from "./components/NavigationContext/NavigationContext";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <AnimatedPage>
            <HomePage />
          </AnimatedPage>}
        />
        <Route path="/project/:slug" element={
          <AnimatedPage>
            <OverlayProjectPage />
          </AnimatedPage>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <NavigationProvider>
      <Router>
        <NavigationManager/>
        <AnimatedRoutes/>
      </Router>
    </NavigationProvider>
  );
}

export default App;