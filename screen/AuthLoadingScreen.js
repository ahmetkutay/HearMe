import React from 'react';
import {
  View,
  Alert
} from 'react-native';
import User from "../components/User"
import AsyncStorage from '@react-native-community/async-storage'
import * as firebase from 'firebase';


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._Navigate();
    var config ={
        apiKey: "AIzaSyAnTrvUS1v__v50nK6t_vNz-JQsbUPOHpw",
        authDomain: "hearme-264ff.firebaseapp.com",
        databaseURL: "https://hearme-264ff-default-rtdb.firebaseio.com",
        projectId: "hearme-264ff",
        storageBucket: "hearme-264ff.appspot.com",
        messagingSenderId: "175817910925",
        appId: "1:175817910925:web:952235d72ad79c878c90c4"
      }  
        
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
     }else {
        firebase.app(); // if already initialized, use that one
     }
  }

  _Navigate(){
    this.props.navigation.navigate('Login');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
      </View>
    );
  }
}