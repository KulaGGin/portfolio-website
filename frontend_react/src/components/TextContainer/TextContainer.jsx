import React from 'react';

import scssVars from './TextContainer.scss'

const TextContainer = (props) => {
  const cn = scssVars.cn;

  return (
    <div className={`${cn}`}>
      {props.children}
    </div>
  );
};

export default TextContainer;
