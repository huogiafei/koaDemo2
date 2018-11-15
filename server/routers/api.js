const router = require('koa-router')();
const User = require('../controllers/user');
const Auth = require('../controllers/auth');
const Web = require('../controllers/web');
const routers = router
    .post('/user/list',User.getUsers)
    .post('/addUser',User.addUser)
    .post('/delUser',User.delUser)
    .post('/updateUser',User.updateUser)
    .post('/findUser',User.findUser)
    .post('/user/dummy',User.initRandomUsers)

    .post('/login',Auth.login)

    .post('/web/bannerUpload',Web.bannerUpload)
    .post('/web/bannerSave', Web.bannerSave)
    .post('/web/wallUpload',Web.wallUpload)
    .post('/web/wallSave', Web.wallSave)
    .post('/web/wallGet', Web.wallGet)
module.exports = routers