const inspect = require('util').inspect;
const path = require('path');
const {URL} = require('url');
const fs = require('fs');
const Busboy = require('busboy');

function mkdirSync(dirname) {
    try {
        if (typeof dirname !== 'string' || dirname == '') {
            throw 'No directory name'
        } else {
            if (fs.existsSync(dirname)) {
                return true
            } else {
                if (mkdirSync(path.dirname(dirname))) {
                    fs.mkdirSync(dirname)
                    return true
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}

function getSuffix(filename) {
    let list = filename.split('.')
    return list[list.length - 1]
}

function uploadFile(ctx, options) {
    let req = ctx.req
    let busboy = new Busboy({headers: req.headers})
    let bucket = options.bucket || 'common'
    let filePath = path.join(options.path, bucket)
    let mkdirResult = mkdirSync(filePath)

    return new Promise((resolve, reject) => {
        busboy.on('file', (fieldname, file, filename) => {
            console.log(fieldname)
            let fileName = Math.random().toString(16).substr(2)
                + new Date().getTime()
                + '.' + getSuffix(filename)
            let _uploadFilePath = path.join(filePath, fileName)
            let saveTo = path.join(_uploadFilePath)
            file.pipe(fs.createWriteStream(saveTo))
            file.on('end', () => {
                const finalLink = bucket + '/' + fileName
                console.log(finalLink)
                resolve(finalLink)
            })
        })
        req.pipe(busboy);
    })
}

module.exports = uploadFile