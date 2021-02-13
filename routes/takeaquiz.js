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
        let j = 0;
        for (let [key, value] of Object.entries(currentData)) {
            let questionData = await util.findUsers(`questionid=\'${value}\'`, app.database, "questions");
            currentPercentage += questionData[0]['correct_answers'] / questionData[0]['total_answers'];
            j++;
        }
        console.log(currentPercentage / j);
        questionPercentages.push(currentPercentage / j);
    }
    
    var file = pug.renderFile('views/takeaquiz.pug', {active:"takeaquiz", data:data, title:"Take A Quiz", questionPercentages: questionPercentages})

    res.send(file);
}

router.get('/takeaquiz', function(req, res, next) {
    get(req, res);
});

module.exports = router;