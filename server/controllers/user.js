const Users = require('../modles/Users');

module.exports = {
    getUsers:async(ctx)=>{
        let data  = await Users.findUsers()
        ctx.body = {
            code: 1,
            message: 'get user list',
            data: data
        }
    },
    initRandomUsers: async(ctx)=>{
        let num = ctx.request.body.num
        if (typeof num === 'number' && num % 1 === 0) {
            let data = await Users.insertDummy(num)
            ctx.body = {
                code:1,
                message:'add success',
                data:data
            }
        }else{
            ctx.body = {
                code:0,
                message:'please input an integer.',
                data:{}
            }
        }

    }
}