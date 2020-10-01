var express = require('express');
var logger = require('morgan');
var port = 3000;
var app = express();
app.use(logger('dev')); // passing constructor directly into function

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});
app.get('/page2', function(request, response){
  response.sendFile(__dirname + '/page2.html');
});

app.listen(port, function(){ // port 3000
  console.log(`Server listening on port ${port}`);
});
