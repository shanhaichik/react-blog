'use strict';

const path = require("path");
const serve = require("koa-static-cache");
const session = require("koa-generic-session");
const responseTime = require("koa-response-time");
const logger = require("koa-logger");
const views = require("co-views");
const compress = require("koa-compress");
const errorHandler = require("koa-error");
const bodyParser = require("koa-bodyparser");
const redisStore = require('koa-redis');

const STATIC_FILES_MAP = {};
const env = process.env.NODE_ENV || 'development';

const app = koa();

//?
app.keys = ['Some_Secret_Key', 'Very_Interesting_Keys'];

/*
* https://www.npmjs.com/package/koa-logger
* */
if (config.app.env !== "test") {
    app.use(logger());
}

/*
* https://www.npmjs.com/package/koa-error
* */
app.use(errorHandler());

/*
* https://www.npmjs.com/package/koa-redis
* https://www.npmjs.com/package/koa-generic-session
* */
app.use(session({
    key: "koareactfullexample.sid",
    store: redisStore({})
}));


/*
* https://www.npmjs.com/package/koa-bodyparser
* */
app.use(bodyParser());

app.use(function *(next) {
    this.render = views(path.join(__dirname, "/static"), {
        map: { html: "swig" },
        cache: env === "development" ? "memory" : false
    });
    yield next;
});

app.use(compress());
app.use(responseTime());