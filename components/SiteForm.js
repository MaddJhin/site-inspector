import React from 'react';
import Expo, { SQLite } from 'expo';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Picker, 
  CheckBox
} from 'react-native';

export default class SiteForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nombreAsegurado: '',
      personaEntrevistada: '',
      numeroPoliza: '',
      numeroReclamacion: 0,
      numeroContacto: 0,
      fechaInspeccion: '',
      dirreccionPropiedad: '',
      tipoPropiedad: '',
      tipoMaterial: '',
      numeroHabitaciones: 0,
      numeroBanos: 0,
      sala: 0,
      comedor: 0,
      cocina: 0,
      terraza: 0,
      piesCuadrados: 0,
      photoRef: '',
      db: this.props.db
    };

  }

  addSite() {
    console.log("Site Form DB", this.state.db);
    this.state.db.transaction(
      tx => {
        tx.executeSql('INSERT INTO places ( \
            nombreAsegurado, \
            personaEntrevistada, \
            numeroPoliza, \
            numeroReclamacion, \
            numeroContacto, \
            fechaInspeccion, \
            dirreccionPropiedad, \
            tipoPropiedad,  \
            tipoMaterial, \
            numeroHabitaciones, \
            numeroBanos, \
            sala, \
            comedor, \
            cocina, \
            terraza, \
            piesCuadrados, \
            photoRef) \
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            this.state.nombreAsegurado,
            this.state.personaEntrevistada,
            this.state.numeroPoliza,
            this.state.numeroReclamacion,
            this.state.numeroContacto,
            this.state.fechaInspeccion,
            this.state.dirreccionPropiedad,
            this.state.tipoPropiedad,
            this.state.tipoMaterial,
            this.state.numeroHabitaciones,
            this.state.numeroBanos,
            this.state.sala,
            this.state.comedor,
            this.state.cocina,
            this.state.terraza,
            this.state.piesCuadrados,
            this.state.photoRef
          ])
        tx.executeSql('select * from places', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      (err) => { console.log("Addition Failed Message", err) },
      this.props.updateSites.bind(this)
    );
    console.log("Closing Modal");
    this.props.toggleVisible();
  }

  render() {
    return (
      <View keyboardShouldPersistTaps="always" style={styles.container}>

        <View style={styles.inputGroup}>
          <Text style={styles.inputTitle}>Informaction Contacto</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Nombre de Persona Asegurada"
            onChangeText={(nombreAsegurado) => this.setState({ nombreAsegurado })}
          />

          <TextInput
            style={styles.inputField}
            placeholder="Nombre de Persona Entrevistada"
            onChangeText={(personaEntrevistada) => this.setState({ personaEntrevistada })}
          />

          <TextInput
            style={styles.inputField}
            placeholder="Numero de Poliza"
            onChangeText={(numeroPoliza) => this.setState({ numeroPoliza })}
          />

          <TextInput
            style={styles.inputField}
            placeholder="Numero de Reclamacion"
            onChangeText={(numeroReclamacion) => this.setState({ numeroReclamacion })}
          />

          <TextInput
            style={styles.inputField}
            placeholder="Numero de Contacto"
            onChangeText={(numeroContacto) => this.setState({ numeroContacto })}
          />

        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputTitle}>Informacion de la Propiedad</Text>

          <TextInput
            style={styles.inputField}
            placeholder="Direccion"
            onChangeText={(dirreccionPropiedad) => this.setState({ dirreccionPropiedad })}
          />

          <TextInput
            style={styles.inputField}
            placeholder="Tamaño en Pies Cuadraros"
            onChangeText={(piesCuadrados) => this.setState({ piesCuadrados })}
          />

          <TextInput
            style={styles.inputField}
            placeholder="Numero Habitaciones"
            onChangeText={(numeroHabitaciones) => this.setState({ numeroHabitaciones })}
          />

          <TextInput
            style={styles.inputField}
            placeholder="Numero Baños"
            onChangeText={(numeroBanos) => this.setState({ numeroBanos })}
          />

          <Text> Cuartos Existentes </Text>
          <Text>Sala</Text>
          <CheckBox
            style={{position: inline}}
            value={false}
            onValueChange={(value) => this.setState({ sala: value })}>
          </CheckBox>

          <Text> Material de Construccion </Text>
          <Picker
            mode="dialog"
            selectedValue={this.state.tipoMaterial}
            onValueChange={(itemValue, itemIndex) => this.setState({ tipoMaterial: itemValue })}>
            <Picker.Item label="<Selecione Uno>" value="" />
            <Picker.Item label="Concreto" value="concreto" />
            <Picker.Item label="Madera" value="madera" />
            <Picker.Item label="Mixto" value="mixto" />
          </Picker>

          <Text> Tipo de Propiedad </Text>
          <Picker
            mode="dialog"
            selectedValue={this.state.tipoPropiedad}
            onValueChange={(itemValue, itemIndex) => this.setState({ tipoPropiedad: itemValue })}>
            <Picker.Item label="<Selecione Uno>" value="" />
            <Picker.Item label="Terrera" value="terrera" />
            <Picker.Item label="Dos Plantas" value="dos planta" />
            <Picker.Item label="Apartamento" value="apartamento" />
          </Picker>

        </View>

        <View style={styles.btnAdd}>
          {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
          <Button
            onPress={this.addSite.bind(this)}
            title="Confirm"
            color="#228B22"
            accessibilityLabel="Add new site" />
        </View>

        <View style={styles.btnCancel}>
          {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
          <Button
            onPress={this.props.toggleVisible}
            title="Cancel"
            color="#228B22"
            accessibilityLabel="Cancel New Site" />
        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  btnAdd: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  btnCancel: {
    position: 'absolute',
    left: 10,
    bottom: 10
  },
  inputGroup: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  inputTitle: {

  },
  inputField: {
    height: 40
  }
});