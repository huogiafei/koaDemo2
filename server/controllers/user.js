const Users = require('../modles/Users');
module.exports = {
    getUsers:async(ctx)=>{
        let temp  = await Users.findUsers
        console.log(temp)
        
        
        ctx.body = {
            code: 1,
            message: 'Test',
            data: {}
        }
    }
}