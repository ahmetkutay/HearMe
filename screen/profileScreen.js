import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, FlatList } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import User from '../components/User';
import { Appbar } from 'react-native-paper';
import { Card } from 'react-native-elements';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'Third Item',
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d75',
        title: 'Third Item',
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d76',
        title: 'Third Item',
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d77',
        title: 'Third Item',
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d78',
        title: 'Third Item',
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d79',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d23',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d24',
        title: 'Third Item',
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d25',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d26',
        title: 'Third Item',
    },

];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const renderItem = ({ item }) => (
    <Card>
        <Text style={styles.cardTitleStyle}>
            {item.title}
        </Text>
    </Card>
);

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <SafeAreaView>
                <Appbar style={styles.appBar}>
                    <Appbar.Content title="Profil Sayfasi" />
                </Appbar>
                <View style={{ height: StatusBar.currentHeight }} />
                <View style={{ height: StatusBar.currentHeight }} />
                <View style={{ height: StatusBar.currentHeight }} />

                <ScrollView>
                    <View style={{ alignSelf: 'center' }}>
                        <View>
                            <Text style={{ alignSelf: "center" }}>{User.Username}</Text>
                        </View>
                    </View>
                    <View style={{ height: 20 }} />
                    <View style={{ alignSelf: 'center' }}><Text>Hikayelerim</Text></View>
                    <View style={{ height: 20 }} />

                </ScrollView>

                <ScrollView>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}

                        />
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    appBar: {
        backgroundColor: "#465882",
        position: 'absolute',
        left: 0,
        right: 0,
        top: StatusBar.currentHeight,
    },
    cardTitleStyle: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'justify'
    },
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
    },
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});
