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

app.get('/', routes.home);
app.get('/personalDetails/:id', routes.personalDetails);
app.get('/friendList/:id', routes.friendList);
app.get('/feedPost/:id', routes.feedPost)


app.post('/enterPersonalDetails', routes.enterPersonalDetails);
app.post('/addFriendDetails/:id', routes.addFriendDetails);


var httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || 8080);

console.log("Start");