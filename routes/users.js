var express = require('express');
var pug = require('pug');

var app = require('../app.js');
var util = require('../util.js');

var router = express.Router();

async function get(req, res) {
    if (req.uuid != '') {
        var data = await util.findUsers(`uuid = '${req.uuid}'`, app.database);
        if (data !== []) {
            console.log(data);
            var file = pug.renderFile('views/users.pug', {active:"none", bodyClass:'text-center', name:req.name});
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

router.get('/user/:username', function(req, res, next) {
    get(req, res);
});

router.post('/user/:username', function(req, res, next) {
    res.cookie('email', '', {maxAge: 0});
    res.cookie('uuid', '', {maxAge: 0});
    res.redirect('/');
});

module.exports = router;