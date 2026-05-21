import React from 'react';
import Layout from "components/Layout/Layout";
import scssVars from "./HockeyGameProjectPage.scss";
import Logo from "./Images/GameLogo.png";
import ProjectPageLayout from "../../components/ProjectPageLayout/ProjectPageLayout";

const HockeyGameProjectPage = () => {
  const cn = scssVars.cn;
  return (
    <ProjectPageLayout>
      <div className={`ProjectPage__Header`}>
        <img src={Logo} alt="Hockey Game Logo"/>
      </div>
    </ProjectPageLayout>
  )
}

export default HockeyGameProjectPage;