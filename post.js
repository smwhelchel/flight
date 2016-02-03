var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var textParser = bodyParser.json();
var router = express.Router();
var moment = require('moment');

var baseUrl = 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/';

var appId= '?appId=98cdf1c2';

var apiKey = '&appKey=4533e9da1c1c87e90acd647c34643a54';

router.post('/', textParser, function (req, res) {
  console.log(req.body);
  var queryURL = baseUrl + req.body.airline + '/' + req.body.flight + '/' + req.body.what + '/' + 
  req.body.date + appId + apiKey + '&utc=false&airport=' 
  + req.body.airport;
  console.log(queryURL);
  request(queryURL, function (error, response, body) {
     console.log(body);
    if (error) {
      return console.log('error');
    }

    if (response.statusCode !== 200) {
      return console.log('status code wrong');
    }

    if (!error && response.statusCode == 200) {
      console.log('server works');
      res.send(body);
    } 
  });
});

module.exports = router;

// https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/undefined/
// undefined/undefined/undefined/undefined/undefined?appId=98cdf1c2&appKey=
// 4533e9da1c1c87e90acd647c34643a54=false&utc=false&airport=undefined


// curl -v  -X GET "https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/ua/
//003/dep/2016/2/3?appId=98cdf1c2&appKey=4533e9da1c1c87e90acd647c34643a54&utc=false&airport=sna"





