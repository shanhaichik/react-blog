'use strict';

const app = require('koa')();
const router = require("koa-router")();
const path = require("path");
const session = require("koa-generic-session");
const responseTime = require("koa-response-time");
const logger = require("koa-logger");
const compress = require('koa-gzip');
const views = require("co-views");
const errorHandler = require("koa-error");
const bodyParser = require("koa-bodyparser");
const redisStore = require('koa-redis');
const serve = require('koa-static');

const STATIC_FILES_MAP = {};
const SERVE_OPTIONS = { maxAge: 365 * 24 * 60 * 60 };

const env = process.env.NODE_ENV || 'development';

app.use(compress());

/*
* https://github.com/koajs/static
* */
app.use(serve(__dirname + '/static'));

/*
* https://www.npmjs.com/package/koa-logger
* */
if (env !== "test") {
    app.use(logger());
}

/*
* https://www.npmjs.com/package/koa-error
* */
app.use(errorHandler());


//?
app.keys = ['Some_Secret_Key', 'Very_Interesting_Keys'];
/*
* https://www.npmjs.com/package/koa-redis
* https://www.npmjs.com/package/koa-generic-session
* */
app.use(session({
     store: redisStore()
 }));

/*
* https://www.npmjs.com/package/koa-bodyparser
* */
app.use(bodyParser());
app.use(responseTime());



/*
* https://www.npmjs.com/package/co-views
* */
app.use(function *(next) {
    this.render = views(path.join(__dirname, "/static/html"), {
        map: { html: "swig" },
        cache: env === "development" ? "memory" : false
    });

    yield next;
});



/*
* Error handler
* */
app.use(function *(next){
    try{
        yield next;
    } catch (err) {
        this.type = 'json';
        this.status = err.status || 500;
        this.body = { 'error' : err.message};
    }
});

/**
 *
 * https://www.npmjs.com/package/koa-router
 */
router.get("/", function *(next) {
    this.compress = true;
    this.type = "html";
    this.body = yield this.render("index");
});


app.use(router.routes())
   .use(router.allowedMethods());




module.exports = app;