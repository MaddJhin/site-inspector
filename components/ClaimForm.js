import React from 'react';
import styles from '../css/styles';

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

export default class ClaimForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      descripcionDanos: "",
      fotoRef: "",
      unidadDanos: "",
      cantidadDanos: "",
      costoUnidad:"" ,
      danoCubierto: false,
      sites_id: this.props.siteID,
    };
  }

  addClaim() {
    console.log("Current Claim Form State", this.state);
    // Database.transaction(
    //   tx => {
    //     tx.executeSql('INSERT INTO claims (descripcionDanos, fotoRef, unidadDanos, cantidadDanos, danoCubierto, sites_id) VALUES (?, ?, ?, ?, ?, ?)', 
    //       [this.state.descripcionDanos, this.state.fotoRef, this.state.unidadDanos, this.state.cantidadDanos, this.state.danoCubierto, this.state.sites_id])
    //     tx.executeSql('select * from claims where sites_id = ?', [this.state.sites_id], (_, { rows }) =>
    //       console.log(JSON.stringify(rows))
    //     );
    //   },
    //   (err) => { console.log("Addition Failed Message", err) },
    //   this.props.updateClaims.bind(this)
    // );
    console.log("Closing Modal");
    this.props.toggleVisible();
  }

  render() {
    return (
      <View keyboardShouldPersistTaps="always" style={styles.container}>

        <View style={styles.inputGroup}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Descripcion Daños"
            onChangeText={(descripcionDanos) => this.setState({ descripcionDanos })}
          />
        </View>

        <View style={styles.btnAdd}>
          {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
          <Button
            onPress={this.addClaim.bind(this)}
            title="Confirm"
            color="#228B22"
            accessibilityLabel="Add New Claim" />
        </View>

        <View style={styles.btnCancel}>
          {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
          <Button
            onPress={this.props.toggleVisible}
            title="Cancel"
            color="#228B22"
            accessibilityLabel="Cancel New Claim" />
        </View>
      </View>
    )
  }
}