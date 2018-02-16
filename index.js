var express = require('express'),
	http = require('http'),
	https = require('https'),
	routes = require('./routes'),
	path = require('path'),
	bodyParser = require('body-parser'); //required modules for the project

var app = module.exports = express();

app.set('views', path.join(__dirname, 'views')); //default view path
app.set('view engine', 'jade'); //default view engine
app.locals.basedir = app.get('views');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) //


//functions to be called from routes.js file
app.get('/', routes.home); //home page
app.get('/personalDetails/:id', routes.personalDetails); //getting personal details from DB
app.get('/friendList/:id', routes.friendList); // getting friend list from DB
app.get('/feedPost/:id', routes.feedPost) // getting feed post from DB


app.post('/enterPersonalDetails', routes.enterPersonalDetails); //personal details for new entry
app.post('/addFriendDetails/:id', routes.addFriendDetails); //adding new friends to existing user

app.use(function(req, res, next) {  
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || 8080); //runs on 8080 port locally else for the heroku it assigns port

console.log("Start");