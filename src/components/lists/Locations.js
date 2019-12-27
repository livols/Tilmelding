// Locations.js: this is the screen the user should be able to choose a location for events, he is searching for in Search.js.
import React from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, Dimensions } from 'react-native';

const ITEM_WIDTH = Dimensions.get('window').width;
const COLUMNS = 2;

export default class Locations extends React.Component {
  static navigationOptions = {
    title: 'Location',
  };
  constructor(props) {
    super(props);
    this.state = {
      locations: [
         { id: '1', value: 'Streymoy' },{ id: '2', value: 'Eysturoy' },{ id: '3', value: 'Vágar' },
         { id: '4', value: 'Suðuroy' },{ id: '5', value: 'Sandoy' },{ id: '6', value: 'Borðoy' },
         { id: '7', value: 'Viðoy' },{ id: '8', value: 'Kunoy' },{ id: '9', value: 'Kalsoy' },
         { id: '10', value: 'Svínoy' },{ id: '11', value: 'Fugloy' },{ id: '12', value: 'Nólsoy' },
         { id: '13', value: 'Mykines' },{ id: '14', value: 'Skúvoy' },{ id: '15', value: 'Hestur' },
         { id: '16', value: 'Stóra Dímun' },{ id: '17', value: 'Koltur' },{ id: '18', value: 'Lítla Dímun' }],
    };
  }

  // Function for click on an item
  getItem(item){
    Alert.alert(item);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={COLUMNS}
          data={this.state.locations}
          renderItem={({ item }) => (
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
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#212121'
  },
  item: {
    width: ITEM_WIDTH/COLUMNS,
    height: 45,
    backgroundColor: '#C51162',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 15,
    borderColor: '#212121',
    borderWidth: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
    width: 3,
    height: 3,
    }
  },
  text: {
    alignItems: 'center',
    color: 'white',
    fontSize: 16
  },
});
