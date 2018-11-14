const uploadFile = require('../util/upload');
const path = require('path');
const uploadRootPath = 'uploads'

module.exports = {
    bannerUpload: async (ctx) => {
        const serverFilePath = path.resolve(uploadRootPath)
        let result = await uploadFile(ctx, {
            bucket: 'banner',
            path: serverFilePath
        })
        if (result) {
            ctx.body = {code: 1, message: 'upload success', data: {link: result}}
        } else {
            ctx.body = {code: 0, message: 'upload success', data: {}}
        }
    }
}