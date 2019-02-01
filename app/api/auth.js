const db = require('../../config/database');
const sha256 = require('js-sha256').sha256;
let jwt  = require('jsonwebtoken');

module.exports = function(app) {

     var api = {};
     usuario = {login:'adm', senha:'123'}

     api.test = function(req, res) {
        res.json({
           status: "My API is alive!"
       });
     };

     api.autentica = function(req, res) {
       req.body.senha = sha256(req.body.senha);
       db.adm.findOne({login: req.body.login, senha: req.body.senha},(err, usuario) => {
         if (err) return console.log(err);
         if (usuario) {
              let token = jwt.sign({login: usuario.login}, app.get('secret'), {
                  expiresIn: 84600
              });
              console.log('Autenticado: token adicionado na resposta');
              // res.set('x-access-token', token);
              res.status(200).send({auth: true, token: token})
              // console.log(res);
              res.end();
         }else{
           console.log('Login/senha inválidos');
           res.sendStatus(401);
         }
       });
     };

    api.verificaToken = function(req, res, next) {

         var token = req.headers['x-access-token'];

         if (token) {
             console.log('Token recebido, decodificando');
             jwt.verify(token, app.get('secret'), function(err, decoded) {
                 if (err) {
                     console.log('Token rejeitado');
                     return res.sendStatus(401);
                 } else {
                     console.log('Token aceito')
                     req.usuario = decoded;
                     next();
                  }
            });
        } else {
            console.log('Nenhum token enviado');
            return res.sendStatus(401);
          }
    }

    return api;
};
