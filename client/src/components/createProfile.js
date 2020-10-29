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

const styles = {
  button: {
    margin: '10px 10px'
  },
  pageTitle: {
    margin: '10px'
  }
};

const EditProfileModal = props => {
  const [formData, setFormData] = useState({
    countries: '',
    interests: '',
    location: ''
  });

  let testOpen;
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
              id='interests'
              name='interests'
              type='interests'
              label='Interests e.g. travelling, hikinkg, ..'
              className={classes.textField}
              // helperText={errors.interests}
              // error={errors.interests ? true: false}
              //onChange={this.handleChange}
              fullWidth
            />
            <Typography varient='h1' className={classes.pageTitle}>
              Select Countries you've visited
            </Typography>
            <CreateSelectCountries />
            <Typography varient='h1' className={classes.pageTitle}>
              Select your location
            </Typography>
            <MapsSelector />
            <Typography varient='h1' className={classes.pageTitle}>
              Upload Profile Picture
            </Typography>
            <CreateUploadImage />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Submit{' '}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

EditProfileModal.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EditProfileModal);