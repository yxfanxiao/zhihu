var configure = require('../configure');
var upload = require('../common/upload').upload;
var User = require('../proxy').User;
var Question = require('../proxy').Question;
var Answer = require('../proxy').Answer;
var Push = require('../proxy').Push;
var eventproxy = require('eventproxy');

// 推送首页
exports.index = function (req, res, next) {
  var user = req.session.user;
  var ep = new eventproxy();
  ep.all('pushes', function (pushes) {
    // pushes 是所有的动态
    return res.render('index/index', {
      err: req.flash('err').toString(),
      pushes: pushes
    });
  });
  // 首页30条动态，之后再加“点击加载”或者分页
  var page_limit = 30;
  Push.findPush(user._id, page_limit, function (err, pushes) {
    var proxy = new eventproxy();
    proxy.after('whole_push', pushes.length, function (whole_push) {
      // console.log(whole_push)
      ep.emit('pushes', whole_push);
    });
    pushes.forEach(function (push) {
      var fillproxy = new eventproxy();
      Question.findQuestionNoPvById(push.question_id, fillproxy.done('find_qustion'));
      Answer.findAnswerById(push.answer_id, fillproxy.done('find_answer'));
      User.getUserById(push.user_id, fillproxy.done('find_user'));
      fillproxy.all('find_qustion', 'find_answer', 'find_user'
              , function (find_qustion, find_answer, find_user) {
        var whole_push = {};
        whole_push.push = push;
        whole_push.question = find_qustion;
        whole_push.answer = find_answer;
        whole_push.user = find_user;
        proxy.emit('whole_push', whole_push);    
      });
    });
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
