const router = require('express').Router()
const { tokenList, refreshTokenSecret, accessTokenLife, accessTokenSecret } = require('../../helpers/token');
const jwtHelper = require('../../helpers/jwt.helper');

router.get('/', (req, res) => {
  res.send("Hello")
})


router.post('/', async (req, res) => {
    const refreshTokenFromClient = req.body.refreshToken
    if(refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
      try {
  
        const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret)
  
        const userLoginData = decoded.data
        
        const accessToken = await jwtHelper.generateToken(userLoginData, accessTokenSecret, accessTokenLife)

        return res.status(200).json({accessToken})
  
      } catch (error) {
        res.status(403).send({
          message: 'Invalid refresh token.' 
        })
      }
    } else {
      return res.status(403).send({
        message: 'No token provided. '
      })
    }
  })
module.exports = router