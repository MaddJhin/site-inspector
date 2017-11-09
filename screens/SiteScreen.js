import React from 'react';
import { StatusBar, StyleSheet, Text, View, Button } from 'react-native';

export default class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
        title: `Claim: ${navigation.state.params.claimNumber}`,
  });
  render() {
    return (
      <View>
        <Text>Claims go Here</Text>
      </View>
    );
  }
}