var express = require('express');
const { CUS_REGISTER } = require('../_route');
var router = express.Router();

// a collection of routers customers

router.get('/', () =>{
    console.log('Customer Routes')
})

module.exports = router;
