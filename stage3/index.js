var express = require('express');
var logger = require('morgan');

var app = express();
app.use(logger('dev')); // passing constructor directly into function
app.set('view engine', 'pug');

app.get('/', function(request, response){
  response.render('index', {
    pageTitle: 'Node.js Homepage',
    mainHeading: 'YouTrain Node Course'
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
const port = 3000;
app.listen(port, function(){ // port 3000
  console.log(`Server listening on port ${port}`);
});
