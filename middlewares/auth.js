

exports.authUser = function (req, res, next) {
  // Ensure user always has defined.
  res.locals.user = req.session.user = null;
  // 只有记住密码、cookie不禁用、cookie没过期，才能自动登录
  // res.locals.user 只能在view中用
  if (typeof(req.cookies.isRemembered) !== 'undefined' && req.cookies.isRemembered) {
    res.locals.user = req.session.user = req.cookies.isRemembered;
    return next();
  }
  // 禁用cookie的话，关浏览器或者session过期就要重新登录了
  if (req.session.user) {
    res.locals.user = req.session.user;
    return next();
  }
  // user=null,且req.session.user=null,没登录
  next();
};
