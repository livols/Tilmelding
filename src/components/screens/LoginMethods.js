// LoginMethods.js: is a second login screen for user, this screen shows other ways to login into the mobile app.
// The login methods are logging in with e.g. Google, Yahoo or Twitter.
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import Logo from '../Utils/Logo';
import * as GoogleSignIn from 'expo-google-sign-in';

export default class LoginMethods extends React.Component {
  loginGoogle = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        // ...
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  }

  loginYahoo = async () => {
  }

  loginTwitter = async () => {
  }

  render(){
    return (
      <View style={styles.container}>
        <Logo/>
        <View style={styles.formContainer}>
          {/* Button for google login */}
          <TouchableOpacity 
          style={styles.googleButton}
          onPress={() => this.loginGoogle()}>
            <View style={styles.nestedButtonView}>
              <Image style={styles.googleImage}
              source={require('../../../assets/Google.jpg')}/>
              <Text style={styles.googleButtonText}> Continue with Google</Text>
            </View>
          </TouchableOpacity>
          {/* Button for yahoo login */}
          <TouchableOpacity 
          style={styles.yahooButton}
          onPress={() => this.loginYahoo()}>
            <View style={styles.nestedButtonView}>
              <Icon name='yahoo' size={25} color='white'/>
              <Text style={styles.buttonText}> Continue with Yahoo</Text>
            </View>
          </TouchableOpacity>
          {/* Button for twitter login */}
          <TouchableOpacity 
          style={styles.twitterButton}
          onPress={() => this.loginTwitter()}>
            <View style={styles.nestedButtonView}>
              <Icon name='twitter' size={25} color='white'/>
              <Text style={styles.buttonText}> Continue with Twitter</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.backTextCont}>
          <Text style={styles.backText}>Not the methods you need?</Text>
          <Text style={styles.backButtton}
            onPress={() => this.props.navigation.navigate('Login')}> Go back</Text>
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
    backTextCont: {
      flexGrow: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingVertical: 16,
      flexDirection: 'row'
    },
    backText: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: 16
    },
    backButtton: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500'
    },
    formContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    nestedButtonView: {
      alignItems: 'center',
      flexDirection: 'row'
    }, 
    twitterButton: {
      width: 300,
      backgroundColor: '#38A1F3',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
      paddingHorizontal: 16
    },
    yahooButton: {
      width: 300,
      backgroundColor: '#4A00A0',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
      paddingHorizontal: 16
    },
    buttonText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
      flex: 1
    },
    googleButton: {
      width: 300,
      backgroundColor: '#ffff',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
      paddingHorizontal: 16
    },
    googleButtonText: {
      textAlign: 'center',
      color: '#808080',
      fontSize: 16,
      fontWeight: '500',
      flex: 1
    },
    googleImage: {
      width: 25,
      height: 25
    }
  });