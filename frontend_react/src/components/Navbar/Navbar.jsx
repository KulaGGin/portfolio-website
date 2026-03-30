import React, {useState} from 'react'

import {HiMenuAlt4, HiX} from 'react-icons/hi';
import {motion} from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {images} from '../../constants';
import './Navbar.scss';

const Navbar = () => {
  const location = useLocation();
  const onHomePage = location.pathname === '/';
  const [toggle, setToggle] = useState(false)

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link to="/">
          <img src={images.logo} alt="logo"/>
        </Link>
      </div>
        <ul className="app__navbar-links">
            {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                <li className="app__flex p-text" key={`link-${item}`}>
                    <div />
                    {item === 'home' ? (
                        <Link to="/">Home</Link>
                    ) : onHomePage ? (
                        <a href={`#${item}`}>{item}</a>
                    ) : (
                        <Link to={`/#${item}`}>{item}</Link>
                    )}
                </li>
            ))}
        </ul>
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)}/>
        {
          toggle && (
            <motion.div
              whileInView={{x: [300, 0]}}
              transition={{duration: 0.85, ease: 'easeOut'}}
            >
              <HiX onClick={() => setToggle(false)}/>
              <ul>
                {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                    <li key={item}>
                      {item === 'home' ? (
                          <Link to="/" onClick={() => setToggle(false)}>Home</Link>
                      ) : onHomePage ? (
                          <a href={`#${item}`} onClick={() => setToggle(false)}>{item}</a>
                      ) : (
                          <Link to={`/#${item}`} onClick={() => setToggle(false)}>{item}</Link>
                      )}
                    </li>
                ))}
              </ul>
            </motion.div>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar