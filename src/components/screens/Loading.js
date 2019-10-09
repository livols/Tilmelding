// Loading.js: Screen that checks if user is logged in. And navigates user to the correct screen. 
// On screen update delay, it will show the user that its loading.
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

export default class Loading extends React.Component {
  componentDidMount() {
    // Navigate user to either profile og signup, depending on if user is logged in.
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Profile' : 'Signup')
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