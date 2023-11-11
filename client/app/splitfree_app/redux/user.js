import * as ActionTypes from './ActionTypes';

export const user = (
  state = {
    loggedin: false,
    user: {},
  },
  action,
) => {
  console.log(action);
  switch (action.type) {
    case ActionTypes.SIGNIN:
      return {
        ...state,
        errMess: null,
        loggedin: true,
        user: action.payload.user,
      };
    case ActionTypes.REGISTER:
      return {
        ...state,
        errMess: null,
        loggedin: true,
        user: action.payload,
      };
    case ActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        errMess: null,
        loggedin: true,
        user: action.payload.user,
      };
    case ActionTypes.SIGNOUT:
      return {
        ...state,
        errMess: null,
        loggedin: false,
        user: {},
      };
    default:
      return state;
  }
};
