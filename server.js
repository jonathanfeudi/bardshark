'use strict';

const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const db = require('./db/pgp');
const dotenv = require('dotenv');
const userRoutes = require(path.join(__dirname, 'routes/users'));
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pgp = require('pg-promise')({});

const app = express();
const port = process.env.PORT || 3000;

//load .env
dotenv.load();

var cn = {
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

//initialize session and connect-pg-simple for login stuff
app.use(session({
  store: new pgSession({
    pgPromise: pgp(cn),
    tableName: 'session'
  }),
  secret: 'shhhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 30 * 24 * 60 * 60 *100}
}));

//create static route to public folder
app.use(express.static(path.join(__dirname, 'public')));

//log (morgan)
app.use(logger('dev'));

//looks for '_method' in the post request from a form, then changes method to DELETE
app.use(methodOverride('_method'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req,res){
  res.render('pages/home')
});

app.use( '/users', userRoutes);

app.listen(port,()=>
  console.log('Server online - Taste the Shark on port',port,'//', new Date())
);
