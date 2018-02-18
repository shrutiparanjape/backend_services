process.env.NODE_ENV = 'test';

var mysql = require('mysql');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();

chai.use(chaiHttp);

describe('API', function() {

  it('should Enter Personal Details for a New User on /enterPersonalDetails POST', function(done){
    var details = {
      first_name: "Test",
      last_name: "Done",
      gender: "Male",
      birth_date: "1993-01-01",
      place: "Bangalore"
    }
    chai.request(server)
    .post('/enterPersonalDetails')
    .send(details)
    .end(function(err, res){
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.data.should.have.property('id');
      done();
    })
  });

  it('should Get Personal Details of Already Existing User on /personalDetails/:id GET', function(done){
    var id = 3
    chai.request(server)
    .get('/personalDetails/'+id)
    .end(function(err,res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('fb_id');
      res.body[0].should.have.property('first_name');
      res.body[0].should.have.property('last_name');
      res.body[0].should.have.property('gender');
      res.body[0].should.have.property('birth_date');
      res.body[0].should.have.property('place');
      done();
    })
  });

  it('should Add Friends to a User on /addFriendDetails/:id POST', function(done){
    var id = 3
    var details = {
      first_name: "Test",
      last_name: "Done"
    }
    chai.request(server)
    .post('/addFriendDetails/'+id)
    .send(details)
    .end(function(err, res){
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('code');
      done();
    })
  });

  it('should Get Friend List of an User on /friendList/:id GET', function(done){
    var id = 3
    chai.request(server)
    .get('/friendList/'+id)
    .end(function(err,res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.data.should.be.a('array');
      var data = res.body.data
      for(var i=0; i<data.length; i++){
        res.body.data[i].should.have.property('first_name');
        res.body.data[i].should.have.property('last_name');
      }
      done();
    })
  });

  it('should Get Post Feeds of an User on /feedPost/:id GET', function(done){
    var id = 4
    chai.request(server)
    .get('/feedPost/'+id)
    .end(function(err,res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.data.should.be.a('array');
      var data = res.body.data
      for(var i=0; i<data.length; i++){
        res.body.data[i].should.have.property('id');
        res.body.data[i].should.have.property('post');
        res.body.data[i].should.have.property('post_date');
        res.body.data[i].should.have.property('fb_id');
      }
      done();
    })
  });
});