import React from 'react';
import { StateNavigator } from 'navigation';
import { NavigationHandler } from 'navigation-react';
import { NavigationStack } from 'navigation-react-native';
import Home from './screens/home';
import { AppStateProvider } from './context';

var stateNavigator = new StateNavigator([
  { key: 'home' },
]);

var { home } = stateNavigator.states;

home.renderScene = () => <Home />;

stateNavigator.navigate('home');

export default () => (
  <AppStateProvider>
    <NavigationHandler stateNavigator={stateNavigator}>
      <NavigationStack />
    </NavigationHandler>
  </AppStateProvider>
);
