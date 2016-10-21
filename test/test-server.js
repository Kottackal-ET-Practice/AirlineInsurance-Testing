
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
var Insurance = require('../app/models/insured');

//Define should
var should = chai.should();
//Define Chai to use chaiHTTP
chai.use(chaiHttp);
//Starting test block1-Weather API


describe('Weather API', function() {
                              this.timeout(4000);
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
                            //*********/
                            //Modify the 'date' and 'time' parameters with respect to current date and time.
                            //********//
                           .send({'source': 'Trivandrum','destination': 'Mumbai','persons':3,'date':'2016-10-21','time':'21:00:00'})
                            .end(function(err, res){
                                        res.should.have.status(200);
                                        res.should.be.json;
                                        res.body.should.be.a('object');
                                        res.body.should.have.property('success');
                                        res.body.should.have.property('message');
                                        res.body.should.have.property('total');
                                        res.body.success.should.equal(true);
                                        res.body.message.should.equal('Total Quote');
                                        //********/
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
                                     //token = res.body.token;
                                     //console.log(token);
                                     done();
                   });
  });
  //Test the /login POST route
  it('should login on /login POST', function(done) {
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


//Starting test block2-Insurance
describe('Insurance', function() {
           //Define variable for storing token
           var token;
           // runs after all tests in this block
           after(function(done){
                User.collection.drop();
                done();
           });
           //Before each test,insert the data into the db
           beforeEach(function(done){

                 var insurance = new Insurance({

                    source:'Trivandrum',
                    destination:'Mumbai',
                    persons: 3,
                    travelDate:'2016-10-20',
                    travelTime:'21:00:00',
                    name:'sample',
                    insured:true
                });
                insurance.save(function(err) {

                });
                done();
          });
          //After each test,empty the db.
          afterEach(function(done){
                Insurance.collection.drop();
                done();
          });

         //Test the /signup POST route to retrieve token
         it('should retrieve token on /signup POST request', function(done) {

                chai.request(server)
                            .post('/api/signup')
                            .send({'name':'test','username':'test','password':'pwd','email':'test@gmail.com','dob':'11/20/2014','country':'India','gender':'male'})
                            .end(function(err, res){
                                   res.should.have.status(200);
                                   res.should.be.json;
                                   res.body.should.be.a('object');
                                   res.body.should.have.property('token');
                                   token = res.body.token;//Assign token to a variable
                                   done();
                 });

         });
        //Test the /insured POST route
        it('Create insurance on /insured POST', function(done) {

                  chai.request(server)
                             .post('/api/insured')
                             .set('token',token)
                             .send({'source': 'Trivandrum','destination': 'Mumbai','persons':3,'date':'2016-10-20','time':'21:00:00','name':'sample','insured':'true'})
                             .end(function(err, res){

                                          res.should.have.status(200);
                                          res.should.be.json;
                                          res.body.should.be.a('object');
                                          res.body.should.have.property('success');
                                          res.body.should.have.property('message');
                                          res.body.success.should.equal(true);
                                          res.body.message.should.equal('insurance has been created');
                                          done();
                             });
       });
       //Test the /insured GET route
       it('should list insurance on /insured GET', function(done) {

               chai.request(server)
                           .get('/api/insured')
                           .set('token',token)
                           .end(function(err, res){
                           res.should.have.status(200);
                           res.should.be.json;
                           res.body.should.be.a('array');
                           res.body[0].should.have.property('source');
                           res.body[0].should.have.property('destination');
                           res.body[0].should.have.property('persons');
                           res.body[0].should.have.property('travelDate');
                           res.body[0].should.have.property('travelTime');
                           res.body[0].should.have.property('name');
                           res.body[0].should.have.property('insured');
                           res.body[0].source.should.equal('Trivandrum');
                           res.body[0].destination.should.equal('Mumbai');
                           res.body[0].persons.should.equal('3');
                           res.body[0].travelDate.should.equal('2016-10-20');
                           res.body[0].travelTime.should.equal('21:00:00');
                           res.body[0].name.should.equal('sample');
                           res.body[0].insured.should.equal('true');
                           done();
                           });
      });



});
