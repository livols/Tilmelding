import React from 'react';
import AppNavigator from './src/Navigation/AppNavigator';
import * as firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA5gbruwJsOMYa6rRacJqe4KbGcThj6oGA",
    authDomain: "tilmelding-a90f8.firebaseapp.com",
    databaseURL: "https://tilmelding-a90f8.firebaseio.com",
    projectId: "tilmelding-a90f8",
    storageBucket: "",
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default class App extends React.Component {

  render() {
    return <AppNavigator/>;
  }
}
