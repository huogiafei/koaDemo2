const mongoose = require('mongoose');
const config = require('../config');
const dbStr = 'mongodb://' + config.db.host + '/' + config.db.database

const imgSchema = require('../schema/img');
const bannerSchema = require('../schema/banner');

mongoose.connect(dbStr, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err)
}).once('open', () => {
    console.log('connect db success')
})

let Img = mongoose.model('Img', imgSchema)
let Banner = mongoose.model('Banner', bannerSchema)

const web = {
    async saveImg(url) {
        return new Promise(async (resolve, reject) => {
            Img.findOneAndUpdate({'name': 'image'},
                {$inc: {'seq': 1}},
                {new: true}, (err, doc) => {
                    console.log(doc)
                    let imgId = doc.seq
                    let newImg = new Img({'id': imgId, 'url': url})
                    console.log(newImg)
                    newImg.save()
                    resolve(imgId)
                })

        })
    },

    async findImg(query) {
        return new Promise(async (resolve, reject) => {
            Img.findOne(query,(err,doc)=>{
                resolve(doc.url)
            })
        })
    }
}

module.exports = web

