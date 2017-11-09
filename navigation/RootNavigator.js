import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SiteScreen from '../screens/SiteScreen';

const RootStackNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Site: { screen: SiteScreen },  
});

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
};