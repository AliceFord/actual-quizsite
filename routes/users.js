var express = require('express');
var pug = require('pug');

var app = require('../app.js');
var util = require('../util.js');
const { v4: uuidv4 } = require('uuid');

var router = express.Router();

async function get(req, res) {
    if (req.uuid != '') {
        var data = await util.findUsers(`uuid = '${req.uuid}'`, app.database);
        if (data !== []) {
            if (data[0]['username'] == req.params.username) {
                console.log(data);
                var file = pug.renderFile('views/users.pug', {active:"none", bodyClass:'text-center', name:req.name, is_admin: data[0]['is_admin'], title:"Users"});
                res.send(file);
            } else {
                console.log("You're not meant to be here!")
                res.redirect('/')
            }
        } else {
            console.log("You're not meant to be here!")
            res.redirect('/')
        }
    } else {
        console.log("You're not meant to be here!")
        res.redirect('/')
    }
}

router.get('/user/:username', function(req, res, next) {
    get(req, res);
});

async function addData(req, res, next, json) {
    await app.database.none(`INSERT INTO quizes(quizname, quizid, number_of_questions, quizdata, locked_users)\nVALUES (\'${req.body['quizName']}\', \'${uuidv4()}\', ${req.body['numberOfQuestions']}, \'${json}\', \'[]\');`) 
    res.redirect('/');
}

async function addQuestion(req, i) {
    let u = uuidv4();
    await app.database.none(`INSERT INTO questions(questionid, prompt, type, options, answer)\n
    VALUES (\'${u}\', \'${req.body[`question${i}`]}\', \'choice\', \'${JSON.stringify([req.body[`option1${i}`], req.body[`option2${i}`], req.body[`option3${i}`], req.body[`option4${i}`]])}\', \'${req.body[`answer${i}`]}\');`) 
    return u;
}

async function post(req, res, next) {
    if (req.body['quizName'] === undefined) {
        res.cookie('email', '', {maxAge: 0});
        res.cookie('uuid', '', {maxAge: 0});
        res.redirect('/');
    } else {
        data = {};
        for (let i = 0; i < req.body['numberOfQuestions']; i++) {
            let uuid = await addQuestion(req, i+1);
            data[`q${i+1}`] = uuid;
        }
        addData(req, res, next, JSON.stringify(data))
    }
}

router.post('/user/:username', function(req, res, next) {
    post(req, res, next);
});

module.exports = router;