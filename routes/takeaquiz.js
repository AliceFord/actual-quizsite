var express = require('express');
var pug = require('pug');

var app = require('../app.js');
var util = require('../util.js');

var router = express.Router();

async function get(req, res) {
    var data = await util.findUsers("1=1", app.database, "quizes");

    var file = pug.renderFile('views/takeaquiz.pug', {active:"takeaquiz", data:data, title:"Take A Quiz"})

    res.send(file);
}

router.get('/takeaquiz', function(req, res, next) {
    get(req, res);
});

module.exports = router;