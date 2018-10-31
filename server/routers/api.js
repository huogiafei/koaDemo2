const router = require('koa-router')();
const User = require('../controllers/user');
const routers = router
    .get('/user/list',User.getUsers)
module.exports = routers