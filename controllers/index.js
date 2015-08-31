var configure = require('../configure');

exports.index = function (req, res, next) {
  
  return res.render('index/index', {
    user: req.session.user,
    err: req.flash('err').toString()
  });
};