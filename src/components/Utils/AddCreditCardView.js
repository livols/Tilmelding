// AddCreditCardView.js: this class renders a view with CreditCardFormView.
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CreditCardFormView from './CreditCardFormView';
import { Card } from 'react-native-elements'

export default class AddCreditCardView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} ref={ref => (this.scrollViewRef = ref)}>
          <Card
          containerStyle={styles.card}>
            <CreditCardFormView {...this.props}/>
          </Card>
        </ScrollView>
        {/* Scrolls to the payment form */}
        <KeyboardSpacer
          onToggle={() => { setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }),0)} }
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: '#fff',
    borderWidth: 10,
    marginBottom: 15
  }
});