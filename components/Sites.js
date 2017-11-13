import Expo, { SQLite } from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

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

    this.state.db.transaction(tx => {
      tx.executeSql(
        `select * from places;`,
        [],
        (_, { rows: { _array } }) => this.setState({ sites: _array })
      );
    });

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
            style={styles.site}>
            <Text>Owner: {nombreAsegurado}, claim: {numeroReclamacion}</Text>
          </TouchableOpacity>
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
})