import React from 'react';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import Home from '../components/screens/Home';
import Search from '../components/screens/Search';
import WishList from '../components/screens/WishList';
import Profile from '../components/screens/Profile';
import Tickets from '../components/screens/Tickets';
import Login from '../components/screens/Login';
import Signup from '../components/screens/Signup';

const ProfileStack = createStackNavigator({
    Profile: {screen: Signup}, 
    Login: {screen: Login},
    Signup: {screen: Signup}
  },{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  })
  
  const AppTabNavigator = createMaterialBottomTabNavigator({
    Home: { 
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <IconA name="home" color={tintColor} size={24} />
        )
      } 
    },
    Search: { 
      screen: Search,
      navigationOptions:{
        tabBarLabel: 'Search',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-search" color={tintColor} size={24} />
        )
      }
    },
    WishList: { 
      screen: WishList,
      navigationOptions:{
        tabBarLabel: 'Wishlist',
        tabBarIcon: ({tintColor}) => (
          <Icon name="md-heart-empty" color={tintColor} size={24} />
        )
      }
    },
    Tickets: { 
      screen: Tickets,
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
    //order: ['Settings', 'Home'],
    //activeTintColor: '#FF007F'
    activeTintColor: 'white'
  })

  export default AppTabNavigator;