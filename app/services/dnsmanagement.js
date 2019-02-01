//const fs = require("fs");
const fse = require("fs-extra");
const q = require('q');
const db = require('../../config/database');
const shell = require('shelljs');
//let path = '/home/kress/Documentos/ProjetosYIPI/WebBind9/data/zona.txt';
let path = __dirname+'/../../data/zona.conf';
let data = {};
let dnsm = {};

  dnsm.test = ()=>{
      //dnsm.salvaDados();

  },
  dnsm.escreveDados = (dados) =>{
    return fse.writeFile(path, dados)
      .then(() => console.log('Alterações Salvo em disco'))
      .catch(err => console.error(err))
  },
  dnsm.salvaDados = ()=> {
    if(!fse.existsSync(path)){
      dnsm.criaArquivo()
      .then(() => {
        console.log('Salvar arquivo');
      })
    }
    dnsm.preparaArquivo().then((item)=>{
        dnsm.escreveDados(item)
        .then(()=>{
          console.log("Função que reseta o bind");
          shell.exec('service bind9 restart').stdout;
        });
    });
  },
  dnsm.criaArquivo = ()=> {
    return fse.writeFile(path)
      .then(() => console.log('Arquivo Criado!'))
      .catch(err => console.error(err))
  },
  dnsm.preparaArquivo = () => {
    var deferred = q.defer();
    var dataString ="";
    dnsm.carregaTtl()
    .then(dnsm.carregaZonas)
    .then(() => {
       data.header.forEach((ttl) => {
        dataString+=`$TTL ${ttl.ttl}
${ttl.dominio}\t${ttl.dominiottl}\t${ttl.classe}\t${ttl.tipo}\t${ttl.ns1}\t${ttl.ns2} (
        ${ttl.serial}
        ${ttl.refresh}
        ${ttl.retry}
        ${ttl.expire}
        ${ttl.minttl}
        )\n\n`;
      });
      data.records.forEach((record) =>{
        if (record.tipo == "MX") {
          dataString+=`${record.host}\t\t\t${record.ttl} ${record.classe} ${record.tipo} ${record.mx} ${record.registro}\n`;
        }else{
          dataString+=`${record.host}\t\t\t${record.ttl} ${record.classe} ${record.tipo} ${record.registro}\n`;
        }
      });
      deferred.resolve(dataString);
    });
    return deferred.promise;
  },
  dnsm.carregaZonas =() =>{
    var deferred = q.defer();
    db.zonas.find({}).exec(function(err, records) {
      if (err) return console.log(err);
      data.records = records;
      deferred.resolve(records);
    });
    return deferred.promise;
  },
  dnsm.carregaTtl = () => {
    var deferred = q.defer();
    db.ttl.find({}).exec(function(err, header) {
      if (err) return console.log(err);
      data.header = header;
      deferred.resolve(header);
    });
    return deferred.promise;
  },

module.exports = dnsm;
