var express = require('express');
var router = express.Router();
const {
    poolConnect
} = require('../../db/pool')

// a collection of routers admin
router.get('/', (req, res) => {

    poolConnect.then((request) => {
        return request.query('SELECT [MAQUYEN] ,[TENQUYEN] FROM [QUYENTRUYCAP] ORDER BY MAQUYEN')
    }).then(result => {
        if (result.recordsets[0].length !== 0)
            res.status(200).json(result.recordsets[0])
        else res.status(403).json([])
    }).catch(err => {
        res.status(400).json(err)
    })
})

router.post('/', async (req, res) => {
    const {
        name
    } = req.body
    try {
        const request = await poolConnect
        const result = await request.query(`SELECT [MAQUYEN] FROM [QUYENTRUYCAP] WHERE TENQUYEN = N'${name}'`)
        console.log(result)
        if (result.rowsAffected[0] === 0)
        {
          const result = await request.query(`INSERT INTO [QUYENTRUYCAP] ([TENQUYEN]) VALUES (N'${name}'); SELECT * FROM QUYENTRUYCAP WHERE TENQUYEN = N'${name}'`)
          console.log(result)
          res.status(200).json({
              isSuccess: true,
              newPermission: result.recordset[0]
        })
        } else {
          res.status(403).json({
            message: "Quyền truy cập đã tồn tại"
          })
        }
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/update/:id', (req, res, next) => {
    const id = req.params.id
    const {
        name
    } = req.body
    const query = `UPDATE [QUYENTRUYCAP] SET [TENQUYEN] = N'${ name }'
     WHERE MAQUYEN = '${id}'`
    poolConnect.then((request) => {
        return request.query(query)
    }).then(result => {
        if (result.rowsAffected != 0)
            res.status(200).json({
                isSuccess: true
            })
        else
            res.status(404).json({
                status: 'failed',
                message: 'Invalid ID'
            })
    }).catch(err => {
        res.status(400).json(err)
    })
})
router.post('/delete/:id', (req, res, next) => {
    const {id} = req.params
    const query = `DELETE FROM [QUYENTRUYCAP] WHERE MAQUYEN = '${id}'`
    poolConnect.then((request) => {
        return request.query(query)
    }).then(result => {
        if (result.rowsAffected != 0)
            res.status(200).json({
                isSuccess: true
            })
        else
            res.status(404).json({
                status: 'failed',
                message: 'Invalid ID'
            })
    }).catch(err => {
        res.status(400).json(err)
    })
})

module.exports = router;