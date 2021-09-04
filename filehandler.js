//It's a helper to read the files of the server

let fs = require('fs')
module.exports = (fileName, successFn, errorFn) => {
    fs.readFile(fileName, (err, data) => {
        err ? errorFn(err) : successFn(data)
    })
}