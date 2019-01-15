var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();
app.use(cors())
app.options('*', cors())

app.set('secret', 'gyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbSIsImlhdCI6MTU0Njk1ODY1OCwiZXhwIjoxNTQ3MDQzMjU4fQ.DHyJV4YDpY25t-FX7QVnC9lH9c1-V1d-NEYmwp8RchU');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//   next();
// });

consign({cwd: 'app'})
	.include('api')
	.then('routes/auth.js')
	.then('routes')
	.into(app);

module.exports = app;
