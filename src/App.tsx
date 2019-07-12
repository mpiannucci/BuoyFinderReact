import React from 'react';
import {StateNavigator} from 'navigation';
import {NavigationHandler} from 'navigation-react';
import {NavigationStack} from 'navigation-react-native';
import Home from './screens/home';

var stateNavigator = new StateNavigator([
  {key: 'home'},
]);

var {home} = stateNavigator.states;

home.renderScene = () => (<Home/>);

export default () => (
  <NavigationHandler stateNavigator={stateNavigator}>
    <NavigationStack />
  </NavigationHandler>
);
