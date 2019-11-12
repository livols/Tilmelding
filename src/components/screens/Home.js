// Home.js: is the home screen, that will be shown first when user opens the app.
// This screen will show all the events, and user is able to search for events in a specific location.
import React from 'react';
import { Text, StyleSheet, View, ActivityIndicator, FlatList, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as Animatable from 'react-native-animatable' 
import IconA from 'react-native-vector-icons/AntDesign'

const AnimatedIcon = Animatable.createAnimatableComponent(IconA)

export default class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      events: [],
      liked: false
    }
    this.lastPress = 0
  }

  componentDidMount(){
    this.retrieveEvents();
  }

  // Function to retrieve all events stored in firestore
  retrieveEvents = async () => {
    try {
      console.log('Retrieving Data');
      var db = firebase.firestore(); // Initialize firestore database
      let initialQuery = await db.collection('events') // Storing collection with events in variable initialQuery, and order events by date
        .orderBy('date')
      let documentSnapshots = await initialQuery.get(); // Get collection events, and order by date
      let documentData = documentSnapshots.docs.map(document => document.data()); // Store events from firestore in documentData
      this.setState({ events: documentData }); // Set state array events, to documentData
    }
    catch (error) {
      console.log(error);
    }
  };

  // Function for flatlist to render the events on the screen
  _renderItem = (item) => {
    const { liked } = this.state;
    return(
      <TouchableOpacity 
      style={styles.card}>
        <Image 
        style={styles.cardImage} 
        source={{uri: item.image }}
        onPress={() => this._onPress(item)}/>
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text 
            style={styles.descriptionText}
            numberOfLines={5}>{item.description}</Text>
            <Text style={styles.dateText}>{new Date(item.date.toDate()).toDateString()}</Text>
        </View>
        <AnimatedIcon
          ref={this.handleSmallAnimatedIconRef}
          name={liked ? 'heart' : 'hearto'}
          color={liked ? colors.heartColor : colors.textPrimary}
          size={18}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  }

  // When user presses on one of the events, it will navigate to CardInfo screen and pass params to route
  _onPress = (item) => {
    this.props.navigation.navigate('CardDetails', {
      propsItem: item
    });
  }

  handleSmallAnimatedIconRef = (ref) => {
    this.smallAnimatedIcon = ref
  }

  // Function that handles the animation of both small and bigger heart
  animateIcon = () => {
    const { liked } = this.state
    // Firstly, we stop any occuring animation
    this.largeAnimatedIcon.stopAnimation()

    if (liked) {
      // If the Photo is already liked, there's a different animation for a small heart icon, it's a little subtle animation
      this.largeAnimatedIcon.bounceIn()
        .then(() => this.largeAnimatedIcon.bounceOut())
      this.smallAnimatedIcon.pulse(200)
    } else {
      /* The Animation chain for the main animation when liking the photo occurs by double tapping
      Each animation is returning a promise, that's why we can chain them in a smooth sequence of animations */
      this.largeAnimatedIcon.bounceIn()
        .then(() => {
          this.largeAnimatedIcon.bounceOut()
          this.smallAnimatedIcon.bounceIn()
        })
        .then(() => {
          if (!liked) {
            this.setState(prevState => ({ liked: !prevState.liked }))
          }
        })
    }
  }

  handleOnPress = () => {
    const time = new Date().getTime()
    // This delta determines time passed since last press on the photo
    const delta = time - this.lastPress
    const doublePressDelay = 400
  
    if (delta < doublePressDelay) {
      // If the delta is less than specified doublePressDelay value, it fires the function for animations
      this.animateIcon()
    }
    this.lastPress = time
  }

  handleOnPressLike = () => {
    /* This is a separate function for liking the photo, 
    it activates only smart heart animation and it's invoked by pressing small icon */
    this.smallAnimatedIcon.bounceIn()
    this.setState(prevState => ({ liked: !prevState.liked }))
  }


  render(){
    // Using ActivityIndicator, to show user its loading, and if the array with events is empty
    if (this.state.events.length === 0) {
      return(
        <View style={styles.loader}>
          <Text style={styles.infoSmall}>Please wait a moment...</Text>
          <ActivityIndicator size="large" color='#C51162'/>
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.locationContainer}>
        {/* Button for user, to search events in specific locations */}
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={() => this.props.navigation.navigate('Locations')}>
            <View style={styles.locationNestedButtonView}>
              <Icon name='md-search' size={30} color='white'/>
              <Text style={styles.locationButtonText}>Choose location</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Using flatlist to display all the events, stored in the array with the events */}
        <View style={styles.flatListContainer}>
          <FlatList
          data={this.state.events}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => this._renderItem(item)}
          />
        </View>
      </View>
    );
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
    mainContainer: {
      flex: 1
    },
    locationContainer: {
      flex: 2,
      backgroundColor: '#212121',
      alignItems: 'center',
      justifyContent: 'center'
    },
    flatListContainer: {
      flex: 6,
      backgroundColor: '#212121'
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
    locationButton: {
      width: 300,
      backgroundColor: '#C51162',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
      paddingHorizontal: 16
    },
    locationNestedButtonView: {
      alignItems: 'center',
      flexDirection: 'row'
    }, 
    locationButtonText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
      flex: 1
    },
    card: {
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