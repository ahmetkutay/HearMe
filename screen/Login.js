import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, StatusBar, Image } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import User from "../components/User";
const avatar = require('../assets/mobile_login.png');

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
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) { }).catch(error => {
            this.props.navigation.navigate("Login");
        });
        User.Email = email;
        User.Password = password;
        this.props.navigation.navigate("Home");
    }

    async signup(bool, email, password, username) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var userid;
        if (!(bool)) {
            this.setState({ issign: true });//alertle ayarla emailpasw ve nicki
        }
        else if (!(!reg.test(email) || password.trim() == "" || password.length < 6 || username.trim() == "")) {
            User.Email = email;
            User.Password = password;
            User.Username = username;
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
                this.props.navigation.navigate("Login");
            });
            await firebase.database().ref('Total Users/').once("value", function (snapshot) {
                userid = parseInt(snapshot.val(),10);
            });
            userid++;
            firebase.database().ref("Users/" + userid).set({ Username: this.state.Username, Email: this.state.Email, Password: this.state.Password, TotalLikes: 0, TotalStories: 0,Id:userid });
            User.Id=userid;
            firebase.database().ref('Total Users/').set(userid);
            this.props.navigation.navigate("Home");
        }


    }
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <View style={{ alignSelf: 'center' }}>
                    <View style={styles.profilImage}>
                        <Image source={avatar} style={styles.image} resizeMode="cover" ></Image>
                    </View>
                    <View style={{ height: StatusBar.currentHeight }} />
                    <Text style={{ alignSelf: "center", height: 30, fontSize: 14 }}> Welcome To HearMe App </Text>
                </View>
                <View style={{ height: StatusBar.currentHeight }} />
                <View>
                    <View style={styles.inputView}>

                        <TextInput style={styles.inputText} placeholder=" Emailinizi Yazınız" value={this.state.Email} onChangeText={this.valchange("Email")} />
                    </View>
                    <View style={{ height: 5 }} />

                    {this.state.issign &&
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText} placeholder=" Kullanıcı Adınızı Yazınız" value={this.state.Username}
                                onChangeText={this.valchange("Username")} />
                        </View>
                    }
                    <View style={{ height: 5 }} />

                    <View style={styles.inputView}>
                        <TextInput style={styles.inputText} placeholder=" Şifrenizi Yazınız" value={this.state.Password} onChangeText={this.valchange("Password")} />
                    </View>
                    <View style={{ height: 5 }} />

                    {!this.state.issign &&
                        <View style={{ alignItems: "center", width: 100 + "%" }}>
                            <TouchableOpacity style={styles.loginbutton} onPress={() => this.login(this.state.Email, this.state.Password)}>
                                <Text style={styles.loginButtonText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{ height: 5 }} />

                    <View style={{ alignItems: "center", width: 100 + "%" }}>
                        <TouchableOpacity style={styles.signupbutton} onPress={() => this.signup(this.state.issign, this.state.Email, this.state.Password, this.state.Username)}>
                            <Text style={styles.signupButtonText}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    loginButtonText: { color: "white", fontSize: 15 },
    signupButtonText: { color: "#465882", fontSize: 15 },
    loginbutton: {
        width: "80%",
        backgroundColor: "#465882",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    signupbutton: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    inputView: {
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
    inputText: {
        height: 50,
        color: "#465882",
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    profilImage: {
        width: 250,
        height: 150,
        borderRadius: 25,
        overflow: "hidden"
    }
});

export default Login;
