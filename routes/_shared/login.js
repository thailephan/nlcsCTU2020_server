const jwtHelper = require("../../helpers/jwt.helper");
var express = require('express');
var router = express.Router();

const { tokenList, accessTokenLife, accessTokenSecret, refreshTokenLife, refreshTokenSecret} = require('../../helpers/token')

const {
    poolConnect
} = require('../../db/pool')

// a collection of routers admin
router.get('/', (req, res) => {
    res.render('login');
})

//login handle

router.post('/', async (req, res) => {
    try {
        const request = await poolConnect
        const result = await request.query('SELECT MATAIKHOAN, ANHDAIDIEN, TENTAIKHOAN, MAQUYEN, MAKH FROM TAIKHOAN ' + ` where TENTAIKHOAN ='${req.body.name}' AND MATKHAU = '${req.body.password}';`)

        let accessToken
        let refreshToken 
        if (result.rowsAffected[0] === 0)
            res.status(400)
        else {

            const userData = {
                _id: result.recordset[0].MAKH,
                name: result.recordset[0].TENTAIKHOAN,
                permission: result.recordset[0].MAQUYEN,
                _accountid: result.recordset[0].MATAIKHOAN,
            }
            accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife)
            refreshToken = await jwtHelper.generateToken(userData, refreshTokenSecret, refreshTokenLife)
            tokenList[refreshToken] = {accessToken, refreshToken};
            res.status(200)
        }
        res.json({accessToken, refreshToken, record: result.recordset[0]})
    } catch (error) {
      return res.status(500).json(error)
    }
})


module.exports = router;