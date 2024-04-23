// A node.js library for a webserver. https://www.npmjs.com/package/express
// We need Express to deliver websites. In our examples, we use the localhost.
// Here, we deliver the web3 library to the browser
// We copied the web3.min.js from the dist folder into our project.


var express = require("express");
var path    = require("path");
var app     = express();
//const fs = require('fs');

app.listen(3001, () => console.log("Listening to Port 3001"));
// console.log("Listening to Port 3001");
// port 3000 reserved to Grafana

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './','./app/index.html'));
    app.use(express.static('app'))
    app.use(express.static('imgs'))
    app.use(express.static(path.join(__dirname, './', 'public')));
    app.use(express.static(path.join(__dirname, './', 'build/contracts')));
});