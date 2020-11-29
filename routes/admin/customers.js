var express = require('express');
const { selectRecords } = require('../../db/FUNCQUERY');
const { poolConnect } = require('../../db/pool');
var router = express.Router();

// a collection of routers admin

router.get('/', (req, res) => {
    poolConnect.then((request) => {
        return request.query(`SELECT [MAKH]
        ,[HOTENKH]
        ,[GIOITINH]
        ,FORMAT([NGAYSINH], 'yyyy-MM-dd') as NGAYSINH
        ,[DIACHI]
        ,[SDT]
    FROM [NGUOIDUNG] ORDER BY MAKH`)
    }).then (result => {
        res.status(200).json(result.recordsets[0])
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    poolConnect.then((request) => {
        return request.query(`SELECT [MAKH]
        ,[HOTENKH]
        ,[GIOITINH]
        ,FORMAT([NGAYSINH], 'yyyy-MM-dd') as NGAYSINH
        ,[DIACHI]
        ,[SDT]
    FROM [NGUOIDUNG]`+ ` WHERE MAKH = '${id}'`)
    }).then (result => {
        res.status(200).json(result.recordsets[0])
    })
})

module.exports = router;
