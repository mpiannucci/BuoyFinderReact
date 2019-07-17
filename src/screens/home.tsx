import React, { useState, useEffect } from 'react';
import { NavigationBarIOS, RightBarIOS, BarButtonIOS } from 'navigation-react-native';
import { useStationsState, useStationsDispatch, DataActionType } from '../context';
import { fetchStations } from '../api';
import { SafeAreaView, View, Text, ScrollView, ListView, FlatList, Alert } from 'react-native';
import StationSearchItem from '../components/station_search_item';

const HomeScreen = (props: any) => {
	const stationsDispatch = useStationsDispatch();

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

	return (
		<ScrollView contentInsetAdjustmentBehavior='automatic'>
			<NavigationBarIOS largeTitle={true} title={'BuoyFinder'}>
				<RightBarIOS>
					<BarButtonIOS image={require('./../assets/search.png')} onPress={() =>{
						Alert.alert('TEST', 'test');
					}} />
				</RightBarIOS>
			</NavigationBarIOS>
			<Text>TODO: Hello World</Text>
		</ScrollView>
	);
}

export default HomeScreen;