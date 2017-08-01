var express = require('express');
var logger = require('morgan');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(logger('dev')); // passing constructor directly into function
app.set('view engine', 'pug');

app.get('/', function(request, response){
  response.render('index', {
    pageTitle: 'Node.js Homepage',
    mainHeading: 'YouTrain Node Course'
  });
});
app.get('/contact', function(request, response){
  response.render('contact', {
    pageTitle: 'Node.js Contact',
    mainHeading: 'Contact form'
  });
});
app.get('/users', function(request, response){
  var results = [
    {
      'name': 'Zain',
      'things' : [
        'thing1',
        'thing2',
        'thing3'
      ]
    },
    {
      'name' : 'Will',
      'things' : [
        'thing1',
        'thing2',
        'thing3'
      ]
    }
  ];
  response.render('users', {
    pageTitle : 'Users',
    mainHeading : 'List of users',
    results : results
  })
});
app.post('/send', function(req, res){
  request({
    uri: 'http://localhost:3001/process', // where to send the request
    method: 'POST',
    form: {
      name: req.body.user.name,
      email: req.body.user.email,
      msg: req.body.user.msg
    }
  }, function(error, response, body){
    console.log('Proccessed');
    console.log(body);
    res.render('sent', {
      pageTitle: 'Sent',
      mainHeading: 'Thanks we recieved your message'
    }); // stop the browser from hanging
  });
});

app.get('/messages', function(req, res){
  request({
    uri: 'http://localhost:3001/messages',
    method: 'POST'
  }, function(error, response, body){
      if(error) return;
      var results = JSON.parse(body);
      console.log(results);
      res.render('messages', {
        pageTitle: "Messages",
        mainHeading: 'Messages',
        results: results
      });
  });
});

app.listen('3000', function(){ // port 3000
  console.log('Server listening on port 3000');
});
