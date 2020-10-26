import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateDatePicker from '../components/DatePicker';
import CreateGenderSelector from '../components/GenderSelector';
import withStyles from '@material-ui/core/styles/withStyles';
// custom  Components
import Alert from './Alert';

const styles = {
  form: {
    //padding: '30px',
  },
  button: {
    margin: '10px 10px'
  }
};

const FormDialog = props => {
  let testOpen;
  const [open, setOpen] = useState({ testOpen });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: ''
  });

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    birthDate,
    gender
  } = formData;

  useEffect(() => {});
  const handleToggle = e => {
    setOpen(!open);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.register({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      birthDate,
      gender
    });
  };

  const handleTextFieldChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { classes } = props;
  return (
    <Fragment>
      <Button
        variant='contained'
        size='large'
        color='primary'
        onClick={handleToggle}
        className={classes.button}
      >
        Sign Up
      </Button>

      <Dialog
        open={!open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          Join Travellers community
        </DialogTitle>
        <form className={classes.form} onSubmit={e => handleSubmit(e)}>
          <DialogContent>
            <DialogContentText>It’s quick and easy.</DialogContentText>
            <Alert />

            <TextField
              autoFocus
              name='firstName'
              margin='normal'
              id='firstName'
              label='First name'
              variant='outlined'
              value={formData.firstName || ''}
              fullWidth
              onChange={e => handleTextFieldChange(e)}
            />
            <TextField
              name='lastName'
              margin='normal'
              id='lastName'
              label='Last name'
              variant='outlined'
              value={formData.lastName || ''}
              fullWidth
              onChange={e => handleTextFieldChange(e)}
            />
            <TextField
              name='email'
              margin='normal'
              id='email'
              label='Email'
              type='email'
              variant='outlined'
              value={formData.email || ''}
              fullWidth
              onChange={e => handleTextFieldChange(e)}
            />
            <TextField
              id='password'
              name='password'
              margin='normal'
              label='Password'
              type='password'
              variant='outlined'
              className={classes.textField}
              value={formData.password || ''}
              onChange={e => handleTextFieldChange(e)}
              fullWidth
            />

            <TextField
              name='confirmPassword'
              margin='normal'
              id='confirmPassword'
              label='Confirm password'
              value={formData.confirmPassword || ''}
              type='password'
              variant='outlined'
              fullWidth
              onChange={e => handleTextFieldChange(e)}
            />

            <table>
              <tbody>
                <tr>
                  <td>
                    <CreateDatePicker
                      onChange={value =>
                        setFormData({ ...formData, birthDate: value })
                      }
                    />
                  </td>
                  <td>
                    <CreateGenderSelector
                      onChange={value =>
                        setFormData({ ...formData, gender: value })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </DialogContent>

          <DialogActions>
            <Button color='primary' onClick={e => handleToggle(e)}>
              Cancel
            </Button>
            <Button
              type='submit'
              size='large'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Sign Up
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

FormDialog.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withStyles(styles)(
  connect(mapStateToProps, { setAlert, register })(FormDialog)
);
