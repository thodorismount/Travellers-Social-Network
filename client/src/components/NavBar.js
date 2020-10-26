import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import Avatar from '@material-ui/core/Avatar';
import './Navbar.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

const NavBar = ({ auth: { isAuthenticated, loading }, logout, props }) => {
  let isClicked = false;
  const [clicked, setClicked] = useState(isClicked);

  return (
    <nav className='NavbarItems' id='navigationbar'>
      <Tooltip title='Go to feed page'>
        <IconButton>
          <img src='earth2.png' alt='Avatar' className='navbar-logo'></img>{' '}
        </IconButton>
      </Tooltip>
      <div className='nav-links'>
        <Avatar
          className='navbar-user'
          src='girl_female_woman_avatar-512.png'
        ></Avatar>
        <Tooltip title='View profile'>
          <IconButton>Name</IconButton>
        </Tooltip>
        <Tooltip className='navbar-logout' title='Logout' placement='top'>
          <IconButton component={Link} to='/login' onClick={logout}>
            <KeyboardReturn color='white' />
            {/* the above line gives warning "Invalid prop `color` of value `white` " */}
          </IconButton>
        </Tooltip>
      </div>
    </nav>
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
