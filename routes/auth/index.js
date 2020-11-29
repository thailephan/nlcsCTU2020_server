var express = require('express');
const { selectRecords } = require('../../db/FUNCQUERY');
const { poolConnect } = require('../../db/pool');
var router = express.Router();

var profileRouter = require('./profile')
// a collection of routers admin

router.use('/profile', profileRouter)

module.exports = router