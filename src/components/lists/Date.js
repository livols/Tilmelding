// Date.js: this is the screen the user should be able to choose a date for events, he is searching for in Search.js.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Dates extends React.Component {
    static navigationOptions = {
      title: 'Date',
    };
    render(){
      return (
        <View style={styles.container}>
          <Text>A calendar with dates, should be shown on this screen!</Text>
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