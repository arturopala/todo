var express = require('express');
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser())

var tasks = [];

app.get('/tasks', function(req, res){
  res.send(tasks);
});

app.post('/tasks', function(req, res){
  if(req.body){
  	tasks = req.body;
  }
  res.send(req.body);
});

app.use(express.static(process.cwd() + '/web'));

app.listen(8888);