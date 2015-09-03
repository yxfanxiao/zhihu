

exports.authUser = function (req, res, next) {
  // Ensure user always has defined.
  res.locals.user = null;
  // 只有记住密码、cookie不禁用、cookie没过期，才自动登录
  if (typeof(req.cookies.isRemembered) !== 'undefined' && req.cookies.isRemembered) {
    res.locals.user = req.session.user = req.cookies.isRemembered;
    return next();
  }
  // 第一次登录
  if (typeof(req.session.user) === 'undefined') {
    req.session.user = null;
    return next();
  }
  // 不记住密码时，登录后从这里通过
  if (req.session.user) {
    res.locals.user = req.session.user;
    return next();
  }  
  // 注销后，req.session.user=null
  return next();
};
