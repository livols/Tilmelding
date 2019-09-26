import React from 'react';
import AppNavigator from './src/Navigation/AppNavigator';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA5gbruwJsOMYa6rRacJqe4KbGcThj6oGA",
    authDomain: "tilmelding-a90f8.firebaseapp.com",
    databaseURL: "https://tilmelding-a90f8.firebaseio.com",
    projectId: "tilmelding-a90f8",
    storageBucket: "",
};
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    } 
  }

  componentDidMount() {
    let listener = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({
                isLoggedIn: true
            })
            listener();
        } else {
            this.setState({
                isLoggedIn: false
            })
            listener();
        }
    })
  }

  render() {
    return <AppNavigator/>;
  }
}
