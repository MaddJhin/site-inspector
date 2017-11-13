import Expo, { SQLite } from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

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

    this.state.db.transaction(
      tx => {
        tx.executeSql(
          'select * from claims where sites_id = ?', 
          [this.state.sites_id], 
          (_, { rows }) => this.setState({ claims: _array })
        );
      },
    );
    console.log("Current Claims", this.state.claims);
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