import { combineReducers } from 'redux';
import alert from './alert';
import loginAlert from './loginAlert';
import auth from './auth';
import profile from './profile';
import post from './post';


export default combineReducers({
  alert,
  loginAlert,
  auth,
  profile,
  post
});
