var db = require('./database.js')
	moment = require('moment')

exports.home = function(req, res){
	res.render('main-page')
}

exports.personalDetails = function(req, res){
	var id = req.param('id',null);
	db.getPersonalDetails(id, function(result){
		res.send(result)
	})
}

exports.enterPersonalDetails = function(req, res){
	var first_name = req.param('first_name',null);
	var last_name = req.param('last_name',null);
	var gender = req.param('gender',null);
	var birth_date = req.param('birth_date',null);
	var place = req.param('place',null);
	var jsonResponse = {};
	var id;

	var data = {
		first_name : first_name,
		last_name : last_name,
		gender : gender,
		birth_date : birth_date,
		place : place
	}

	db.enterPersonalDetails(data, function(result){
		id = result.insertId;
		jsonResponse.code = 200
		jsonResponse.status = 'Success';
		jsonResponse.data = {
			id: id.toString()
			}
		res.send(jsonResponse);
	})
}

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