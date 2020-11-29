var express = require('express');
var url = require('url')

const fs = require('fs')

const { selectRecords } = require('../../db/FUNCQUERY');
const { uploadMultiple } = require('../../db/multerInstance');
const { poolConnect } = require('../../db/pool');
const { removeImage } = require('../../public/images/removeImg');
var router = express.Router();

// a collection of routers admin

router.get('/', (req, res) => {
    poolConnect.then((request) => {
        return request.query(selectRecords('CAYCANH') + ' ORDER BY MACAYCANH')
    }).then (result => {
        res.status(200).json(result.recordsets[0])
    })
})

router.get('/details/:id', (req, res) => {
  const id = req.params.id
  poolConnect.then((request) => {
        return request.query(selectRecords('CAYCANH') + `WHERE MACAYCANH = ${id}`)
    }).then (result => {
        res.status(200).json(result.recordsets[0])
      }).catch(err=> {
        res.status(200).json(err)
    })
})



router.post('/update/:id', (req, res) => {
  console.log('Post cay canh')

  const {id} = req.params
  // console.log(req.body)

  const {
    maloai, 
    tencaycanh, 
    gianiemyet, 
    motangan,
    socayton,
    motachitiet
  } = req.body
  
  const query = `UPDATE [CAYCANH] SET [MALOAI] = '${maloai}', 
  [GIANIEMYET] = '${gianiemyet}',
  [MOTANGAN] = N'${motangan}',
  [MOTACHITIET] = N'${motachitiet}',
  [SOCAYTON] = '${socayton}',
  [TENCAYCANH] = N'${tencaycanh}' WHERE MACAYCANH = '${id}'`

  console.log(query)
  
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
    console.log('Product, post, update')
  })
})


router.post('/add', (req, res) => {
  const {maloai, tencaycanh, gianiemyet, motangan, socayton, motachitiet} = req.body
  console.log(req.body)
  let col = " ("
    col += 'TENCAYCANH '
    col += maloai === null || maloai === '' ? '' : ',MALOAI'
    col += gianiemyet === null || gianiemyet === '' ? '' : ',GIANIEMYET'
    col += motangan === null || motangan === '' ? '' : ',MOTANGAN'
    col += socayton === null || socayton === '' ? '' : ',SOCAYTON'
    col += motachitiet === null || motachitiet === '' ? '' : ',MOTACHITIET'
    col += ") "

    let values = "("
    values += `N'${tencaycanh}'`
    values += maloai === '' || maloai === null ? '' : `, '${maloai}'`
    values += gianiemyet === '' || gianiemyet === null? '' : `, '${gianiemyet}'`
    values += motangan === '' || motangan === null? '' : ` , N'${motangan}'`
    values += socayton === '' || socayton === null? '' : `, '${socayton}'`
    values += motachitiet === '' || motachitiet === null? '' : `, N'${motachitiet}'`
    values += ")"

    query = `INSERT INTO CAYCANH ${col} VALUES ${values};select @@identity as id`
    poolConnect.then((request) => {
      return request.query(query)
    }).then(result => {
      console.log(result)
      if(result.rowsAffected != 0){
        res.status(200).json({isSuccess : true, id : result.recordset[0].id})
      }
      else console.log('err')
    }).catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.post('/delete/:id', (req, res) => {
  const {id} = req.params
  poolConnect.then(request => {
    return request.query(`SELECT DUONGDAN FROM HINHANH WHERE MACAYCANH = '${id}'`)
  }).then (result => {
    console.log(result.recordset)
    result.recordset.forEach((image, index) =>{
      removeImage(image.DUONGDAN)
    }
  )})

  const query = `DELETE FROM HINHANH WHERE MACAYCANH = ${id};
  DELETE FROM [CAYCANH]
        WHERE MACAYCANH = ${id}`
  poolConnect.then((request) => {
    return request.query(query)
  }).then(result => {
    console.log(result)
    if (result.rowsAffected[1] != 0)
        res.status(200).json({
            isSuccess: true
        })
    else
        res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        })
  }).catch(err => {
    console.log('Delete')
    res.status(500).json({err})
  })
})

module.exports = router;
