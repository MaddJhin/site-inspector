// import Expo, { SQLite } from 'expo';
// import React from 'react';
// import { StatusBar, StyleSheet, Text, View, Button } from 'react-native';

// import TestList from './components/TestList'

// import RootNavigator from './navigation/RootNavigator' 

// export default class App extends React.Component {

//   // componentDidMount(){
//   //   db.transaction( tx => {
//   //     tx.executeSql('CREATE TABLE IF NOT EXIST `places` ( \
//   //       `id` INT NOT NULL, \
//   //       `nombreAsegurado` VARCHAR(45) NOT NULL, \
//   //       `personaEntrevistada` VARCHAR(45) NOT NULL, \
//   //       `numeroPoliza` VARCHAR(45) NOT NULL, \
//   //       `numeroReclamacion` INT NOT NULL, \
//   //       `numeroContacto` INT NOT NULL, \
//   //       `fechaInspeccion` VARCHAR(45) NOT NULL, \
//   //       `dirreccionPropiedad` VARCHAR(45) NOT NULL, \
//   //       `tipoPropiedad` VARCHAR(45) NOT NULL, \
//   //       `tipoMaterial` VARCHAR(45) NOT NULL, \
//   //       `numeroHabitaciones` INT NOT NULL, \
//   //       `numeroBanos` INT NOT NULL, \
//   //       `sala` TINYINT NOT NULL, \
//   //       `comedor` TINYINT NOT NULL, \
//   //       `cocina` TINYINT NOT NULL, \
//   //       `terraza` TINYINT NOT NULL, \
//   //       `piesCuadrados` INT NOT NULL, \
//   //       `photoRef` VARCHAR(225) NOT NULL, \
//   //       PRIMARY KEY (`id`))')
//   //   });
    
//   //   db.transaction( tx => {
//   //     tx.executeSql('CREATE TABLE IF NOT EXIST `claims` ( \
//   //       `id` INT NOT NULL AUTO_INCREMENT, \
//   //       `descripcionDanos` VARCHAR(225) NOT NULL, \
//   //       `fotoRef` VARCHAR(225) NOT NULL, \
//   //       `unidadDanos` VARCHAR(45) NOT NULL, \
//   //       `cantidadDanos` INT NOT NULL, \
//   //       `costoUnidad` INT NULL, \
//   //       `danoCubierto` TINYINT NOT NULL, \
//   //       `sites_id` INT NOT NULL, \
//   //       PRIMARY KEY (`id`, `sites_id`), \
//   //       INDEX `fk_claims_sites_idx` (`sites_id` ASC), \
//   //       CONSTRAINT `fk_claims_sites` \
//   //         FOREIGN KEY (`sites_id`) REFERENCES `site.db`.`sites` (`id`) \
//   //         ON DELETE NO ACTION \
//   //         ON UPDATE NO ACTION)'
//   //       )
//   //   });

//   //   console.log(db);
//   // }

//   render() {
//     return (
//       <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
//         <TestList />
//       </View>
//     );
//   }
// };

import Expo, { SQLite } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const db = SQLite.openDatabase({ name: 'db.db' });

class Items extends React.Component {
  state = {
    items: null,
  };

  componentDidMount() {
    this.update();
  }

  render() {
    const { items } = this.state;
    if (items === null || items.length === 0) {
      return null;
    }

    return (
      <View style={{ margin: 5 }}>
        {items.map(({ id, done, value }) => (
          <TouchableOpacity
            key={id}
            onPress={() => this.props.onPressItem && this.props.onPressItem(id)}
            style={{
              padding: 5,
              backgroundColor: done ? '#aaffaa' : 'white',
              borderColor: 'black',
              borderWidth: 1,
            }}>
            <Text>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  update() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }
}

export default class App extends React.Component {
  state = {
    text: null,
  };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, done int, value text);'
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
          <Items
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
          <Items
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
      null,
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
