import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import User from "../components/User";
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';

const renderItem = ({ item }) => (
    <Card>
        <Text style={styles.cardTitleStyle}>
            Nick: {item.Username}
        </Text>
        <Text style={styles.cardTitleStyle}>
            Story: {item.Story}
        </Text>
        <Text style={styles.cardTitleStyle}>
            Like: {item.Like}
        </Text>
    </Card>
);

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Story: "",
            textInput: "",
            list: [],
            list2:[]
        }
    }
    componentDidMount() {
        firebase.database().ref('Users/' + User.Id + '/UserLikes/').on('value', (snapshot) => {
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
                                Username: child.val().Username,
                                Like: child.val().Like,
                                Id: child.val().Id
                            })
                        })
                        this.setState({ list2: li2 })
                    })
                })});
        })
    }

    valchange = key => val => {
        this.setState({ [key]: val })
    }
    async sendstory() {
        var storyid;
        await firebase.database().ref('Total Stories/').once("value", function (snapshot) {
            storyid = parseInt(snapshot.val(), 10);
        });
        storyid++;
        firebase.database().ref('Total Stories/').set(storyid);
        firebase.database().ref("Stories/" + storyid).set({ Username: User.Username, Story: this.state.Story, Like: 0, UserId: User.Id, StoryId: storyid });
        firebase.database().ref("Users/" + User.Id + "/UserStories/" + storyid).set({ Id: storyid });
        firebase.database().ref("Users/" + User.Id + "/UserLikes/" + storyid).set({ Id: storyid });

        this.textInput.clear();
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ height: StatusBar.currentHeight }} />
                <ScrollView style={{ height: 150 }}>
                    <View>
                        <View style={{ height: 20 }} />
                        <View style={{ alignItems: "center", width: 100 + "%", }}>
                            <TextInput placeholder="Hikayenizi Yazınız" style={styles.inputStyle} value={this.state.Story} ref={input => { this.textInput = input }} onChangeText={this.valchange("Story")} />
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.sendstory()}>
                                <Text style={styles.buttonTextStyle}>Send Story</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    cardTitleStyle: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'justify'

    },
    buttonStyle: {
        width: "40%",
        backgroundColor: "#465882",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonTextStyle: {
        color: "white"
    },
    inputStyle: {
        alignSelf: "center",
        width: "80%",
        borderRadius: 25,
        borderColor: "#465882",
        borderWidth: 1,
        height: 60,
        marginBottom: 10,
        justifyContent: "center",
        padding: 10
    },
    container: {
        flex: 1,
    },
});
