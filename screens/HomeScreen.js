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

// Import Icon Library
import { Ionicons } from '@expo/vector-icons';
import SiteForm from '../components/SiteForm';
import Sites from '../components/Sites';

const db = SQLite.openDatabase({ name: 'sitedb' });

export default class HomeScreen extends React.Component {

  state = {
    modalVisible: false,
    items: null,
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  componentDidMount() {
    if (!db) {
      // Test your DB was created
      console.log('Your DB was not created this time');
    }
    this.makeTables;
  }

  makeTables = () => {
    db.transaction( tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS `sitedb`.`sites` ( \
        `id` INT NOT NULL AUTO_INCREMENT, \
        `nombreAsegurado` VARCHAR(45) NOT NULL, \
        `personaEntrevistada` VARCHAR(45) NOT NULL, \
        `numeroPoliza` VARCHAR(45) NOT NULL, \
        `numeroReclamacion` INT NOT NULL, \
        `numeroContacto` INT NOT NULL, \
        `fechaInspeccion` VARCHAR(45) NOT NULL, \
        `dirreccionPropiedad` VARCHAR(45) NOT NULL, \
        `tipoPropiedad` VARCHAR(45) NOT NULL, \
        `tipoMaterial` VARCHAR(45) NOT NULL, \
        `numeroHabitaciones` INT NOT NULL, \
        `numeroBanos` INT NOT NULL, \
        `sala` TINYINT NOT NULL, \
        `comedor` TINYINT NOT NULL, \
        `cocina` TINYINT NOT NULL, \
        `terraza` TINYINT NOT NULL, \
        `piesCuadrados` INT NOT NULL, \
        `photoRef` VARCHAR(225) NOT NULL, \
        PRIMARY KEY (`id`))'),
      errorCallback,
      successCallback
    });

    db.transaction( tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS `sitedb`.`claims` ( \
        `id` INT NOT NULL AUTO_INCREMENT, \
        `descripcionDanos` VARCHAR(225) NOT NULL, \
        `fotoRef` VARCHAR(225) NOT NULL, \
        `unidadDanos` VARCHAR(45) NOT NULL, \
        `cantidadDanos` INT NOT NULL, \
        `costoUnidad` INT NULL, \
        `danoCubierto` TINYINT NOT NULL, \
        `sites_id` INT NOT NULL, \
        PRIMARY KEY (`id`, `sites_id`), \
        INDEX `fk_claims_sites_idx` (`sites_id` ASC), \
        CONSTRAINT `fk_claims_sites` \
          FOREIGN KEY (`sites_id`) \
          REFERENCES `mydb`.`sites` (`id`) \
          ON DELETE NO ACTION \
          ON UPDATE NO ACTION)'
        ),
      errorCallback,
      successCallback
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
        tx.executeSql(`delete from sites`);
      },
      null,
      this.update
    )
  }

  _dbOperations() {
    console.log("Starting DB Operation");

    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE sites;'
      ),
        errorCallback,
        successCallback
    });
    console.log("DB Operation Done");
  }

  successCallback(err) {
    console.log("Transaction Error", err)
  }

  errorCallback() {
    console.log("Transaction Success")
  }

  render() {
    const { navigate } = this.props.navigation;

    // const { items } = this.state;
    // if (items === null || items.length === 0) {
    //   return null;
    // } 

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
            <Sites style={styles.sites}
              navigation={this.props.navigation}
              ref={place => (this.place = place)}
            />
          </ScrollView>
        </View>

        <View style={styles.tabBarInfoContainer}>
          <View>
            {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
            <Button onPress={this.toggleModal}
              title="Add Site"
              color="#228B22"
              accessibilityLabel="Input new site information" />
          </View>

          <View>
            {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
            <Button
              onPress={this._deleteSites}
              title="Delete Sites"
              color="#228B22"
              accessibilityLabel="Input new site information" />
          </View>

          <View>
            <Button
              onPress={this._dbOperations.bind(this)}
              title="Temp"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btnAdd: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  btnDelete: {
    position: 'absolute',
    left: 10,
    bottom: 10
  },
  btnNuke: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10
  },
  sites: {
    flex: 1,
    alignSelf: 'stretch',
  },
  tabBarInfoContainer: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});