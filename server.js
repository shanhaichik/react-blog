'use strict';


var app = require('koa')();
var router = require("koa-router")();
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

//?
app.keys = ['Some_Secret_Key', 'Very_Interesting_Keys'];

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


/*if (config.app.env === "production") {
    app.use(serve(path.join(config.app.root, "build", "public"), SERVE_OPTIONS, STATIC_FILES_MAP));
} else {
    app.use(require("koa-proxy")({
        host: "http://localhost:2992",
        match: /^\/_assets\//,
    }));
}*/


/*
* https://www.npmjs.com/package/koa-redis
* https://www.npmjs.com/package/koa-generic-session
* */
/*app.use(session({
 key: "koareactfullexample.sid",
 store: redisStore({})
 }));*/

/*
* https://www.npmjs.com/package/koa-bodyparser
* */
app.use(bodyParser());


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

app.use(compress());
app.use(responseTime());

/**
 *
 * https://www.npmjs.com/package/koa-router
 */
router.get("/", function *(next) {
    this.type = "html";
    this.body = yield this.render("index");
});


app.use(router.routes())
   .use(router.allowedMethods());

module.exports = app;