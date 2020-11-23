import React from 'react';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import '../App.css';
const Footer = () => (
  <footer id='footer'>
    <Typography
      variant='h4'
      align='center'
      style={{ color: 'white', fontFamily: 'Bahnschrift Condensed' }}
    >
      Hello Traveller!{' '}
    </Typography>
    <Typography
      variant='h5'
      align='center'
      style={{ color: 'white', fontFamily: 'Bahnschrift Condensed' }}
    >
      Share your travel experience and connect with others <LocationOn />{' '}
    </Typography>
    <div
      style={{
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Bahnschrift Condensed'
      }}
    >
      <a
        style={{ color: 'white', fontFamily: 'Bahnschrift Condensed' }}
        href='https://www.skgcode.gr/'
        rel='noopener noreferrer'
        target='_blank'
      >
        Who we are
      </a>
      | © 2020 Copyright: Team Flash @ skgcode
    </div>
  </footer>
);

export default Footer;
