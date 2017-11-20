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
import Database from '../components/Database';

export default class HomeScreen extends React.Component {

  state = {
    modalVisible: false
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  componentDidMount() {

    // DatabaseManager.createTables();

    // Database.transaction(tx => {
    //   tx.executeSql('CREATE TABLE IF NOT EXIST places \
    //     (id INTEGER PRIMARY KEY NOT NULL, \
    //     nombreAsegurado TEXT , \
    //     personaEntrevistada TEXT , \
    //     numeroPoliza TEXT , \
    //     numeroReclamacion INT , \
    //     numeroContacto INT , \
    //     fechaInspeccion TEXT , \
    //     dirreccionPropiedad TEXT , \
    //     tipoPropiedad TEXT , \
    //     tipoMaterial TEXT , \
    //     numeroHabitaciones INT , \
    //     numeroBanos INT , \
    //     sala INT , \
    //     comedor INT , \
    //     cocina INT , \
    //     terraza INT , \
    //     piesCuadrados INT , \
    //     photoRef TEXT )'
    //   )
    // });

    Database.createTables();
  }

  _setModalVisibility = (visible) => {
    this.setState({ modalVisible: visible });
  };

  toggleModal = () => {
    this._setModalVisibility(!this.state.modalVisible);
  }

  _deleteSites = () => {
    console.log("Deleting Sites")
    // Database.transaction(
    //   tx => {
    //     tx.executeSql('SELECT * FROM sqlite_master', [this.state.sites_id], (_, { rows }) =>
    //       console.log(JSON.stringify(rows))
    //     )
    //   },
    //   null,
    //   this.update
    // )
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
            toggleVisible={this.toggleModal}
            updateSites={this.update.bind(this)}
          />
        </Modal>

        <View style={{ flex: 1 }}>
          <ScrollView>
            <Sites style={styles.entries}
              navigation={this.props.navigation}
              ref={place => (this.place = place)}
            />
          </ScrollView>
        </View>

        <View style={styles.footerBar}>
          <View>
            {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
            <Button
              onPress={this._dbOperations}
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

  update(){
    console.log("Homescreen updating")
    this.place && this.place.update();
  }

  _dbOperations() {
    console.log("Starting DB Operation");

    // DatabaseManager.transaction(
    //   tx => {
    //     tx.executeSql('select * from places', [], (_, { rows }) =>
    //       console.log(JSON.stringify(rows))
    //     ),
    //     (err) => { console.log(err) }
    //   }
    // );

    // Database.findSites();
    this.update()

    console.log("DB Operation Done");
  }
}