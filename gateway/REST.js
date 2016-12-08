var express = require('express');
var bodyParser = require('body-parser');

var AudioPlayer = require("./api.audioplayer");
var LedCube =     require("./api.ledcube");
var MessageBoard = require("./api.messagedisplay");
var MailBox =     require("./api.mailbox");
var Sensor =      require("./api.sensor");

const PORT = 4567;

var app = express();

/* IOT SYNC

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(8239);
// server listening 0.0.0.0:8239

// END IOTSYNC*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var devices={};

devices.LEDCUBE = {url:"led-cube"};
devices.LEDMATR = {url:"led-matrix"};//192.168.123.89
devices.MAILBOX = {url:"mail-box"};
devices.SENSOR  = {url:"sensor"};

app.use(function (req, res, next) {
  console.log('Time: %d', Date.now(), "from",req.hostname);
  console.log(req.path);
  next();
});

MessageBoard.object.setIP(devices.LEDMATR.url);

app.use('/audioplayer', AudioPlayer);
app.use('/ledcube', LedCube.router);
app.use('/messageboard', MessageBoard.router);
app.use('/mailbox', MailBox.router);
app.use('/sensor', Sensor.router);

app.listen(PORT, function () {
  console.log('This app is listening on port '+PORT);
});
