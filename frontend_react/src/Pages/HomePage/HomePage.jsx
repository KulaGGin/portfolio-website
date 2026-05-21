import { React, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {About, Contact, Header, Skills, Work} from 'container'
import Layout from "components/Layout/Layout";
import AnimatedPage from "components/AnimatedPage/AnimatedPage"
import ProjectPageLayout from "../../components/ProjectPageLayout/ProjectPageLayout";

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

  return <ProjectPageLayout>
      <Header/>
      <About/>
      <Work/>
      <Skills/>
      <Contact/>
  </ProjectPageLayout>
};

export default HomePage;
