import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements'
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Order extends React.Component {
    // Setting header title to 'Order'
    static navigationOptions = {
      title: 'Order details',
    };

    // Function to generate a random ticket number
    uidGenerator = () => {
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    // Function when user presses button, to add a credit card
    onPressAddCreditCard = () => {
      this.props.navigation.navigate('AddCreditCardView');
    }

    // Function when user pays/books an event
    onPressPayment = (item, noTickets, totalPrice) => {
      this.addEventToFirestore(item, noTickets, totalPrice);
      this.updateTickets(item, noTickets);
    }

    // Function for adding the booked event to firestore
    addEventToFirestore = (item, noTickets, totalPrice) => {
      try {
          var userUid = firebase.auth().currentUser.uid; // Currently logged in user
          var db = firebase.firestore(); // Initialize firestore database

          // Getting the currently logged in user, and creating a new collection under that user called bookedEvents
          // in colllection bookedEvents, some fields are set
          db.collection('users').doc(userUid).collection('bookedEvents').doc().set(
            {
              eventId: item.id, // Event id
              tickets: noTickets, // Number of tickets bought
              ticketNumber: this.uidGenerator(),
              title: item.title, // Title of the event
              date: item.date, // Date of the event
              location: item.location, // Location of the event
              totalPrice: totalPrice // Total price, the user paid
          },
          {merge: true});
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    }

    // Function to update the tickets in collection events
    updateTickets = (item, noOfTickets) => {
      try {
        var db = firebase.firestore(); // Initialize firestore database

        // Update field tickets in collection events, in firestore:
        db.collection('events').doc(item.id).update(
          {
            // Subtract number of tickets bought, from number of tickets available.
            // So that, number of tickets available is up to date, everytime a user buys tickets.
            tickets: item.tickets - noOfTickets
          }
        )

      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    }

    render(){
      // Reading and storing the params 
      const item = this.props.navigation.getParam('propsItem');
      const totalPrice = this.props.navigation.getParam('total');
      const noTickets = this.props.navigation.getParam('noTickets');
      return (
        <View style={styles.container}>
          <ScrollView
          vertical={true}
          style={styles.container}>
              {/* Creating a card with order summary */}
              <Card
              containerStyle={styles.card}
              title='Order summary'
              titleStyle={styles.titleText}>
              {/* Display title of event */}
              <View style={styles.nestedButtonView}>
                <Text style={styles.infoTextDescription}>Event name:</Text>
                <Text style={styles.infoText}>{item.title}</Text>
              </View>
              {/* Display number of tickets chosen */}
              <View style={styles.nestedButtonView}>
                <Text style={styles.infoTextDescription}>No. of tickets:</Text>
                <Text style={styles.infoText}>{noTickets}</Text>
              </View>
              {/* Display the price of one ticket */}
              <View style={styles.nestedButtonView}>
                <Text style={styles.infoTextDescription}>Price pr. ticket:</Text>
                <Text style={styles.infoText}>{item.price}</Text>
              </View>
              <View style={styles.separator}/>
              {/* Display total price */}
              <View style={styles.nestedButtonView}>
                <Text style={styles.infoTextDescription}>Total price:</Text>
                <Text style={styles.infoTextDescription}>{totalPrice}</Text>
              </View>
              <View style={styles.separator}/>
              </Card>
              {/* Button for adding a credit card */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => this.props.navigation.navigate('AddCreditCard')}>
                  <Text style={styles.buttonText}>Add credit card</Text>
                </TouchableOpacity>
              </View>
              {/* Button for paying for event */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => this.onPressPayment(item, noTickets, totalPrice)}>
                  <Text style={styles.buttonText}>PAY NOW</Text>
                </TouchableOpacity>
              </View>
          </ScrollView>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121'
      },
      card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        borderColor: '#fff',
        borderWidth: 10,
        marginBottom: 5
      },
      titleText: {
        marginBottom: 10,
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'center'
      },
      nestedButtonView: {
        flexDirection: 'row',
      },
      infoTextDescription: {
        fontSize: 14,
        flex: 1,
        color: 'black',
        fontWeight: '500'
      },
      infoText: {
        fontSize: 14,
        flex: 1,
        color: 'black'
      },
      separator: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginBottom: 15,
        marginTop: 15
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
      },
      button: {
        width: 330,
        backgroundColor: '#C51162',
        borderRadius: 15,
        marginVertical: 10,
        paddingVertical: 12,
        paddingHorizontal: 16
      },
      buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12,
        fontWeight: '500'
      },
  });