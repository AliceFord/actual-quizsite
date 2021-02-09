var express = require('express');
var pug = require('pug');
var path = require('path');

var util = require('../util.js')

var router = express.Router();

router.get('/', function(req, res, next) {
  var file = pug.renderFile('views/index.pug', {active:"home", username:req.name, title:"Home"})
  res.send(file);
});

module.exports = router;
