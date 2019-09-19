// Form.js is the form for either Signup or Login.
import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';

export default class Form extends React.Component {
    state={
      name: '',
      email: '',
      password: ''
    };

    render(){
      return (
        <View style={styles.container}>
            {/* Using 'this.props.showMe'(returns either true or false), 
            to decide if the the inputfield for name should be shown */}
            {
                this.props.showMe?
                <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Name"
                placeholderTextColor= 'white'
                selectionColor='white'
                onChangeText={(text) => this.setState({name: text})}
                /* When user clicks enter on keyboard,
                it automatically go to email inputfield */
                onSubmitEditing={() => this.email.focus()}
                />
                :null
            }
            {/* Inputfield for email */}
            <TextInput style={styles.inputBox} 
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email"
            placeholderTextColor= 'white'
            selectionColor='white'
            keyboardType='email-address'
            /* This is the reference to email inputfield */
            ref={(input) => this.email = input}
            onChangeText={(text) => this.setState({email: text})}
            onSubmitEditing={() => this.password.focus()}
            />
            {/* Inputfield for password */}
            <TextInput style={styles.inputBox} 
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor= 'white'
            ref={(input) => this.password = input}
            onChangeText={(text) => this.setState({password: text})}
            />
            {/* Button for either Signup or Login,
            depending on the value of the variable 'this.props.type' */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{this.props.type}</Text>
            </TouchableOpacity>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputBox: {
        width: 300,
        height: 50,
        backgroundColor:'#FF4081',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'white',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#C51162',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    }
  });