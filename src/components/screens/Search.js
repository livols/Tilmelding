import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

export default class Search extends React.Component {
    render(){
      return (
        <View style={styles.container}>
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
          <View style={styles.searchFieldContainer}>
            <Input
            placeholder=' Search for event...'
            placeholderTextColor= 'rgba(255, 255, 255, 0.3)'
            inputContainerStyle={styles.inputBoxSearch}
            inputStyle={styles.inputTextSearch}
            leftIcon=
            {
              <Icon
                name='md-search'
                size={30}
                color='black'
              />
            }
            />
          </View>
          <View style={styles.inputFieldContainer}>
            <Input
            inputContainerStyle={styles.inputBox}
            inputStyle={styles.inputText}
            placeholder='When'
            placeholderTextColor= 'rgba(255, 255, 255, 0.3)'
            />
            <Input
            inputContainerStyle={styles.inputBox}
            inputStyle={styles.inputText}
            placeholder='Place'
            placeholderTextColor= 'rgba(255, 255, 255, 0.3)'
            />
            <Input
            inputContainerStyle={styles.inputBox}
            inputStyle={styles.inputText}
            placeholder='Type of event'
            placeholderTextColor= 'rgba(255, 255, 255, 0.3)'
            />
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
      flex: 1,
      justifyContent: 'flex-start'
    },
    inputFieldContainer: {
      flex: 1,
      justifyContent: 'flex-start'
    },
    inputBoxSearch: {
      marginVertical: 100,
      borderBottomWidth: 0
    },
    inputBox: {
      marginVertical: 20,
      borderColor: 'rgba(255, 255, 255, 0.3)'
    },
    inputTextSearch: {
      fontSize: 30,
      color: 'white',
      fontStyle: 'italic'
    },
    inputText: {
      fontSize: 20,
      color: 'white',
      fontStyle: 'italic'
    }
  });