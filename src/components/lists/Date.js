import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Dates extends React.Component {
    static navigationOptions = {
      title: 'Date',
    };
    render(){
      return (
        <View style={styles.container}>
          <Text>This is Dates</Text>
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