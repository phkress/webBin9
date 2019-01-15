var http = require('http');
var app = require('./config/express');

http.createServer(app).listen(3001, function() {
    console.log('API escutando na porta: ' + this.address().port);
});
