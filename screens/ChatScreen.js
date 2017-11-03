import React from 'react';
import { StatusBar, StyleSheet, Text, View, Button } from 'react-native';

export default class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}