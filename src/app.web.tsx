import React from 'react';
import { View } from 'react-native';
import { NavigationHandler } from 'navigation-react';
import { MobileHistoryManager, NavigationMotion } from 'navigation-react-mobile';
import { AppStateProvider } from './context';
import createStateNavigator from './create_state_navigator';

const stateNavigator = createStateNavigator();

stateNavigator
	.configure(stateNavigator, new MobileHistoryManager(url => {
		var { state, data } = stateNavigator.parseLink(url);
		return stateNavigator.fluent()
			.navigate('home')
			.navigate(state.key, data).url;
	}));

stateNavigator.start();

export default () => (
	<AppStateProvider>
		<NavigationHandler stateNavigator={stateNavigator}>
			<NavigationMotion
				unmountedStyle={{ translate: 100 }}
				mountedStyle={{ translate: 0 }}
				crumbStyle={{ translate: -10 }}>
				{(style, scene, key) => (
					scene
				)}
			</NavigationMotion>
		</NavigationHandler>
	</AppStateProvider>
);
