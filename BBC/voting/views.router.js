// Dependencies
var express = require('express');
var Info = require('./controller/v1/info');
var Index = require('./controller/v1/index');
// Router
var router = express.Router();

// Index
router.get('/info', Info.index);
module.exports = router;
