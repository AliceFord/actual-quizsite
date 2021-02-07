var express = require('express');
var pug = require('pug');

var app = require('../app.js');
var util = require('../util.js');

var router = express.Router();

async function get(req, res) {
    if (req.uuid != '') {
        var user = await util.findUsers(`uuid = '${req.uuid}'`, app.database);
        var data = await util.findUsers(`quizid = '${req.params.quizid}'`, app.database, "quizes");
        if (user !== []) {
            let parsedJSON = JSON.parse(data[0]['quizdata']);
            let finalQuizData = {};
            for (const i of Object.keys(parsedJSON)) {
                let question = await util.findUsers(`questionid = \'${parsedJSON[i]}\'`, app.database, "questions")
                finalQuizData[i] = question[0];
            };
            console.log(finalQuizData)
            var file = pug.renderFile('views/quizes.pug', {active:"none", bodyClass:'text-center', name:req.name, quizdata:finalQuizData});
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