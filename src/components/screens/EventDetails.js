/* EventDetails.js: is the screen that displays details about some specific event the user has chosen to see more about,
and like button, the user can press on to add the event to his wishlist. 
User is also able to book event and choose how many tickets he wants.*/ 
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable'; 
import Icon from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-material-dropdown';
import IconM from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

export default class EventDetails extends React.Component {
    static navigationOptions = {
      title: 'Event details',
    };
    constructor(props) {
        super(props)
        this.state={
          dropDowntickets: [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6}, {value: 7}, {value: 8}, {value: 9}, {value: 10}],
          value: 0,
          mounted: false,
          liked: false
        }
        this.lastPress = 0;
        this.eventExistOnWishlistInFirestore();
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

      // Function to remove items from array dropDownTickets, so that it matches with available tickets, which is registered on the database
      removeItem() {
        const item = this.props.navigation.getParam('propsItem');
        this.setState({
          dropDowntickets: this.state.dropDowntickets.filter((_, i) => i < item.tickets)
        });
      }
      
      // When user presses 'Book now' button, it will navigate to order screen and pass params to route
      _onPress = (item) => {
        const totalPrice = item.price * this.state.value;
        this.props.navigation.navigate('Order', {
          propsItem: item,
          total: totalPrice,
          noTickets: this.state.value
        });
      }
    
      handleLargeAnimatedIconRef = (ref) => {
        this.largeAnimatedIcon = ref;
      }
    
      handleSmallAnimatedIconRef = (ref) => {
        this.smallAnimatedIcon = ref;
      }
    
      // Function that handles the animation of both small and bigger heart
      animateIcon = () => {
        // Firstly, we stop any occuring animation
        this.largeAnimatedIcon.stopAnimation();
        
        // If the Photo is already liked, there's a different animation for a small heart icon, it's a little subtle animation
        if (this.state.liked) {
          this.largeAnimatedIcon.bounceIn()
            .then(() => this.largeAnimatedIcon.bounceOut());
          this.smallAnimatedIcon.pulse(200);
        } else {
          // The Animation chain for the main animation when liking the photo occurs by double tapping
          // Each animation is returning a promise, that's why we can chain them in a smooth sequence of animations
          this.largeAnimatedIcon.bounceIn()
            .then(() => {
              this.largeAnimatedIcon.bounceOut();
              this.smallAnimatedIcon.bounceIn();
            })
        }
      }
      
      // Function for handling press on image, that invokes the big and small heart by using function animateIcon()
      handleOnPress = () => {
        const time = new Date().getTime();
        // This delta determines time passed since last press on the photo
        const delta = time - this.lastPress;
        const doublePressDelay = 400; // ms
      
        // If the delta is less than specified doublePressDelay value, it fires the function for animations
        if (delta < doublePressDelay) {
          this.animateIcon();

          // If like button is pressed (red heart)
          if(this.state.liked){
            // Delete from collection wishlist in firestore
            this.removeFromWishlistInFirestore();
            this.setState({liked: false});
          } else { // If like button is not pressed (white heart)
            // Add event to collection wishlist in firestore
            this.addEventToWishlistFirestore();
            this.setState({liked: true});
          }
        }
        this.lastPress = time;
      }
      
      // Function for handling press on the small icon heart (below image)
      // Activates smart heart animation
      handleOnPressLike = () => {
        this.smallAnimatedIcon.bounceIn();

        // If like button is pressed (red heart)
        if(this.state.liked){
          // Delete from collection wishlist in firestore
          this.removeFromWishlistInFirestore();
          this.setState({liked: false});
        } else { // If like button is not pressed (white heart)
          // Add event to collection wishlist in firestore
          this.addEventToWishlistFirestore();
          this.setState({liked: true});
        }
      }

      // Function for adding the liked event to wishlist on firestore
      addEventToWishlistFirestore = () => {
        const item = this.props.navigation.getParam('propsItem');
        try {
            var userUid = firebase.auth().currentUser.uid; // Currently logged in user
            var db = firebase.firestore(); // Initialize firestore database
    
            // Getting the currently logged in user, and creating a new collection under that user called wishlist
            // in colllection wishlist, some fields are set
            db.collection('users').doc(userUid).collection('wishlist').doc(item.id).set(
              {
                id: item.id, // Event id
                title: item.title, // Event title
                description: item.description, // Event description
                date: item.date, // Event date
                image: item.image, // Event image
                location: item.location, // Event location
                organizer: item.organizer, // Event organizer
                price: item.price, // Event price
                tickets: item.tickets // Event tickets
            },
            {merge: true});
        } catch (error) {
          console.log("Error storing documents: ", error);
        }
      }

      // Function to check if the event is stored in collection wishlist, under currently logged in user
      eventExistOnWishlistInFirestore = () => {
        const item = this.props.navigation.getParam('propsItem');
        try {
          var userUid = firebase.auth().currentUser.uid; // Currently logged in user
          var db = firebase.firestore(); // Initialize firestore database
          const usersRef = db.collection('users').doc(userUid).collection('wishlist').doc(item.id);

          // If user already has liked the event, the document will exist in collection wishlist on firestore
          usersRef.get()
            .then((docSnapshot) => {
              // Check if the document on wishlist exist
              if (docSnapshot.exists) {
                // Make small heart icon red (like button), so that the user see's that he has already liked the event
                this.setState({liked: true});
              } 
            })
        } catch (error) {
          console.log("Error finding document: ", error);
        }
      }

      // Function for removing the event from collection wishlist on firestore,
      // this is when user presses heart and heart becomes white, then he 'unlikes' the event
      removeFromWishlistInFirestore = () => {
        const item = this.props.navigation.getParam('propsItem');
        try {
          var userUid = firebase.auth().currentUser.uid; // Currently logged in user
          var db = firebase.firestore(); // Initialize firestore database
          
          db.collection('users').doc(userUid).collection('wishlist').doc(item.id).delete();
        } catch (error) {
          console.log("Error deleting document: ", error);
        }
      }

      render() {
        const {liked} = this.state;
        const item = this.props.navigation.getParam('propsItem');
        return (
          <View style={styles.container}>
            {/* Using scrollview so that user is able to scroll down and up on the screen*/}
            <ScrollView 
            vertical={true}
            style={styles.container}>
              <View style={styles.cardContainer}>
                <TouchableOpacity
                activeOpacity={1}
                style={styles.card}
                onPress={this.handleOnPress}>
                <AnimatedIcon
                ref={this.handleLargeAnimatedIconRef}
                name="heart"
                color={colors.white}
                size={80}
                style={styles.animatedIcon}
                duration={500}
                delay={200}/>
                <Image
                style={styles.image}
                source= {{uri: item.image }}
                resizeMode="contain"/>
                <View style={styles.containerBelowPhoto}>
                  <TouchableOpacity
                  activeOpacity={1}
                  onPress={this.handleOnPressLike}>
                    <AnimatedIcon
                    ref={this.handleSmallAnimatedIconRef}
                    name={liked ? 'heart' : 'hearto'}
                    color={liked ? colors.heartColor : colors.textPrimary}
                    size={18}
                    style={styles.icon}/>
                  </TouchableOpacity>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Event by: </Text>
                    <Text style={[styles.text, styles.textOrganizer]}>{item.organizer}</Text>
                  </View>
                </View>
                  {/* Seperate info on card */}
                  <View style={styles.separator}/>
                  {/* Display the date of the event with icon in front */}
                  <View style={{ flexDirection: 'row', marginBottom: 8}}>
                  <IconM name="date-range" size={30} color='#808080' />
                  <Text style={styles.infoText}>
                    {new Date(item.date.toDate()).toDateString()}
                    {"\n"}
                    {new Date(item.date.toDate()).toTimeString()} 
                  </Text>
                  </View>
                  {/* Display location of the event with icon in front */}
                  <View style={{ flexDirection: 'row', marginBottom: 8}}>
                  <IconM name="location-on" size={30} color='#808080' />
                  <Text style={styles.infoText}>
                    Latitude: {item.location.latitude}
                    {"\n"}
                    Longitude: {item.location.longitude}
                  </Text>
                  </View>
                  {/* Display price of the event with icon in front */}
                  <View style={{ flexDirection: 'row'}}>
                  <IconM name="attach-money" size={30} color='#808080' />
                  <Text style={styles.infoText}>
                  {item.price} kr.
                  </Text>
                  </View>
                  {/* Seperate info on card */}
                  <View style={styles.separator}/>
                  {/* Section About, where a description of event is displayed */}
                  <Text style={styles.titleText}>About</Text>
                  <Text style={styles.descriptionText}>
                    {item.description}
                  </Text>
                  {/* Seperate info on card */}
                  <View style={styles.separator}/>
                  {/* Section Location, where location is displayed on a map*/}
                  <Text style={styles.titleText}>Location</Text>
                  <Text style={styles.details}>
                    Latitude: {item.location.latitude}
                    {"\n"}
                    Longitude: {item.location.longitude}
                  </Text>
                  {/* Seperate info on card */}
                  <View style={styles.separator}/>
                  {/* Section Tickets*/}
                  <Text style={styles.titleText}>Tickets</Text>
                  {/* Available Tickets*/}
                  <Text style={styles.descriptionText}>
                    There is {item.tickets} available tickets left. 
                    {"\n"}
                    Choose number of tickets, and then press button to book tickets for event.
                  </Text>
                  {/* Dropdownlist where user chooses number of tickets, and a button to buy ticket to event*/}
                  <View style={styles.buttonContainer}>
                    <Dropdown
                    value='Tickets'
                    fontSize={12}
                    data={this.state.dropDowntickets}
                    pickerStyle={{borderBottomColor:'transparent', borderWidth: 0}}
                    containerStyle = {styles.dropdown}
                    onChangeText={(value)=> {this.setState({value});}}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                    style={styles.button}
                    disabled={!this.state.value}
                    onPress={() => this._onPress(item)}>
                      <Text style={styles.buttonText}>BOOK NOW</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Seperate info on card */}
                  <View style={styles.separator}/>
                  {/* Total price is displayed*/}
                  <View style={styles.totalPriceNestedTextView}>
                    <Text style={styles.totalPriceText}>Total price:</Text>
                    <Text style={styles.totalPriceTagText}>{item.price * this.state.value} kr.</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )
      }
  }

  const colors = {
    transparent: 'transparent',
    white: '#fff',
    heartColor: '#e92f3c',
    textPrimary: '#515151',
    black: '#000', 
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#212121'
    },
    cardContainer: {
      alignItems: 'center'
    },
    card: {
      width: '95%',
      marginTop: 15,
      marginBottom: 15,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 15,
      borderColor: '#fff',
      borderWidth: 10
    },
    image: {
      width: '92%',
      height: 200,
    },
    animatedIcon: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
      zIndex: 2,
      borderRadius: 160,
      opacity: 0
    },
    containerBelowPhoto: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 15,
      paddingBottom: 10
    },
    icon: {
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textContainer: {
      flexDirection: 'row',
      textAlign: 'left',
      paddingTop: 0
    },
    text: {
      textAlign: 'center',
      fontSize: 13,
      backgroundColor: colors.transparent,
      color: colors.textPrimary
    },
    textOrganizer: {
      fontWeight: 'bold',
      textAlign: 'center'
    },
    titleText: {
      marginBottom: 10,
      fontSize: 17,
      fontWeight: '500',
      textAlign: 'center'
    },
    descriptionText: {
      fontSize: 14,
      paddingHorizontal: 10,
      textAlign: 'left'
    },
    details: {
      fontSize: 14,
    },
    separator: {
      borderBottomColor: '#D3D3D3',
      borderBottomWidth: 1,
      width: '100%',
      marginBottom: 15,
      marginTop: 15
    },
    dropdown: {
      width: '94%'
    },
    totalPriceNestedTextView: {
      flexDirection: 'row',
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 10
    },
    totalPriceText: {
      fontSize: 16,
      flex: 1,
      fontWeight: '500'
    },
    totalPriceTagText: {
      fontSize: 16,
      flex: 1,
      textAlign: 'right'
    },
    infoText: {
      fontSize: 14,
      flex: 1,
      textAlign: 'left'
    },
    buttonContainer: {
      flexDirection: 'row'
    },
    button: {
      width: '97%',
      backgroundColor: '#C51162',
      borderRadius: 15,
      marginVertical: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    buttonText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 12,
      fontWeight: '500'
    },
  })