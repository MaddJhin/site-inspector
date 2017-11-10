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

const db = SQLite.openDatabase({ name: 'site.db' });

export default class HomeScreen extends React.Component {

  state = {
    modalVisible: false
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  componentDidMount() {

    // db.transaction(tx => {
    //   tx.executeSql(
    //     'create table if not exists places (id integer primary key not null, name text);'
    //   );
    // });

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

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXIST `claims` ( \
        `id` INT NOT NULL, \
        `descripcionDanos` TEXT NOT NULL, \
        `fotoRef` TEXT NOT NULL, \
        `unidadDanos` TEXT NOT NULL, \
        `cantidadDanos` INT NOT NULL, \
        `costoUnidad` INT NULL, \
        `danoCubierto` INTT NOT NULL, \
        `sites_id` INT NOT NULL, \
        PRIMARY KEY (`id`, `sites_id`), \
        INDEX `fk_claims_sites_idx` (`sites_id` ASC), \
        CONSTRAINT `fk_claims_sites` \
          FOREIGN KEY (`sites_id`) REFERENCES `site.db`.`sites` (`id`) \
          ON DELETE NO ACTION \
          ON UPDATE NO ACTION)'
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
        tx.executeSql(`delete from places`);
      },
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
        (errr) => {console.log(errr)};
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
            <Sites style={styles.sites}
              db={db}
              navigation={this.props.navigation}
              ref={place => (this.place = place)}
            />
          </ScrollView>
        </View>

        <View style={styles.tabBarInfoContainer}>
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