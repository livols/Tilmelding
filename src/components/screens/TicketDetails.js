import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import QRCode from 'react-qr-code';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TicketDetails extends React.Component {
    // Setting header title to 'Ticket Details'
    static navigationOptions = {
      title: 'Ticket details',
    };

    render(){
      // Reading and storing the params 
      const item = this.props.navigation.getParam('propsItem');
      return (
        <View style={styles.container}>
          {/* Vertical scrollview, if user has to scroll window */}
          <ScrollView
          vertical={true}
          style={styles.container}>
            {/* Display a card with ticket details */}
            <Card
            containerStyle={styles.card}
            title={item.title}
            titleStyle={styles.titleText}>
              {/* Display QR code for the ticket number */}
              <View style={styles.QR}>
                <QRCode 
                value={item.ticketNumber}
                size={200} />
              </View>
              {/* Display the ticket number */}
              <Text style={styles.details}>
                Ticket number: 
                {"\n"}
                {item.ticketNumber}
              </Text>
              <View style={styles.separator}/>
              <Text style={styles.titleText}>Details</Text>
              {/* Display the date of the event with icon in front */}
              <View style={{ flexDirection: 'row'}}>
                <Icon name="date-range" size={30} color='#808080' />
                <Text style={styles.details}>
                  {new Date(item.date.toDate()).toDateString()}
                  {"\n"}
                  {new Date(item.date.toDate()).toTimeString()} 
                </Text>
              </View>
              {/* Display location of the event with icon in front */}
              <View style={{ flexDirection: 'row'}}>
                <Icon name="location-on" size={25} color='#808080' />
                <Text style={styles.details}>
                  Latitude: {item.location.latitude}
                  {"\n"}
                  Longitude: {item.location.longitude}
                </Text>
              </View>
            </Card>
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
      marginBottom: 15
    },
    titleText: {
      marginBottom: 10,
      fontSize: 17,
      fontWeight: '500',
      textAlign: 'center'
    },
    QR: {
      alignItems: 'center',
      marginBottom: 8
    },
    separator: {
      borderBottomColor: '#D3D3D3',
      borderBottomWidth: 1,
      marginBottom: 15,
      marginTop: 15
    },
    details: {
      fontSize: 14,
      marginTop: 5,
      marginHorizontal: 10,
      color: 'black'
    },
  });