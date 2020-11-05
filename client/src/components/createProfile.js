import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import CreateSelectCountries from '../components/selectCountry';
import MapsSelector from '../components/MapsSelector';
import CreateUploadImage from '../components/uploadImage';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DialogActions from '@material-ui/core/DialogActions';

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
    countries: '',
    interests: '',
    location: ''
  });

  let testOpen = props.open;
  const [open, setOpen] = useState({ testOpen });

  const handleToggle = () => {
    setOpen(!open);
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
        Edit profile
      </Button>
      <Dialog
        open={!open}
        onClose={handleToggle}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit Your Profile</DialogTitle>
        <DialogContent>
          <form className={classes.form}>
            <TextField
              fullWidth
              id='postTextField'
              autoFocus
              name='postTextField'
              multiline
              rows={3}
              margin='normal'
              // defaultValue="Hey traveller! Write your story"
              variant='outlined'
              placeholder='Hey traveller! Write your bio'
              label='Bio'
              fullWidth
            />

            <TextField
              id='interests'
              name='interests'
              type='interests'
              label='Interests e.g. travelling, hiking, ...'
              margin='normal'
              variant='outlined'
              className={classes.textField}
              // helperText={errors.interests}
              // error={errors.interests ? true: false}
              //onChange={this.handleChange}
              fullWidth
            />
            {/* <Typography varient='h1' className={classes.pageTitle}>
              Select Countries you've visited
            </Typography> */}
            <CreateSelectCountries />
            {/* <Typography varient='h1' className={classes.pageTitle}>
              Select your location
            </Typography> */}
            <MapsSelector label='Select your location' />
            {/* <Typography varient='h1' className={classes.pageTitle}>
              Upload Profile Picture
            </Typography> */}
            <CreateUploadImage />
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

EditProfileModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfileModal);
