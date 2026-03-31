import React from 'react';
import Navbar from 'components/Navbar/Navbar';
import StickySocialMedia from 'components/StickySocialMedia/StickySocialMedia';
import Footer from 'container/Footer/Footer';
import { Link, useLocation } from 'react-router-dom';

import './OverlayProjectPage.scss';
import scssVars from "./OverlayProjectPage.scss";
import Layout from "../../components/Layout/Layout";

const OverlayProjectPage = () => {
  const cn = scssVars.cn;
    return (
        <Layout>
          <div className={`${cn}`}>
            <div className="projectPage__hero">
              <h1>Tekken 8 Overlay</h1>
              <img
                  src="/assets/tekken-overlay.png"
                  alt="Tekken 8 Overlay"
              />
              <p className="projectPage__subtitle">
                Real-time overlay showing hitboxes, frame data, and debug info for Tekken 8.
              </p>
            </div>
            <div className="projectPage__section">
              <h2>Key Features</h2>
              <ul>
                <li>Real-time hitbox and hurtbox rendering</li>
                <li>Frame data visualization for advanced combos</li>
                <li>Custom UI using ImGui</li>
                <li>Memory reading via pointers</li>
              </ul>
            </div>

            {/* TECH STACK */}
            <div className="projectPage__section">
              <h2>Tech Stack</h2>
              <div className="projectPage__tech">
                <span>C++</span>
                <span>DirectX</span>
                <span>ImGui</span>
                <span>Reverse Engineering</span>
              </div>
            </div>
            <div className="projectPage__links">
              <a
                  href="https://github.com/yourrepo/tekken-overlay"
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