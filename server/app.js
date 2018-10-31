const Koa = require('Koa');
const path = require('path');
const config = require('./config');
const routers = require('./routers/index');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const logger = require('koa-logger');
const static = require('koa-static');

const app = new Koa()

app.use(logger())

app.use(bodyParser())

app
    .use(routers.routes())
    .use(routers.allowedMethods())

app.use((ctx,next)=>{
    ctx.body = `<h1>Koa Demo2</h1>`
})

app.listen(config.port,()=>{
    console.log('Server start at port:'+ config.port)
})
