require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser=require('body-parser')
var indexRouter = require('./routes/index');
var os=require('os')
console.log(os.cpus().length);
var app = express();
// require('./changeStreams/index')
// require('./services/gcService').setCorsPolicy()

app.use(bodyParser.json({limit:'100mb'}))
app.use(bodyParser.urlencoded({ extended: true ,limit: '50mb' }));
logger = require('./utils/logger')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
console.log(process.env.NODE_ENV)

app.use(require("morgan")(function (tokens, req, res) {
  let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  let accessToken = `accessToken:-${(req.headers['authorization']+"")}`
  return [
    req.user && req.user._id,
    ip,accessToken,
    tokens['remote-user'](req,res),
    tokens.date(req, res, 'clf'),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['referrer'](req, res),
    tokens['user-agent'](req, res),
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}, { "stream": logger.stream }));

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser());


app.options("*", function (req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Authorization, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS ,PATCH");
  res.status(200).end();
});
app.use(function (req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // res.header("X-Frame-Options","");
  next();
});

app.use('/api',indexRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
