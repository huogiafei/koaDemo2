const mongoose = require('mongoose');
const roleDefine = {
    _id: {
        type: Number,
    },
    title: String,
    children: [
        {
            _id: {
                type: Number,
            },
            title: String
        },
    ]
}

let roleSchema = new mongoose.Schema(roleDefine, {collection: 'role'})
module.exports = roleSchema