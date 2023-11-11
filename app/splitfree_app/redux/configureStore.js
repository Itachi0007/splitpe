import {applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import {
  persistStore,
  persistCombineReducers,
  persistReducer,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import {user} from './user';
import {appTheme} from './appTheme';
import {reduxDebugMiddleware} from 'redux-debugger';
import {configureStore} from '@reduxjs/toolkit';
export const ConfigureStore = () => {
  const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true,
  };
  const reducers = combineReducers({
    user,
    appTheme,
  });
  const createDebugger = require('redux-flipper').default;
  const persistedReducer = persistReducer(config, reducers);
  console.log(persistedReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, logger, reduxDebugMiddleware, createDebugger()],
  });

  const persistor = persistStore(store);

  return {persistor, store};
};
