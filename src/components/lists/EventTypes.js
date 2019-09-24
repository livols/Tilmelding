import React from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default class EventTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EventTypes: [
         { id: '1', value: 'Auto, Boat & Air' },{ id: '2', value: 'Business' },{ id: '3', value: 'Charity & Causes' },
         { id: '4', value: 'Community' },{ id: '5', value: 'Family & Education' },{ id: '6', value: 'Fashion' },
         { id: '7', value: 'Film & Media' },{ id: '8', value: 'Food & Drink' },{ id: '9', value: 'Government' },
         { id: '10', value: 'Health' },{ id: '11', value: 'Hobbies' },{ id: '12', value: 'Holiday' },
         { id: '13', value: 'Home & Lifestyle' },{ id: '14', value: 'Music' },{ id: '15', value: 'Other' },
         { id: '16', value: 'Performing & Visual Arts' },{ id: '17', value: 'School Activities' },{ id: '18', value: 'Science & Tech' },
         { id: '19', value: 'Spirituality' },{ id: '20', value: 'Sports & Fitness' },{ id: '21', value: 'Travel & Outdoor' }],
    };
  }
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };
  GetItem(item){
    //Function for click on an item
    Alert.alert(item);
  }
  addIcon(){
    <Icon name="ios-search" size={30} color="#900" />
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.EventTypes}
          //data defined in constructor
          ItemSeparatorComponent={this.FlatListItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <View>
              <Text 
                style={styles.item}
                onPress={this.GetItem.bind(this, 'Id : '+item.id+' Value : '+item.value)}
                >
                {item.value}
              </Text>
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
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
 
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'black'
  },
});
