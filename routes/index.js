var express = require('express');
var pug = require('pug');
var path = require('path');

var router = express.Router();

var file = pug.renderFile('views/template.pug', {name:"test"})

router.get('/', function(req, res, next) {
  res.send(file);
});

module.exports = router;
