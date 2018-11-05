const mongoose = require('mongoose');

const userPermissionDefine = {
    _id: {
        type:Number,
    },
    title: {
        type:String,
    },
}
let userPermissionSchema = new mongoose.Schema(userPermissionDefine, {collection: 'permission'})
module.exports = userPermissionSchema