import Expo, { SQLite } from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from '../css/styles';
import Database from '../components/Database';

export default class Sites extends React.Component {
  state = {
    db: this.props.db,
    sites: [],
  };

  componentDidMount() {
    this.update();
  }

  update() {
    console.log("Updating Sites");

    const currentSites = Database.findSites();
    console.log("Database function", Database.findSites());

    // this.setState({ sites: currentSites});
    // Database.transaction(tx => {
    //   tx.executeSql(
    //     `select * from places;`,
    //     [],
    //     (_, { rows: { _array } }) => this.setState({ sites: _array })
    //   );
    // });

    console.log("Finished Updating");
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
              { db: this.state.db,
                siteID: id,
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