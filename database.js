var mysql = require('mysql'); //required module 

var dbOpen = 'USE HotelSoft'; //DB name assigned

// var db = mysql.createConnection({
//   user     : 'root',
//   password : 'Asd11zxc',
// });

var db = mysql.createConnection({ //connecting to DB
  host     : '52.11.67.218',
  user     : 'unisonadmin',
  password : 'Unison@123'
});

// modules to be exported
module.exports.enterPersonalDetails = enterPersonalDetails;
module.exports.getPersonalDetails = getPersonalDetails;
module.exports.friendList = friendList;
module.exports.addFriendDetails = addFriendDetails;
module.exports.getFeedPost = getFeedPost;

//query to add personal details in PersonalDetails table. It returns a number, which will be used as ID
function enterPersonalDetails(data, cb){
  var query = "INSERT into PersonalDetails SET ?";
  insertCommand(query,data,cb);
}

//getting personal details from the PersonalDetails table for a particular given ID
function getPersonalDetails (id, cb){
  var query = 'Select * from PersonalDetails where fb_id = ' + id;
  executeCommand(query,cb);
}

//getting all the friends from FriendList table, for a particular given ID
function friendList(id, cb){
  var query = 'Select FriendList.first_name, FriendList.last_name from FriendList Join PersonalDetails on FriendList.fb_id = PersonalDetails.fb_id where PersonalDetails.fb_id = ' + id;
  executeCommand(query,cb);
}


//adding new friends in FriendList table, with an ID
function addFriendDetails(data, cb){
  var query = "INSERT into FriendList SET ?";
  insertCommand(query,data,cb);
}

//getting all feed post of an ID from FeedPost table
function getFeedPost(id, cb){
  var query = "Select * from FeedPost where fb_id = " + id;
  executeCommand(query,cb);
}


function executeCommand(query, cb){
  console.log(query);
  db.query(dbOpen, function(error, results) { // connection is made
    if(error) {
        console.log('Error: ' + error.message);
        return;
    }
    db.query(query, function(error, result) { //runs query on the DB
      if(error) {
        console.log('Error: ' + error.message);
        return;
      }
      cb(result); //result to be passed back
    }); 
  }); 
}

function insertCommand(query, data, cb){
  console.log(query);
  db.query(dbOpen, function(error, results) { //connection made
    if(error) {
        console.log('Error: ' + error.message);
        return;
    }
    console.log(data);
    db.query(query, data, function(error, result) { //runs insert query on the DB
      if(error) {
        console.log('Error: ' + error.message);
        return;
      }
      cb(result); //result to be passed back
    }); 
  });
}