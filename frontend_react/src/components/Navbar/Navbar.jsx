import React, {useState} from 'react'

import {HiMenuAlt4, HiX} from 'react-icons/hi';
import {motion} from 'framer-motion';
import {Link, useLocation} from 'react-router-dom';
import {images} from '../../constants';
import './Navbar.scss';

const Navbar = () => {
  const location = useLocation();
  const onHomePage = location.pathname === '/';
  const onProjectPage = location.pathname.startsWith('/project');
  const [toggle, setToggle] = useState(false)

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link to="/">
          <img src={images.logo} alt="logo"/>
        </Link>
      </div>
      <div className="app__navbar-goBack">
        <Link to="/" className="app__navbar-back">
          <svg
            className="close-icon"
            viewBox="0 0 320 512"
            width="14"
            style={{ marginRight: "8px" }}
          >
            <path
              fill="currentColor"
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
            />
          </svg>
          Go Back
        </Link>
      </div>
      <ul className="app__navbar-links">
        {['home', 'about', 'work', 'skills', 'contact'].map((item) => {
          return <li className="app__flex p-text" key={`link-${item}`}>
            <div/>
            {onHomePage ? (
              <a href={`#${item}`}>{item}</a> // already on home → normal scroll
            ) : (
              <Link to="/" state={{scrollTo: item}}>{item}</Link> // coming from project page
            )}
          </li>;
        })}
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