import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SiteScreen from '../screens/SiteScreen';

const RootStackNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Site: { screen: SiteScreen },  
});


export default class RootNavigator extends React.Component {

  // componentDidMount(){
  //   // console.log("Navigation DB", this.props);
  // }

  // constructor() {
  //   super();
  //   this.state = {
  //     db: db
  //   }
  // }  

  render() {
    return <RootStackNavigator screenProps={this.props.db}/>;
  }
};