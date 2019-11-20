// Edit.js: is the screen were the user is able to edit his personal information on his account.
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import 'firebase/firestore';

export default class Edit extends React.Component {
  // Setting header title to 'Edit'
  static navigationOptions = {
    title: 'Edit info',
  };

  constructor(props){
    super(props);
    this.state = ({
      name: '',
      email: '',
      password: ''
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          {/* Inputfield for name*/}
          <TextInput style={styles.formInputBox} 
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Name"
          placeholderTextColor= 'white'
          selectionColor='white'
          onChangeText={(name) => this.setState({name})}
          /* When user press enter, this function will send user to email inputfield */
          onSubmitEditing={() => this.email.focus()}
          />
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
          onChangeText={(email) => this.setState({email})}
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
          onChangeText={(password) => this.setState({password})}
          />
          {/* Button for saving the changes */}
          <TouchableOpacity 
          style={styles.formButton}>
              <Text style={styles.formButtonText}>Save changes</Text>
          </TouchableOpacity>
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