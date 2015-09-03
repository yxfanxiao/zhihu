var configure = require('../configure');

exports.index = function (req, res, next) {
  return res.render('question/index', {
    err: req.flash('err').toString()
  });
};