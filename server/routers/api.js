const router = require('koa-router')();
const User = require('../controllers/user');
const routers = router
    .post('/user/list',User.getUsers)
    .post('/addUser',User.addUser)
    .post('/user/dummy',User.initRandomUsers)
module.exports = routers