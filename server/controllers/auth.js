const Users = require('../modles/Users');
const Joi = require('joi');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');

const loginSchema = Joi.object().keys({
    email: Joi.string().email({minDomainAtoms: 2}),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,100}$/)
})

module.exports = {
    login: async (ctx) => {
        let req = ctx.request.body
        const result = Joi.validate(req, loginSchema)
        if (result.error !== null) {
            console.log(result.error.details[0])
            ctx.body = {code: 0, message: result.error.details[0].message,}
        } else {
            const email = req.email
            let userData = await Users.findOneUser({'email': email})
            if (userData) {
                if (userData.password === req.password) {
                    let userToken = {
                        username: userData.name,
                        email: userData.email
                    }
                    let token = jsonwebtoken.sign(userToken, config.tokenPrivateKey,
                        {expiresIn: '2h'})
                    ctx.body = {
                        code: 1, message: 'login success', data: {
                            token: token,
                            username:userData.name
                        }
                    }
                } else {
                    ctx.body = {code: 0, message: 'login failed', data: {}}
                }
            }
        }
    }
}