import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';

export default class SiteForm extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Add a New Site</Text>

        <View style={styles.btnAdd}>
          {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
          <Button
            onPress={this.props.toggleVisible}
            title="Confirm"
            color="#228B22"
            accessibilityLabel="Add new site" />
        </View>
      </View>
    )
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
  }
});