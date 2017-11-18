// Simple Export
// ================================================================
// import { SQLite } from 'expo';

// module.exports = SQLite.openDatabase({ name: 'site.db' });

// ================================================================

// Singleton Approach
// ================================================================
const singleton = Symbol();
const singletonEnforcer = Symbol()

const db = SQLite.openDatabase({ name: 'site.db' });

class DatabaseManager {

  _userID = "";

  constructor(enforcer) {
    if(enforcer != singletonEnforcer) throw "Cannot construct singleton";
  }

  static get instance() {
    if(!this[singleton]) {
      this[singleton] = new DatabaseManager(singletonEnforcer);
    }
    return this[singleton];
  }

  createTables(){
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXIST sites \
        (id INTEGER PRIMARY KEY NOT NULL, \
        nombreAsegurado TEXT , \
        personaEntrevistada TEXT , \
        numeroPoliza TEXT , \
        numeroReclamacion INT , \
        numeroContacto INT , \
        fechaInspeccion TEXT , \
        dirreccionPropiedad TEXT , \
        tipoPropiedad TEXT , \
        tipoMaterial TEXT , \
        numeroHabitaciones INT , \
        numeroBanos INT , \
        sala INT , \
        comedor INT , \
        cocina INT , \
        terraza INT , \
        piesCuadrados INT , \
        photoRef TEXT )'
      )
    });
  }

  addSite( nombreAsegurado, personaEntrevistada, numeroPoliza, numeroReclamacion, 
    numeroContacto, fechaInspeccion, dirreccionPropiedad, tipoPropiedad,  tipoMaterial, 
    numeroHabitaciones, numeroBanos, sala, comedor, cocina, terraza, piesCuadrados, photoRef ) {
    db.transaction(
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
            nombreAsegurado, 
            personaEntrevistada, 
            numeroPoliza, 
            numeroReclamacion, 
            numeroContacto, 
            fechaInspeccion, 
            dirreccionPropiedad, 
            tipoPropiedad,  
            tipoMaterial, 
            numeroHabitaciones, 
            numeroBanos, 
            sala, 
            comedor, 
            cocina, 
            terraza, 
            piesCuadrados, 
            photoRef
          ])
        tx.executeSql('select * from places', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      (err) => { console.log("Addition Failed Message", err) }
    );
  }

  addClaim(id) {
    
  }

  findSites() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from places;`,
        [],
        (_, { rows: { _array } }) => {return { sites: _array }}
      );
    });
  }

  _devDeleteTables(){

  }

  _devEmptySites(){
    db.transaction(
      tx => {
        tx.executeSql('REMOVE FROM places', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      )}
    )
  }
}

export default DatabaseManager