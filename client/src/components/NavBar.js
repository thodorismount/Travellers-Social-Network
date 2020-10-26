import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import './Navbar.css';

//redux imports
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },

}));

const NavBar = ({ auth: { isAuthenticated, loading }, logout, props }) => {
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

                    </Typography>
                    <Avatar className="navbar-user" src="girl_female_woman_avatar-512.png"></Avatar>
                    <Tooltip  title="View profile" id="profile-button">
                        <IconButton >Name</IconButton>
                    </Tooltip>
                    <Tooltip className="navbar-logout" title="Logout" placement="top">
                        <IconButton component={Link} to='/login' onClick={logout} >
                            <ExitToAppIcon fontSize='large' />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
    );
};

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavBar);


