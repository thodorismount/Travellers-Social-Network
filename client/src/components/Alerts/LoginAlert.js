import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../re.css';

const LoginAlert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

LoginAlert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.loginAlert
});

export default connect(mapStateToProps)(LoginAlert);
