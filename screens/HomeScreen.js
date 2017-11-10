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
    if (!db) {
      // Test your DB was created
      console.log('Your DB was not created this time');
    }
    this.makeTables;
  }

  makeTables = () => {
    
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
        tx.executeSql('insert into items (done, value) values (0, ?)', ["This is a test"]);
        tx.executeSql('select * from items', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
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