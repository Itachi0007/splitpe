import * as ActionTypes from './ActionTypes';

export const setDemo = demo => ({
  type: ActionTypes.DEMO_DONE,
  payload: demo,
});
export const signinUser = data => ({
  type: ActionTypes.SIGNIN,
  payload: data,
});
export const signOutUser = () => ({
  type: ActionTypes.SIGNOUT,
});
export const registerUser = data => ({
  type: ActionTypes.REGISTER,
  payload: data,
});
export const updateUser = data => ({
  type: ActionTypes.UPDATE_PROFILE,
  payload: data,
});

export const changeTheme = data => ({
  type: ActionTypes.SET_THEME,
  payload: data,
});
export const addSchool = data => ({
  type: ActionTypes.SET_SCHOOL,
  payload: data,
});
