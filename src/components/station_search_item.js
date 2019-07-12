import React from 'react';
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';

export default StationSearchItem = ({ station, onPress }) => (
    <TouchableHighlight underlayColor={'#efefef'} onPress={onPress}>
        <View style={styles.rowContainer}>
            <View style={[styles.buoyIcon, {backgroundColor: station.met == 'y' ? 'green' : 'red'}]}>
                <Text style={styles.buoyIconText}>
                    {station.type.charAt(0).toUpperCase()}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{station.name}</Text>
                <Text numberOfLines={3}>Station {station.id} • {station.pgm} • {station.owner}</Text>
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