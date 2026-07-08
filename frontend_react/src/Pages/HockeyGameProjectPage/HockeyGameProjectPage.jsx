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
            <p>This is a 2D top down Hockey Game with elements of fighting that I created for a company I worked for 2024-2025. I continue to work on it and continue improving it to release on steam.</p>
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
        <p>I've created this project for a company I worked for 2024-2025. This is a fun and creative project which let me learn a lot of new things: I learned design patterns such as state machines on a much deeper level and started to understand it on a much deeper level, I learned about AI design patterns and I implemented AI for the game as a mix of states of a state machines and GOAP. This allowed me to create a robust AI system that's easy to extend: only new code needs to be added to extend the AI and create new behaviors and logic based on inputs.</p>
        <p>This hockey game is a fun and challenging project for me, where I had the opportunity to work on creating my own state machines and GOAP systems for character state, character and team AI collaboration systems, focusing on creating a robust, solid, tested and easily expandable AI and character state systems.</p>
      </div>
      <div className={`${cn}__Section`}>
        <h2 id="CharacterState">Character State and state machines</h2>
        <p>First, I started small: with just a character and a level sprite and a tick function to process movement inputs and move the character. But it quickly became apparent that I need to manage a lot of state and how character reacts to inputs and events: what if character just stands and I press movement inputs, what if I press an attack button, what if character gets hit in standing state, what if it gets hit in a grounded state, etc.</p>
        <p>There was, of course, state design pattern asking to be implemented. I ended up TDD'ing a generic state machine library following a curiously reoccurring template pattern, so I can extend it for specific use cases. So far I ended up with those state machines in the game: generic state machine, unity state machine which supports unity events(inherits from state machine), stack state machine(inherits from state machine), hierarchical state machine.
          Those are generic state machines that the specific concrete state machines inherit: character locomotion state machine is a hierarchical unity state machine with support for unity events, main menu state machine is a stack state machine that allows for comfortable menu navigation, character AI controller uses character AI state machine, which is also a unity state machine. There is also a team AI controller, which uses team AI state machine, which is also a unity state machine.</p>
        <p>Also worth noting, I reached limits of state machines for some of them. The most visible and obvious one is character AI state machine. While it works, managing all different states for each game situation with different states and switching between them became cumbersome and there is definitely a better system for this. One of them is GOAP. It should allow for even more robust and complex AI that would be a perfect fit for a game like this: we want the AI to be unpredictable and challenging for the player to beat.</p>
      </div>
    </ProjectPageLayout>
  )
}

export default HockeyGameProjectPage;
