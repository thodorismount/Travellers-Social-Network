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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import DialogActions from '@material-ui/core/DialogActions';
import { withRouter } from 'react-router-dom';
import { changePassword } from '../actions/profile';
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
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  let testOpen = props.open;
  const [open, setOpen] = useState({ testOpen });

  const submitForm = e => {
    props.changePassword(formData);
  };

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
          <Alert />
          <form className={classes.form}>
            <TextField
              id='oldPassword'
              label='Enter your old password'
              variant='outlined'
              type='password'
              autoComplete='new-password' //to disable autocomplete
              onChange={handleTextField}
              value={formData.oldPassword}
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
              value={formData.newPassword}
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
              value={formData.confirmNewPassword}
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
            variant='contained'
            color='primary'
            className={classes.button}
            size='medium'
            onClick={submitForm}
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
  changePassword: PropTypes.func.isRequired
};

export default connect(null, { changePassword })(
  withStyles(styles)(withRouter(ChangePasswordModal))
);
