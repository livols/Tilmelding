// Login.js: is the login screen for user.
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import Logo from '../Utils/Logo';
import {AsyncStorage} from 'react-native';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      email: '',
      password: ''
    })
  }

  // Function for login with email and password
  loginUser = () => {
    const { email, password } = this.state;
    try {
      // Authenticate user with firebase, using email and password to login existing user
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
          console.log('Succesful login')
        })
        // Catch authentication error
        .catch((error)=> {
          console.log(error.code);
          // Display authentication error message to user
          alert(error.message);
        });
    } catch (error) {
        console.log(error.toString())
    }
  }

  // Firebase login with credential from the Facebook user.
  FBfirebaseLogin = (token) => {
    // Using token to get access to use Facebook HTTP API requests
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    firebase.auth().signInWithCredential(credential).catch((error) => {
      console.log("Error login with facebook user credential: ", error)
    });
  };

  // Function login with facebook
  async loginWithFacebook() {
    try {
      // logInWithReadPermissionAsync(appID, options), grants the app permission to access Facebook data.
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('709225182876997', {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        this.FBfirebaseLogin(token);
        // Saving token in AsyncStorage. Token will be used in screen 'Profile', to get user data
        await AsyncStorage.setItem('token', token);
      }
    } catch (error) {
      console.log('Facebook login error: ', error);
    }
  };

  render(){
    return (
      <View style={styles.container}>
        <Logo/>
        <View style={styles.formContainer}>
          {/* Inputfield for email */}
          <TextInput style={styles.formInputBox} 
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Email"
          placeholderTextColor= 'white'
          selectionColor='white'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => this.setState({email: text})}
          /* When user press enter, this function will send user to password inputfield */
          onSubmitEditing={() => this.password.focus()}
          />
          {/* Inputfield for password */}
          <TextInput style={styles.formInputBox} 
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize='none'
          autoCorrect={false}
          placeholderTextColor= 'white'
          /* This is the reference to password inputfield */
          ref={(input) => this.password = input}
          onChangeText={(text) => this.setState({password: text})}
          />
          {/* Button for Login */}
          <TouchableOpacity 
          style={styles.formButton}
          onPress={() => this.loginUser()}>
              <Text style={styles.formButtonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>or</Text>
          {/* Button to Login with facebook */}
          <TouchableOpacity 
          style={styles.facebookButton}
          onPress={() => this.loginWithFacebook()}>
            <View style={styles.nestedButtonView}>
              <Icon name='facebook' size={25} color='white'/>
              <Text style={styles.facebookButtonText}> Continue with Facebook</Text>
            </View>
          </TouchableOpacity>
          <Text 
          style={styles.signupText}
          onPress={() => this.props.navigation.navigate('LoginMethods')}>Other login methods?</Text>
        </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <Text style={styles.signupButtton}
            onPress={() => this.props.navigation.navigate('Signup')}> Signup</Text>
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
    signupButtton: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500'
    },
    formContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    formInputBox: {
        width: 300,
        height: 50,
        backgroundColor:'#FF4081',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'white',
        marginVertical: 10
    },
    formButton: {
        width: 300,
        backgroundColor: '#C51162',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    formButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    },
    facebookButton: {
      width: 300,
      backgroundColor: '#3b5998',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
      paddingHorizontal: 16
    },
    nestedButtonView: {
      alignItems: 'center',
      flexDirection: 'row'
    }, 
    facebookButtonText: {
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