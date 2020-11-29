var express = require('express');
var url = require('url')

const { selectRecords } = require('../../db/FUNCQUERY');
const { poolConnect } = require('../../db/pool');
var router = express.Router();

// a collection of routers admin

router.get('/', (req, res) => {
    poolConnect.then((request) => {
        return request.query(selectRecords('DONHANG'))
    }).then (result => {
        res.status(200).json(result.recordsets[0])
    })
})

// router.get('/search', (req, res) => {
//     const query = url.parse(req.url, true).query
//     poolConnect.then((request) => {
//         return request.query(selectRecords('DONHANG') + ` WHERE MADONHANG = ${query.id}`)
//     }).then (result => {
//         res.status(200).json(result.recordsets[0])
//     })
// })

router.get('/details/:id', (req, res) => {
    const id = req.params.id
    poolConnect.then((request) => {
        return request.query(selectRecords('DONHANG') + ` WHERE MADONHANG = ${id}`)
    }).then (result => {
        res.status(200).json(result.recordsets[0])
    })
})

router.patch('/edit',(req,res) => {
    poolConnect.then((request) => {
        return request.query(`UPDATE DONHANG SET MATKHAU = '' WHERE MATAIKHOAN = '${id}';`)
    }).then(result => {
      if(result.rowsAffected != 0)
        res.status(200).json({isSuccess : 's'})
      else console.log('err')
    })
  })

  //Lấy tình trạng đơn hàng để admin có thể tcực hiện các thao tác
  
  router.get('/state',(req,res)=>{
  
    poolConnect.then((request) => {
        return request.query(' SELECT [MATINHTRANG] ,[TENTINHTRANG] FROM [TTDONHANG]')
      }).then(result => {
        if(result.recordsets[0].length !== 0)
          res.status(200).json(result.recordsets[0])
        else res.status(403).json([])
      }).catch(err => {
        res.status(400).json(err)
      })
})

router.post('/state',async (req,res) => {
  const { name } = req.body
    try{
    const request = await poolConnect
    const result = await request.query(`SELECT [MATINHTRANG] FROM [TTDONHANG] WHERE TENTINHTRANG = N'${name}'`)
    if (result.rowsAffected[0] === 0)
    {
      const result = await request.query(`INSERT INTO [TTDONHANG] ([TENTINHTRANG]) VALUES (N'${name}') SELECT * FROM TTDONHANG WHERE TENTINHTRANG = N'${name}'`)
        res.status(200).json({
            isSuccess: true,
            newOrderState: result.recordset[0]
        })
    } else {
        res.status(403).json({
        message: "Loại cây đã tồn tại"
        })
    }
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/state/update/:id', (req, res, next) => {
    const id = req.params.id
    const { name }  = req.body
    const query = `UPDATE [TTDONHANG] SET [TENTINHTRANG] = N'${ name }' WHERE MATINHTRANG = '${id}'`
    poolConnect.then((request) => {
        return request.query(query)
      }).then(result => {
        if(result.rowsAffected != 0)
            res.status(200).json({isSuccess : true})
        else 
            res.status(404).json({
                status: 'failed',
                message: 'Invalid ID'
                })
    }).catch(err=> {
      res.status(500).json(err)
    })
})

router.post('/state/delete/:id', (req, res, next) => {
  const {id} = req.params
  const query = `DELETE FROM [TTDONHANG] WHERE MATINHTRANG = '${id}'`
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
