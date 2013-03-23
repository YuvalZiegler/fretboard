
/**
 * Module dependencies.
 */

var express = require('express'),
    routes  = require('./routes');


var app = module.exports = express.createServer();
var PORT = process.env.PORT || 3501;

app.use(express.logger('dev'));
// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.favicon());
app.use(express.static(__dirname + '/public'));

if ('development' == app.get('env')) {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
} else if ('production' == app.get('env')) {
  app.use(express.errorHandler());
}


// Routes
app.get('/', routes.index);
app.get('/instrument/:name', routes.index);
app.get('/instrument/:name/:query', routes.index);
app.get('/tuning/:strings', routes.index);
app.get('/tuning/:strings/:query', routes.index);

app.listen(PORT, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
