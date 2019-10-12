import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements'
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Order extends React.Component {
    static navigationOptions = {
      title: 'Order',
    };

    onPressAddCreditCard = () => {
      this.props.navigation.navigate('AddCreditCardView');
    }

    onPressPayment = () => {

    }

    addEventToFirestore = (item, noTickets, totalPrice) => {
      try {
          var userUid = firebase.auth().currentUser.uid;
          var db = firebase.firestore(); // Initialize firestore database
         
          db.collection('users').doc(userUid).collection('bookedEvents').doc().set(
            {
              eventId: item.id,
              tickets: noTickets,
              title: item.title,
              date: item.date,
              location: item.location,
              totalPrice: totalPrice
          },
          {merge: true});
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    }

    render(){
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
                onPress={() => this.addEventToFirestore(item, noTickets, totalPrice)}>
                  <Text style={styles.buttonText}>Payment</Text>
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