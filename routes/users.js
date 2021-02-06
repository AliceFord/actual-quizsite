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
                var file = pug.renderFile('views/users.pug', {active:"none", bodyClass:'text-center', name:req.name, is_admin: data[0]['is_admin']});
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
    await app.database.none(`INSERT INTO quizes(quizname, quizid, number_of_questions, quizdata)\nVALUES (\'${req.body['quizName']}\', \'${uuidv4()}\', ${req.body['numberOfQuestions']}, \'${json}\');`) 
    res.redirect('/');
}

router.post('/user/:username', function(req, res, next) {
    if (req.body['quizName'] === undefined) {
        res.cookie('email', '', {maxAge: 0});
        res.cookie('uuid', '', {maxAge: 0});
        res.redirect('/');
    } else {
        data = {};
        for (let i = 0; i < req.body['numberOfQuestions']; i++) {
            data[`q${i+1}`] = req.body[`question${i+1}`];
            data[`a${i+1}`] = req.body[`answer${i+1}`];
        }
        addData(req, res, next, JSON.stringify(data))
    }
});

module.exports = router;