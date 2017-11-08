import React from 'react';
import Expo, { SQLite } from 'expo';

import { 
  StatusBar, 
  StyleSheet, 
  Text, View, 
  Button, 
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
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists sites (id integer primary key not null, ownerName text, claimNumber int, inspectionDate date, materialType text);'
      );
    });
  }

  _setModalVisibility = (visible) => {
    this.setState({modalVisible: visible});
  };

  toggleModal = () =>{
    this._setModalVisibility(!this.state.modalVisible);
  }

  _deleteSites = () =>{
    db.transaction(
      tx => {
        tx.executeSql(`delete from sites`);
      },
      null,
      this.update
    )
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

        <View style={{ flex: 1, backgroundColor: 'gray' }}>
          <Sites
            ref={place => (this.place = place)}
          />
        </View>

        <View style={styles.btnAdd}>
          {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
          <Button onPress={this.toggleModal}
            title="Add Site"
            color="#228B22"
            accessibilityLabel="Input new site information" />
        </View>

        <View style={styles.btnDelete}>
          {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
          <Button 
            onPress={this._deleteSites}
            title="Delete Sites"
            color="#228B22"
            accessibilityLabel="Input new site information" />
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
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});