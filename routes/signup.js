var express = require('express');
var pug = require('pug');
var path = require('path');
var crypto = require('crypto');

var app = require('../app.js')

var router = express.Router();

var file = pug.renderFile('views/sign-up.pug', {active:"none", bodyClass:"text-center"})

async function findUser(email, username) {
    var data = await app.database.any(`SELECT * FROM users WHERE email = \'${email}\' OR username = \'${username}\';`);
    return data;
}

async function addUser(data) {
  app.database.none(`INSERT INTO users(email, username, fname, lname, encpassword, is_admin, total_score, quizes_played, average_score)\nVALUES (\'${data['email']}\', \'${data['username']}\', \'${data['fname']}\', \'${data['lname']}\', \'${crypto.createHash('sha256').update(data['password']).digest('hex')}\', false, 0, 0, 0);`) 
}

router.get('/sign-up', function(req, res, next) {
  res.send(file);
});

async function doStuff(req, res) {
  var data = await findUser(req.body['email'], req.body['username'])
  try {
    const _ = data[0]['email'];
    res.redirect(req.header('Referer') || '/');
  } catch (TypeError) {
    addUser(req.body);
    res.redirect('/sign-in');
  }
}

router.post('/sign-up', function(req, res) {
  doStuff(req, res);
});

module.exports = router;
