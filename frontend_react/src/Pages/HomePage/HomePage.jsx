import { React, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {About, Contact, Header, Skills, Work} from 'container'
import Layout from "components/Layout/Layout";
import AnimatedPage from "components/AnimatedPage/AnimatedPage"

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // small delay ensures DOM is rendered
      }
    }
  }, [location]);

  return <Layout>
      <Header/>
      <About/>
      <Work/>
      <Skills/>
      <Contact/>
  </Layout>
};

export default HomePage;
