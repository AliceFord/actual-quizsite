var express = require('express');
var pug = require('pug');

var app = require('../app.js');
var util = require('../util.js');
const { v4: uuidv4 } = require('uuid');

var router = express.Router();

async function get(req, res) {
    if (req.uuid != '') {
        var user = await util.findUsers(`uuid = '${req.uuid}'`, app.database);
        var data = await util.findUsers(`quizid = '${req.params.quizid}'`, app.database, "quizes");
        if (user !== []) {
            console.log
            var file = pug.renderFile('views/quizes.pug', {active:"none", bodyClass:'text-center', name:req.name, quizdata:JSON.parse(data[0]['quizdata'])});
            res.send(file);
        } else {
            console.log("You're not meant to be here!")
            res.redirect('/')
        }
    } else {
        console.log("You're not meant to be here!")
        res.redirect('/')
    }
}

router.get('/quiz/:quizid', function(req, res, next) {
    get(req, res);
});

module.exports = router;