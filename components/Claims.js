import Expo, { SQLite } from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

const db = SQLite.openDatabase({ name: 'site.db' });

export default class Sites extends React.Component {
  state = {
    siteID: this.props.siteID,
    claims: [],
  };

  componentDidMount() {
    this.update();
  }

  update() {
    console.log("Starting Update");

    db.transaction(tx => {
      tx.executeSql(
        `select * from claims where site_id = ?;`,
        [this.state.siteID],
        (_, { rows: { _array } }) => this.setState({ sites: _array })
      );
    });

    console.log("Finished Updating");
  }

  render() {
    const { navigate } = this.props.navigation;    
    
    const { claims } = this.state;
    if (claims === null || claims.length === 0) {
      return null;
    }

    return (
      <View style={{ margin: 5 }}>
        {claims.map(({ id, descripcionDanos}) => ( 
          <Text>Descripcion: {descripcionDanos}</Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  site: {
    padding: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  }
});