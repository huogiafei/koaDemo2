const mongoose = require('mongoose');
const dummy = require('mongoose-dummy');
const config = require('../config');
const ignoredFields = ['_id', 'created_at', '__v', /detail.*_info/];
const dbStr = 'mongodb://' + config.db.host + '/' + config.db.database

const userSchema = require('../schema/user');
const permissionSchema = require('../schema/user-permission');

mongoose.connect(dbStr, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err)
}).once('open', () => {
    console.log('connect db success')
})

let User = mongoose.model('User', userSchema)
let Permission = mongoose.model('Permission', permissionSchema)

const user = {
    async findUsers() {
        return new Promise(async (resolve, reject) => {
            User.find({})
                .populate('permission')
                .exec((err, docs) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (docs.length > 0) {
                            console.log(docs)
                            resolve(docs)
                        } else {
                            reject(0)
                        }
                    }
                })
        })
    },

    async insertDummy(num) {
        return new Promise(async (resolve, reject) => {
            let dataArr = [];
            for (let i = 0; i < num; i++) {
                let randomObject = dummy(User, {
                    ignore: ignoredFields,
                    returnDate: true
                })
                let doc = new User(randomObject)
                dataArr.push(doc)
            }
            console.log(dataArr)
            User.insertMany(dataArr, (err, docs) => {
                resolve(this.findUsers())
            })
        })
    }
}

module.exports = user;