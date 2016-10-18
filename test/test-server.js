'use strict';
//env variable is set to test
process.env.NODE_ENV = 'test';
//Importing the packages
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
//Require the server and db
var server = require('../server.js');
var User        = require('../app/models/login');
var models         = require('../app/models/weather');
//Define should
var should = chai.should();
//Define Chai to use chaiHTTP
chai.use(chaiHttp);
//Starting test block1-Weather API
describe('Weather API', function() {
                              this.timeout(3000);
                              //Before each test,insert the data into the db
                              beforeEach(function(done){
                                    //Weather Db Insertion
                                    var weather = new models.Weather({
                                        city : {
                                                  id:10,
                                                  name:'Chennai',
                                                  country:'India',
                                        },
                                        list:{
                                                 id:500,
                                                 main:'Clouds',
                                                 description:'overcast clouds',
                                                 dt_txt:'2016-11-30 21:00:00'
                                        }
                                  });
                                  weather.save(function(err) {

                                  });
                                  //Account Db Insertion
                                  var account = new models.Account({
                                      source:'Trivandrum',
                                      destination:'Mumbai',
                                      amount:500
                                  });
                                  account.save(function(err) {

                                  });
                                  done();

                              });
                              //After each test,empty the db.
                              afterEach(function(done){
                                         models.Weather.collection.drop();
                                         models.Account.collection.drop();
                                         done();
                             });
      //Test the /quote POST route
     it('should retrieve the amount on /quote POST', function(done) {
                     chai.request(server)
                            .post('/api/quote')
                            //*********//
                            //Modify the 'date' and 'time' parameters with respect to current date and time.
                            //********//
                            .send({'source': 'Trivandrum','destination': 'Mumbai','persons':3,'date':'2016-10-18','time':'21:00:00'})
                            .end(function(err, res){
                                        res.should.have.status(200);
                                        res.should.be.json;
                                        res.body.should.be.a('object');
                                        res.body.should.have.property('success');
                                        res.body.should.have.property('message');
                                        res.body.should.have.property('total');
                                        res.body.success.should.equal(true);
                                        res.body.message.should.equal('Total Quote');
                                        //********//
                                        //The value of the response property 'total' varies based on weather condition.
                                        //Testing fails due to the variation between actual and expected values.
                                        //********//
                                        res.body.total.should.equal(999.85);
                                        done();
                            });
     });


});

//Starting test block2-Registration & Login
describe('Registration & Login', function() {
                      //Before each test,insert the data into the db
                     beforeEach(function(done){
                                   var newUser = new User({
                                               name: 'sample',
                                               username:'sample',
                                               password:'password',
                                               email:'sample@gmail.com',
                                               dob: '11/20/2014',
                                               country:'India',
                                               gender:'male'
                                 });
                                newUser.save(function(err) {
                                done();
                                });
                    });
                    //After each test,empty the db.
                    afterEach(function(done){
                                User.collection.drop();
                                done();
                    });

    //Test the /signup POST route
   it('should add a SINGLE user on /signup POST', function(done) {
            chai.request(server)
                    .post('/api/signup')
                    .send({'name':'test','username':'test','password':'pwd','email':'test@gmail.com','dob':'11/20/2014','country':'India','gender':'male'})
                    .end(function(err, res){
                                     res.should.have.status(200);
                                     res.should.be.json;
                                     res.body.should.be.a('object');
                                     res.body.should.have.property('success');
                                     res.body.should.have.property('message');
                                     res.body.should.have.property('token');
                                     res.body.success.should.equal(true);
                                     res.body.message.should.equal('User has been created');
                                     done();
                   });
  });
  //Test the /login POST route
  it('should add a SINGLE user on /login POST', function(done) {
           chai.request(server)
                   .post('/api/login')
                   .send({'username': 'sample','password':'password'})
                   .end(function(err, res){
                                    res.should.have.status(200);
                                    res.should.be.json;
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('success');
                                    res.body.should.have.property('message');
                                    res.body.should.have.property('token');
                                    res.body.success.should.equal(true);
                                    res.body.message.should.equal('Successfully login');
                                    done();
                  });
 });

});
