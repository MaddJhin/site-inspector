import React from 'react';
import styles from '../css/styles';

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

import SiteForm from '../components/SiteForm';
import Sites from '../components/Sites';

export default class HomeScreen extends React.Component {

  state = {
    modalVisible: false
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  componentDidMount() {

  }

  _setModalVisibility = (visible) => {
    this.setState({ modalVisible: visible });
  };

  _toggleModal = () => {
    this._setModalVisibility(!this.state.modalVisible);
  }

  _deleteSites = () => {
    console.log("Deleting Sites")
  }

  _devTest = () => {
    console.log("Calling database devtest");
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
            toggleVisible={this._toggleModal}
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
              onPress={this._deleteSites}
              title="Delete Sites"
              color="#228B22"
              accessibilityLabel="Input new site information" />
          </View>
          <View>
            {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
            <Button
              onPress={this._devTest}
              title="Dev Test"
              color="#228B22"
              accessibilityLabel="Temp Testing" />
          </View>
          <View>
            {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
            <Button onPress={this._toggleModal}
              title="Add Site"
              color="#228B22"
              accessibilityLabel="Input new site information" />
          </View>
        </View>

      </View>
    );
  }

  update() {
    console.log("Homescreen updating")
    this.place && this.place.update();
  }


}