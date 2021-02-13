var express = require('express');
var pug = require('pug');
var path = require('path');

var util = require('../util.js');
const app = require('../app.js');

var router = express.Router();

async function get(req, res) {
    var file = pug.renderFile('views/random-quiz.pug', {active: "random-quiz", doquiz: false, title:"Random Quiz"})
    res.send(file);
} 

router.get('/random-quiz', function(req, res, next) {
    if (req.uuid != '') {
        get(req, res);
    } else {
        res.redirect('/sign-in');
    }
});

async function post(req, res) {
    if (req.body['numOfQuestions'] === undefined) {

    } else {
        let data = await util.findUsers("1=1", app.database, "questions");
        let numOfQuestions = 0;
        let finalQuizData = {};
        while (numOfQuestions++ < req.body['numOfQuestions'] && numOfQuestions < data.length) {
            finalQuizData[`q${numOfQuestions}`] = data.splice(Math.floor(Math.random() * data.length), 1)[0];
        }
        var file = pug.renderFile('views/random-quiz.pug', {active: "random-quiz", doquiz: true, title:"Random Quiz", quizdata:finalQuizData})
        res.send(file);
    }
}

router.post('/random-quiz', function(req, res) {
    if (req.uuid != '') {
        post(req, res);
    } else {
        res.redirect('/sign-in');
    }
});

module.exports = router;
