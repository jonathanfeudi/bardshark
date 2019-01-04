const express = require('express');
const users = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/pgp');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

users.post('/', db.createSubscriber, function(req, res){
  res.redirect('/');
});

users.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});

users.get('/', (req, res) => {
  res.json({data: 'success'});
});

users.post('/create', db.createUser, (req,res) => {
  res.status(201).json({data: 'success'});
});

users.get('/login', function(req, res){
  res.render('pages/login', {session: req.session});
});

users.get('/register', function(req,res){
  res.render('pages/register', {session: req.session});
});

users.post('/login', db.loginUser, function(req, res){
  req.session.user = res.rows;
  req.session.save(function(){
    res.redirect('/')
  });
});

users.delete('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/');
  })
});

module.exports = users;
