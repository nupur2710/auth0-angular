var express = require('express');
var app = express();
var jwt = require('express-jwt');

var cors = require('cors');

app.use(cors());

//setup middleware

var authCheck = jwt({
    secret: new Buffer('mVXv_k7o4kIa73Cd3n5CW2riBpBIzQ9J1kJ6eXKNE1HOyTaHoSQh6YpjyxyqyAWG'),
    audience: '5BOPjc1TzhEDdyylzwvGL1Uek7q7Bdc9'
});

//endpoints

//public
app.get('/api/public', function(req, res) {
    res.json({ message: "Hello from a public endpoint. No authentication needed" });
});

//private
app.get('/api/private', authCheck, function(req, res) {
    res.json({ message: "Hello from a private endpoint.Authentication needed" });
});

app.listen(3001);
console.log("listening on localhost 3001");