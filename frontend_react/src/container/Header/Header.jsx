import React from 'react'
import ReactTooltip from 'react-tooltip';

import { motion } from 'framer-motion';
import { AppWrap } from '../../wrapper'
import { images } from '../../constants';
import './Header.scss';


const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    }
  }
}

const headerPractices = [];
headerPractices.push({image: images.tdd, tooltip:"TDD-infected"});
headerPractices.push({image: images.cleanCode, tooltip:"Proud Clean-Coder"});
headerPractices.push({image: images.cleanArchitecture, tooltip:"Able to implement Clean Architecture"});
headerPractices.push({image: images.agile, tooltip:"I follow best software development practices"});

const Header = () => (
  (
    <div className='app__header app__flex'>
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className='app__header-badge'>
          <div className='badge-cmp app__flex'>
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <h2 >Hello, I am</h2>
              <h1 className='head-text'>Sergei</h1>
              <h2 >Nice to meet you.</h2>
            </div>
          </div>
          <div className='tag-cmp app__flex'>
            <p className='p-text'>
              I'm a software developer based in Lviv.<br/>
              I'm quietly confident, naturally curious, and perpetually improving my software craftsmanship chops every day.</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <img src={images.avatar} alt="profile_bg" />
      </motion.div>
      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {headerPractices.map((practice, index) => (
          <div className="circle-cmp app__flex">
            <div className="app__flex" data-tip="Placeholder Tooltip" data-for={`circle-${index}`} key={`circle-${index}`}>
              <img src={practice.image} alt="profile_bg" />
            </div>

            <ReactTooltip
              type="warning"
              id={`circle-${index}`}
              effect="solid"
              arrowColor="#fff"
              className="header-circle-tooltip"
            >
              {practice.tooltip}
            </ReactTooltip>
          </div>
        ))}
      </motion.div>
    </div>
  )
)

export default AppWrap(Header, 'home')