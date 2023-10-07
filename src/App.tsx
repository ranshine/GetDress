import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './store';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
