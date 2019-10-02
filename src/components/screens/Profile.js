// Profile.js: is the screen, user information will be displayed.
// User also able to edit his own user information.
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {AsyncStorage} from 'react-native';

export default class Profile extends Component {
  // Function getUser() uses setState() in a asynchronous request to an API, 
  // and the request should be resolved before the component is unmounted. To avoid slowing down the application.
  // Therefore variable _isMounted is used, to check if component is mounted by using a boolean.
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = ({
      name: '',
      email: ''
    })
  }

  componentDidMount() {
    this._isMounted = true;
    this.getUser();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Function to fetch user data via HTTP request, when user signs in with facebook. Data stored in facebook.
  getDataWithGraphRequest = async () => {
    try {
      // Get the token from AsyncStorage
      let token = await AsyncStorage.getItem('token');
      // Using the token for making the graphQL request to facebook
      const response = await fetch(`https://graph.facebook.com/me/?fields=id,name,email&access_token=${token}`);
      const user = await response.json(); // user object is now stored in this variable
      if (this._isMounted) {
        this.setState({name: user.name}); // set the state name
        this.setState({email: user.email}); // set the state email
      }
    } catch (error) {
      alert(error.message)
    }
  }

  // Function to get user data from email and password sign in. Data stored in firestore.
  getDataFromFirestore = (user) => {
    var db = firebase.firestore(); // Initialize firestore database
    // Finding a specific document by first, getting the collection called users, 
    // and where email matches the currently logged in users email
    db.collection('users').where('email', '==', user.email)
      .get()
      // Using querysnapshot to read from the document in Firestore database
      .then((querySnapshot) => {
        // Using forEach to store the document in variable data
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          if(this._isMounted) {
            this.setState({name: data.name}); // set state name
            this.setState({email: data.email}); // set state email
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  // Function to get bot facebook and email/password data, 
  // depending on the currently logged in user
  getUser = () => {
    // Using onAuthStateChanged(), to get the currently logged in user
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Facebook login (user object): variable photoURL will contain a string URL.
        // Email/password login (user object): variable photoURL will conatin null.
        // Therefore i can use a conditional (ternary) operator. To check if user logs in with facebook or email/password.
        user.photoURL != null ? this.getDataWithGraphRequest() : this.getDataFromFirestore(user);
      }
    });
  }

  logout = () => {
    try {
      firebase.auth().signOut().then(() => {
        console.log('Signed Out');
      }); 
    } catch (error) {
      console.error('Sign Out Error', error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={require('../../../assets/anonymous.png')}/>
                <Text style={styles.name}>{this.state.name}</Text>
                <Text style={styles.userInfo}>{this.state.email}</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/home/win8/50/ffffff'}}/>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Edit Info</Text>
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/settings/win8/50/ffffff'}}/>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Add credit card</Text>
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/news/win8/50/ffffff'}}/>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Settings</Text>
              </View>
            </View>
              <TouchableOpacity 
              style={styles.button}
              onPress={() => this.logout()}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity> 
          </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212121'
  },
  header:{
    backgroundColor: '#FF4081'
  },
  headerContent:{
    padding: 50,
    alignItems: 'center'
  },
  avatar: {
    width: 130,
    height: 130,
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    color: '#212121',
    fontWeight:'600',
  },
  userInfo: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  body: {
    backgroundColor: '#212121',
    height: 360,
    alignItems: 'center',
  },
  item: {
    flexDirection : 'row',
    marginVertical: 3
  },
  infoContent: {
    flex:1,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#ffffff',
  },
  button: {
    width: 250,
    backgroundColor: '#C51162',
    borderRadius: 25,
    paddingVertical: 12,
    marginVertical: 75
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
});