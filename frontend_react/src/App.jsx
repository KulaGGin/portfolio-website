import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Routes, Route,  useLocation } from "react-router-dom";
import {OverlayProjectPage} from "./Pages";
import {HomePage} from "./Pages";
import ScrollToHash from 'components/ScrollToHash/ScrollToHash';
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<OverlayProjectPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <AnimatedRoutes/>
    </Router>
  );
}

export default App;