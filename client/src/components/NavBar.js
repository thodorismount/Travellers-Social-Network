
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from 'react-router-dom/Link';
import Tooltip from '@material-ui/core/Tooltip';

import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import Avatar from '@material-ui/core/Avatar';
import './Navbar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" id="appbar" style={{ background: '#60a8b1' }}>
        <Toolbar id="toolbar">
        <Tooltip  title="Go to feed page" >
                 <IconButton id="navbar-logo" >    
                    <img src="earth2.png" alt="Avatar" className="navbar-logo"></img>
                 </IconButton>
                </Tooltip>
          <Typography variant="h6" className={classes.title}>
            
          </Typography>
          <Avatar className="navbar-user" src="girl_female_woman_avatar-512.png"></Avatar>
                    <Tooltip  title="View profile" id="profile-button">
                        <IconButton >Name</IconButton>
                     </Tooltip>
                    <Tooltip className="navbar-logout" title="Logout" placement="top">
                        <IconButton component={Link} to="/login">
                        <KeyboardReturn color="white" />
                        </IconButton>
                    </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}

