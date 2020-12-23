import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import User from "../components/User";

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
        AsyncStorage.setItem("userEmail",email);  
        this.props.navigation.navigate("Home");
    }

    signup(bool, email, password,username) {
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
            <View style={{ marginTop: 200, width: 100 + "%", backgroundColor: "black" }}>
                <View >
                    <Text style={styles.textstyle}>Email</Text>
                    <TextInput style={styles.textinputstyle} value={this.state.Email} onChangeText={this.valchange("Email")} />
                </View>
                {this.state.issign &&
                    <View >
                        <Text style={styles.textstyle}>Username</Text>
                        <TextInput style={styles.textinputstyle} value={this.state.Username}
                            onChangeText={this.valchange("Username")} />
                    </View>
                }
                <View >
                    <Text style={styles.textstyle}>Password</Text>
                    <TextInput style={styles.textinputstyle} value={this.state.Password} onChangeText={this.valchange("Password")} />
                </View>
                <View style={{ alignItems: "center", width: 100 + "%" }}>
                    <TouchableOpacity style={styles.loginbutton} onPress={() => this.login(this.state.Email, this.state.Password)}>
                        <Text style={styles.buttontext}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center", width: 100 + "%" }}>
                    <TouchableOpacity style={styles.signupbutton} onPress={() => this.signup(this.state.issign, this.state.Email, this.state.Password,this.state.Username)}>
                        <Text style={styles.buttontext}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttontext: { color: "white", fontSize: 34 },
    loginbutton: { backgroundColor: "blue", borderRadius: 20, width: 100 + "%", alignItems: "center" },
    signupbutton: { backgroundColor: "green", borderRadius: 20, width: 100 + "%", alignItems: "center" },
    textstyle: { color: "white", fontSize: 24 },
    textinputstyle: { borderRadius: 15, borderColor: "white", color: "white", borderWidth: 1, height: 50, fontSize: 24, alignItems: "center" }
});

export default Login;