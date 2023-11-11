import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import UIHandler from './UIHandler';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import {PersistGate} from 'redux-persist/es/integration/react';
import 'react-native-gesture-handler';

const {persistor, store} = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <UIHandler />
      </PersistGate>
    </Provider>
  );
}
