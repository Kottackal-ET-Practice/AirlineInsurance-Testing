// Whole-script strict mode syntax
'use strict';

// Initialization of modules
var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var compression = require('compression');


var config      = require('./config');

var directoryToServe = '/public';

var app         = express();

var oneDay      = 86400000;

// For parsing the form values
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Gzip compressing
app.use(compression());

// Log every request to the console
app.use(morgan('dev'));

// For serving static assets
app.use(express.static(__dirname + directoryToServe,{ maxAge: oneDay }));

// For serving static assets
app.use(express.static(__dirname + '/bower_components'));


var api = require('./app/routes/router')(app, express);

app.use('/api', api);

//

app.get('*', function(req,res){
res.sendFile(__dirname + '/public/app/views/index.html');
});

// Establish connection to mongodb
// Establish connection to mongodb
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

// Start Server
var myserver = app.listen(config.port, config.host, function () {
    var host = myserver.address().address;
    var port = myserver.address().port;
    console.log('Server running at http://%s:%s', host, port);
});

module.exports = app;
