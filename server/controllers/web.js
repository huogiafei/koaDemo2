const uploadFile = require('../util/upload');
const path = require('path');
const Web = require('../modles/Web');
const uploadRootPath = 'uploads'
const fs = require('fs');

module.exports = {
    bannerUpload: async (ctx) => {
        let link = await fileUpload(ctx, 'banner')
        if (link) {
            let imgId = await Web.saveImg(link)
            let responseLink = imgUrlFormat(ctx,link)
            ctx.body = {code: 1, message: 'upload success', data: {imgId: imgId, link: responseLink}}
        } else {
            ctx.body = {code: 0, message: 'upload success', data: {}}
        }
    },

    wallUpload: async (ctx) => {
        let link = await fileUpload(ctx, 'wall')
        if (link) {
            let imgId = await Web.saveImg(link)
            let responseLink = imgUrlFormat(ctx,link)
            ctx.body = {code: 1, message: 'upload success', data: {imgId: imgId, link: responseLink}}
        } else {
            ctx.body = {code: 0, message: 'upload success', data: {}}
        }
    },

    bannerSave: async (ctx) => {

    },

    wallSave: async (ctx) => {
        const ids = ctx.request.body.ids
        fs.writeFileSync(path.resolve('data')+'/wall.file', ids);
        ctx.body = {code: 1, message: 'save wall success', data: {}}
    },
    wallGet:async (ctx)=>{
        let data = fs.readFileSync(path.resolve('data')+'/wall.file','utf-8')
        let list = JSON.parse(data)
        let result = []
        for(let item of list){
            let link = await Web.findImg({'id':item})
            let responseLink = imgUrlFormat(ctx,link)
            result.push({
                imgId:item,
                link:responseLink
            })
        }
        ctx.body =  {code: 1, message: 'get wall success', data: {'imgs':result}}
    }
}

function fileUpload(ctx, type) {
    return new Promise(async (resolve, reject) => {
        const serverFilePath = path.resolve(uploadRootPath)
        let result = await uploadFile(ctx, {
            bucket: type,
            path: serverFilePath
        })
        resolve(result)
    })
}

function imgUrlFormat(ctx,link){
    return  ctx.request.header['x-forwarded-proto'] + '://'
        + ctx.request.header.host + '/' + link
}