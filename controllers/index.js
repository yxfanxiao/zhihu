var configure = require('../configure');
var upload = require('../common/upload').upload;
var User = require('../proxy').User;
var Question = require('../proxy').Question;
var Answer = require('../proxy').Answer;
var eventproxy = require('eventproxy');

// 推送首页
exports.index = function (req, res, next) {
  return res.render('question/index', {
    err: req.flash('err').toString()
  });
};

// 简单查询
exports.search = function (req, res, next) {
  var search = req.query.search;
  Question.search(search, function (err, questions) {
    return res.render('question/search', {
      err: req.flash('err').toString(),
      questions: questions,
      search: search
    });
  });
};
