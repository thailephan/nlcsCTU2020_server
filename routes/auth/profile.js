var express = require('express');
const {
    selectRecords
} = require('../../db/FUNCQUERY');
const {
    poolConnect
} = require('../../db/pool');
var router = express.Router();


router.get('/user', (req, res) => {
    const {_id} = req.jwtDecoded
        poolConnect.then((request) => {
            return request.query(`SELECT [MAKH]
            ,[HOTENKH]
            ,[GIOITINH]
            ,FORMAT([NGAYSINH], 'yyyy-MM-dd') as NGAYSINH
            ,[DIACHI]
            ,[SDT]
        FROM [NGUOIDUNG]`+ ` WHERE MAKH = '${_id}'`)
        }).then(result => {
            res.status(200).json(result.recordsets[0])
        }).catch(error => {
            res.status(500).json(error)
        })
})
router.post('/user', (req, res) => {
    const {_id} = req.jwtDecoded
    console.log(req.body)
    const {fullname, phone, address, sex, birthday} = req.body
    console.log(birthday)
    
    const time = new Date(birthday)
    const date = time.getDate()
    const month = time.getMonth()
    const year = time.getFullYear()
    const day = year + '-' +
     (month + 1 >= 10 ? month + 1 : '0' + (1 + month)) + '-' + (date >= 10 ? date : '0' + date)
    
    const query = `UPDATE [NGUOIDUNG] SET
    [HOTENKH] = N'${fullname}'
    ,[GIOITINH] = '${sex}'
    ,[NGAYSINH] = '${day}'
    ,[DIACHI] = N'${address}'
    ,[SDT] = N'${phone}'`+ ` WHERE MAKH = '${_id}'`
    console.log(query)
    poolConnect.then((request) => { 
        return request.query(query)
        }).then(result => {
            res.status(200).json({isSuccess: true})
        }).catch(error => {
            res.status(500).json(error)
            console.log(error)
        })
})

router.get('/account', (req, res) => {
    const {_accountid} = req.jwtDecoded
    poolConnect.then((request) => {
        return request.query(selectRecords('TAIKHOAN') + ` WHERE MATAIKHOAN = '${_accountid}'`)
    }).then(result => {
        res.status(200).json(result.recordsets[0])
    }).catch(error => {
        res.status(500).json(error)
    })

})

module.exports = router;