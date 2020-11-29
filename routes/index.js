var express = require('express');

var router = express.Router();
var adminRouter = require('./admin/index')
var customerRouter = require('./customer/index');
var _shareRouter = require('./_shared/index')
var refreshRouter = require('./_shared/refreshToken')
var authRouter = require('./auth/index')
var { uploadMultiple, multer, storage } = require('../db/multerInstance')

const AuthMiddleWare = require("../middleware/AuthMiddleware");

const { DF_CUS } = require('./_route');
const { poolConnect } = require('../db/pool');

// router.post("/login", AuthController.login);
// router.post("/refresh-token", AuthController.refreshToken);
// // Sử dụng authMiddleware.isAuth trước những api cần xác thực
// // List Protect APIs:
// router.get("/friends", FriendController.friendLists);

router.post('/upload', function(req, res, next) {
    uploadMultiple(req, res, function (err) {
        console.log(req.body.plantID)
        const {plantID} = req.body
        req.files.map((file, index) => {
            const wherePlant = plantID ? `WHERE MACAYCANH = '${plantID}'` : ''
            poolConnect.then(request => {
                return request.query(`SELECT TOP 1 MACAYCANH FROM CAYCANH ${wherePlant} ORDER BY MACAYCANH DESC`)
            }).then(result => {
                poolConnect.then(request => {
                    return request.query(`INSERT INTO HINHANH VALUES ('${result.recordset[0].MACAYCANH}', '${file.filename}')`)
                })
            }).catch(err => 
                console.log(err))
        })
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        res.status(200).json({isSuccess : true})
    })
});

router.use('/', _shareRouter)

router.use('/refresh-token', refreshRouter)

router.use(AuthMiddleWare.isAuth);

router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use(DF_CUS, customerRouter)

module.exports = router;
