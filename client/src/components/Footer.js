import React from 'react';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
const Footer = () => (
      <footer id="footer" style={{position: 'relative',bottom: '0px',left: '0px',right: '0px',backgroundColor: 'rgb(248, 177, 46)',width: '100%',height: '30vh'}}>
        <br></br>
        <Typography variant='h5'>Hello Traveller! </Typography>
        Share your travel experience and connect with others
        <LocationOn />
        <div
          className='footer-copyright'
          style={({ fontSize: 12 , textAlign: 'right', color: 'black' })}
        >
          <a
            style={{ color: 'black'}}
            href='https://www.skgcode.gr/'
            target='_blank'
          >
            Who we are{' '}
          </a>{' '}
          | © 2020 Copyright: Team Flash @ skgcode
        </div>
      </footer>
);

export default Footer;
