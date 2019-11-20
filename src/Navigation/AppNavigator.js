// AppNavigator.js: is the navigation for the mobile app.
import React from 'react';
// Library's
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
// Javscript files
import Home from '../components/screens/Home';
import Search from '../components/screens/Search';
import WishList from '../components/screens/WishList';
import Profile from '../components/screens/Profile';
import Tickets from '../components/screens/Tickets';
import Signup from '../components/screens/Signup';
import Login from '../components/screens/Login';
import EventTypes from '../components/lists/EventTypes';
import Dates from '../components/lists/Date';
import Locations from '../components/lists/Locations';
import EventDetails from '../components/Utils/EventDetails';
import Order from '../components/screens/Order';
import AddCreditCard from '../components/Utils/AddCreditCard';
import Loader from '../components/Utils/Loader';
import LoginMethods from '../components/screens/LoginMethods';
import TicketDetails from '../components/screens/TicketDetails';
import Edit from '../components/screens/Edit';

  // Stacknavigator for bottom tab 'profile'
  const ProfileStack = createStackNavigator({
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null
      }
    }, 
    Edit: {screen: Edit},
    AddCreditCard: {screen: AddCreditCard},
  },{
    mode: 'modal'
  })

  // Stacknavigator for bottom tab 'wishlist'
  const WishlistStack = createStackNavigator({
    WishList: {
      screen: WishList,
      navigationOptions: {
        header: null
      }
    }, 
    EventDetails: {screen: EventDetails},
  },{
    mode: 'modal'
  })

  // Stacknavigator for bottom tab 'tickets'
  const TicketsStack = createStackNavigator({
    Tickets: {
      screen: Tickets,
      navigationOptions: {
        header: null
      }
    }, 
    TicketDetails: {screen: TicketDetails}
  },{
    mode: 'modal'
  })

  // Stacknavigator for bottom tab 'home'
  const HomeStack = createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    }, 
    Locations: {screen: Locations},
    EventDetails: {screen: EventDetails},
    Order: {screen: Order}
  },{
    mode: 'modal'
  })

  // Stacknavigator for bottom tab 'search'
  const SearchStack = createStackNavigator({
    Search: {
      screen: Search,
      navigationOptions: {
        header: null
      }
    }, 
    EventTypes: {screen: EventTypes},
    Locations: {screen: Locations},
    Date: {screen: Dates},
  },{
    mode: 'modal'
  })
  
  // Bottom tab navigators (Home, Search, Wishlist, Tickets and Profile)
  export const LoggedIn = createMaterialBottomTabNavigator({
    Home: { 
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <IconA name="home" color={tintColor} size={24} />
        )
      } 
    },
    Search: { 
      screen: SearchStack,
      navigationOptions:{
        tabBarLabel: 'Search',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-search" color={tintColor} size={24} />
        )
      }
    },
    WishList: { 
      screen: WishlistStack,
      navigationOptions:{
        tabBarLabel: 'Wishlist',
        tabBarIcon: ({tintColor}) => (
          <Icon name="md-heart-empty" color={tintColor} size={24} />
        )
      }
    },
    Tickets: { 
      screen: TicketsStack,
      navigationOptions:{
        tabBarLabel: 'Tickets',
        tabBarIcon: ({tintColor}) => (
          <IconF name="ticket" color={tintColor} size={24} />
        )
      }
    },
    Profile: { 
      screen: ProfileStack,
      navigationOptions:{
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <IconA name="user" color={tintColor} size={24} />
        ),
      }
    },
  },{
    initialRouteName: 'Home',
    activeTintColor: 'white'
  })

  // Switchnavigator when user is logged out
  export const LoggedOut = createSwitchNavigator(
    {
        Loader,
        Signup,
        Login,
        LoginMethods
    },{
      initialRouteName: 'Loader'
    });