  // Wishlist.js: is the screen the logged in user is able to see all the events he liked, together in a wishlist
  import React from 'react';
  import { Text, StyleSheet, View, ActivityIndicator, FlatList, TouchableOpacity, Image} from 'react-native';
  import * as firebase from 'firebase';
  import 'firebase/firestore';
  
  export default class Wishlist extends React.Component {
    constructor(){
      super();
      this.state = {
        wishlist: []
      }
    }
  
    componentDidMount(){
      this.retrieveWishlist();
    }
  
    // Function to retrieve events the logged in user has liked, which is stored in Firestore
    retrieveWishlist = async () => {
      try {
        console.log('Retrieving Data');
        var userUid = firebase.auth().currentUser.uid; // Getting current logged in user uid
        var db = firebase.firestore(); // Initialize firestore database
        // Storing the wishlist of logged in user in variable initialQuery, and then order by date
        let initialQuery = await db.collection('users').doc(userUid).collection('wishlist')
          .orderBy('date')
        let documentSnapshots = await initialQuery.get(); // Get wishlist
        let documentData = documentSnapshots.docs.map(document => document.data()); // Store the wishlist from firestore in variable documentData
        this.setState({ wishlist: documentData });  // Set state array wishlist, to documentData
      }
      catch (error) {
        console.log(error);
      }
    };

    _onPress = (item) => {
      this.props.navigation.navigate('EventDetails', {
        propsItem: item
      });
    }
  
    // Function for flatlist to render the events in the wishlist on the screen
    _renderItem = (item) => {
      return(
        <TouchableOpacity 
        style={styles.card}
        onPress={() => this._onPress(item)}>
          <Image 
          style={styles.cardImage} 
          source={{uri: item.image }}/>
          <View style={styles.textContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text 
              style={styles.descriptionText}
              numberOfLines={5}>{item.description}</Text>
              <Text style={styles.dateText}>{new Date(item.date.toDate()).toDateString()}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  
    render(){
      // If the array wishlist is empty
      if (this.state.wishlist.length === 0) {
        return(
            <View style={styles.secondContainer}>
              <Text style={styles.infoSmall}>
                Retrieving your wishlist, wait a moment.
              </Text>
              <ActivityIndicator size="large" color='#C51162'/>
            </View>
        )
      }
      return (
        <View style={styles.mainContainer}>
          <View style={styles.secondContainer}>
            <Text style={styles.info}>Wishlist</Text>
          </View>
          {/* Using flatlist to display all the events, stored in the array wishlist */}
          <View style={styles.flatListContainer}>
            <FlatList
            data={this.state.wishlist}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => this._renderItem(item)}
            />
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1
    },
    secondContainer: {
      flex: 1.5,
      backgroundColor: '#212121',
      alignItems: 'center',
      justifyContent: 'center'
    },
    flatListContainer: {
      flex: 6,
      backgroundColor: '#212121'
    },
    info: {
      fontSize: 25,
      fontWeight: '500',
      color: '#fff',
      textAlign: 'center'
    },
    loader: {
      flex: 1,
      backgroundColor: '#212121',
      alignItems: 'center',
      justifyContent: 'center'
    },
    infoSmall: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      fontStyle: 'italic',
      marginBottom: 15
    },
    card: {
      marginTop: 15,
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 15,
      marginLeft: '2%',
      width: '96%',
      shadowColor: '#000',
      borderRadius: 15,
      shadowOpacity: 0.2,
      shadowRadius: 1,
      shadowOffset: {
        width: 3,
        height: 3,
      },
      borderColor: '#fff',
      borderWidth: 10
      },
      cardImage:{
        width: 125,
        height: 125,
        resizeMode: 'cover'
      },
      textContainer: {
        flex: 1,
        height: 125,
        marginHorizontal: 10,
        flexDirection: 'column'
      },
      titleText: {
        fontSize: 19,
        fontWeight: '500',
        flex: 0
      },
      descriptionText: {
        fontSize: 13,
        flex: 0,
        height: 80
      },
      dateText: {
        fontSize: 16,
        flex: 0,
        fontStyle: 'italic'
      },
  });