import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import Signup from './Signup';

export default class Profile extends React.Component {

  render() {
    return(
      <View style={styles.container}>
        <Text>This is profile</Text>
      </View>
    );
  }   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});