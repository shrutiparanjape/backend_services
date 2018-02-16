var db = require('./database.js')
	moment = require('moment') //required modules


//returns the home page.
exports.home = function(req, res){
	res.render('main-page') //renders it on the browser
}

//getting the details from DB on the ID given through API request.
exports.personalDetails = function(req, res){
	var id = req.param('id',null);
	db.getPersonalDetails(id, function(result){//calls the database function, passing ID as parameter
		res.send(result) //returns the result from DB file, in JSON format
	})
}

//adding all details for a new entry. It returns an ID, which will be used as the
//point of contact for further details for this user
exports.enterPersonalDetails = function(req, res){
	var first_name = req.param('first_name',null);// details passed through API request
	var last_name = req.param('last_name',null);
	var gender = req.param('gender',null);
	var birth_date = req.param('birth_date',null);
	var place = req.param('place',null);
	var jsonResponse = {}; //varaiable to save the result
	var id;

	//inserting value in JSON data format
	var data = {
		first_name : first_name,
		last_name : last_name,
		gender : gender,
		birth_date : birth_date,
		place : place
	}

	db.enterPersonalDetails(data, function(result){
		id = result.insertId; //the returning result ID
		jsonResponse.code = 200
		jsonResponse.status = 'Success';
		jsonResponse.data = {
			id: id.toString()
			}
		res.send(jsonResponse); //returns the ID if succesfull.
	})
}

// getting friend list of the ID mentioned from DB
exports.friendList = function(req, res){
	var id = req.param('id',null);
	var jsonResponse = {};

	db.friendList(id,function(result){
		jsonResponse.code = 200
		jsonResponse.status = 'Success'
		jsonResponse.data = result
		res.send(jsonResponse)
	})
}


//adding a new friend and his/her details to the ID mentioned
exports.addFriendDetails = function(req, res){
	var id = req.param('id', null);
	var first_name = req.param('first_name',null);
	var last_name = req.param('last_name',null);
	var data = {
		first_name: first_name,
		last_name: last_name,
		fb_id: id
	}

	console.log(data);
	var jsonResponse = {}

	db.addFriendDetails(data, function(result){
		jsonResponse.code = 200
		jsonResponse.status = 'Success';
		res.send(jsonResponse);
	})
}


//feed post details of the mentioned ID
exports.feedPost = function(req, res){
	var id = req.param('id',null);
	var jsonResponse = {};

	db.getFeedPost(id, function(result){
		jsonResponse.code = 200
		jsonResponse.status = 'Success'
		jsonResponse.data = result
		res.send(jsonResponse)
	})
}