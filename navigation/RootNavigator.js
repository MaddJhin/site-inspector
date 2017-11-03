import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

const RootStackNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },  
});

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
};