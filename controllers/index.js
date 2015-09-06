var configure = require('../configure');

// 推送首页
exports.index = function (req, res, next) {
  return res.render('question/index', {
    err: req.flash('err').toString()
  });
};

// 用户首页 
exports.home = function (req, res, next) {
  return res.render('user/home', {
    err: req.flash('err').toString()
  });
};