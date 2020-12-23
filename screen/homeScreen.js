import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity,TextInput } from 'react-native';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import User from "../components/User";


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Story: "",
            textInput:""           
        }
    }
    valchange = key => val => {
        this.setState({ [key]: val })
    }
    sendstory()
    {
        //usernamele kaydolunmıcak
        firebase.database().ref("Stories/" + User.Username).set({ Username: User.Username, Story: this.state.Story, Like:0 })
        this.textInput.clear();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Home Sayfasi
                </Text>
                <View style={{ alignItems: "center", width: 100 + "%" }}>
                <TextInput value={this.state.Story} ref={input => { this.textInput = input }} onChangeText={this.valchange("Story")} />
                    <TouchableOpacity onPress={() => this.sendstory()}>
                        <Text>Send Story</Text>
                    </TouchableOpacity>
                </View>
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

