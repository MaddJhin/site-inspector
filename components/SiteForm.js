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
  Platform
} from 'react-native';

import { CheckBox } from 'react-native-elements';
import styles from '../css/styles';
import Database from '../components/DatabaseManager';

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
      sala: false,
      comedor: false,
      cocina: false,
      terraza: false,
      piesCuadrados: 0,
      photoRef: '',
    };
  }

  addSite() {
    Database.addSite(this.state.nombreAsegurado,
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
    );

    this.props.updateSites.bind(this)
    console.log("Closing Modal");
    this.props.toggleVisible();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always">
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
            <View style={styles.inlineWrapper}>
              <CheckBox
                title="Sala"
                checked={this.state.sala}
                onPress={() => this.setState({ sala: !this.state.sala })}
              />

              <CheckBox
                title="Comedor"
                checked={this.state.comedor}
                onPress={() => this.setState({ comedor: !this.state.comedor })}
              />

              <CheckBox
                title="Cocina"
                checked={this.state.cocina}
                onPress={() => this.setState({ cocina: !this.state.cocina })}
              />

              <CheckBox
                title="Terraza"
                checked={this.state.terraza}
                onPress={() => this.setState({ terraza: !this.state.terraza })}
              />
            </View>

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
        </ScrollView>

        <View style={styles.footerBar}>
          <View>
            {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
            <Button
              onPress={this.addSite.bind(this)}
              title="Confirm"
              color="#228B22"
              accessibilityLabel="Add new site" />
          </View>
          <View>
            {/* <Ionicons name="md-add-circle" size={64} color="green" /> */}
            <Button
              onPress={this.props.toggleVisible}
              title="Cancel"
              color="#228B22"
              accessibilityLabel="Cancel New Site" />
          </View>
        </View>
      </View>
    )
  }
}
