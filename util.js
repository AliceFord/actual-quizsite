var express = require('express');
const { v4: uuidv4 } = require('uuid');

async function _validateUser(req, res, db=undefined) {
    if (req.cookies['uuid'] != undefined && req.cookies['email'] != undefined) {
        let uuid = req.cookies['uuid'];
        let email = req.cookies['email'];
        var data = await db.any(`SELECT * FROM users WHERE email = \'${email}\';`);
        if (data[0]['uuid'] === uuid) {
            console.log("Valid");
            let newUUID = uuidv4();
            await db.none(`UPDATE users\nSET uuid = \'${newUUID}\'\nWHERE\n\temail=\'${email}\';`)
            res.cookie('uuid', newUUID);
            return [data[0]['username'], newUUID];
        } else {
            console.log("Invalid");
            res.cookie('email', '', {maxAge: 0});
            res.cookie('uuid', '', {maxAge: 0});
            return ["invalid", ""];
        }
    } else {
        console.log("Invalid");
        if (req.cookies['uuid'] != undefined || req.cookies['email'] != undefined) {
            res.cookie('email', '', {maxAge: 0});
            res.cookie('uuid', '', {maxAge: 0});
        }
        return ["invalid", ""];
    }
}

async function _findUsers(condition, db) {
    var data = await db.any(`SELECT * FROM users WHERE ${condition};`);
    return data;
}

module.exports = {
    validateUser: _validateUser,
    findUsers: _findUsers
}