var configure = require('../configure');
var User = require('../proxy').User;

exports.authUser = function (req, res, next) {
  // Ensure user always has defined.
  res.locals.user = null;
  // 只有记住密码、cookie不禁用、cookie没过期，才自动登录
  // cookie 签名
  if (typeof(req.signedCookies[configure.auth_cookie_name]) !== 'undefined' && req.signedCookies[configure.auth_cookie_name]) {
    var user_id = req.signedCookies[configure.auth_cookie_name];
    User.getUserById(user_id, function (err, user) {
      res.locals.user = req.session.user = user;
      return next();
    });
  } else {
    // 第一次登录
    if (typeof(req.session.user) === 'undefined') {
      req.session.user = null;
      return next();
    }
    // 不记住密码时，登录后从这里通过
    if (req.session.user) {
      User.getUserById(req.session.user._id, function (err, user) {
        res.locals.user = req.session.user = user;
        return next();
      });
    } else {
      // 注销后，req.session.user=null
      return next();
    }
  }
};

exports.userRequired = function (req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(403).send('forbidden!请先登录！');
  }
  next();
};