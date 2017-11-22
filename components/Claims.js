import React from 'react';
import styles from '../css/styles';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class Claims extends React.Component {
  state = {
    siteID: this.props.siteID,
    claims: [],
  };

  componentDidMount() {
    this.update();
  }

  render() {
    const { navigate } = this.props.navigation;    
    const { claims } = this.state;

    console.log("Claims", claims)

    if (claims === null || claims.length === 0) {
      return null;
    }

    return (
      <View style={{ margin: 5 }}>
        {claims.map(({ id, descripcionDanos}) => ( 
          <Text key={id}>
            Descripcion: {descripcionDanos}
          </Text>
        ))}
      </View>
    );
  }

  update() {
    console.log("Updating Claims for site id", this.state.siteID);

  }
}