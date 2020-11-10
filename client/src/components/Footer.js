import React from "react";
import Typography from '@material-ui/core/Typography';
import Explore from '@material-ui/icons/Explore';
import LocationOn from '@material-ui/icons/LocationOn';
const Footer = () => (
  <div className="footer">
      <br></br>
      <Typography variant='h5'>Hello Traveller! </Typography>
     Share your travel experience and connect with others 
   <LocationOn />
<div className="footer-copyright" style={{fontSize: 12},{textAlign:'right'}}>
  <a style={{color: 'black'}} href="https://www.skgcode.gr/" target="_blank" >Who we are </a> | © 2020 Copyright: Team Flash @ skgcode
  </div>
  </div>
);

export default Footer;