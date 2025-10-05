import React from 'react'

import { About, Contact, Header, Skills, Work, Footer } from './container'
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
            {/*<Testimonial />*/}
            <Contact />
            <Footer />
        </div>
    );
}

export default App;