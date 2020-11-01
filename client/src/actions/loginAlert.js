import { SET_LOGIN_ALERT, REMOVE_LOGIN_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

export const loginAlert = (msg, alertType) => dispatch => {
  const id = uuidv4();
  setTimeout(
    () =>
      dispatch({
        type: SET_LOGIN_ALERT,
        payload: { msg, alertType, id }
      }),
    500
  );

  setTimeout(() => dispatch({ type: REMOVE_LOGIN_ALERT, payload: id }), 7000);
};
