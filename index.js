var express = require('express'),
	http = require('http'),
	https = require('https'),
	routes = require('./routes'),
	path = require('path'),
	bodyParser = require('body-parser');

var app = module.exports = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.basedir = app.get('views');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/enterPersonalDetails', routes.enterPersonalDetails)
app.get('/personalDetails/:id', routes.personalDetails);
app.get('/friendList/:id', routes.friendList)


var httpServer = http.createServer(app);
httpServer.listen(8080);

console.log("Start");