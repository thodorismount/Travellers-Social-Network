import React, { useState, useEffect, Fragment } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import CreateformDialog from '../components/FormDialog';
import $ from 'jquery';
import '../re.css';
//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Footer from '../components/Footer';
import '../index.css';

// R.E. Components
import LoginAlert from '../components/Alerts/LoginAlert';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; //type-checking variables
import { login } from '../actions/auth';
import { loginAlert } from '../actions/loginAlert';

// initialize MUI styles
const styles = {
  form: {
    textAlign: 'center',
    paddingBottom: '98px'
  },
  pageTitle: {
    margin: '10px auto auto auto'
  },
  textField: {
    margin: '15px auto auto auto'
  },
  button: {
    margin: '10px 10px'
  },
  card: {
    padding: '10px',
    marginTop: '100px',
    backgroundColor: '#F0F2F5'
  }
};

const Login = props => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    var contents = $('#appbar')[0];
    contents.style.display = 'none';
    var foot = $('#footer')[0];
    foot.style.display='block';
    if (props.isAuthenticated) {
      props.history.push('/home');
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    props.login(loginData.email, loginData.password);
    setLoginData({});
  };

  const handleChange = event => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const { classes } = props;

  // Redirect if successfully logged in

  return (
    <Fragment>
    <Grid container spacing={1} className={classes.form}>
      <Grid item xs={12} sm={12} md={6}>
        <img
          src='static/images/logo_final.png'
          width='350'
          height='375'
          style={{ marginTop: '100px' }}
        />
        <br />
      </Grid>
      <Grid item xs={12} sm={12} md={4} justify='center'>
        <Card className={classes.card} justify='center'>
          <LoginAlert />
          <Typography varient='h1' className={classes.pageTitle}>
            Please Login or Sign up
          </Typography>

          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
              variant='outlined'
              className={classes.textField}
              // helperText={errors.email}
              // error={errors.email ? true: false}
              value={loginData.email || ''}
              onChange={e => handleChange(e)}
              fullWidth
            />
            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              variant='outlined'
              className={classes.textField}
              // helperText={errors.password}
              // error={errors.password ? true: false}
              value={loginData.password || ''}
              onChange={e => handleChange(e)}
              fullWidth
            />
            <Button
              type='submit'
              size='large'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Login
            </Button>
            <Divider variant='middle' className={classes.divider} />
          </form>
          <CreateformDialog />
        </Card>
      </Grid>
    </Grid>
    </Fragment>
    
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loginAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login, loginAlert })(
  withStyles(styles)(Login)
);
