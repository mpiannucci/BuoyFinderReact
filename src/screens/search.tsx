import React, { useState, useEffect } from 'react';
import { NavigationBarIOS, SearchBarIOS, RightBarIOS, BarButtonIOS } from 'navigation-react-native';
import { useStationsState, useStationsDispatch, DataActionType } from '../context';
import { fetchStations } from '../api';
import { SafeAreaView, View, Text, ScrollView, ListView, FlatList, Alert } from 'react-native';
import StationSearchItem from '../components/station_search_item';

const SearchScreen = (props: any) => {
	const stationsState = useStationsState();
	const [searchQuery, setSearchQuery] = useState('');

	const stations = stationsState.data === undefined ? [] : stationsState.data;
	const matchedStations = stationsState.data === undefined || searchQuery === '' ? [] : stationsState.data.filter(
		(station) => {
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
			<FlatList
				style={{ backgroundColor: 'white' }}
				contentInsetAdjustmentBehavior={'automatic'}
				refreshing={stationsState.isLoading}
				data={stations}
				renderItem={(info) => (
					<StationSearchItem station={info.item} onPress={() => Alert.alert(info.item.name, info.item.owner)} />
				)}
			/>
			<NavigationBarIOS largeTitle={true} title={'Search'}>
				<RightBarIOS>
					<BarButtonIOS systemItem={'done'} onPress={props.onFinish} />
				</RightBarIOS>
				<SearchBarIOS
					onChangeText={(newSearch) => {
						if (newSearch === undefined) {
							return;
						}
						setSearchQuery(newSearch)
					}} obscureBackground={false}>
					<FlatList
						style={{ backgroundColor: 'white' }}
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

export default SearchScreen;