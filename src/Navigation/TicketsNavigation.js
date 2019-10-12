import React from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

export default class TicketsNavigation extends React.Component {
  componentDidMount() {
    // Navigate user to either tickets or signup, depending on if user is logged in.
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Tickets' : 'Signup')
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