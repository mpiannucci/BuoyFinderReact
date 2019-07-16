import React from 'react';
import { NavigationHandler } from 'navigation-react';
import { NavigationStack } from 'navigation-react-native';
import { AppStateProvider } from './context';
import createStateNavigator from './create_state_navigator';

const stateNavigator = createStateNavigator();

stateNavigator.navigate('home');

export default () => (
  <AppStateProvider>
    <NavigationHandler stateNavigator={stateNavigator}>
      <NavigationStack />
    </NavigationHandler>
  </AppStateProvider>
);
