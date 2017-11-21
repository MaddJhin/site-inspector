import { SQLite } from 'expo';

const db = SQLite.openDatabase({ name: 'site.db' });

class Database {

  state = {
    sites: []
  }

  constructor(){
   if(! Database.instance){
     this._data = [];
     Database.instance = this;
   }

   return Database.instance;
  }

  componentDidMount(){
    console.log("Database Component db", db);
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
      },
      (err) => console.log(err)
    );
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
    db.transaction(tx => 
      {
        tx.executeSql(
          `select * from places;`,
          [],
          (_, { rows: { _array } }) => this.setState({ sites: _array })
        )
      },
      (err) => console.log(err),
      () => console.log("Database Sites",this.state.sites)
    );

    console.log(this.state.sites);
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

  _devAdd() {
    db.transaction(
      tx => {
        tx.executeSql('insert into places (nombreAsegurado, numeroPoliza, numeroReclamacion) values (Test Name, 0001, 11111)', []);
        tx.executeSql('select * from places', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      (err) => console.log(err),
      this._ok
    );

    console.log("Database Finished Test Adding")
  }

  _devTest(){
    console.log("Database db ")
  }

}

export default Database;