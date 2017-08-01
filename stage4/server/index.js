var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var mongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/nodecourse";
mongoClient.connect(dbUrl, (err, db) => {
  if(err) return console.log(err);
  console.log('Connected to db');

  db.close();
});

app.use(logger('dev'));



app.post('/process', function(req, res){
  console.log(req.body);
  mongoClient.connect(dbUrl, (err, db) => {
    if(err) return console.log(err);
    console.log('Connected to db');
    db.collection('messages').save(req.body, (error, result) => {
      if(error) console.log(error);
      console.log("Saved to db");
      res.send(req.body);
    });
    db.close();
  });
});

app.post('/messages', function(req, res){
  mongoClient.connect(dbUrl, (err, db) => {
    if(err) return console.log(err);
    console.log('Connected to db');
    //find({name: 'Zain'})
    db.collection('messages').find().toArray(function(error, results){
      if(error) console.log('Error!');

      console.log(results);
      res.status(200).send(results); // 200 browser code = 0k
    });
    db.close();
  });
});

app.listen(3001, function(){ // port 3001
  console.log("Backend server 3001");
});
