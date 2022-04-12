import React from 'react';

import { images } from '../../constants';

import './Footer.scss'

const Footer = () => {
  return (
    <footer className="app__Footer">
      <div className="app__LayoutContainer">
        <div className="app__Footer_body">
          <div className="app__Footer_logo">
            <img className="app__Footer_logoImage" src={images.logo} alt="" />
          </div>
          <div className="app__Footer_title">Living, learning & leveling up one day at a time.</div>
          <div className="app__Footer_copyright">
            <span> Handcrafted by Sergei Kulagin using </span>
            <a className="app__Footer_link" href="https://reactjs.org/" target="_blank">React</a>
            <span> & </span>
            <a className="app__Footer_link" href="http://sanity.io/" target="_blank">Sanity</a> © 2022
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
