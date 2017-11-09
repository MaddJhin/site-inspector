import React from 'react';
import Expo, { SQLite } from 'expo';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Picker
} from 'react-native';


const db = SQLite.openDatabase({ name: 'sitedb' });

export default class SiteForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ownerName: '',
      claimNumber: ''
    };

  }

  addSite() {
    console.log("Current State", this.state);
    db.transaction(
      tx => {
        tx.executeSql('INSERT INTO sites (ownerName, claimNumber) VALUES (?, ?)', [this.state.ownerName, this.state.claimNumber])
        tx.executeSql('select * from sites', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      (err) => { console.log("Addition Failed Message", err) },
      this.props.updateSites.bind(this)
    );
    console.log("Closing Modal");
    this.props.toggleVisible();
  }

  render() {
    return (
      <View keyboardShouldPersistTaps="always" style={styles.container}>

        <View style={styles.inputGroup}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Site Owner"
            onChangeText={(ownerName) => this.setState({ ownerName })}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Claim Number"
            onChangeText={(claimNumber) => this.setState({ claimNumber })}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Policy Number"
            onChangeText={(policyNumber) => this.setState({ policyNumber })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text>Address</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Address One"
            onChangeText={(addressOne) => this.setState({ addressOne })}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Address Two"
            onChangeText={(addressTwo) => this.setState({ addressTwo })}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Contact Phone Number"
            onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Site Measurements"
            onChangeText={(squareFeet) => this.setState({ squareFeet })}
          />
        </View>


        <View style={styles.inputGroup}>
          <Text> Material Type </Text>
          <Picker
            mode="dialog"
            selectedValue={this.state.materialType}
            onValueChange={(itemValue, itemIndex) => this.setState({ materialType: itemValue })}>
            <Picker.Item label="Concrete" value="concrete" />
            <Picker.Item label="Wood" value="wood" />
            <Picker.Item label="Mixed" value="mixed" />
          </Picker>
        </View>

        <View style={styles.btnAdd}>
          {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
          <Button
            onPress={this.addSite.bind(this)}
            title="Confirm"
            color="#228B22"
            accessibilityLabel="Add new site" />
        </View>

        <View style={styles.btnCancel}>
          {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
          <Button
            onPress={this.props.toggleVisible}
            title="Cancel"
            color="#228B22"
            accessibilityLabel="Cancel New Site" />
        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  btnAdd: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  btnCancel: {
    position: 'absolute',
    left: 10,
    bottom: 10
  },
  inputGroup: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  inputTitle: {

  },
  inputField: {

  }
});