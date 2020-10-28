import { initial } from 'lodash';

import { SET_LOGIN_ALERT, REMOVE_LOGIN_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOGIN_ALERT:
      return [...state, payload];
    case REMOVE_LOGIN_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
