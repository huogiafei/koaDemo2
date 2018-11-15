const mongoose = require('mongoose');
const imgDefine = {
    id: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
    },
    seq: {
        type:Number
    }
}

let imgSchema = new mongoose.Schema(imgDefine, {collection: 'image'})
module.exports = imgSchema