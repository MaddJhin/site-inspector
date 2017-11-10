import React from 'react';
import { StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import Expo, { SQLite } from 'expo';

import RootNavigator from './navigation/RootNavigator'

export default class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <RootNavigator />
      </View>
    );
  }
};