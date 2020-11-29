var express = require('express');
const { AD_ACM, AD_ORM, AD_PRM, AD_RES, AD_PERMISSION } = require('../_route');
var router = express.Router();

var accountMRouter = require('./account')
var orderMRouter = require('./order')
var productMRouter = require('./products')
var revenueMRouter = require('./revenue')
var permissionRouter = require('./permission')
var customerRouter = require('./customers')
var speciesRouter = require('./species')

// a collection of routers admin
router.use(AD_ACM, accountMRouter)
router.use('/customers', customerRouter)
router.use(AD_ORM, orderMRouter)
router.use(AD_PRM, productMRouter)
router.use(AD_RES, revenueMRouter)
router.use(AD_PERMISSION, permissionRouter)
router.use('/species',speciesRouter )

router.get('/', () =>{
    console.log("Admin routes")
})

module.exports = router;
