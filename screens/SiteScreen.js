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

import ClaimForm from '../components/ClaimForm';
import Claims from '../components/Claims';

export default class SiteScreen extends React.Component {

  state = {
    modalVisible: false,
    siteID: this.props.navigation.state.params.siteID
  }

  static navigationOptions = ({ navigation }) => ({
        title: `Claim: ${navigation.state.params.claimNumber}`,
  });

  componentDidMount(){
    console.log("State for Site: ", this.state)
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
        tx.executeSql(`delete from claims where site_id = ?`),[this.state.siteID];
      },
      null,
      this.update
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
            toggleVisible={this.toggleModal}
            updateClaims={this.update.bind(this)}
          />
        </Modal>

        <View style={{ flex: 1 }}>
          <ScrollView>
            <Claims style={styles.claims}
              navigation={this.props.navigation}
              ref={item => (this.item = item)}
              siteID={this.state.siteID}
            />
          </ScrollView>
        </View>

        <View style={styles.tabBarInfoContainer}>
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
  claims: {
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