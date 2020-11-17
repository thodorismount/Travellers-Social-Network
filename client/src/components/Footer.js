import React from 'react';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import '../App.css';
const Footer = () => (
      <footer id="footer">
        <Typography variant='h4' align='center' >Hello Traveller! </Typography>
        <Typography variant='h5' align='center' >Share your travel experience and connect with others  <LocationOn /> </Typography>
        <div
          style={({textAlign: 'center'})}
        >
          <a
            style={{ color: 'black'}}
            href='https://www.skgcode.gr/'
            target='_blank' rel="noopener noreferrer"
          >
            Who we are{' '}
          </a>{' '}
          | © 2020 Copyright: Team Flash @ skgcode
        </div>
      </footer>
);

export default Footer;
