const mongoose = require('mongoose');
const bannerDefine = {
    title: {
        type: String,
    },
    imgId: {
        type: Number,
        require: true
    },
    position: {
        type: String,
        require: true
    }
}

let bannerSchema = new mongoose.Schema(bannerDefine, {collection: 'banner'})
module.exports = bannerSchema