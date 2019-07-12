import React from 'react';
import { View, StyleSheet } from 'react-native'

export default () => (
    <View style={styles.separatorStyles}/>
);

const styles = StyleSheet.create({
    separatorStyles: {
        marginLeft: 16,
        backgroundColor: '#efefef',
        height: 1,
    },
});