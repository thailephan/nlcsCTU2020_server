var express = require('express');
const { tokenList } = require('../../helpers/token');
var router = express.Router();

// a collection of routers admin

router.get('/',(req,res)=>{
    console.log('User Logout')
})

router.post('/', (req, res) => {
    const refreshTokenFromClient = req.body.token
    if(tokenList && tokenList[refreshTokenFromClient]) {
        delete tokenList[refreshTokenFromClient]
    }
})

module.exports = router;
