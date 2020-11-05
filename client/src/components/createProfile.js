import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import CreateSelectCountries from '../components/selectCountry';
import MapsSelector from '../components/MapsSelector';
import CreateUploadImage from '../components/uploadImage';
import Alert from './Alerts/Alert';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
// import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DialogActions from '@material-ui/core/DialogActions';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../actions/profile';
import { create } from 'lodash';
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

const EditProfileModal = props => {
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

  const handleAutocomplete = v => {
    let t = v.map(val => val.label);
    setFormData({ ...formData, visitedCountries: t.join(',') });
  };

  const handleLocationChange = v => {
    setFormData({ ...formData, location: v.terms[0].value });
  };

  const handleTextField = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { classes } = props;
  return (
    <Fragment>
      <Button
        variant='contained'
        size='medium'
        color='primary'
        onClick={handleToggle}
        className={classes.button}
        startIcon={<AccountCircleIcon />}
      >
        {props.buttonType}
      </Button>
      <Dialog
        open={!open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit Your Profile</DialogTitle>
        <DialogContent>
          <Alert />
          <form className={classes.form} onSubmit={e => onSubmit(e)}>
            <TextField
              fullWidth
              id='postTextField'
              autoFocus
              name='bio'
              value={formData.bio}
              multiline
              rows={3}
              margin='normal'
              variant='outlined'
              placeholder='Hey traveller! Write your bio'
              label='Bio'
              fullWidth
              onChange={handleTextField}
            />

            <TextField
              id='interests'
              name='interests'
              onChange={handleTextField}
              value={formData.interests}
              type='interests'
              label='Interests e.g. travelling, hiking, ...'
              margin='normal'
              variant='outlined'
              className={classes.textField}
              fullWidth
            />
            <CreateSelectCountries onChange={handleAutocomplete} />
            <MapsSelector
              label='Select your location'
              onChange={handleLocationChange}
            />

            <CreateUploadImage />

            <DialogActions>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.button}
                size='medium'
              >
                Submit
              </Button>
              <Button
                color='primary'
                variant='outlined'
                size='medium'
                onClick={handleToggle}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

EditProfileModal.propTypes = {
  classes: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(
  withStyles(styles)(withRouter(EditProfileModal))
);
