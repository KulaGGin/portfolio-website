import React, { useState, useRef } from 'react'

import {images } from '../../constants'
import {AppWrap, MotionWrap} from '../../wrapper'
import './Contact.scss';
import emailjs from '@emailjs/browser';


import './Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSubmittedMessage, setFormSubmittedMessage] = useState('')


  const { user_name, user_email, message } = formData;

  const form = useRef();
  emailjs.init({
    publicKey: "1JR1e1LbRv13_erwG",
  });

  const handleChangeInput = (e) => {
    const {name, value } = e.target;
    console.log(name, value);
    setFormData({...formData, [name]: value})
  }

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
        .sendForm('contact_service', 'contact_form', form.current)
        .then(
            () => {
              setIsFormSubmitted(true);
              setFormSubmittedMessage("Thank you for getting in touch!");
            },
            (error) => {
              setIsFormSubmitted(true);
              setFormSubmittedMessage(`There was an error trying to send the message:\r\n${error}`);
            },
        );
  };

  return (
    <>
      <h2 className="head-text">Send me a message</h2>

      <div className="app__contact-cards">
        <div className="app__contact-card">
          <img src={images.email} alt="email" />
          <a href="mailto:serg.kulaggin@gmail.com" className="p-text">
            serg.kulaggin@gmail.com
          </a>
        </div>
      </div>

      {!isFormSubmitted ?
        <form className="app__contact-form app__flex" ref={form}>
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Name" name="user_name" value={user_name} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your email" name="user_email" value={user_email} onChange={handleChangeInput} />
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
          <button type="button" className='p-text' onClick={sendEmail}>{loading ? 'Sending' : 'Send Message'}</button>
        </form>
        : <div>
          <h3 className='head-text'>{formSubmittedMessage}</h3>
        </div>
      }
    </>
  );

  // return (
  //     <form ref={form} onSubmit={sendEmail}>
  //       <label>Name</label>
  //       <input type="text" name="user_name" />
  //       <label>Email</label>
  //       <input type="email" name="user_email" />
  //       <label>Message</label>
  //       <textarea name="message" />
  //       <input type="submit" value="Send" />
  //     </form>
  // );
}

export default AppWrap(
  MotionWrap(Contact, 'app__contact'),
  'contact',
  'app__primarybg'
)