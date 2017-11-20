import { SQLite } from 'expo';

const db = SQLite.openDatabase({ name: 'site.db' });

class Database {
  constructor(){
   if(! Database.instance){
     this._data = [];
     Database.instance = this;
   }

   return Database.instance;
  }

  //rest is the same code as preceding example
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
    console.log("Finding all Sites");
    db.transaction(tx => {
      tx.executeSql('select * from places', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      )
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

const instance = new Database();
Object.freeze(instance);

export default instance;