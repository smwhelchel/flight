var express = require('express');
var app = express();
var post = require('./post.js');
var bodyParser = require('body-parser');

app.use('/search', post);

app.use(express.static('public'));

var port = process.env.PORT || 1337;
app.listen(port);
console.log('server listening');