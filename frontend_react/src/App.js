import React from 'react'

import { About, Footer, Header, Skills, Testimonial, Work } from './container'
import './App.scss'
import {Navbar} from "./components";
import StickySocialMedia from "./components/StickySocialMedia/StickySocialMedia";

const App = () => {
    return (
        <div className="app">
            <Navbar/>
            <StickySocialMedia />
            <Header />
            <About />
            <Work />
            <Skills />
            <Testimonial />
            <Footer />
        </div>
    );
}

export default App;