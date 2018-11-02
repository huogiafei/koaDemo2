const mongoose = require('mongoose');
const roleArray = ['00', '01', '02', '03', '10', '11', '12', '20', '21']
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
        type: String,
        enum: roleArray
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