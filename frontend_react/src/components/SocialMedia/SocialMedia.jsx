import React from 'react';

import { BsTwitter, BsGithub, BsStackOverflow } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa'

import './SocialMedia.scss'

const SocialMedia = () => {
  return (
    <div className="app__social">
      <a className="app__social-link" href="https://github.com/KulaGGin">
        <div>
          <BsGithub />
        </div>
      </a>
      <a className="app__social-link" href="https://stackoverflow.com/users/6693304/kulaggin">
        <div>
          <BsStackOverflow />
        </div>
      </a>
      <a className="app__social-link" href="https://twitter.com/SergKulaGGin">
      <div>
          <BsTwitter />
      </div>
      </a>
    </div>
  );
};

export default SocialMedia;
