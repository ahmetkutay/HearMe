import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import User from "../components/User";
import { ScrollView } from 'react-native-gesture-handler';
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

const renderItem = ({ item }) => (
    <Card>
        <Text style={styles.cardTitleStyle}>
            {item.title}
        </Text>
    </Card>
);


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Story: "",
            textInput: ""
        }
    }
    componentDidMount() {     
        if(User.Id)
            return;
        const rootRef = firebase.database().ref();
        const oneRef = rootRef.child('Users').orderByChild('Email');
        oneRef.equalTo(User.Email)
            .once('value', snapshot => {
                const text=snapshot.toJSON()[1];
                User.Username=text["Username"];
                User.Id=text["Id"];
                User.TotalLikes=text["TotalLikes"];
                User.TotalStories=text["TotalStories"];                
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
        firebase.database().ref("Stories/" + storyid).set({ Username: User.Username, Story: this.state.Story, Like: 0, UserId: User.Id })
        firebase.database().ref("Users/" + userid + "/Stories").set(storyid);
        firebase.database().ref('Total Stories/').set(storyid);
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
