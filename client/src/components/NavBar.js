import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';

import './Navbar.css';

//redux imports
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const NavBar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  props
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          id='appbar'
          className='appbar'
          style={{ background: '#6fc3f2' }}
        >
          <Toolbar id='toolbar'>
            <Tooltip title='Go to feed page'>
              <IconButton id='navbar-logo' component={Link} to='/home'>
                <img
                  src='../static/images/shorter_new_logo_earth.png'
                  alt='Avatar'
                  className='navbar-logo'
                />
              </IconButton>
            </Tooltip>
            <Typography variant='h6' className={classes.title}></Typography>

            <Tooltip title='View profile' id='profile-button'>
              <Button
                component={Link}
                to={`/userProfile/${user && user._id}`}
                style={{ marginTop: '7px' }}
              >
                <Typography
                  variant='h4'
                  style={{
                    textTransform: 'capitalize',
                    fontFamily: 'Bahnschrift Condensed',
                    color: '#ffffff'
                  }}
                >
                  {`${user && user.firstName}`}
                </Typography>
              </Button>
            </Tooltip>
            <Tooltip className='navbar-logout' title='Logout' placement='top'>
              <IconButton component={Link} to='/login' onClick={logout}>
                <ExitToAppIcon fontSize='large' style={{ color: '#ffffff' }} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
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
