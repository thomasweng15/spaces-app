var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get(/^\/.*/, function (req, res) {
    res.render('index', { user : req.user });
});

router.post('/auth/signin', passport.authenticate('local'), function(req, res) {
    res.status(200).send();
});

router.get('/auth/signout', function(req, res) {
    req.logout();
    res.status(200).send();
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;