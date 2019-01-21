module.exports = function(app) {

 var api = app.api.user;

     app.route('/z1/user')
        .get(api.lista);
    //     .post(api.adiciona)
    //     ;
    //
     app.route('/z1/user/:userId')
        .delete(api.remove)
    //     .put(api.atualiza);
};
