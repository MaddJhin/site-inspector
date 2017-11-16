import React from 'react';
import Expo, { SQLite } from 'expo';

import {
  StatusBar,
  Platform,
  StyleSheet,
  Text, View,
  Button,
  ScrollView,
  Modal,
  TouchableHighlight
} from 'react-native';

import styles from '../css/styles';

// Import Icon Library
import { Ionicons } from '@expo/vector-icons';
import SiteForm from '../components/SiteForm';
import Sites from '../components/Sites';

const db = SQLite.openDatabase({ name: 'site.db' });

export default class HomeScreen extends React.Component {

  state = {
    modalVisible: false
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  componentDidMount() {

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXIST places \
        (id INTEGER PRIMARY KEY NOT NULL, \
        nombreAsegurado TEXT , \
        personaEntrevistada TEXT , \
        numeroPoliza TEXT , \
        numeroReclamacion INT , \
        numeroContacto INT , \
        fechaInspeccion TEXT , \
        dirreccionPropiedad TEXT , \
        tipoPropiedad TEXT , \
        tipoMaterial TEXT , \
        numeroHabitaciones INT , \
        numeroBanos INT , \
        sala INT , \
        comedor INT , \
        cocina INT , \
        terraza INT , \
        piesCuadrados INT , \
        photoRef TEXT )'
      )
    });
  }

  _setModalVisibility = (visible) => {
    this.setState({ modalVisible: visible });
  };

  toggleModal = () => {
    this._setModalVisibility(!this.state.modalVisible);
  }

  _deleteSites = () => {
    db.transaction(
      tx => {
        tx.executeSql('SELECT * FROM sqlite_master', [this.state.sites_id], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      )},
      null,
      this.update
    )
  }

  _dbOperations() {
    console.log("Starting DB Operation");

    db.transaction(
      tx => {
        // tx.executeSql('insert into places (nombreAsegurado) values (?)', ["Test"]);
        // tx.executeSql('insert into items (value) values (?)', ["Test"]);
        
        tx.executeSql('select * from places', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        ),
        (err) => {console.log(err)};
      }
    );

    console.log("DB Operation Done");
  }

  errorCallback = (err) => {
    console.log("Transaction Error", err)
  }

  successCallback = () => {
    console.log("Transaction Success")
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        {/* Modal for entering project information */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { console.log("Modal has been closed.") }}
        >
          <SiteForm
            db={db}
            toggleVisible={this.toggleModal}
            updateSites={this.update.bind(this)}
          />
        </Modal>

        <View style={{ flex: 1 }}>
          <ScrollView>
            <Sites style={styles.entries}
              db={db}
              navigation={this.props.navigation}
              ref={place => (this.place = place)}
            />
          </ScrollView>
        </View>

        <View style={styles.footerBar}>
          <View>
            {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
            <Button
              onPress={this._deleteSites}
              title="Delete Sites"
              color="#228B22"
              accessibilityLabel="Input new site information" />
          </View>
          <View>
            {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
            <Button onPress={this.toggleModal}
              title="Add Site"
              color="#228B22"
              accessibilityLabel="Input new site information" />
          </View>
        </View>

      </View>
    );
  }

  update = () => {
    console.log("Homescreen updating")
    this.place && this.place.update();
  }
}