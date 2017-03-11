// Dependencies
var express = require('express');
var Info = require('./controller/v1/info');
var Main = require('./controller/v1/main');
// Router
var router = express.Router();

// Index
router.get('/', Info.index);
// Main Page
router.get('/main', Main.index);

module.exports = router;
