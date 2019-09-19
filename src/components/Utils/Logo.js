import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export default class Logo extends React.Component {
    render(){
      return (
        <View style={styles.container}>
          <Image style={{width: 250, height: 70}}
              source={require('../../../assets/tilmelding.png')}/>
          <Text style={styles.logoText}>Welcome to Tilmelding.fo</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    logoText: {
      marginVertical: 15,
      fontSize: 18,
      color: 'rgba(255,255,255,0.6)'
    }
  });