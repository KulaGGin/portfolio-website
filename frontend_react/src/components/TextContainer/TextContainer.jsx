import React from 'react';

import scssVars from './TextContainer.scss'

const TextContainer = (props) => {
  const cn = scssVars.cn;
  const classNames = props.classNames ?? ''
  return (
    <div className={cn + ' ' + classNames}>
      {props.children}
    </div>
  );
};

export default TextContainer;
