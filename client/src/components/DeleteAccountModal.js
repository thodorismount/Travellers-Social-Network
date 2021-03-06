import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteProfile } from '../actions/profile';
// redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function DeleteAccountModal(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant='contained'
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
        style={{
          marginLeft: '18px',
          backgroundColor: 'red',
          color: 'white',
          fontFamily: 'Bahnschrift Condensed',
          fontSize: '1.1rem'
        }}
      >
        Delete account
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          <div
            style={{
              fontFamily: 'Bahnschrift Condensed',
              fontSize: '1.5rem'
            }}
          >
            Delete account?
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <div
              style={{
                fontFamily: 'Bahnschrift Condensed',
                fontSize: '1.2rem'
              }}
            >
              We're sorry to see you leave
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='primary'
            variant='outlined'
            style={{
              fontFamily: 'Bahnschrift Condensed',
              fontSize: '1.1rem'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => props.deleteProfile()}
            style={{
              backgroundColor: 'red',
              color: 'white',
              fontFamily: 'Bahnschrift Condensed',
              fontSize: '1.1rem'
            }}
            variant='contained'
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteAccountModal.propTypes = {
  deleteProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(mapStateToProps, { deleteProfile })(DeleteAccountModal);
