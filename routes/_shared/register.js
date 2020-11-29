var express = require('express');
var router = express.Router();

const {
    poolConnect
} = require('../../db/pool');

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', (req, res) => {
    const {
        name,
        password
    } = req.body;
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
              let phone = '';
              const isPhone = checkUserNameIsPhone(name)
              if (isPhone)
                  phone = name;
              let idNewUser = await addNewUser(phone)
              let result = await addNewUserAccount(idNewUser, name, password)
              console.log(result)
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

const checkUserNameIsPhone = (name) => {
    const phoneNumberRegex = /^0\d{9,10}/g
    return phoneNumberRegex.test(name)
}

const addNewUserAccount = async (id, name, password, avatar = '', permission = 2, state = 1) => {
      let col = " ("
      col += 'MAKH '
      col += name === '' || name === null? '' : ',TENTAIKHOAN '
      col += password === '' || password === null? '' : ',MATKHAU '
      col += avatar === '' || avatar === null? '' : ',ANHDAIDIEN '
      col += permission === '' || permission === null? '' : ',MAQUYEN '
      col += state === '' || state === null? '' : ',TRANGTHAI '
      col += ") "

      let values = "("
      values += `'${id}'`
      values += name === '' || name === null ? '' : `, '${name}'`
      values += password === '' || password === null ? '' : `, '${password}'`
      values += avatar === '' || avatar === null ? '' : `, '${avatar}'`
      values += permission === '' || permission === null ? '' : `, '${permission}'`
      values += state === '' || state === null ? '' : `, '${state}'`
      values += ")"  
    const query = `INSERT INTO [TAIKHOAN]`+ col +`
    VALUES` + values
    console.log(query)
  try {
    const connect = await poolConnect;
    const request = await connect.query(query)
    return request;
  } catch (error) {
    console.log('Add Acocunt')
  }
}

const addNewUser = async (phone = '', fullname = '', sex = 0, dateOfBirth = '', address = '' ) => {
    let col = " ("
    col += 'GIOITINH '
    col += phone === null || phone === '' ? '' : ',SDT'
    col += fullname === null || fullname === '' ? '' : ',HOTENKH'
    col += dateOfBirth === null || dateOfBirth === '' ? '' : ',NGAYSINH'
    col += address === null || address === '' ? '' : ',DIACHI'
    col += ") "

    let values = "("
    values += `'${sex}'`
    values += phone === '' || phone === null ? '' : `, '${phone}'`
    values += fullname === '' || fullname === null? '' : `, N'${fullname}'`
    values += dateOfBirth === '' || dateOfBirth === null? '' : ` , '${dateOfBirth}'`
    values += address === '' || address === null? '' : `, N'${address}'`
    values += ")"
    try {
      const query = `INSERT INTO NGUOIDUNG` + col + ` 
      VALUES` + values + `; select @@identity as id`
      console.log(query)
      const connect = await poolConnect  
      const result = await connect.query(query)
      //Tra ve id lay duoc cua ban ghi vua them vao csdl
      return result.recordset[0].id
    } catch (error) {
      console.log('Add new user')
    }
}

module.exports = {router, addNewUserAccount, addNewUser};