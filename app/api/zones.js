const db = require('../../config/database');
const dnsm = require('../services/dnsmanagement');
const api = {};

api.lista = function(req, res) {
  db.zonas.find({}).exec(function(err, doc) {
    if (err) return console.log(err);
    res.json(doc);
  });
};
api.busca = (req,res) => {
  db.zonas.findOne({_id: req.params.zonaId},(err, host) => {
    if (err) return console.log(err);
    if (host) return res.json(host);
    res.status(404).end();
  });
};
api.remove = (req,res) => {
  db.zonas.remove({ _id: req.params.zonaId }, {}, function (err, hostRemoved) {
        if (err) return console.log(err);
        console.log('removido com sucesso');
        if(hostRemoved) {
          dnsm.salvaDados();
          res.status(200).end()
        }else{
          res.status(500).end();
        }
    });
};
api.atualiza = (req,res) => {
  db.zonas.update({ _id: req.params.zonaId }, req.body, function(err, hostUpdate) {
    if (err) return console.log(err);
    if(hostUpdate) {
      dnsm.salvaDados();
      res.status(200).end();
      console.log('Atualizado com sucesso: ' + req.body._id);
    }else{
      res.status(500).end();
    }
  });
};
api.adiciona = function(req, res) {
    db.zonas.insert(req.body, function(err, newHost) {
        if(err) return console.log(err);
        if(!newHost) return res.sendStatus(500).end();
        console.log('Adicionado com sucesso: ' + newHost._id);
        res.json(newHost._id);
    });

    dnsm.salvaDados();
};
api.teste = (req, res) => {
    dnsm.test();
		res.sendStatus(200).end();
};
module.exports = api;
/*
db.zonas.find({}).exec(function(err, doc) {
  if (err) return console.log(err);
  res.json(doc);
  console.log(doc);
});
*/
