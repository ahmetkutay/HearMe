import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import User from "../components/User";
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native';


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
    <Item title={item.title} />
);


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Story: "",
            textInput: ""
        }
    }
    valchange = key => val => {
        this.setState({ [key]: val })
    }
    sendstory() {
        //usernamele kaydolunmıcak
        firebase.database().ref("Stories/" + User.Username).set({ Username: User.Username, Story: this.state.Story, Like: 0 })
        this.textInput.clear();
    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView style={{height:150}}>
                    <View>
                        <View style={{ height: 20 }} />
                        <View style={{ alignItems: "center", width: 100 + "%", }}>
                            <TextInput placeholder="Hikayenizi Yazınız" style={styles.inputStyle} value={this.state.Story} ref={input => { this.textInput = input }} onChangeText={this.valchange("Story")} />
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.sendstory()}>
                                <Button title="Send Story" />
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
    buttonStyle: {
        width: 100,
        borderRadius: 150
    },
    inputStyle: {
        margin: 15,
        height: 40,
        width: 360,
        borderColor: '#7a42f4',
        borderWidth: 1,
        paddingLeft: 6
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
