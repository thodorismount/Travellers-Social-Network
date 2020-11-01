import { combineReducers } from 'redux';
import alert from './alert';
import loginAlert from './loginAlert';
import auth from './auth';
import profile from './profile';

export default combineReducers({
  alert,
  loginAlert,
  auth,
  profile
});
