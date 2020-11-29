var express = require('express');
const { CUS_REGISTER, SHARED_LOGIN, SHARED_LOGOUT, SHARED_RESETPASSWORD } = require('../_route');
var router = express.Router();
var loginRouter = require('./login')
var logoutRouter = require('./logout')
var resetPasswordRouter = require('./rspassword')
var productRouter = require('./products')

var registerRouter = require('./register').router


router.use(CUS_REGISTER, registerRouter)
router.use(SHARED_LOGIN, loginRouter)
router.use(SHARED_LOGOUT, logoutRouter)
router.use(SHARED_RESETPASSWORD, resetPasswordRouter)
router.use('/products', productRouter)


router.get('/', (req, res) => {
  res.send("Index Global routes")
})

module.exports = router;
