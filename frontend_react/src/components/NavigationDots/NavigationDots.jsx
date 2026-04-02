import React from 'react';

import './NavigationDots.scss'

const NavigationDots = ({ active }) => {
  return (
    <div className='app__navigation'>
      {['home', 'about', 'work', 'skills', 'testimonials', 'contact'].map((item, index) => (
        <a
          href={`#${item}`}
          key={item + index}
          className='app__navigation-dot'
          style={active === item ? { backgroundColor: '#313BAC' } : {}}>
          <span className="app__navigation-dot_sreenReadersOnly">{item}</span>
        </a>
      ))}
    </div>
  )
}

export default NavigationDots;
