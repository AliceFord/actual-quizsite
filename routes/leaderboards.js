var express = require('express');
var pug = require('pug');
var path = require('path');

var util = require('../util.js');
var app = require('../app.js')

var router = express.Router();

async function get(req, res) {  
  var data = await util['findUsers']("1=1", app.database);

  var file = pug.renderFile('views/leaderboards.pug', {active:"leaderboards", username:req.name, data:data})

  res.send(file);
}

router.get('/leaderboards', function(req, res, next) {
  get(req, res);
});

module.exports = router;
