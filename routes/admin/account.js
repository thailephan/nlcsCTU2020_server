var express = require('express');
const { poolConnect } = require('../../db/pool');
var router = express.Router();

var {addNewUserAccount, addNewUser} = require('../_shared/register')

// a collection of routers admin

router.get('/', (req, res) => {
  poolConnect.then((request) => {
        return request.query(`SELECT [MATAIKHOAN]
            ,[MAKH]
            ,[TENQUYEN]
            ,qtc.MAQUYEN
            ,[TENTAIKHOAN]
            ,[MATKHAU]
            ,[ANHDAIDIEN]
            ,[TRANGTHAI] 
        FROM [TAIKHOAN] tk JOIN [QUYENTRUYCAP] qtc ON tk.MAQUYEN = qtc.MAQUYEN`)
    }).then (result => {
        res.status(200).json(result.recordsets[0])
    }).catch(error => {
      res.status(500).json(error)
    })
})

  
router.post('/update/:id',(req,res) => {
    const {id} = req.params
    const {name, password, state, avatar, permission} = req.body
    console.log(req.body)
    
    poolConnect.then((request) => {
      // console.log(request)
        return  request.query(`UPDATE TAIKHOAN 
        SET MATKHAU = '${password}', TRANGTHAI = '${state}', MAQUYEN = '${permission}', ANHDAIDIEN = '${avatar}', TENTAIKHOAN = '${name}'WHERE MATAIKHOAN = '${id}';`)
    }).then(result => {
      console.log(result)
      if(result.rowsAffected != 0)
        res.status(200).json({isSuccess : true})
      else console.log('err')
    }).catch(err =>{
      res.status(500).json({isSuccess: false})
    })
  })



router.post('/delete/:id', async (req, res) => {
  const id = req.params.id
  try{
    console.log(id)
    const connect = await poolConnect
    const result = await connect.query(`UPDATE TAIKHOAN SET TRANGTHAI = '0' WHERE MATAIKHOAN = '${id}';`)
    if(result.rowsAffected != 0)
        res.status(200).json({isSuccess : true})
    else 
        res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
            }) 
  } catch(error) {
    res.status(500).json(error)
  }
})

//Tạo tài khoản mới do admin 
router.post('/', (req, res) => {
  const {
      name,
      password,
      permission,
      state,
      avatar,

      fullname,
      sex,
      dateOfBirth,
      phone,
      address,
  } = req.body;
  console.log(req.body)
  poolConnect.then((request) => {
      const query = `SELECT MATAIKHOAN FROM TAIKHOAN where TENTAIKHOAN = '${name}'`
      return request.query(query)
  }).then( async result => {

      const data = {
          error: null,
          isSuccess: false
      }

      res.status(200)
      try {
          if (result.rowsAffected[0] !== 0)
            data.error = 'Tài khoản đã tồn tại'
          else {
            let idNewUser = await addNewUser(phone, fullname, sex, dateOfBirth, address)
            console.log(idNewUser)
            let result = await addNewUserAccount(idNewUser, name, password, avatar, permission, state)
            data.isSuccess = true;
          }
      } catch (error) {
        console.log(error)  
        res.status(500)
      }
      res.json(data)
  }).catch(err => {
      res.status(400).json(err)
  })
})
module.exports = router;
