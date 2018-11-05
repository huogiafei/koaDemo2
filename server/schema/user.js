const mongoose = require('mongoose');
const userDefine = {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    permission: {
        type:Number,
        min: 0,
        max: 2,
        ref:'Permission'
    },
    role: {
        type: Number,
        min: 0,
        max: 2,
        ref:'Role'
    },
    ga: {
        type: Boolean
    },
    join_time:{
        type:Date
    }
}

let userSchema = new mongoose.Schema(userDefine, {collection: 'users'})
module.exports = userSchema