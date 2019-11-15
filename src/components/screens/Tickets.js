  // Tickets.js: is the screen the logged in user is able to see a list with all the events he has booked.
  import React from 'react';
  import { Text, StyleSheet, View, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
  import * as firebase from 'firebase';
  import 'firebase/firestore';
  import QRCode from 'react-qr-code';
  import Icon from 'react-native-vector-icons/FontAwesome';
  
  export default class Tickets extends React.Component {
    constructor(){
      super();
      this.state = {
        bookedEvents: []
      }
    }
  
    componentDidMount(){
      this.retrieveBookedEvents();
    }
  
    // Function to retrieve tickets logged in user has booked, which is stored in Firestore
    retrieveBookedEvents = async () => {
      try {
        console.log('Retrieving Data');
        var userUid = firebase.auth().currentUser.uid; // Getting current logged in user uid
        var db = firebase.firestore(); // Initialize firestore database
        // Storing the booked events by logged in user in variable initialQuery, and then order by date
        let initialQuery = await db.collection('users').doc(userUid).collection('bookedEvents')
          .orderBy('date')
        let documentSnapshots = await initialQuery.get(); // Get the booked events
        let documentData = documentSnapshots.docs.map(document => document.data()); // Store the booked events from firestore in variable documentData
        this.setState({ bookedEvents: documentData });  // Set state array events, to documentData
      }
      catch (error) {
        console.log(error);
      }
    };

    _onPress = (item) => {
      this.props.navigation.navigate('TicketDetails', {
        propsItem: item
      });
    }
  
    // Function for flatlist to render all booked events on the screen
    _renderItem = (item) => {
      return(
        <TouchableOpacity
        style={styles.card}
        onPress={() => this._onPress(item)}>
          <View style={styles.textContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.descriptionText}>
                  Latitude: {item.location.latitude}
                  {"\n"}
                  Longitude: {item.location.longitude}
                </Text>
              <Text style={styles.dateText}>
              {new Date(item.date.toDate()).toDateString()}
                {"\n"}
              {new Date(item.date.toDate()).toTimeString()}
              </Text>
              <Text style={styles.descriptionText}>Number of tickets: {item.tickets}</Text>
              <Text style={styles.descriptionText}>Paid: {item.totalPrice} kr.</Text>
          </View>
          <QRCode 
          value={item.ticketNumber}
          size={120} />
        </TouchableOpacity>
      );
    }
  
    render(){
      // If the array with booked events is empty
      if (this.state.bookedEvents.length === 0) {
        return(
            <View style={styles.searchContainer}>
              <Text style={styles.infoSmall}>
                Are you sure you have any booked events?
                {"\n"}
                Go to home - or search page to book any event.
              </Text>
              <ActivityIndicator size="large" color='#C51162'/>
            </View>
        )
      }
      return (
        <View style={styles.mainContainer}>
          <View style={styles.secondContainer}>
            <Icon name='ticket' size={30} color='#C51162'/>
            <Text style={styles.info}> Upcoming events</Text>
          </View>
          {/* Using flatlist to display all the events, stored in the array bookedEvents */}
          <View style={styles.flatListContainer}>
            <FlatList
            data={this.state.bookedEvents}
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
        flex: 1,
      },
      searchContainer: {
        flex: 1.5,
        backgroundColor: '#212121',
        alignItems: 'center',
        justifyContent: 'center'
      },
      secondContainer: {
        flex: 1.5,
        backgroundColor: '#212121',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
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
        QRimage: {
          width: 125,
          height: 125,
          resizeMode: 'cover'
        },
        textContainer: {
          flexDirection: 'column',
          marginBottom: 5,
          width: '60%'
        },
        titleText: {
          fontSize: 19,
          fontWeight: '500',
        },
        descriptionText: {
          fontSize: 13,
          marginTop: 5
        },
        dateText: {
          fontSize: 12,
          fontStyle: 'italic',
          marginTop: 5
        },
    });