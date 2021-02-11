var express = require('express');
var pug = require('pug');

var app = require('../app.js');
var util = require('../util.js');

var router = express.Router();

async function get(req, res) {
    var data = await util.findUsers("1=1", app.database, "quizes");
    let questionPercentages = [];
    for (let i = 0; i < data.length; i++) {
        let currentData = JSON.parse(data[i]['quizdata']);
        let currentPercentage = 1;
        for (let [key, value] of Object.entries(currentData)) {
            let questionData = await util.findUsers(`questionid=\'${value}\'`, app.database, "questions");
            console.log(questionData);
            currentPercentage *= questionData[0]['correct_answers'];
            currentPercentage /= questionData[0]['total_answers'];
        }
        questionPercentages.push(currentPercentage);
    }
    
    var file = pug.renderFile('views/takeaquiz.pug', {active:"takeaquiz", data:data, title:"Take A Quiz", questionPercentages: questionPercentages})

    res.send(file);
}

router.get('/takeaquiz', function(req, res, next) {
    get(req, res);
});

module.exports = router;