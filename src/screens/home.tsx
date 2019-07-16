import React, { useState, useEffect } from 'react';
import { NavigationBarIOS, SearchBarIOS } from 'navigation-react-native';
import { useStationsState, useStationsDispatch, DataActionType } from '../context';
import { fetchStations } from '../api';
import { SafeAreaView, View, Text, ScrollView, ListView, FlatList, Alert } from 'react-native';
import StationSearchItem from '../components/station_search_item';

const HomeScreen = (props: any) => {
	const stationsState = useStationsState();
	const stationsDispatch = useStationsDispatch();
	const [searchQuery, setSearchQuery] = useState('');

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
		console.log('USE EFFECT');
		fetchStationsData();
	}, []);

	const stations = stationsState.data === undefined ? [] : stationsState.data;
	const matchedStations = stationsState.data === undefined ? [] : stationsState.data.filter(
		(station, index) => {
			var idMatch = false;
			if (station.id !== undefined) {
				idMatch = station.id.includes(searchQuery);
			}

			var nameMatch = false;
			if (station.name !== undefined) {
				nameMatch = station.name.includes(searchQuery);
			}

			return idMatch || nameMatch;
		}
	);

	return (
		<ScrollView contentInsetAdjustmentBehavior='automatic'>
			{/* <FlatList
				contentInsetAdjustmentBehavior={'automatic'}
				refreshing={stationsState.isLoading}
				data={matchedStations}
				renderItem={(info) => (
					<StationSearchItem station={info.item} onPress={() => Alert.alert(info.item.name, info.item.owner)} />
				)}
			/> */}
			<NavigationBarIOS largeTitle={true} title={'Search'}>
					<SearchBarIOS onChangeText={(newSearch) => {
						setSearchQuery(newSearch)
					}} obscureBackground={false}>
						<FlatList
							contentInsetAdjustmentBehavior={'automatic'}
							data={matchedStations}
							renderItem={(info) => (
								<StationSearchItem station={info.item} onPress={() => Alert.alert(info.item.name, info.item.owner)} />
							)}
						/>
					</SearchBarIOS>
				</NavigationBarIOS>
		</ScrollView>
	);
}



export default HomeScreen;