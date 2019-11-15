import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';

export default class Search extends React.Component {
    render(){
      return (
        <View style={styles.container}>
          <View style={styles.searchFieldContainer}>
            <Input
            placeholder=' Search for event...'
            placeholderTextColor= 'rgba(255,255,255,0.5)'
            inputContainerStyle={styles.inputBoxSearch}
            inputStyle={styles.inputTextSearch}
            leftIcon=
            {
              <Icon
                name='md-search'
                size={30}
                color='white'
              />
            }
            />
          </View>
          <View style={styles.inputFieldContainer}>
          <Text style={styles.text}>Looking for</Text>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EventTypes')}>
                <Text style={styles.searchButtonText}>Type of Event</Text>
            </TouchableOpacity>
            <View style={{marginVertical:15}}></View>
            <Text style={styles.text}>In</Text>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Locations')}>
                <Text style={styles.searchButtonText}>Location</Text>
            </TouchableOpacity>
            <View style={{marginVertical:15}}></View>
            <Text style={styles.text}>On</Text>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Date')}>
                <Text style={styles.searchButtonText}>Date</Text>
            </TouchableOpacity>
            <View style={{marginVertical:30, alignItems: 'center'}}>
              <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Find event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#212121'
    },
    searchFieldContainer:{
      flex: 0.7,
      justifyContent: 'flex-start',
      backgroundColor: '#FF4081'
    },
    inputFieldContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      marginTop: 30
    },
    inputBoxSearch: {
      marginVertical: 100,
      borderBottomWidth: 0
    },
    inputTextSearch: {
      fontSize: 30,
      color: 'white',
      fontStyle: 'italic'
    },
    text: {
      fontSize: 15,
      paddingHorizontal: 16,
      color: 'white'
    },
    searchButtonText: {
      fontSize: 20,
      fontWeight: '500',
      color: 'rgba(255,255,255,0.5)',
      fontStyle: 'italic',
      paddingHorizontal: 16
    },
    button: {
      width: 250,
      backgroundColor: '#C51162',
      borderRadius: 40,
      marginVertical: 10,
      paddingVertical: 12
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: 'white',
      textAlign: 'center'
    },
  });