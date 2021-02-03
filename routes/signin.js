var express = require('express');
var pug = require('pug');
var crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

var app = require('../app.js')

var router = express.Router();

var file = pug.renderFile('views/sign-in.pug', {active:"none", bodyClass:"text-center"})

async function findUser(email) {
    var data = await app.database.any(`SELECT * FROM users WHERE email = \'${email}\';`);
    return data;
}

async function addUserUUID(email, uuid) {
    await app.database.none(`UPDATE users\nSET uuid = \'${uuid}\'\nWHERE\n\temail=\'${email}\';`)
}

router.get('/sign-in', function(req, res, next) {
    if (req.name !== 'invalid') {
        res.redirect('/user/' + req.name);
    } else {
        res.send(file);
    }
});

function doStuff2(req, res, password) {
    if (crypto.createHash('sha256').update(req.body['password']).digest('hex') === password) {
        let currentUUID = uuidv4();
        addUserUUID(req.body['email'], currentUUID);
        console.log(req.cookies);
        res.cookie('email', req.body['email']).cookie('uuid', currentUUID).redirect('../');
    } else {
        console.log("NO");
        console.log(crypto.createHash('sha256').update(req.body['password']).digest('hex'));
        console.log(password);
        res.redirect('../');
    }
}

async function doStuff(req, res) {
    findUser(req.body['email']).then(password => doStuff2(req, res, password[0]['encpassword']));
}

router.post('/sign-in', function(req, res) {
    doStuff(req, res);
});

module.exports = router;
