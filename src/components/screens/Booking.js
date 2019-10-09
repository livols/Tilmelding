import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Booking extends React.Component {

    render(){
        const item = this.props.navigation.getParam('propsItem');
      return (
        <View style={styles.container}>
          <Text>Bookin</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    }
  });