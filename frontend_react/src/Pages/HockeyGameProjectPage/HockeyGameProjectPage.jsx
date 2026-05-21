import React from 'react';
import scssVars from "./HockeyGameProjectPage.scss";
import Logo from "./Images/GameLogo.png";
import ProjectPageLayout from "components/ProjectPageLayout/ProjectPageLayout";
import TitleVideo from "./Videos/TitleVideo.mp4";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faCode, faScrewdriverWrench, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";

const HockeyGameProjectPage = () => {
  const cn = scssVars.cn;
  return (
    <ProjectPageLayout>
      <div className={`ProjectPage__Header`}>
        <img src={Logo} alt="Hockey Game Logo"/>
        <video className={`${cn}__TitleVideo`} autoPlay loop muted playsInline preload="metadata">
          <source src={TitleVideo} type="video/mp4" />
        </video>
        <section className={`${cn}__ProjectCardsContainer`}>
          <ProjectCard project={cn} title="About">
            <p>Tekken Overlay initially started as a frame data overlay and then throughout the years a lot of other features were added such as a hitbox and hurtbox viewer, FPS unlock, character animation interpolation to make the game smoother at higher FPS, input lag reduction, and many more.</p>
          </ProjectCard>
          <ProjectCard project={cn} title="Project Info">
            <div className="ProjectCard__Info">
              <div className="ProjectCard__Member">
                <FontAwesomeIcon className="ProjectCard__Icon" icon={faUsers}/>
                <p className="ProjectCard__Text">Team Size: 3</p>
              </div>
              <div className="ProjectCard__Member">
                <FontAwesomeIcon className="ProjectCard__Icon" icon={faUser}/>
                <p className="ProjectCard__Text">Role: Programmer, Game designer</p>
              </div>
              <div className="ProjectCard__Member">
                <FontAwesomeIcon className="ProjectCard__Icon" icon={faScrewdriverWrench}/>
                <p className="ProjectCard__Text">Engine: Unity</p>
              </div>
              <div className="ProjectCard__Member">
                <FontAwesomeIcon className="ProjectCard__Icon" icon={faCode}/>
                <p className="ProjectCard__Text">LOC: 20000</p>
              </div>
              <div className="ProjectCard__Member">
                <FontAwesomeIcon className="ProjectCard__Icon" icon={faClock}/>
                <p className="ProjectCard__Text">Time Frame: 2025-Ongoing</p>
              </div>
            </div>
          </ProjectCard>
        </section>
      </div>
      <div className={`${cn}__Section`}>
        <h2>Tech Stack</h2>
        <div className={`${cn}__Tech`}>
          <span>Unity</span>
          <span>C#</span>
          <span>State machine</span>
          <span>GOAP</span>
          <span>AI</span>
          <span>Clean Code</span>
          <span>Clean Architecture</span>
        </div>
      </div>
      <div className={`${cn}__Section`}>
        <h2>Table of Contents</h2>
        <ul className={`${cn}__TableOfContents`}>
          <li><a href="#Introduction">Introduction</a></li>
        </ul>
      </div>
      <div className={`${cn}__Section`}>
        <h2 id="Introduction">Introduction</h2>
        <p>I've created this project for a company I worked for 2024-2025. This is a fun and creative project which let me learned a lot of new things: I learned design patterns such as state machines on a much deeper level and started to understand it on a much deeper level, I learned about AI design patterns and I implemented AI for the game as a mix of states of a state machines and GOAP. This allowed me to create a robust AI system that's easy to extend: only new code needs to be added to extend the AI and create new behaviors and logic based on inputs.</p>
      </div>
    </ProjectPageLayout>
  )
}

export default HockeyGameProjectPage;