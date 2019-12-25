import React from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class EventTypes extends React.Component {
  static navigationOptions = {
    title: 'Event type',
  };
  constructor(props) {
    super(props);
    this.state = {
      eventTypes: [
         { id: '1', value: 'Auto, Boat & Air' },{ id: '2', value: 'Business' },{ id: '3', value: 'Charity & Causes' },
         { id: '4', value: 'Community' },{ id: '5', value: 'Family & Education' },{ id: '6', value: 'Fashion' },
         { id: '7', value: 'Film & Media' },{ id: '8', value: 'Food & Drink' },{ id: '9', value: 'Government' },
         { id: '10', value: 'Health' },{ id: '11', value: 'Hobbies' },{ id: '12', value: 'Holiday' },
         { id: '13', value: 'Home & Lifestyle' },{ id: '14', value: 'Music' },{ id: '15', value: 'Other' },
         { id: '16', value: 'Performing & Visual Arts' },{ id: '17', value: 'School Activities' },{ id: '18', value: 'Science & Tech' },
         { id: '19', value: 'Spirituality' },{ id: '20', value: 'Sports & Fitness' },{ id: '21', value: 'Travel & Outdoor' }],
    };
  }

  //Function for click on an item
  getItem(item){
    Alert.alert(item);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.eventTypes}
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <View>
                <TouchableOpacity
                style={styles.item}
                onPress={this.GetItem.bind(this, 'Id : ' + item.id + ' Value : ' + item.value)}>
                    <Text
                    style={styles.text}>
                    {item.value}
                    </Text>
                </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121'
  },
  item: {
    backgroundColor: '#C51162',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
    marginLeft: '2%',
    width: '96%',
    height: 45,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
    width: 3,
    height: 3,
    }
  },
  text: {
      fontSize: 16,
      color: 'white',
      marginStart: 12
  }
});
