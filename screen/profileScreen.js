import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const avatar = require('../assets/maxresdefault.jpg');

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <Text style={styles.titleBar}>
                            Profil Sayfasi
                        </Text>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <View style={styles.profilImage}>
                            <Image source={avatar} style={styles.image} resizeMode="center" ></Image>
                        </View>
                        <View>
                            <Text style={{ alignSelf: "center" }}>Ters Giden Bisiklet</Text>
                        </View>

                        <Button
                            title="Bisiklete Ters Binmek İster Misin ?"
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    profilImage: {
        width: 250,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16,
        alignSelf: 'center'
    }
});
