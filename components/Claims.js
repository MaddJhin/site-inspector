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

export default class Claims extends React.Component {
  state = {
    db: this.props.db,
    siteID: this.props.siteID,
    claims: [],
  };

  componentDidMount() {
    this.update();
  }

  update() {
    console.log("Updating Claims for site id", this.state.siteID);

    this.state.db.transaction(tx => {
      tx.executeSql(
        'select * from claims where sites_id = ?', 
        [this.state.siteID], 
        (_, { rows: { _array } }) => this.setState({ claims: _array }),
        (err) => {console.log(err)},
        () => {console.log("Current Claims", this.state.claims)}
      );
    });

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
}