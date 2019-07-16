import React from 'react';
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';
import { Station } from '../api';

interface StationSearchItemProps {
    station: Station;
    onPress?: () => void;
}

const stationColor = (met?: boolean): string => {
    if (met === undefined) {
        return 'red';
    }

    return met ? 'green' : 'red'
}

const StationSearchItem = (props: StationSearchItemProps) => (
    <TouchableHighlight key={props.station.id} underlayColor={'#efefef'} onPress={props.onPress}>
        <View style={styles.rowContainer}>
            <View style={[styles.buoyIcon, {backgroundColor: stationColor(props.station.met)}]}>
                <Text style={styles.buoyIconText}>
                    {props.station.type.charAt(0).toUpperCase()}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{props.station.name}</Text>
                <Text numberOfLines={3}>Station {props.station.id} • {props.station.pgm} • {props.station.owner}</Text>
            </View>
        </View>
    </TouchableHighlight>
);

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    textContainer: {
        paddingBottom: 4,
        flex: 1,
    },
    buoyIcon: {
        marginRight: 12,
        borderRadius: 16,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buoyIconText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    nameText: {
        paddingBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default StationSearchItem;