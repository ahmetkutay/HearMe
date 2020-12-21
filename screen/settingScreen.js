import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import 'react-native-gesture-handler';


export default class SettingScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Ayarlar Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});