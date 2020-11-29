var multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

// Just get one file uploaded from client
var uploadSingle = multer({ storage: storage }).single('file')

// Just get one file uploaded from client
var uploadMultiple = multer({ storage: storage }).any()

module.exports = {multer, storage, uploadSingle, uploadMultiple}