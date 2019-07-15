import React, { useState, useEffect } from 'react';
import { NavigationBarIOS, SearchBarIOS } from 'navigation-react-native';
import { useStationsState, useStationsDispatch, DataActionType} from '../context';
import { fetchStations } from '../api';
import { SafeAreaView, View, Text, ScrollView, ListView, FlatList } from 'react-native';
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
		fetchStationsData();
	}, []);

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
		<FlatList
			style={{flex: 1}}
			refreshing={stationsState.isLoading}
			data={matchedStations}
			renderItem={(info) => (
				<StationSearchItem station={info.item} />
			)}
			ListHeaderComponent={
				<NavigationBarIOS largeTitle={true} title={'Search'}>
					<SearchBarIOS onChangeText={(newSearch) => {
						setSearchQuery(newSearch)
					}} />
				</NavigationBarIOS> 
			}
		/>
	);
}

export default HomeScreen;