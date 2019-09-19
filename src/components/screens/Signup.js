import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Logo from '../Utils/Logo';
import Form from '../Utils/Form';

export default class Signup extends React.Component {
    render(){
      return (
        <View style={styles.container}>
          <Logo/>
          <Form 
          type='Signup' 
          showMe={true}/>
          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <Text style={styles.signupButton}
              onPress={() => this.props.navigation.navigate('Login')}> Login</Text>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#212121',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    signupTextCont: {
      flexGrow: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingVertical: 16,
      flexDirection: 'row'
    },
    signupText: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: 16
    },
    signupButton: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500'
    }
  });