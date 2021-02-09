var express = require('express');
var pug = require('pug');
var path = require('path');

var util = require('../util.js');
const app = require('../app.js');

var router = express.Router();

async function get(req, res) {
    let data = ["leaderboards", "sign-in", "sign-up", "takeaquiz", "", ""];
    var quizes = await util.findUsers('1=1', app.database, "quizes")
    quizes.forEach(e => {
        data.push(`quiz/${e['quizid']}`)
    });
    res.set({"content-type": "application/xml"})
    var file = pug.renderFile('views/sitemap.pug', {doctype: 'xml', data: data})
    res.send(file);
} 

router.get('/sitemap.xml', function(req, res, next) {
    get(req, res);
});

module.exports = router;
