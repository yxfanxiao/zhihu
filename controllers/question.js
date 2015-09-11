var configure = require('../configure');
var _ = require('lodash');
var Question = require('../proxy').Question;
var Answer = require('../proxy').Answer;
var User = require('../proxy').User;
var Topic = require('../proxy').Topic;
var upload = require('../common/upload').upload;
var eventproxy = require('eventproxy');

// 发布问题
exports.post = function (req, res, next) {
  var title = req.body.title,
      description = req.body.description,
      tags = [req.body.tag1, req.body.tag2, req.body.tag3];
  tags = _.compact(tags);                            // 去掉undefined、''
  var user = req.session.user;
  if (!user) {
    return res.redirect('/');                              // 未登录
  }
  if (title === '') {
    req.flash('err', '标题不能为空！');
    return res.redirect('/index');
  }
  if (description === '') {
    req.flash('err', '描述不能为空！');
    return res.redirect('/index');
  }
  if (tags.length === 0) {
    req.flash('err', '至少添加1个标签！');
    return res.redirect('/index');
  }
  Question.newQuestionSave(user._id, title, description, tags, function (err, question) {
    if (err) {
      return res.render404('提问出错了');  
    }
    var ep = new eventproxy();
    tags.forEach(function (tag) {
      Topic.newTagSave(tag, question._id, function (err, topic) {
        ep.emit('save_tag', topic);
      });
    });
    ep.after('save_tag', tags.length, function (topics) {
      return res.redirect('/question/' + question._id);
    });
  });
};

// 查看问题
exports.view = function (req, res, next) {
  var user = req.session.user,
      question_id = req.params.q_id;
  res.locals.to_appointed_answer = req.query.answerId;
  var sort = res.locals.sort = req.query.sort || 'ups';
  Question.findQuestionById(question_id, function (err, question) {
    if (err) {
      return res.render404('你似乎来到了没有知识存在的荒原……');
    }
    var ep = new eventproxy();
    ep.all('relatedQuestions', 'answers', function (relatedQuestions, answers) {
      if (!user) {
        return res.render('question/question', {
          question: question,
          answerErr: req.flash('answerErr').toString(),
          answers: answers,
          relatedQuestions: relatedQuestions,
          err: req.flash('err').toString()
        });
      }
      var user_id = user._id;
      var isUp = [],
          isDown = [];
      answers.forEach(function (answer, index) {
        answer.ups.forEach(function(up) {
          if (up.toString() == user_id.toString()) {
            isUp[index] = true;
            return;
          }
        });
        answer.downs.forEach(function (down) {
          if (down.toString() == user_id.toString()) {
            isDown[index] = true;
            return;
          }
        });
      }); 
      var proxy = new eventproxy();
      proxy.all('answer', 'isFocus', function (answer, isFocus) {
        return res.render('question/question', {
          question: question,
          answers: answers,
          myAnswer: answer,
          isFocus: isFocus,
          isUp: isUp,
          isDown: isDown,
          relatedQuestions: relatedQuestions,
          answerErr: req.flash('answerErr').toString(),
          err: req.flash('err').toString()
        });
      });
      // 查询是否已回答过问题
      Answer.findIfHasAnswered(question_id, user._id, function (err, answer) {
        if (err) {
          return res.render404('你似乎来到了没有知识存在的荒原……');
        }
        proxy.emit('answer', answer);
      });
      // 查询是否已关注过问题
      // 表question的查询量比表user大，所有这里用表user
      Question.findIfHasFocus(user._id, question_id, function (err, user) {
        var isFocus = false;
        if (user.length > 0) {
          isFocus = true;
        }
        proxy.emit('isFocus', isFocus);
      });
    }); 
    // 找与该问题tag相关的问题
    Question.findRelatedQuestions(question.tags, question._id, ep.done('relatedQuestions'));
    // 排序
    var query = sort == 'ups' ? { sort: '-ups_number' } : { sort: '-creat_at' };
    Answer.findAnswerByQuestionId(question_id, query, function (err, answers) {
      if (err) {
        return res.render404('你似乎来到了没有知识存在的荒原……');
      }
      ep.emit('answers', answers);
    });
  });
};

// 上传文件-图片
exports.uploadPic = function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      req.flash('uploadPicErr', err);
      return res.redirect('back');
    }
    req.flash('pic', req.file.filename);
    return res.redirect('back');
  });
};

// status 500，查了2个小时，原来没写req，res，日了狗！
exports.focusOnQuestion = function (req, res, next) {
  var question_id = req.params.q_id,
      user_id = req.params.u_id;
  Question.focusOnQuestion(user_id, question_id, function (err, question) {
    if (question) {
      res.send({
        ok: 1
      });
    }
  });
};

exports.unfocusOnQuestion = function (req, res, next) {
  var question_id = req.params.q_id,
      user_id = req.params.u_id;
  Question.unfocusOnQuestion(user_id, question_id, function (err, question) {
    if (question) {
      res.send({
        ok: 1
      });
    }
  });
};