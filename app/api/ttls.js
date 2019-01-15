const db = require('../../config/database');
const dnsm = require('../services/dnsmanagement');
const moment = require('moment');
const api = {};

api.lista = function(req, res) {
  db.ttl.find({}).exec(function(err, host) {
    if (err) return console.log(err);
    res.json(host);
  });
};
api.busca = (req,res) => {
  db.ttl.findOne({_id: req.params.ttlId},(err, host) => {
    if (err) return console.log(err);
    if (host) return res.json(host);
    res.status(404).end();
  });
};
api.atualiza = (req,res) => {
  req.body.serial = moment().format("YYMMDDHHmmss");
  db.ttl.update({ _id: req.params.ttlId }, req.body, function(err, hostUpdate) {
    if (err) return console.log(err);
    if(hostUpdate) {
      dnsm.salvaDados();
      res.status(200).end();
      console.log('Atualizado com sucesso: ' + req.body._id);
    }else{
      res.status(500).end();
    }
    //res.status(200).end();
  });
};
api.adiciona = function(req, res) {
    db.ttl.insert(req.body, function(err, newHost) {
        if(err) return console.log(err);
        console.log('Adicionado com sucesso: ' + newHost._id);
        res.json(newHost._id);
    		res.sendStatus(200).end();
    });

    dnsm.salvaDados();
};
api.teste = (req, res) => {
    dnsm.test();
		res.sendStatus(200).end();
};
module.exports = api;
/*
db.ttls.find({}).exec(function(err, doc) {
  if (err) return console.log(err);
  res.json(doc);
  console.log(doc);
});
*/
