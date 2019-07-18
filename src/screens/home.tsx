import React, { useState, useEffect } from 'react';
import { NavigationBarIOS, RightBarIOS, BarButtonIOS, NavigationStack } from 'navigation-react-native';
import { useStationsState, useStationsDispatch, DataActionType } from '../context';
import { fetchStations } from '../api';
import { SafeAreaView, View, Text, ScrollView, ListView, FlatList, Alert, Modal } from 'react-native';
import StationSearchItem from '../components/station_search_item';
import { StateNavigator } from 'navigation';
import SearchScreen from './search';
import { NavigationHandler } from 'navigation-react';

const HomeScreen = (props: any) => {
	const stationsDispatch = useStationsDispatch();
	const [searchVisible, setSearchVisible] = useState(false);

	const fetchStationsData = async () => {
		stationsDispatch({
			type: DataActionType.SetLoading,
		});
		const new_cameras = await fetchStations();
		stationsDispatch({
			type: DataActionType.Set,
			payload: new_cameras,
		});
	};

	useEffect(() => {
		fetchStationsData();
	}, []);

	const searchNavigator = new StateNavigator([
		{ key: 'search' },
	]);
	
	var { search } = searchNavigator.states;
	search.renderScene = () => <SearchScreen onFinish={()=>setSearchVisible(false)} />;
	
	searchNavigator.navigate('search');
	

	return (
		
		<ScrollView contentInsetAdjustmentBehavior='automatic'>
			<Modal visible={searchVisible} animationType={'slide'} >
				<NavigationHandler stateNavigator={searchNavigator}>
					<NavigationStack />
				</NavigationHandler>
			</Modal>
			<NavigationBarIOS largeTitle={true} title={'BuoyFinder'}>
				<RightBarIOS>
					<BarButtonIOS image={require('./../assets/search.png')} onPress={() => {
						setSearchVisible(true);
					}} />
				</RightBarIOS>
			</NavigationBarIOS>
			<Text>TODO: Hello World</Text>
		</ScrollView>
	);
}

export default HomeScreen;