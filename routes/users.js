const express = require('express');
const users = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/pgp');
const session = require('express-session');
const pgSession = require('connect-pg-simple');

users.post('/', db.createSubscriber, function(req, res){
  res.redirect('/');
});

users.post('/admin', db.createUser, function(req, res){
  res.redirect('/');
});

users.post('/login', db.loginUser, function(req, res){
  req.session.user = res.rows;
  req.session.save(function(){
    res.redirect('/')
  });
});

module.exports = users;
