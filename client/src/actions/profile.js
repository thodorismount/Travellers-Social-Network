import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  ACCOUNT_DELETED,
  CLEAR_PROFILE
} from './types';

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

export const createProfile = (formData, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profiles', formData, config);

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
