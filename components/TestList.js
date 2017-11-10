import Expo, { SQLite } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import TestItems from './TestItems'

const db = SQLite.openDatabase({ name: 'testdb.db' });


export default class TestList extends React.Component {
  state = {
    text: null,
  };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists testItems (id integer primary key not null, done int, value text);'
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TextInput
            style={{
              flex: 1,
              padding: 5,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            placeholder="what do you need to do?"
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
            onSubmitEditing={() => {
              this.add(this.state.text);
              this.setState({ text: null });
            }}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: 'gray' }}>
          <TestItems
            done={false}
            ref={todo => (this.todo = todo)}
            onPressItem={id =>
              db.transaction(
                tx => {
                  tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
                },
                null,
                this.update
              )}
          />
          <TestItems
            done={true}
            ref={done => (this.done = done)}
            onPressItem={id =>
              db.transaction(
                tx => {
                  tx.executeSql(`delete from items where id = ?;`, [id]);
                },
                null,
                this.update
              )}
          />
        </View>
      </View>
    );
  }

  add(text) {
    db.transaction(
      tx => {
        tx.executeSql('insert into items (done, value) values (0, ?)', [text]);
        tx.executeSql('select * from items', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      (err) => {console.log(err)},
      this.update
    );
  }

  update = () => {
    this.todo && this.todo.update();
    this.done && this.done.update();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Expo.Constants.statusBarHeight,
  },
});