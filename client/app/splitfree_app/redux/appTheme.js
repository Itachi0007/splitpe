import * as ActionTypes from './ActionTypes';
const lightTheme = {
  primary: '#F5D020',
  tint: '#fff0a6',
  backgroundColor: 'white',
  urgentNotif: 'black',
  cardColor: 'white',
  text: '#1C162E',
  textTint: '#8F8E94',
  taskCard: '#191919',
  textGray: '#515151',
  themeColor: '#FFFFFF',
  toggleColor: '#000000',
  cardbgColor: '#191919',
  headerColor: '#FFFFFF',
  childcardbgColor: '#EFF0F6',
  borderColor: '#b3b3b3',
};
const darkTheme = {
  primary: '#F5D020',
  tint: '#fff0a6',
  backgroundColor: 'black',
  urgentNotif: 'white',
  cardColor: '#202020',
  text: 'white',
  textTint: '#8F8E94',
  taskCard: '#202020',
  textGray: '#515151',
  themeColor: '#000000',
  toggleColor: '#FFFFFF',
  cardbgColor: '#202020',
  headerColor: '#202020',
  childcardbgColor: '#202020',
  borderColor: '#b3b3b3',
};
export const appTheme = (
  state = {
    theme: lightTheme,
    themeState: 'light',
  },
  action,
) => {
  console.log(action);
  switch (action.type) {
    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload == 'dark' ? darkTheme : lightTheme,
        themeState: action.payload,
      };
    default:
      return state;
  }
};
