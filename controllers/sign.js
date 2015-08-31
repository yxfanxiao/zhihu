var configure = require('../configure');
var User = require('../proxy').User;
var crypto = require('crypto');
var password_salt = configure.password_salt;

exports.homepage = function(req, res, next) {
  if (req.session.user) {
    return res.redirect('/index');
  }
  return res.render('homepage', {
    title: 'zhihu-与世界分享你的知识', 
    err: req.flash('err').toString(),
    loginErr: req.flash('loginErr').toString()
  });
};

exports.register = function (req, res, next) {
  var name = req.body.username,
      phoneOrEmail = req.body.phoneoremail,
      password = req.body.password;
  // 密码md5加盐加密
  if (name === '' || name === null) {
    req.flash('err', '用户名不能为空！');
    return res.redirect('/');
  }
  if (password.length < 6) {
    req.flash('err', '密码至少6位！');
    return res.redirect('/');
  }
  var md5 = crypto.createHash('md5'),
      password = md5.update(password + password_salt).digest('hex');
  User.newUserSave(name, phoneOrEmail, password, function (err, user) {
    if (err) {
      req.flash('err', err.message);
      return res.redirect('/');
    }
    req.session.user = user;
    return res.redirect('/index');
  })
};

exports.login = function (req, res, next) {
  var phoneOrEmail = req.body.phoneoremail,
      password = req.body.password;
  var md5 = crypto.createHash('md5'),
      password = md5.update(password + password_salt).digest('hex');
  User.login(phoneOrEmail, password, function (err, user) {
    if (err) {
      req.flash('loginErr', err.message);
      return res.redirect('/');
    }
    if (!user) {
      req.flash('loginErr', '该邮箱未注册！');
      return res.redirect('back');      
    }
    if (password != user.password) {
      req.flash('loginErr', '密码错误');
      return res.redirect('/#signin');      
    }
    req.session.user = user;
    return res.redirect('/index');
  });
};

exports.logout = function (req, res, next) {
  req.session.user = null;
  return res.redirect('/');
};