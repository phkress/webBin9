const db = require('../../config/database');
const api = {};

api.lista = function(req, res) {
  db.adm.find({}).exec(function(err, users) {
    if (err) return console.log(err);
    res.json(users);
  });
};
api.remove = (req,res) => {
  db.adm.remove({ _id: req.params.userId }, {}, function (err, userRemoved) {
        if (err) return console.log(err);
        console.log('removido com sucesso');
        if(userRemoved) {
          res.status(200).end()
        }else{
          res.status(500).end();
        }
    });
};
api.atualiza = (req,res) => {
  db.adm.update({ _id: req.params.userId }, req.body, function(err, userUpdate) {
    if (err) return console.log(err);
    if(userUpdate) {
      res.status(200).end();
      console.log('Atualizado com sucesso: ' + req.body._id);
    }else{
      res.status(500).end();
    }
  });
};
api.adiciona = function(req, res) {
    db.adm.insert(req.body, function(err, newUser) {
        if(err) return console.log(err);
        if(!newUser) return res.sendStatus(500).end();
        console.log('Adicionado com sucesso: ' + newUser._id);
        res.json(newHost._id);
    });
};
module.exports = api;
