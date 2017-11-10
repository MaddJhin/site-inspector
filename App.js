import React from 'react';
import { StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import Expo, { SQLite } from 'expo';

import RootNavigator from './navigation/RootNavigator' 

const db = SQLite.openDatabase({ name: 'site.db' });

export default class App extends React.Component {
  
  // componentDidMount() {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'create table if not exists items (id integer primary key not null, done int, value text);'
  //     );
  //   });
  // }

  componentDidMount(){
    db.transaction( tx => {
      tx.executeSql('CREATE TABLE IF NOT EXIST `places` ( \
        `id` INT NOT NULL, \
        `nombreAsegurado` VARCHAR(45) NOT NULL, \
        `personaEntrevistada` VARCHAR(45) NOT NULL, \
        `numeroPoliza` VARCHAR(45) NOT NULL, \
        `numeroReclamacion` INT NOT NULL, \
        `numeroContacto` INT NOT NULL, \
        `fechaInspeccion` VARCHAR(45) NOT NULL, \
        `dirreccionPropiedad` VARCHAR(45) NOT NULL, \
        `tipoPropiedad` VARCHAR(45) NOT NULL, \
        `tipoMaterial` VARCHAR(45) NOT NULL, \
        `numeroHabitaciones` INT NOT NULL, \
        `numeroBanos` INT NOT NULL, \
        `sala` TINYINT NOT NULL, \
        `comedor` TINYINT NOT NULL, \
        `cocina` TINYINT NOT NULL, \
        `terraza` TINYINT NOT NULL, \
        `piesCuadrados` INT NOT NULL, \
        `photoRef` VARCHAR(225) NOT NULL, \
        PRIMARY KEY (`id`))')
    });
    
    db.transaction( tx => {
      tx.executeSql('CREATE TABLE IF NOT EXIST `claims` ( \
        `id` INT NOT NULL AUTO_INCREMENT, \
        `descripcionDanos` VARCHAR(225) NOT NULL, \
        `fotoRef` VARCHAR(225) NOT NULL, \
        `unidadDanos` VARCHAR(45) NOT NULL, \
        `cantidadDanos` INT NOT NULL, \
        `costoUnidad` INT NULL, \
        `danoCubierto` TINYINT NOT NULL, \
        `sites_id` INT NOT NULL, \
        PRIMARY KEY (`id`, `sites_id`), \
        INDEX `fk_claims_sites_idx` (`sites_id` ASC), \
        CONSTRAINT `fk_claims_sites` \
          FOREIGN KEY (`sites_id`) REFERENCES `site.db`.`sites` (`id`) \
          ON DELETE NO ACTION \
          ON UPDATE NO ACTION)'
        )
    });

    console.log(db);
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <RootNavigator />
      </View>
    );
  }
};