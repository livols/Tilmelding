// Signup.js: is the signup screen for user, when user is not logged into the mobile app.
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Logo from '../Utils/Logo';

export default class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      name: '',
      email: '',
      password: ''
    })
  }

  // Function for user signup 
  signupUser = () => {
    const { name, email, password } = this.state;
    try {
      // Authenticate user with firebase, using email and password to create a new user
      // When a user is created in firebase authentication, they will get a unique user-UID
      var promise = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Succesfully created a user, with signup')
        })
        // Catch authentication error
        .catch((error) => {
          console.log(error.code);
          // Display authentication error message to user
          alert(error.message);
        });
      // Store new user in firestore
      this.AddDataToFirestore(promise, name, email);
    } catch (error) {
        console.log(error.toString())
    }
  }

  // Function for storing a new user in firestore
  AddDataToFirestore = (promise, name, email) => {
    promise.then(() => {
      var userUid = firebase.auth().currentUser.uid;
      var db = firebase.firestore(); // Initialize firestore database

      // User will be stored in the collection called 'users'
      // The name of the document will be user-UID from the authentication part(above)
      db.collection('users').doc(userUid).set({
          name: name, // set name
          email: email // set email
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <Logo/>
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
          {/* Button for Signup */}
          <TouchableOpacity 
          style={styles.formButton}
          onPress={() => this.signupUser()}>
              <Text style={styles.formButtonText}>Signup</Text>
          </TouchableOpacity>
      </View>
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