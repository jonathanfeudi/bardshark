'use strict'
const express = require('express');
const blog = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple');

blog.get('/', )
