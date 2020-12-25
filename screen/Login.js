import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, StatusBar, Image } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import User from "../components/User";
const avatar = require('../assets/girisekrean.jpg');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issign: false,
            Email: "",
            Password: "",
            Username: ""

        }
    }

    valchange = key => val => {
        this.setState({ [key]: val })
    }
    login(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) { });
        User.Email = email;
        User.Password = password;
        AsyncStorage.setItem("userEmail", email);
        this.props.navigation.navigate("Home");
    }

    signup(bool, email, password, username) {
        if (!(bool)) {
            this.setState({ issign: true });//alertle ayarla emailpasw ve nicki
        }
        else {
            User.Email = email;
            User.Password = password;
            User.Username = username;
            firebase.auth().createUserWithEmailAndPassword(email, password);
            firebase.database().ref("Users/" + User.Username).set({ Username: this.state.Username, Email: this.state.Email, Password: this.state.Password })
            this.props.navigation.navigate("Home");
        }


    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={{ height: StatusBar.currentHeight }} />
                    <View style={{ height: StatusBar.currentHeight }} />
                    <View style={{ height: StatusBar.currentHeight }} />
                    <View style={{ height: StatusBar.currentHeight }} />
                    <View style={{ height: StatusBar.currentHeight }} />


                    <View style={{ alignSelf: 'center' }}>
                        <View style={styles.profilImage}>
                            <Image source={avatar} style={styles.image} resizeMode="center" ></Image>
                        </View>
                        <Text style={{ alignSelf: "center", height: 30 }}> Welcome To HearMe App </Text>
                    </View>
                    <View>
                        <View >

                            <TextInput style={styles.textinputstyle} placeholder=" Emailinizi Yazınız" value={this.state.Email} onChangeText={this.valchange("Email")} />
                        </View>
                        <View style={{ height: 10 }} />

                        {this.state.issign &&
                            <View >
                                <TextInput style={styles.textinputstyle} placeholder=" Kullanıcı Adınızı Yazınız" value={this.state.Username}
                                    onChangeText={this.valchange("Username")} />
                            </View>
                        }
                        <View style={{ height: 10 }} />

                        <View >
                            <TextInput style={styles.textinputstyle} placeholder=" Şifrenizi Yazınız" value={this.state.Password} onChangeText={this.valchange("Password")} />
                        </View>
                        <View style={{ height: 10 }} />

                        {!this.state.issign &&
                            <View style={{ alignItems: "center", width: 100 + "%" }}>
                                <TouchableOpacity style={styles.loginbutton} onPress={() => this.login(this.state.Email, this.state.Password)}>
                                    <Text style={styles.buttontext}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{ height: 10 }} />

                        <View style={{ alignItems: "center", width: 100 + "%" }}>
                            <TouchableOpacity style={styles.signupbutton} onPress={() => this.signup(this.state.issign, this.state.Email, this.state.Password, this.state.Username)}>
                                <Text style={styles.buttontext}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    buttontext: { color: "white", fontSize: 34 },
    loginbutton: { backgroundColor: "orange", borderRadius: 20, width: 100 + "%", alignItems: "center" },
    signupbutton: { backgroundColor: "gold", borderRadius: 20, width: 100 + "%", alignItems: "center" },
    textstyle: { color: "black", fontSize: 24, },
    textinputstyle: { borderRadius: 15, borderColor: "white", color: "black", borderWidth: 1, height: 50, fontSize: 24, alignItems: "center" },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    profilImage: {
        width: 250,
        height: 150,
        borderRadius: 100,
        overflow: "hidden"
    }
});

export default Login;
