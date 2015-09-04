var configure = require('./configure');
var express = require('express');
var path = require('path');
require('./models');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var auth = require('./middlewares/auth');
var errorPageMiddleware = require('./middlewares/error_page');
var crypto = require('crypto');

var routes = require('./router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(errorPageMiddleware.errorPage);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/static', 'zhihu_favicon.ico')));
// 现在是dev环境，上线要换
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(configure.cookieSecret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: configure.sessionSecret,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 3 * 24 * 60 * 60 // 3 days   
  })
}));

// auth 中间件
app.use(auth.authUser);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
