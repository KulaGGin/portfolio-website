import React from 'react';
import './OverlayProjectPage.scss';
import scssVars from "./OverlayProjectPage.scss";
import Layout from "components/Layout/Layout";
import Logo from './Logo.webp';
import AnimatedPage from "components/AnimatedPage/AnimatedPage";

const OverlayProjectPage = () => {
  const cn = scssVars.cn;
  return (
    <Layout>
        <div className={`${cn}`}>
          <div className={`${cn}__hero`}>
            <img src={Logo} alt="Tekken 8 Overlay"/>
            <p className={`${cn}__subtitle`}>
              Real-time overlay showing hitboxes, frame data, and debug info for Tekken 8.
            </p>
          </div>
          <div className={`${cn}__section`}>
            <h2>Key Features</h2>
            <ul>
              <li>Real-time hitbox and hurtbox rendering</li>
              <li>Frame data visualization for advanced combos</li>
              <li>Custom UI using ImGui</li>
              <li>Memory reading via pointers</li>
            </ul>
          </div>

          {/* TECH STACK */}
          <div className={`${cn}__section`}>
            <h2>Tech Stack</h2>
            <div className={`${cn}__tech`}>
              <span>C++</span>
              <span>DirectX</span>
              <span>ImGui</span>
              <span>Reverse Engineering</span>
            </div>
          </div>
          <div className={`${cn}__links`}>
            <a
              href="https://github.com/TekkenOverlay/TekkenOverlay"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
    </Layout>
  );
};

export default OverlayProjectPage;