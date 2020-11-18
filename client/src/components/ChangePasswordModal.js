import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import LoginAlert from './Alerts/LoginAlert';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

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
const useStyles = makeStyles(() => ({
  paper: { width: '400px' }
}));

const ChangePasswordModal = props => {
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
  const styleDialog = useStyles();
  const { classes } = props;
  return (
    <Fragment>
      <Button
        variant='contained'
        color='default'
        startIcon={<LockOutlinedIcon />}
        onClick={handleToggle}
        style={{ marginTop: '12px' }}
      >
        Change password
      </Button>
      <Dialog
        open={!open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
        classes={{ paper: styleDialog.paper }}
      >
        <DialogTitle id='form-dialog-title'>Change Password</DialogTitle>
        <DialogContent>
          <LoginAlert />
          <form className={classes.form} onSubmit={e => onSubmit(e)}>
            <TextField
              id='oldPassword'
              label='Enter your old password'
              variant='outlined'
              type='password'
              autoComplete='new-password' //to disable autocomplete
              onChange={handleTextField}
              // value={formData.firstName}
              margin='normal'
              name='oldPassword'
              className={classes.textField}
              fullWidth
            />
            <TextField
              id='newPassword'
              label='Enter your new password'
              variant='outlined'
              type='password'
              autoComplete='new-password' //to disable autocomplete
              onChange={handleTextField}
              // value={formData.firstName}
              margin='normal'
              name='newPassword'
              className={classes.textField}
              fullWidth
            />

            <TextField
              id='confirmNewPassword'
              label='Confirm your new password'
              variant='outlined'
              type='password'
              autoComplete='new-password' //to disable autocomplete
              onChange={handleTextField}
              // value={formData.firstName}
              margin='normal'
              name='confirmNewPassword'
              className={classes.textField}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
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

ChangePasswordModal.propTypes = {
  classes: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(
  withStyles(styles)(withRouter(ChangePasswordModal))
);
