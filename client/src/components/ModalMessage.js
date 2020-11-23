import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../actions/profile';

import '../re.css';

const ModalMessage = ({ auth: { user }, profile: { profile } }) => {
  if (profile == null) {
    return (
      <DialogTitle style={{ width: '500px' }}>
        Welcome {user && user.firstName} {user && user.lastName}! Please fill in
        your profile
      </DialogTitle>
    );
  } else {
    return (
      <DialogTitle style={{ width: '500px' }}>Edit your profile </DialogTitle>
    );
  }
};

ModalMessage.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(ModalMessage);
