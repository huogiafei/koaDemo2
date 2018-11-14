const Koa = require('Koa');
const config = require('./config');
const routers = require('./routers/index');
const path = require('path');
const helmet = require('koa-helmet');
const server = require('koa-static');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const logger = require('koa-logger');
const errorHandle = require('./middlewares/errorHandle');

const app = new Koa()

app.use(logger())
app.use(helmet())
app.use(errorHandle)
app.use(bodyParser())
app.use(server(path.join(__dirname,'/uploads')))

app.use(jwt({secret: config.tokenPrivateKey}).unless({path: [/\/login/]}))

app
    .use(routers.routes())
    .use(routers.allowedMethods())

app.use(async (ctx, next) => {
    await next();
    ctx.body = 'hello Koa demo'

})

app.listen(config.port, () => {
    console.log('Server start at port:' + config.port)
})
