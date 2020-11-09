import React, { Fragment, useEffect, useState } from 'react';
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
import { withRouter } from 'react-router-dom';
import { createProfile } from '../actions/profile';

import { connect } from 'react-redux';
import ModalMessage from './ModalMessage';
import { getCurrentProfile } from '../actions/profile';
import userProfile from '../pages/userProfile';

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

// TODO: Configure visitedCountries and location state managment -_-

const EditProfileModal = props => {
  const [formData, setFormData] = useState({
    bio: props.profile ? props.profile.bio : '',
    visitedCountries: '',
    interests:  props.profile ? props.profile.interests : '',
    location: props.profile ? props.profile.location : ''
  }); 
 let testopen=props.open;
  const [open, setOpen] = useState({ testopen });

  const onSubmit = e => {
    e.preventDefault();
    props.createProfile(formData);
  };
  var testProfile=props.hasProfile;
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleAutocomplete = v => {
    console.log(v);
    let t = v.map(val => val.label);
    setFormData({ ...formData, visitedCountries: t.join(',') });
    console.log(formData.visitedCountries);
  };

  const handleLocationChange = v => {
    setFormData({ ...formData, location: v ? v.terms[0].value : '' });
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
        open={props.hasProfile? !open : open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          <ModalMessage />
          </DialogTitle>
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
            <CreateSelectCountries
              onChange={handleAutocomplete}
              visitedCount={formData.visitedCountries}
            />
            <MapsSelector
              label='Select your location'
              onChange={handleLocationChange}
              prevLoc={formData.location}
            />

            <CreateUploadImage />

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
const mapStateToProps = state => ({ profile: state.profile.profile });

export default connect(mapStateToProps, { createProfile })(
  withStyles(styles)(withRouter(EditProfileModal))
);
