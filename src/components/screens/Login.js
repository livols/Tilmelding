import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import Logo from '../Utils/Logo';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      email: '',
      password: ''
    })
  }

  loginUser = () => {
    const { email, password } = this.state;
    try {
      // Log user in with existing email and password
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log(user);
      })
      // Navigate user to the profile
      this.props.navigation.navigate('Profile');
    } catch (error) {
        console.log(error.toString())
    }
  }

  async loginWithFacebook(){
    try {
      const {type, token} = await Facebook.logInWithReadPermissionsAsync( '709225182876997', { 
        permissions: ['public_profile'] });
      
      // if facebook login is succesful
      if(type === 'success'){
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase.auth().signInWithCredential(credential).catch((error) => {
          console.log(error);
        })
      }  
    } catch (error) {
        //alert(`Facebook Login Error: ${error}`);
        console.log(error);
    }

  }

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
          /* This is the reference to email inputfield */
          ref={(input) => this.email = input}
          onChangeText={(text) => this.setState({email: text})}
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
            <View style={styles.facebookNestedButtonView}>
              <Icon name='facebook' size={25} color='white'/>
              <Text style={styles.facebookButtonText}> Continue with Facebook</Text>
            </View>
          </TouchableOpacity>
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
    facebookNestedButtonView: {
      alignItems: 'center',
      flexDirection: 'row'
    }, 
    facebookButtonText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
      flex: 1
    }
  });