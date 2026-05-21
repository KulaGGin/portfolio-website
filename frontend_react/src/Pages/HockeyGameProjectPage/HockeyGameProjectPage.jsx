import React from 'react';
import Layout from "components/Layout/Layout";
import scssVars from "./HockeyGameProjectPage.scss";
import Logo from "./Images/GameLogo.png";

const HockeyGameProjectPage = () => {
  const cn = scssVars.cn;
  return (
    <Layout>
      <div className={`${cn}`}>
        <div className={`${cn}__Header`}>
          <img src={Logo} alt="Hockey Game Logo"/>
        </div>
      </div>
    </Layout>
  )
}

export default HockeyGameProjectPage;