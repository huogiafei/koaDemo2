const Users = require('../modles/Users');
const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(5).max(40).required(),
    email: Joi.string().email({minDomainAtoms: 2}),
    permission: Joi.number(),
    role: Joi.number(),
    ga: Joi.boolean(),
    join_time: Joi.date().min('1-1-2017')
})

module.exports = {
    getUsers: async (ctx) => {
        let data = await Users.findUsers()
        ctx.body = {
            code: 1,
            message: 'get user list',
            data: data
        }
    },
    findUser: async (ctx) => {
        const userId = ctx.request.body.id
        if (userId) {
            let data = await Users.findOneUser(userId)
            if (data) {
                ctx.body = {code: 1, message: 'Get target user info success', data: data}
            } else {
                ctx.body = {code: 0, message: 'Get target user info failed', data: data}
            }
        }
    },
    updateUser: async (ctx) => {
        let req = ctx.request.body
        if(ctx.request.body.id){
            const userId = req.id
            delete req.id;
            Joi.validate(req, schema,  (err, value) => {
                if (err) {
                    console.log(err.details[0])
                    ctx.body = {code: 0, message: err.details[0].message,}
                } else {
                    let canUpdate= Users.updateUser(userId,req)
                    if (canUpdate) ctx.body = {code: 1, message: 'update success', data: {}}
                    else ctx.body = {code: 0, message: err.details[0].message,}
                }
            })
        }
    },
    addUser: async (ctx) => {
        let req = ctx.request.body
        Joi.validate(req, schema, async (err, value) => {
            if (err) {
                console.log(err.details[0])
                ctx.body = {code: 0, message: err.details[0].message,}
            } else {
                let canInsert = await Users.insertUser(req)
                if (canInsert) ctx.body = {code: 1, message: 'insert success', data: {}}
                else ctx.body = {code: 0, message: err.details[0].message,}
            }
        })
    },
    delUser: async (ctx) => {
        let req = ctx.request.body
        const schema = Joi.object().keys({
            email: Joi.string().email()
        })
        Joi.validate(req, schema, (err) => {
            if (err) {
                console.log(err.details[0])
                ctx.body = {code: 0, message: err.details[0].message}
            } else {
                let canDelete = Users.deleteUser(req.email)
                if (canDelete) {
                    ctx.body = {code: 1, message: 'delete success'}
                }
                else {
                    ctx.body = {code: 0, message: err.details[0].message,}
                }
            }
        })
    },
    initRandomUsers: async (ctx) => {
        let num = ctx.request.body.num
        if (typeof num === 'number' && num % 1 === 0) {
            let data = await Users.insertDummy(num)
            ctx.body = {
                code: 1,
                message: 'add success',
                data: data
            }
        } else {
            ctx.body = {
                code: 0,
                message: 'please input an integer.',
                data: {}
            }
        }

    }
}

