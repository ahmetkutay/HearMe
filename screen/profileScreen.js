import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, FlatList } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import User from '../components/User';
import { Appbar } from 'react-native-paper';
import { Card } from 'react-native-elements';
import * as firebase from 'firebase';

const renderItem = ({ item }) => (
    <Card>
        <Text style={styles.cardTitleStyle}>
            Nick: {item.Username}
        </Text>
        <Text style={styles.cardTitleStyle}>
            Story: {item.Story}
        </Text>
        <Text style={styles.cardTitleStyle}>
            Likes: {item.Like}
        </Text>
    </Card>
);


export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            list2:[]
        }
    }
    componentDidMount() {
        firebase.database().ref('Users/' + User.Id + '/UserStories/').on('value', (snapshot) => {
            var li = []
            snapshot.forEach((child) => {
                li.push({
                    Id: child.val().Id
                })
                
            })
                this.setState({list: li },()=>{this.state.list.forEach(element => {
                    firebase.database().ref().child('Stories').orderByChild('StoryId').equalTo(element["Id"]).once('value', snapshot => {
                        var li2 = [];
                        snapshot.forEach((child) => {
                            li2.push({
                                Story: child.val().Story,
                                Username: child.val().Username, //like artıcak
                                Like: child.val().Like,
                                Id: child.val().Id
                            })
                        })
                        this.setState({ list2: li2 })
                    })
                })});
        })
    }
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
                            data={this.state.list2}
                            renderItem={renderItem}
                            keyExtractor={item => item.Id}

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
