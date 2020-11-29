var express = require('express');
var router = express.Router();
const {poolConnect} = require('../../db/pool')

// a collection of routers admin
router.get('/',(req,res)=>{
  
    poolConnect.then((request) => {
        return request.query(' SELECT [MALOAI] ,[TENLOAI] FROM [LOAICAY]')
      }).then(result => {
        if(result.recordsets[0].length !== 0)
          res.status(200).json(result.recordsets[0])
        else res.status(403).json([])
      }).catch(err => {
        res.status(400).json(err)
      })
})

router.post('/',async (req,res) => {
  const { name } = req.body
    try{
    const request = await poolConnect
    const result = await request.query(`SELECT [MALOAI] FROM [LOAICAY] WHERE TENLOAI = N'${name}'`)
    console.log(result)
    if (result.rowsAffected[0] === 0)
    {
        request.query(`INSERT INTO [LOAICAY] ([TENLOAI]) VALUES (N'${name}')`)
        res.status(200).json({
            isSuccess: true
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

router.post('/update/:id', (req, res, next) => {
    const id = req.params.id
    const { name }  = req.body
    const query = `UPDATE [LOAICAY] SET [TENLOAI] = N'${ name }' WHERE MALOAI = '${id}'`
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
      res.status(400).json(err)
    })
})

module.exports = router;
