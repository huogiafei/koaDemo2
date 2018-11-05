const mongoose = require('mongoose');
const config = require('../config');
const dbStr = 'mongodb://' + config.db.host + '/' + config.db.database

const permissionSchema = require('../schema/user-permission');
const roleSchema = require('../schema/user-role');

mongoose.connect(dbStr, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err)
}).once('open', () => {
    console.log('connect db success')
})

const permissionData = [
    {
        _id: 0,
        title: 'Administrator'
    },
    {
        _id: 1,
        title: 'Copywriter'
    },
    {
        _id: 2,
        title: 'Marketing'
    }
]

const roleData = [
    {
        _id: 0,
        title: '开发',
        children: [
            {_id: 0, title: '前端'},
            {_id: 1, title: '后台'},
            {_id: 2, title: '测试'},
            {_id: 3, title: '运维'}
        ]
    },
    {
        _id: 1,
        title: '渠道',
        children: [
            {_id: 4, title: 'facebook'},
            {_id: 5, title: 'google'},
            {_id: 6, title: 'twitter'},
        ]
    },
    {
        _id: 2,
        title: '客服',
        children: [
            {_id: 7, title: '售前'},
            {_id: 8, title: '售后'},
        ]
    }
]

let Permission = mongoose.model('Permission', permissionSchema)
let Role = mongoose.model('Role', roleSchema)

Permission.find({}, (err, docs) => {
    if (docs.length === 0) {
        Permission.insertMany(permissionData, (err, permissions) => {
            console.log(permissions)
        })
    }
})

Role.find({}, (err, docs) => {
    if (docs && docs.length === 0) {
        Role.insertMany(roleData, (err, roles) => {
            console.log(roles)
        })
    }
})

