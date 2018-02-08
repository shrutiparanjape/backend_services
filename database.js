var mysql = require('mysql');

var dbOpen = 'USE HotelSoft';

var db = mysql.createConnection({
  host     : '52.11.67.218',
  user     : 'unisonadmin',
  password : 'Unison@123'
});


module.exports.enterPersonalDetails = enterPersonalDetails;
module.exports.getPersonalDetails = getPersonalDetails;
module.exports.friendList = friendList;



function enterPersonalDetails(data, cb){
  var query = "INSERT into PersonalDetails SET ?";
  insertCommand(query,data,cb);
}

function getPersonalDetails (id, cb){
  var query = 'Select * from PersonalDetails where fb_id = ' + id;
  executeCommand(query,cb);
}

function friendList(id, cb){
  var query = 'Select FriendList.first_name, FriendList.last_name from FriendList Join PersonalDetails on FriendList.fb_id = PersonalDetails.fb_id where PersonalDetails.fb_id = ' + id;
  executeCommand(query,cb);
}


function executeCommand(query, cb){
  console.log(query);
  db.query(dbOpen, function(error, results) {
    if(error) {
        console.log('Error: ' + error.message);
        return;
    }
    db.query(query, function(error, result) {
      if(error) {
        console.log('Error: ' + error.message);
        return;
      }
      cb(result);
    }); 
  }); 
}

function insertCommand(query, data, cb){
  console.log(query);
  db.query(dbOpen, function(error, results) {
    if(error) {
        console.log('Error: ' + error.message);
        return;
    }
    db.query(query, data, function(error, result) {
      if(error) {
        console.log('Error: ' + error.message);
        return;
      }
      cb(result);
    }); 
  }); 
}