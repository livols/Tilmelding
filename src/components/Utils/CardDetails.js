// CardInfo.js: is the screen that displays information about an event user has chosen. 
// User is also able buy tickets.
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class CardInfo extends React.Component {
    static navigationOptions = {
      title: 'Event',
    };
    constructor(props){
      super(props);
      this.state={
      dropDowntickets: [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6}, {value: 7}, {value: 8}, {value: 9}, {value: 10}],
      value: 0,
      mounted: false,
      }
    }

    componentDidMount(){
      // Dont setState first time mounting, so that total price begins with 0
      if (this.state.mounted) {
        const value = this.state.dropDowntickets[0].value;
        this.setState({value});
      }
      else{
        this.state.mounted = true;
      }
      this.removeItem();
    }

    getLocation = () => {
      Geocoder.from(41.89, 12.49)
        .then(json => {
        		var addressComponent = json.results[0].address_components[0];
            console.log(addressComponent);
            alert(addressComponent);
        })
        .catch(error => console.warn(error));
    }

    // Function to remove items from array dropDownTickets, so that it matches with available tickets
    removeItem() {
      const item = this.props.navigation.getParam('propsItem');
      this.setState({
        dropDowntickets: this.state.dropDowntickets.filter((_, i) => i < item.tickets)
      });
    }
    
    // When user presses 'Book now' button, it will navigate to Booking screen and pass params to route
    _onPress = (item) => {
      const totalPrice = item.price * this.state.value;
      this.props.navigation.navigate('Order', {
        propsItem: item,
        total: totalPrice,
        noTickets: this.state.value
      });
    }

    render(){
      // Reading params from screen Home, storing in variable item
      const item = this.props.navigation.getParam('propsItem');
      const latitude = item.location.latitude;
      const longitude = item.location.longitude;
      return (
        <View style={styles.container}>
          {/* Using scrollview so that user is able to scroll down and up on the screen*/}
          <ScrollView 
          vertical={true}
          style={styles.container}>
            {/* Using Card from react native elements, to display info about event */}
            <Card
            containerStyle={styles.card}
            title={item.title}
            titleStyle={styles.titleText}
            image={source={uri: item.image }}
            imageProps={{resizeMode: 'contain'}}
            imageStyle={styles.cardImage}>
              {/* Display organizer of the event */}
              <Text style={styles.organizer}>
                By {item.organizer}
              </Text>
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
                Isaksgøta 8,
                {"\n"}
                188 Hoyvík
              </Text>
              </View>
              {/* Display price of the event with icon in front */}
              <View style={{ flexDirection: 'row'}}>
              <Icon name="attach-money" size={30} color='#808080' />
              <Text style={styles.details}>
              {item.price} kr.
              </Text>
              </View>
              {/* Seperate info on card */}
              <View style={styles.separator}/>
              {/* Secion About, where a description of event is displayed */}
              <Text style={styles.titleText}>About</Text>
              <Text style={styles.descriptionText}>
                {item.description}
              </Text>
              {/* Seperate info on card */}
              <View style={styles.separator}/>
              {/* Secion Location, where location is displayed on a map*/}
              <Text style={styles.titleText}>Location</Text>
              <Text style={styles.details}>
                Ísaksgøta 8, 
                {"\n"}
                188 Hoyvík
              </Text>
              {/* Seperate info on card */}
              <View style={styles.separator}/>
              {/* Secion Tickets*/}
              <Text style={styles.titleText}>Tickets</Text>
              {/* Available Tickets*/}
              <Text style={styles.details}>
                There is {item.tickets} available tickets left. 
                {"\n"}
                Choose number of tickets, and then press button to book event.
              </Text>
              {/* Dropdownlist where user chooses number of tickets*/}
              <View style={styles.buttonContainer}>
                <Dropdown
                value='Choose number of tickets'
                fontSize={12}
                data={this.state.dropDowntickets}
                pickerStyle={{borderBottomColor:'transparent', borderWidth: 0}}
                containerStyle = {styles.dropdown}
                onChangeText={(value)=> {this.setState({value});}}
                />
              </View>
              {/* Total price is displayed*/}
              <View style={styles.totalPriceNestedTextView}>
                <Text style={styles.infoTextDescription}>Total price:</Text>
                <Text style={styles.infoText}>{item.price * this.state.value} kr.</Text>
              </View>
              {/* Button 'Book now' where user can buy tickets event*/}
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                style={styles.button}
                disabled={!this.state.value}
                onPress={() => this._onPress(item)}>
                  <Text style={styles.buttonText}>Book now</Text>
                </TouchableOpacity>
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
    cardImage:{
      width: 200,
      height: 200
    },
    separator: {
      borderBottomColor: '#D3D3D3',
      borderBottomWidth: 1,
      marginBottom: 15,
      marginTop: 15
    },
    titleText: {
      marginBottom: 10,
      fontSize: 17,
      fontWeight: '500',
      textAlign: 'center'
    },
    organizer: {
      fontSize: 14,
      fontStyle: 'italic',
      color: '#808080',
      marginBottom: 10
    },
    details: {
      fontSize: 14,
      marginTop: 5,
      marginHorizontal: 10,
      color: 'black'
    },
    descriptionText: {
      fontSize: 14
    },
    totalPriceNestedTextView: {
      flexDirection: 'row',
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 10
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    button: {
      width: 300,
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
    dropdown: {
      width: '94%'
    }
  });