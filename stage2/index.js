var express = require('express');
var logger = require('morgan');

var app = express();
app.use(logger('dev')); // passing constructor directly into function

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});
app.get('/page2', function(request, response){
  response.sendFile(__dirname + '/page2.html');
});

app.listen('3000', function(){ // port 3000
  console.log('Server listening on port 3000');
});
