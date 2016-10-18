'use strict';


var config = {};
config.port= process.env.PORT || 3000 ;   //set the server port
config.host= "127.0.0.1";  //set the server host
config.secretKey='Hai';   //Secret Key
//Databases for development and test
config.mongoURI = {
  development: 'mongodb://localhost/airlineInsurance',
  test: 'mongodb://localhost/nodetesting'
};
module.exports = config;
