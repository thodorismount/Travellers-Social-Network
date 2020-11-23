import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import CreateSelectCountries from '../components/selectCountry';
import MapsSelector from '../components/MapsSelector';
import Alert from './Alerts/Alert';
//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
// import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import { withRouter } from 'react-router-dom';
// redux imports
import { createProfile } from '../actions/profile';
import { connect } from 'react-redux';
import ModalMessage from './ModalMessage';

// images
import FileBase from 'react-file-base64';

const styles = {
  form: {
    alignItems: 'center'
  }
};

const EditProfileModal = props => {
  const [formData, setFormData] = useState({
    bio: props.profile ? props.profile.bio : '',
    visitedCountries: props.profile ? props.profile.visitedCountries : '',
    interests: props.profile ? props.profile.interests : '',
    location: props.profile ? props.profile.location : '',
    avatar: props.profile ? props.profile.avatar : ''
  });
  let testopen = props.open;
  const [open, setOpen] = useState({ testopen });

  const onSubmit = e => {
    e.preventDefault();
    props.createProfile(formData, props.edit);
  };
  const handleToggle = () => {
    setOpen(!open);
    if (!open) {
      window.location.reload();
    }
  };
  const handleAutocomplete = v => {
    let t = v.map(val => val.label);
    setFormData({ ...formData, visitedCountries: t.join(',') });
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
      <Tooltip title='Edit profile'>
        <IconButton
          onClick={handleToggle}
          style={{
            display: `${props.hideButton}`,
            position: 'absolute',
            left: '5%',
            top: '1%'
          }}
          color='primary'
          component='span'
        >
          <EditRoundedIcon fontSize='large' />
        </IconButton>
      </Tooltip>

      <Dialog
        open={props.hasProfile ? !open : open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
        disableBackdropClick={props.disableOutsideClick}
        disableEscapeKeyDown={props.disableEscapeKeyDown}
      >
        {/* <DialogTitle id='form-dialog-title'> */}
        <ModalMessage />
        {/* </DialogTitle> */}
        <DialogContent>
          <Alert />
          <form className={classes.form} onSubmit={e => onSubmit(e)}>
            <TextField
              fullWidth
              id='bioTextField'
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
            <MapsSelector
              label='Select your location'
              onChange={handleLocationChange}
              prevLoc={formData.location}
            />
            <CreateSelectCountries
              onChange={handleAutocomplete}
              visitedCount={props.profile ? props.profile.visitedCountries : ''}
              renderCountries={!open}
            />
            <TextField
              id='interests'
              name='interests'
              onChange={handleTextField}
              value={formData.interests}
              type='interests'
              label='Add your interests seperated by comma'
              margin='normal'
              variant='outlined'
              className={classes.textField}
              fullWidth
            />
            <Typography style={{ marginTop: '0.5rem' }}>
              Add profile picture
            </Typography>
            <FileBase
              type='file'
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, avatar: base64 })
              }
            />

            <DialogActions style={{ marginTop: '20px' }}>
              <Button
                color='primary'
                variant='outlined'
                size='medium'
                onClick={handleToggle}
                disabled={props.disableCancelButton}
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
