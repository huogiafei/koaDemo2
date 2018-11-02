const mongoose = require('mongoose');
const config = require('../config');
const dbStr = 'mongodb://' + config.db.host + '/' + config.db.database

mongoose.connect(dbStr, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err)
}).once('open', () => {
    console.log('connect db success')
})

const permissionDefine = {
    _id: {
        type: Number,
        ref:'User',
        required: true
    },
    title: {
        type: String,
    }
}

const permissionData = [
    {
        _id:0,
        title:'Administrator'
    },
    {
        _id:1,
        title:'Copywriter'
    },
    {
        _id:2,
        title:'Marketing'
    }
]

let permissionSchema = new mongoose.Schema(permissionDefine, {collection: 'permission'})
let Permission = mongoose.model('Permission', permissionSchema)

Permission.find({},(err,docs)=>{
    if(docs.length === 0){
        Permission.insertMany(permissionData,(err,permissions)=>{
            console.log(permissions)
        })
    }
})

