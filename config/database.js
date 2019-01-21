var Datastore = require('nedb');
//var dbName = 'zonas.db';
//var db;
let db ={};
/*
if(!db) {
    db = new Datastore({
        filename: dbName,
        autoload: true
    });
    console.log('Banco ' + dbName + ' pronto para uso')
}
*/
  db.adm = new Datastore({
      filename: "data/adm.db",
      autoload: true
  });
  db.zonas = new Datastore({
      filename: "data/zones.db",
      autoload: true
  });
  db.ttl = new Datastore({
      filename: "data/ttl.db",
      autoload: true
  });
module.exports = db;
