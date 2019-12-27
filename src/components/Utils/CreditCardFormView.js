// CreditCardFormView.js: renders the payment form and handles the credit card data using the CreditCardInput component.
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { FontAwesome } from '@expo/vector-icons';

export default class CreditCardFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardData: { valid: false } };
  }

  onPressAdd = (onSubmit) => {
    onSubmit(this.state.cardData);
  }

  render() {
    const { onSubmit, submitted, error } = this.props;
    return (
      <View>
        <View>
          <CreditCardInput 
          requiresName 
          allowScroll
          onChange={(cardData) => this.setState({ cardData })} />
        </View>
        <View style={styles.buttonWrapper}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
            style={styles.button}
            disabled={!this.state.cardData.valid || submitted}
            onPress={() => this.onPressAdd(onSubmit)}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
          {/* Show errors */}
          {error && (
            <View style={styles.alertWrapper}>
              <View style={styles.alertIconWrapper}>
                <FontAwesome name="exclamation-circle" size={20} style={{ color: '#c22' }} />
              </View>
              <View style={styles.alertTextWrapper}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  buttonWrapper: {
    padding: 10,
    zIndex: 100
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
  alertTextWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400'
  },
  alertWrapper: {
    backgroundColor: '#ecb7b7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10
  }
});