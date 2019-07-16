import React from 'react';
import { StateNavigator } from 'navigation';
import Home from './screens/home';

export default () => {
	const stateNavigator = new StateNavigator([
		{ key: 'home', route: '' },
	]);

	const { home } = stateNavigator.states;

	home.renderScene = () => <Home />;
	
	return stateNavigator;
}