import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateDatePicker from '../components/DatePicker';
import Grid from '@material-ui/core/Grid';
import CreateGenderSelector from '../components/GenderSelector';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  form: {
    //padding: '30px',
  },
  button: {
    margin: '10px 10px'
  }
};

const FormDialog = props => {
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

  let testOpen;
  const [open, setOpen] = useState({ testOpen });

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      props.setAlert('Passwords do not match', 'danger');
    }
    console.log(formData);
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
        <DialogContent>
          <DialogContentText>It’s quick and easy.</DialogContentText>
          <form className={classes.form} onSubmit={e => handleSubmit(e)}>
            <TextField
              autoFocus
              name='firstName'
              margin='normal'
              id='firstName'
              label='First name'
              variant='outlined'
              fullWidth
              onChange={e => handleTextFieldChange(e)}
            />
            <TextField
              name='lastName'
              margin='normal'
              id='lastName'
              label='Last name'
              variant='outlined'
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
              fullWidth
              onChange={e => handleTextFieldChange(e)}
            />
            <TextField
              name='password'
              margin='normal'
              id='password'
              label='Password'
              type='password'
              variant='outlined'
              fullWidth
              onChange={e => handleTextFieldChange(e)}
            />

            <TextField
              name='confirmPassword'
              margin='normal'
              id='confirmPassword'
              label='Confirm password'
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
                      onChange={value => setFormData({...formData, birthDate: value })}
                    />
                  </td>
                  <td>
                    <CreateGenderSelector
                      onChange={value => setFormData({...formData, gender: value })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleToggle}>
            Cancel
          </Button>
          <Button color='primary' type='submit' onClick={e => handleSubmit(e)}>
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default withStyles(styles)(connect(null, { setAlert })(FormDialog));
