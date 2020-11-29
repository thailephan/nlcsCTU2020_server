const fs = require('fs')
  


const removeImage = (filename) => {
    console.log()
    if(fs.existsSync(__dirname + '\\' + filename))
        try {
            fs.unlinkSync(__dirname + '\\' + filename)
            //file removed
        } catch(err) {
            console.error(err)
        }
}

module.exports = {removeImage}