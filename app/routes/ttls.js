module.exports = function(app) {

 var api = app.api.ttls;

    app.route('/z1/ttls')
        .post(api.adiciona)
        .get(api.lista);

    app.route('/z1/ttls/:ttlId')
        .get(api.busca)
        .put(api.atualiza);

    app.route('/z1/ttls/teste')
        .get(api.teste);
};
