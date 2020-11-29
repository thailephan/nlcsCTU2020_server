var express = require('express');
var router = express.Router();

// a collection of routers admin
const {poolConnect} = require('../../db/pool')

router.get('/', (req, res) => {
    res.render('rspassword')
})

router.post('/', async (req, res, next) => {
    const data = {isSuccess: false, error: ''}
    try {
        const {
            name,
            password
        } = req.body;
        const request = await poolConnect
        const query = `UPDATE TAIKHOAN SET MATKHAU = '${password}' where TENTAIKHOAN = '${name}'`
        const result = await request.query(query)
        console.log(result)
        res.status(200)
        if(result.rowsAffected[0] === 1) {
            
            data.isSuccess = true
        } else {

            data.error = "Tên đăng nhập không chính xác"
        }
        
    } catch (error) {
        res.status(500)
    }
    res.json(data)
})



module.exports = router;
