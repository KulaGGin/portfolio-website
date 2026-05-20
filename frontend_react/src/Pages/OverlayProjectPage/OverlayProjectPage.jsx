import React from 'react';
import './OverlayProjectPage.scss';
import scssVars from "./OverlayProjectPage.scss";
import Layout from "components/Layout/Layout";
import Logo from './Logo.webp';
import FrameDataMenuImage from './Images/FrameDataMenu.png';
import HitboxViewerMenu from './Images/HitboxViewerMenu.png';
import FPSUnlock from './Images/FPSUnlock.png';
import FirstPersonCameraMenu from './Images/FirstPersonCameraMenu.png';
import ResolutionSettingsMenu from './Images/ResolutionSettingsMenu.png';
import FOVExample from './Images/FOVExample.png';
import InputLagManagerMenu from './Images/InputLagManagerMenu.png';
import TitleVideo from "./Videos/TitleVideo.mp4";
import WR2Frames from "./Videos/WR2Frames.mp4";
import HitboxViewerVideo from "./Videos/HitboxViewer.mp4";
import FPS60vs600 from "./Videos/FPS60vs600.mp4";
import FirstPersonCamera from "./Videos/FirstPersonCamera.mp4";
import InputLagFixes from "./Videos/InputLagFixes.mp4";
import Plus6 from "./Images/+6.png";
import ProjectCard from "components/ProjectCard/ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser, faClock, faScrewdriverWrench, faCode } from "@fortawesome/free-solid-svg-icons";

const OverlayProjectPage = () => {
  const cn = scssVars.cn;
  return (
    <Layout>
        <div className={`${cn}`}>
          <div className={`${cn}__Header`}>
            <img src={Logo} alt="Tekken 8 Overlay"/>
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
                    <p className="ProjectCard__Text">Role: Programmer</p>
                  </div>
                  <div className="ProjectCard__Member">
                    <FontAwesomeIcon className="ProjectCard__Icon" icon={faCode}/>
                    <p className="ProjectCard__Text">LOC: 50000</p>
                  </div>
                  <div className="ProjectCard__Member">
                    <FontAwesomeIcon className="ProjectCard__Icon" icon={faClock}/>
                    <p className="ProjectCard__Text">Time Frame: 2020-Ongoing</p>
                  </div>
                  <div className="ProjectCard__Member">
                    <FontAwesomeIcon className="ProjectCard__Icon" icon={faScrewdriverWrench}/>
                    <p className="ProjectCard__Text">Engine: Unreal Engine 4 & 5</p>
                  </div>
                </div>
              </ProjectCard>
            </section>
          </div>
          <div className={`${cn}__Links`}>
            <a href="https://github.com/TekkenOverlay/TekkenOverlay" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <div className={`${cn}__Section`}>
            <h2>Tech Stack</h2>
            <div className={`${cn}__Tech`}>
              <span>Unreal Engine 4 & 5</span>
              <span>DirectX</span>
              <span>ImGui</span>
              <span>C++</span>
              <span>CMake</span>
              <span>Reverse Engineering</span>
            </div>
          </div>
          <div className={`${cn}__Section`}>
            <h2>Table of Contents</h2>
            <ul className={`${cn}__TableOfContents`}>
              <li><a href="#Introduction">Introduction</a></li>
              <li><a href="#FrameDataViewer">Frame Data Viewer</a></li>
              <li><a href="#HitboxViewer">Hitbox Viewer</a></li>
              <li><a href="#FPSUnlockerInterpolation">FPS Unlocker & Interpolation</a></li>
              <li><a href="#InputLagReduction">Input Lag Reduction</a></li>
              <li><a href="#NetcodeImprovements">Netcode Improvements</a></li>
              <li><a href="#PracticeModeFeatures">Practice Mode Features</a></li>
              <li><a href="#CharacterPicker">Character Picker</a></li>
              <li><a href="#PerformanceImprovements">Performance Improvements</a></li>
              <li><a href="#VideoSettings">Video Settings</a></li>
              <li><a href="#GameInformationDisplays">Game Information Displays</a></li>
              <li><a href="#OtherFeatures">Other Features</a></li>
            </ul>
          </div>
          <div className={`${cn}__Section`}>
            <h2 id="Introduction">Introduction</h2>
            <p>This overlay project is a fun and challenging project for me where I push my boundaries on how to write the best code and come up with the  elegant solutions to problems at hand.</p>

            <p>We first started with a monolith design with a lot of hardcoded things that only worked for one game: Tekken 7 and I'm now refactoring the project with best practices in mind such as: TDD, Clean Code, making sure there is no duplicate code, less code verbosity such as functions taking 8 arguments and that the overlay is working on both games at the same time: Tekken 7 is made on UE4 and DX11 while Tekken 8 is made on UE5 and DX12, which means all the APIs are different for 2 different games and there's virtually no overlap, yet the features are the same.</p>

            <p>Working on the project with other people is a fun and educational experience, as I am able to not only learn to better program but also cooperate with other people: divide work so each person does what they do best, work with version control, different people can propose different solutions from which we can choose the best approach.</p>

            <p>Every feature in this project consists of 3 parts:
              1. Reverse engineering. First, we need to understand how the game is doing things before we can begin doing anything else.
              2. Once we understand how the feature works, we can create an implementation around it.
            </p>
          </div>
          <div className={`${cn}__Section ${cn}__FrameDataViewer`} id="FrameDataViewer">
            <h2>Frame Data Viewer</h2>
            <img src={FrameDataMenuImage} />
            <video className={`${cn}__TitleVideo`} autoPlay loop muted playsInline preload="metadata">
              <source src={WR2Frames} type="video/mp4" />
            </video>
            <img src={Plus6} />
            <p>
              Frame data of the attack indicates the difference in recovery between the attacker and the defender.<br/>
              For example, when an attack is +6, it means that the attacker will recover 6 frames before the defender and
              will be able to act again 6 frames earlier.
            </p>
            <p>Frame data viewer allows players to see frame data of attacks on the screen in real time when those attacks connect.</p>
            <p>This feature was added a few years before the developers of the game added it to the game officially.</p>
            <p>The way this feature works on the surface level is relatively simple. To understand how it works we first need to understand how the game works:<br />
              The game uses data based state machine. Each player struct has a list of states in the array and those states can transfer to other states with either inputs or other conditions, such as end of the animation.<br />
              So the way this feature works is that it detects when attack hits the opponent and checks how many frames until the end of the current move state for the attacker and the defender. For the move above once the attack hits, it hits on frame 15 of the move state and the last frame of the animation is 60. So we do 60 - 15 for the attacker and get 45 frames of recovery. Then for the defender: once the attack hits, the defender changes the state to the "block" state and this state plays the respective animation, and total frames of this animation is 51, then we subtract 51 - 45 and we get 6, which is indicates on how much quicker the attacker recovers before the defender and can act again.<br />
            </p>
            <p>
              On the lower level this feature is much more complex, of course, as it requires a lot of things:
              1. Find the character structs in memory.
              2. On each frame examine the player structs to detect blocks, hits and misses, differentiate them.
              3. Once the frame data is determined, we need to determine where to draw it on the screen and then actually draw it on the screen with DirectX and for that we need a working renderer setup.
            </p>
            <p>Working on this feature has taught me a lot about reverse engineering but also about game development and how Bandai Namco developers approached developing their fighting game. First of all, it fully separates the gameplay layer from the presentation layer. Unreal Engine is used as a presentation only and the core game is separate to the point where the game can fully run without the engine at all. For the players instead of the usual C++/C# hierarchical state machine they used a data-driven state machine: there is only 1 state struct with different properties describing the state such as: what animation to play, what inputs from the player this state has, when they are active, when and where to transition when those inputs are entered, what sound to play, what other special properties the player has during this state, such as being airborne, etc.<br />
              I also better understood how rendering actually works in video games on the very low level, because to draw the numbers over the screen we have to draw the numbers with DirectX on our own.</p>
          </div>
          <div className={`${cn}__Section ${cn}__HitboxViewer`} id="HitboxViewer">
            <h2>Hitbox Viewer</h2>
            <img src={HitboxViewerMenu} />
            <video className={`${cn}__TitleVideo`} autoPlay loop muted playsInline preload="metadata">
              <source src={HitboxViewerVideo} type="video/mp4" />
            </video>
            <p>Hitbox viewer is one of the first two features that were developed for the Overlay. It was developed alongside frame data viewer at the same time to show the community for the first time ever how the game works behind the scenes.</p>
            <p>The grey cylinders that you see on the screen are hurtboxes.<br/>
              The thick red lines are the hit lines that are used to detect if an attack hits with the hurt cylinders of the opponent.<br/>
              The blue collision spheres are used as blocking colliders to not let players collide and go through each other. Instead, they push the other player when collided.
              The challenges to develop this feature were to find all those colliders in the player struct, understand the memory layout, what they are and all of their properties and then to actually render them on the screen.</p>
            <p>The way this part of the game works is that on each frame it puts all the colliders in 3 different arrays inside the player structs with just absolute coordinates and sizes in the world. Each cylinder has 3 properties: position, radius and half height, each collision sphere is just 2 properties: position and radius. The lines is just an array of points with first connecting to the second, third connecting to the fourth, etc.</p>
            <p>On each frame the game checks if it's active attack frames of the move and when it is, it checks if the attack hit lines intersect with the hurt cylinders.</p>
            <p>Now that we understand how the in-game feature works, we can understand how the hitbox viewer works. On each tick of the game, it reads all the hitboxes from the game</p>
          </div>
          <div className={`${cn}__Section ${cn}__DisplaySettings`} id="DisplaySettings">
            <h2>Display Settings</h2>
            <p>This feature set adds many features missing from the game:</p>
            <h3>Unlock FPS</h3>
            <img src={FPSUnlock} />
            <p>By default the game locks FPS at 60 FPS. This feature lets players unlock FPS and play the game at any FPS. By default animations are also locked at 60 FPS even when played at higher FPS, the Overlay also smoothes out animations, so they match the FPS.</p>
            <p>The way it works is it first unlocks FPS normally in Unreal by adjusting the respective FPS variable in the GEngine object. It also disables fixed frame rate. This way the engine is free to tick at maximum frame rate. Once we do that and set the FPS to 120, for example, the game starts to run at twice the speed, because the gameplay tick function is written in a way where it just ticks every time the engine ticks. So now I need to make the engine tick at high tick rate while the gameplay should still tick at 60 FPS. After finding Tekken gameplay tick function, I hook it and accumulate delta since the last time it ticked. Once the delta is more than 1000.f/60.f(~16.67ms), I just call the original function. This allows for the 60 Hz gameplay no matter the engine tick rate(and rendering tick rate). After this most of the game: world rendering, UI elements, level physics, cloths physics, effects work as intended at high tick rate. But a few things: camera and player skeletal animations are still only updated at 60 Hz, because of how it was made: developers don't use the normal Unreal tools for camera and character animations. Instead, the camera and the character mesh skeleton bones are transformed from their custom legacy animation system and then "manually" set on each gameplay tick. My solution to this was to hook Unreal Engine's OnPerformAnimationProcessing function and interpolate character bone transforms in-between gameplay ticks using the delta that I already have from the FPS unlock feature. The end effect you can see on the video below(left - default 60 FPS vs right - 600 FPS slowed down):</p>
            <video className={`${cn}__TitleVideo`} autoPlay loop muted playsInline preload="metadata">
              <source src={FPS60vs600} type="video/mp4" />
            </video>
            <p>It's what you'd expect: everything updates on each rendering frame and the gameplay ticks at 60 Hz no matter the rendering frame rate.</p>
            <h3>Resolution  features</h3>
            <img src={ResolutionSettingsMenu} />
            <p>By default the game allows players to only change resolution from inside the options and it's only available in the main menu but not while playing. This feature lets players change resolution and resolution scale at any point in time and also quickly switch between the main and the backup resolutions with Alt+Enter for more convenient alt-tabbing and switching between windows.</p>
            <p>By default the game also doesn't support any resolutions other than 16:9. While the users can choose a resolution such as 1600x900 in the options if the monitor supports it, the game will still be rendered at a 16:9 and will add black bars at the top and at the bottom. This feature of the overlay lets users set any resolution and forces the game to be rendered on that aspect ratio.</p>
            <h3>Change FOV</h3>
            <img src={FOVExample} />
            <p>By default the game sets and locks FOV at 60. This feature allows users to set any FOV. On the left you can see the game with the default FOV of 65 and on the right you can see it with FOV 90.</p>
            <h3>First Person Camera</h3>
            <img src={FirstPersonCameraMenu} />
            <video className={`${cn}__TitleVideo`} autoPlay loop muted playsInline preload="metadata">
              <source src={FirstPersonCamera} type="video/mp4" />
            </video>
            <p>This feature adds the ability for the player to play the game from the first person view. While looking absolutely goofy, it's a fun feature that showcases why fighting games are not first person.</p>
            <h3>Conclusion</h3>
            <p>Put together, Display Settings feature set adds ability for players to play at any resolution, FPS and FOV as we normally can in other games.</p>
          </div>
          <div className={`${cn}__Section ${cn}__InputLagManager`} id="InputLagManager">
            <h2>Input Lag Fixes</h2>
            <img src={InputLagManagerMenu} />
            <p>The game uses rollback netcode but also adds delay above certain network latency to prevent too big jumps and once it needs to roll back the state for too many frames, it starts to sync the clients and set the input latency appropriately to prevent big roll backs.</p>
            <p>There are a few problems in the implementation. The first one is that they added 1 frame of additional input latency in all matches, even for offline games. But also in online matches even when the round trip latency between clients is 1ms. This negatively affects player experience, because Tekken is an extremely fast paces games with one of the biggest actions per minute and requires players to react as quickly as possible many times in a minute.</p>
            <p>There is another frame of additional input delay that comes from the fact that when a player first enters inputs, instead of switching the character state and animation immediately, it schedules it to be played for the next frame.</p>
            <p>So, this set of features of the overlay applies a number of fixes to improve the input latency and player experience.</p>
            <p>First, it removes the hardcoded in the code 1 additional frame of input delay.</p>
            <p>It also allows players to edit input delay in online matches to either decrease or increase it. This allows to remove another frame of input delay.</p>
            <p>And thirdly, I found a function to advance player states, and so on each tick the Overlay just advances the gameplay 1 tick further, it extrapolates the gameplay by 1 tick. After advancing the gameplay by 1 tick forward, it captures character's bone transforms used by the Animation Manager that instruments actual MeshComponent bone transforms. And after it does that, it reverts all gameplay state back to what it was, so that the game stays consistent between 2 clients and doesn't desync.</p>
            <p>Below you can watch the video and compare the difference between a default game and all the fixes applied together. In the top left corner of each video you can see the gameplay tick number. You can see that a keyboard key is pressed on frame 100. And then in each of the videos you can see what frame the character reacts to the input.</p>
            <video className={`${cn}__TitleVideo`} autoPlay loop muted playsInline preload="metadata">
              <source src={InputLagFixes} type="video/mp4" />
            </video>
            <p>You can see that on a default game the character reacts to the inputs on tick 104 but with all the fixes it reacts on tick 101.</p>
          </div>
        </div>
    </Layout>
  );
};

export default OverlayProjectPage;