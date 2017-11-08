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

  componentDidMount() {
    if (!db) {
      // Test your DB was created
      console.log('Your DB was not created this time');
    }

    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS sites (id integer primary key not null, ownerName text, claimNumber int);'
      ),
        (err) => { console.log("Error", err) },
        () => { console.log("Success Creating sites table") }
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

  _dbOperations (){
    console.log("Starting DB Operation");

    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE sites;'
      ),
        (err) => { console.log("Error", err) },
        this.update
    });
    console.log("DB Operation Done");
  }

  static navigationOptions = {
    title: 'Welcome',
  };

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

        <View style={{flex: 1}}>
          <ScrollView>
            <Sites style={styles.sites}
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