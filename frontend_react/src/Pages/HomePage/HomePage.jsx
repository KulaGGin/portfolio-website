import React from 'react';
import {About, Contact, Header, Skills, Work} from 'container'
import Layout from "../../components/Layout/Layout";

const HomePage = () => (
    <Layout>
      <Header/>
      <About/>
      <Work/>
      <Skills/>
      <Contact/>
    </Layout>
);

export default HomePage;
