import React from 'react';
import styles from '../css/styles';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class Sites extends React.Component {
  state = {
    sites: [],
  };

  componentDidMount() {
    this.update();
  }

  update() {
    console.log("Sites Component Updating Sites");

    console.log("Sites Component Finished Updating");
  }

  render() {
    const { navigate } = this.props.navigation;    
    
    const { sites } = this.state;
    if (sites === null || sites.length === 0) {
      return null;
    }

    return (
      <View style={{ margin: 5 }}>
        {sites.map(({ id, nombreAsegurado, numeroReclamacion }) => (
          <TouchableOpacity
            key={id}
            onPress={() => navigate("Site", 
              { siteID: id,
                owner: nombreAsegurado,
                claimNumber: numeroReclamacion
              })}
            style={styles.entry}>
            <Text>Owner: {nombreAsegurado}, Claim: {numeroReclamacion}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}