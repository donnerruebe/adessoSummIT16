var express = require('express');
var cors = require('express-cors');
var low = require('lowdb')
var bodyParser = require('body-parser');
const PORT = 4567;
const DATA_LENGTH = 100;
const DB_NAME = 'data';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    allowedOrigins: [
        'localhost'
    ]
}))

const db = low();
db.set(DB_NAME,[]).value();

/**
* for application to get data
*/
app.get('/data', function (req, res) {
  var data = db.get(DB_NAME).value();
  if(data.length > DATA_LENGTH){
    data = data.slice(Math.max(data.length - DATA_LENGTH, 1));
  }
  res.send(data);
});

/**
* For sensor to store data
*/
app.post('/data',function(req, res) {
  var data = {
    'time':Date.now(),
    'infos':req.body
  }

  console.log(data);
  db.get(DB_NAME).push(data).value();
  res.send();
});

app.listen(PORT, function () {
  console.log('This app is listening on port '+PORT);
});