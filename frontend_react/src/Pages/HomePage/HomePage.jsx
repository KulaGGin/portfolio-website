import React from 'react';
import {About, Contact, Header, Skills, Work, Footer} from 'container'
import {Navbar} from "components";
import StickySocialMedia from "components/StickySocialMedia/StickySocialMedia";
import SCSSVars from './HomePage.scss';


const HomePage = () => (
    <div className="app">
        <Navbar />
        <StickySocialMedia />
        <Header />
        <About />
        <Work />
        <Skills />
        <Contact />
        <Footer />
    </div>
);

export default HomePage;
