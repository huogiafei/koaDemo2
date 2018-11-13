const router = require('koa-router')();
const User = require('../controllers/user');
const Auth = require('../controllers/auth');
const routers = router
    .post('/user/list',User.getUsers)
    .post('/addUser',User.addUser)
    .post('/delUser',User.delUser)
    .post('/updateUser',User.updateUser)
    .post('/findUser',User.findUser)
    .post('/user/dummy',User.initRandomUsers)

    .post('/login',Auth.login)
module.exports = routers