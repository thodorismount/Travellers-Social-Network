import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../actions/profile';

import '../re.css';

const ModalMessage = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  if (profile == null) {
    return (
      <Typography style={{ textTransform: 'capitalize' }}>
        {' '}
        Welcome {user && user.firstName} {user && user.lastName}! Please fill in
        your profile
      </Typography>
    );
  } else {
    return <Typography>Edit your profile</Typography>;
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
