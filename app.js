/**
 * Module dependencies.
 */
var http = require('http');
var path = require('path')
var express  = require('express');
var hogan = require('hogan-express');
var connect = require('connect');

/*var port = (process.env.VCAP_APP_PORT || 3002);
var host = (process.env.VCAP_APP_HOST || 'host_qrbike');*/

var port     = process.env.PORT || 3002;

// all environments
var app = express();

// check if application is being run in cloud environment
if (process.env.VCAP_SERVICES) {
  var services = JSON.parse(process.env.VCAP_SERVICES);
}

app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('env', 'development');
app.engine('html', hogan);
// Configuration
app.use(connect.logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(connect.json());
app.use(connect.urlencoded());
// Routes
require('./routes/routes.js')(app);
app.listen(port);
console.log('The App runs on port ' + port);