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

import ClaimForm from '../components/ClaimForm';
import Claims from '../components/Claims';

const db = SQLite.openDatabase({ name: 'site.db' });

export default class SiteScreen extends React.Component {

  state = {
    modalVisible: false,
    siteID: this.props.navigation.state.params.siteID
  }

  static navigationOptions = ({ navigation }) => ({
        title: `Claim: ${navigation.state.params.claimNumber}`,
  });

  componentDidMount() {    
    db.transaction(tx => {
      tx.executeSql('create table if not exists claims ( \
        id INTEGER PRIMARY KEY NOT NULL, \
        descripcionDanos TEXT NOT NULL, \
        fotoRef TEXT NOT NULL, \
        cantidadDanos TEXT NOT NULL, \
        unidadDanos TEXT NOT NULL, \
        danoCubierto INT NOT NULL, \
        sites_id INT NOT NULL);');
    });

    console.log("Current Site ID", this.state.siteID);
  }

  _setModalVisibility = (visible) => {
    this.setState({ modalVisible: visible });
  };

  toggleModal = () => {
    this._setModalVisibility(!this.state.modalVisible);
  }

  _deleteClaims = () => {
    db.transaction(
      tx => {
        tx.executeSql('select * from claims'),[];
      },
      (err) => {console.log(err)},
      () => {
        console.log("All Claims")
        this.update;
      }
    )
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
          <ClaimForm
            db={db}
            siteID={this.state.siteID}
            toggleVisible={this.toggleModal}
            updateClaims={this.update.bind(this)}
          />
        </Modal>

        <View style={{ flex: 1 }}>
          <ScrollView>
            <Claims style={styles.entries}
              db={db}
              navigation={this.props.navigation}
              ref={item => (this.item = item)}
              siteID={this.state.siteID}
            />
          </ScrollView>
        </View>

        <View style={styles.footerBar}>
          <View>
            {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
            <Button onPress={this.toggleModal}
              title="Add Claim"
              color="#228B22"
              accessibilityLabel="Input new claim information" />
          </View>

          <View>
            {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
            <Button
              onPress={this._deleteClaims}
              title="Delete Claims"
              color="#228B22"
              accessibilityLabel="Remove Claims" />
          </View>
        </View>
      </View>
    );
  }

  update = () => {
    console.log("Homescreen updating")
    this.item && this.item.update();
  }
}