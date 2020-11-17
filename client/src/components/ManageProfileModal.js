import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Alert from './Alerts/Alert';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import CreateDatePicker from '../components/DatePicker';
import CreateGenderSelector from '../components/GenderSelector';
import DeleteAccountModal from '../components/DeleteAccountModal';
// import Typography from '@material-ui/core/Typography';

import DialogActions from '@material-ui/core/DialogActions';
import { withRouter } from 'react-router-dom';
import { createProfile } from '../actions/profile';
import { connect } from 'react-redux';

const styles = {
  button: {
    margin: '10px 10px'
  },
  pageTitle: {
    margin: '10px'
  },
  form: {
    alignItems: 'center'
  }
};

const ManageProfileModal = props => {
  const [formData, setFormData] = useState({
    visitedCountries: '',
    interests: '',
    location: ''
  });

  const onSubmit = e => {
    e.preventDefault();
    props.createProfile(formData, props.history);
    window.location.reload(false);
  };

  let testOpen = props.open;
  const [open, setOpen] = useState({ testOpen });

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleTextField = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { classes } = props;
  return (
    <Fragment>
      <IconButton
        color='primary'
        title='Manage account'
        component='span'
        onClick={handleToggle}
        style={{
          position: 'absolute',
          left: '80%',
          top: '1%'
        }}
      >
        <SettingsIcon fontSize='large' />
      </IconButton>
      <Dialog
        open={!open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Manage account</DialogTitle>
        <DialogContent>
          <Alert />
          <form className={classes.form} onSubmit={e => onSubmit(e)}>
            <TextField
              id='firstName'
              label='First name'
              variant='outlined'
              onChange={handleTextField}
              // value={formData.firstName}
              margin='normal'
              autoFocus
              name='firstName'
              className={classes.textField}
              fullWidth
              type='text'
            />
            <TextField
              id='lastName'
              label='Last name'
              variant='outlined'
              onChange={handleTextField}
              // value={formData.firstName}
              margin='normal'
              name='lastName'
              className={classes.textField}
              fullWidth
              type='text'
            />
            <TextField
              id='newPassword'
              label='New password'
              variant='outlined'
              type='password'
              autoComplete='new-password' //to disable autocomplete
              onChange={handleTextField}
              // value={formData.firstName}
              margin='normal'
              name='password'
              className={classes.textField}
              fullWidth
            />

            <TextField
              id='confirmNewPassword'
              label='Confirm new password'
              variant='outlined'
              type='password'
              autoComplete='new-password' //to disable autocomplete
              onChange={handleTextField}
              // value={formData.firstName}
              margin='normal'
              name='password'
              className={classes.textField}
              fullWidth
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
          </form>
        </DialogContent>
        <DialogActions>
          <DeleteAccountModal />
          <div style={{ flex: '1 0 0' }} />
          <Button
            color='primary'
            variant='outlined'
            size='medium'
            onClick={handleToggle}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            size='medium'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

ManageProfileModal.propTypes = {
  classes: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(
  withStyles(styles)(withRouter(ManageProfileModal))
);
