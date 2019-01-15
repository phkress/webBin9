module.exports = function(app) {

 var api = app.api.zones;

    app.route('/z1/zonas')
        .post(api.adiciona)
        .get(api.lista);

    app.route('/z1/zonas/:zonaId')
        .delete(api.remove)
        .get(api.busca)
        .put(api.atualiza);

    app.route('/z1/zonas/teste')
        .get(api.teste);
};
