import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuidv4();
  setTimeout(
    () =>
      dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
      }),
    500
  );

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 7000);
};
