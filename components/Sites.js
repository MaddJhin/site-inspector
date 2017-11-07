import Expo, { SQLite } from 'expo';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity 
} from 'react-native';

const db = SQLite.openDatabase({ name: 'sitedb' });

export default class Sites extends React.Component {
  state = {
    sites: [],
  };

  componentDidMount() {
    this.update();
  }

  update() {
    console.log("Starting Update");

    db.transaction(tx => {
      tx.executeSql(
        `select * from sites;`,
        [],
        (_, { rows: { _array } }) => this.setState({ sites: _array })
      );
    });

    console.log("Finished Updating");
  }

  render() {
    const { sites } = this.state;
    if (sites === null || sites.length === 0) {
      return null;
    }

    return (
      <View style={{ margin: 5 }}>
        {sites.map(({ id, ownerName, claimNumber }) => (
          <TouchableOpacity
            key={id}
            onPress={this.update.bind(this)}
            style={{
              padding: 5,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
            }}>
            <Text>id: {id}, Owner: {ownerName}, claim: {claimNumber}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}