import axios from 'axios';
import { loginAlert } from './loginAlert';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  USER_LOADED,
  AUTH_ERROR,
  UPDATE_ACCOUNT
} from './types';

// load user
export const loadUser = () => async dispatch => {
  //if the token exists we get the user from  route api/auth/ and store it in our payload
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// get current users profile
export const getCurrentProfile = id => async dispatch => {
  try {
    const res = await axios.get(`/api/profiles/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update a profile

export const createProfile = (formData, edit) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profiles', formData, config);

    if (!edit) {
      dispatch(loadUser());
    }
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'), 'success');

    window.location.reload();
  } catch (err) {
    let errors;
    if (err.response && err.response.data && err.response.data.errors)
      errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    if (err.response && err.response.statusText && err.response.status) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

//
export const deleteProfile = () => async dispatch => {
  try {
    await axios.delete('/api/profiles');

    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: ACCOUNT_DELETED });

    dispatch(setAlert('Your account has been permanently deleted'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateAccount = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/users/updateAccount', formData, config);
    dispatch(loginAlert('Account Updated. Redirecting...', 'success'));
    setInterval(() => {
      window.location.reload();
    }, 5000);
  } catch (err) {
    console.log(err);
    let errors;
    if (err.response && err.response.data && err.response.data.errors)
      errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(loginAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
