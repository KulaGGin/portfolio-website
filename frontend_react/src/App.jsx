import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {OverlayProjectPage} from "./Pages";
import {HomePage} from "./Pages";
import ScrollToHash from 'components/ScrollToHash/ScrollToHash';

const App = () => {
    return (
        <Router>
          <ScrollToHash />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Project/:slug" element={<OverlayProjectPage />} />
            </Routes>
        </Router>
    );
}

export default App;