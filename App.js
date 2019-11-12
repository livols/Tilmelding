import React from 'react';
import {LoggedIn, LoggedOut} from './src/Navigation/AppNavigator';
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
  // The request firebase.auth().onAuthStateChanged() should be resolved before the component is unmounted. To avoid slowing down the application.
  // Therefore variable _isMounted is used, to check if component is mounted by using a boolean.
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = ({
      loggedIn: false
    })
  }

  componentDidMount() {
    this._isMounted = true;
    this.isUserLoggedIn();
  }

  componentWillUnmount(){
    this._isMounted= false;
  }

  // Function to check if a user is logged in or out
  isUserLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(this._isMounted = true){
        if (user) {
          this.setState({loggedIn: true});
        }
        else{
          this.setState({loggedIn: false});
        }
      }
    })
  }

  render() {
    if(this.state.loggedIn){
      return <LoggedIn/>;
    }else{
      return <LoggedOut/>;
    }
  }
}
