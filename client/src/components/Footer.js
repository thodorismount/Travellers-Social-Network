import React from 'react';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
const Footer = () => (
  <Grid container>
    <Grid item xs={12} sm={12} md={12} lg={12} >
  <div className="footer" id="footer">
      <br></br>
      <Typography variant='h5'>Hello Traveller! </Typography>
     Share your travel experience and connect with others 
   <LocationOn />
<div className="footer-copyright" style={{fontSize: 12},{textAlign:'right'}}>
  <a style={{color: 'black'}} href="https://www.skgcode.gr/" target="_blank" >Who we are </a> | © 2020 Copyright: Team Flash @ skgcode
  </div>
  </div>
  </Grid>
  </Grid>
);

export default Footer;
