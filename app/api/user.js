const db = require('../../config/database');
const api = {};

api.lista = function(req, res) {
  db.adm.find({}).exec(function(err, user) {
    if (err) return console.log(err);
    res.json(user);
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

module.exports = api;
