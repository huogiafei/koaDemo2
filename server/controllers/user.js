const Users = require('../modles/Users');
const Joi = require('joi');

module.exports = {
    getUsers: async (ctx) => {
        let data = await Users.findUsers()
        ctx.body = {
            code: 1,
            message: 'get user list',
            data: data
        }
    },
    addUser: async (ctx) => {
        console.log(ctx.request.body)
        let req = ctx.request.body

        const schema = Joi.object().keys({
            name: Joi.string().alphanum().min(3).max(40).required(),
            email: Joi.string().email({minDomainAtoms: 2}),
            permission: Joi.number(),
            role: Joi.number(),
            ga: Joi.boolean(),
            join_time: Joi.date().min('1-1-2017')
        })

        const validResult = Joi.validate(req, schema)
        if (validResult.error) {
            console.log(validResult.error())
        } else {
            let canInsert = await Users.insertUser(req)
            if (canInsert) {
                ctx.body = {
                    code: 1,
                    message: 'insert success',
                    data: {}
                }
            } else {
                ctx.body = {
                    code: 0,
                    message: 'insert error',
                }

            }
        }
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