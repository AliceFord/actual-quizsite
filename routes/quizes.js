var express = require('express');
var pug = require('pug');

var app = require('../app.js');
var util = require('../util.js');

var router = express.Router();

async function processData(data) {
    let parsedJSON = JSON.parse(data[0]['quizdata']);
    let finalQuizData = {};
    for (const i of Object.keys(parsedJSON)) {
        let question = await util.findUsers(`questionid = \'${parsedJSON[i]}\'`, app.database, "questions")
        finalQuizData[i] = question[0];
    };
    finalQuizData['uuid'] = parsedJSON['uuid'];
    return finalQuizData;
}

async function get(req, res) {
    if (req.uuid != '') {
        var user = await util.findUsers(`uuid = '${req.uuid}'`, app.database);
        var data = await util.findUsers(`quizid = '${req.params.quizid}'`, app.database, "quizes");
        if (user !== []) {
            finalQuizData = await processData(data);
            var file = pug.renderFile('views/quizes.pug', {active:"none", bodyClass:'text-center', name:req.name, quizdata:finalQuizData, finishedQuiz:false, title:"Quizes"});
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

function validate(input, data) {
    let validatedData = {};
    for (const i of Object.keys(input)) {
        if (input[i] === data[i]['answer']) {
            validatedData[i] = [input[i], false];
        } else {
            validatedData[i] = [input[i], data[i]['answer']];
        }
    }
    return validatedData;
}

async function lockUserAndAddScore(user, data, validatedData) {
    let correctNum = 0;
    for (const i of Object.keys(validatedData)) {
        if (validatedData[i][1] === false) correctNum++;
    }
    let lockedUsers = JSON.parse(data[0]['locked_users']);
    if (!lockedUsers.includes(user[0]['username'])) {
        console.log(user);
        lockedUsers.push(user[0]['username']);
        let totalScore = user[0]['total_score']+correctNum;
        let quizes_played = user[0]['quizes_played']+1;
        let average_score = totalScore / quizes_played;
    
        await app.database.none(`UPDATE users\nSET total_score = \'${totalScore}\'\nWHERE\n\temail=\'${user[0]['email']}\';`)
        await app.database.none(`UPDATE users\nSET quizes_played = \'${quizes_played}\'\nWHERE\n\temail=\'${user[0]['email']}\';`)
        await app.database.none(`UPDATE users\nSET average_score = \'${average_score}\'\nWHERE\n\temail=\'${user[0]['email']}\';`)
        
        await app.database.none(`UPDATE quizes\nSET locked_users = \'${JSON.stringify(lockedUsers)}\'\nWHERE\n\tquizid=\'${data[0]['quizid']}\';`)    
    }
}

async function updateQuestion(validatedData, finalQuizData) {
    for (const i of Object.keys(validatedData)) {
        if (validatedData[i][1] !== false) {
            await app.database.none(`UPDATE questions\nSET correct_answers = \'${finalQuizData[i]['correct_answers']+1}\'\nWHERE\n\tquestionid=\'${finalQuizData[i]['questionid']}\';`);
        }
        await app.database.none(`UPDATE questions\nSET total_answers = \'${finalQuizData[i]['total_answers']+1}\'\nWHERE\n\tquestionid=\'${finalQuizData[i]['questionid']}\';`);
    }
}

async function post(req, res) {
    if (req.uuid != '') {
        var user = await util.findUsers(`uuid = '${req.uuid}'`, app.database);
        let data = await util.findUsers(`quizid = '${req.params.quizid}'`, app.database, "quizes");
        if (user !== []) {
            let finalQuizData = await processData(data);
            let validatedData = validate(req.body, finalQuizData);
            await lockUserAndAddScore(user, data, validatedData);
            await updateQuestion(validatedData, finalQuizData);
            var file = pug.renderFile('views/quizes.pug', {active:"none", bodyClass:'text-center', name:req.name, quizdata:finalQuizData, finishedQuiz:true, validatedData:validatedData});
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

router.post('/quiz/:quizid', function(req, res, next) {
    post(req, res);
});

module.exports = router;