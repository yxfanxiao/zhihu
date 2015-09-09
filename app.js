var configure = require('./configure');
var express = require('express');
var path = require('path');
require('./models');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ueditor = require("ueditor");
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
app.use(bodyParser.urlencoded({ extended: true }));

// 这个之后做
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {

  // ueditor 客户发起上传图片请求

  if(req.query.action === 'uploadimage'){

    // 这里你可以获得上传图片的信息
    var foo = req.ueditor;
    console.log(foo.filename); // exp.png
    console.log(foo.encoding); // 7bit
    console.log(foo.mimetype); // image/png

    // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
    var img_url = '/images/ueditor/';
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
    var dir_url = '/images/ueditor/'; // 要展示给客户端的文件夹路径
    res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {

    res.setHeader('Content-Type', 'application/json');
    // 这里填写 ueditor.config.json 这个文件的路径
    res.redirect('/ueditor/ueditor.config.json')
}}));


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
  return res.render404('404');
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
