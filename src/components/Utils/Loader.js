// Loader.js: this screen checks if user is logged in or out. If the user is logged in he will be able to see and use the app.
// While user who is logged out, has to signup or login.
import React from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

export default class Loader extends React.Component {
  componentDidMount() {
    // Navigating the user to either Home or Login screen, depending on if he is logged in or out
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'Login')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='#C51162' size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});