
/**
 * Module dependencies.
 */

var express = require('express'),
    routes  = require('./routes');


var app = module.exports = express.createServer();
var PORT = process.env.PORT || 3000;

// Configuration

app.configure(function(){

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);   
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));


});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/instrument/:name', routes.index);
app.get('/instrument/:name/:query', routes.index);
app.get('/tuning/:strings', routes.index);
app.get('/tuning/:strings/:query', routes.index);

app.listen(PORT, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
