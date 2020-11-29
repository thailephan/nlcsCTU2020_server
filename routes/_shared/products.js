var express = require('express');
var router = express.Router();
const { poolConnect } = require('../../db/pool');

// a collection of routers admin

router.get('/', (req, res) => {
    poolConnect.then((request) => {
        return request.query('SELECT * FROM CAYCANH ORDER BY MACAYCANH')
    }).then (result => {
        const data = result.recordset
        // console.log(data)
        res.status(200).json(data)
    })
})
router.get('/image', (req, res) => {
    poolConnect.then((request) => {
        return request.query('SELECT * FROM HINHANH ORDER BY MACAYCANH')
    }).then (result => {
        const data = result.recordset
        // console.log(data)
        res.status(200).json(data)
    })
})

router.get('/details/:id', (req, res) => {
  const id = req.params.id
  poolConnect.then((request) => {
        return request.query(`SELECT * FROM CAYCANH WHERE MACAYCANH = ${id}`)
    }).then (result => {
        res.status(200).json(result.recordsets[0])
      }).catch(err=> {
        res.status(200).json(err)
    })
})

module.exports = router;
