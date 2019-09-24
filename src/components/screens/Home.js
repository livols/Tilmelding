import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class Home extends React.Component {
    render(){
      return (
        <View style={styles.container}>
        <View style={styles.container}>
        </View>
        <LinearGradient
          colors={['#FF4081', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 500,
          }}
        />
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#212121',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 16,
      flexDirection: 'row'
    },
    text: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold'
    }
  });