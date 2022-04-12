import React, { useState } from 'react'

import {images } from '../../constants'
import {AppWrap, MotionWrap} from '../../wrapper'
import {client } from '../../client'
import './Contact.scss';

import './Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false)

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const {name, value } = e.target;

    setFormData({...formData, [name]: value})
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true)
      })
  }

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__contact-cards">
        <div className="app__contact-card">
          <img src={images.email} alt="email" />
          <a href="mailto:serg.kulaggin@gmail.com" className="p-text">
            serg.kulaggin@gmail.com
          </a>
        </div>
        <div className="app__contact-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel:+1 (123) 456-789" className="p-text">
            +1 (123) 456-789
          </a>
        </div>
      </div>

      {!isFormSubmitted ?
        <div className="app__contact-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Name" name="name" value={name} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your email" name="email" value={email} onChange={handleChangeInput} />
          </div>
          <div>
          <textarea
            className='p-text'
            placeholder='Your Message'
            value={message}
            name="message"
            onChange={handleChangeInput}
          ></textarea>
          </div>
          <button type="button" className='p-text' onClick={handleSubmit}>{loading ? 'Sending' : 'Send Message'}</button>
        </div>
        : <div>
          <h3 className='head-text'>Thank you for getting in touch!</h3>
        </div>
      }
    </>
  );
}

export default AppWrap(
  MotionWrap(Contact, 'app__contact'),
  'contact',
  'app__whitebg'
)