var configure = require('../configure');
var _ = require('lodash');
var Question = require('../proxy').Question;
var Answer = require('../proxy').Answer;
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
      Topic.newTagSave(tag, question._id, question.title, function (err, topic) {
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
    Question.findQuestionById(question_id, function (err, question) {
      if (err) {
        return res.render404('你似乎来到了没有知识存在的荒原……');
      }
      Answer.findAnswerByQuestionId(question_id, function (err, answers) {
        if (err) {
          return res.render404('你似乎来到了没有知识存在的荒原……');
        }
        if (!user) {
          return res.render('question/question', {
            question: question,
            answerErr: req.flash('answerErr').toString(),
            answers: answers,
            err: req.flash('err').toString()
          });
        }
        var user_id = user._id;
        var isUp = [],
            isDown = [];
        answers.forEach(function(answer, index) {
          answer.ups.forEach(function(up) {
            if (up == user_id) {
              isUp[index] = true;
              return;
            }
          });
          answer.downs.forEach(function(down) {
            if (down == user_id) {
              isDown[index] = true;
              return;
            }
          });
        });        
        Answer.findIfHasAnswered(question_id, user._id, function (err, answer) {
          if (err) {
            return res.render404('你似乎来到了没有知识存在的荒原……');
          }
          return res.render('question/question', {
            question: question,
            // 图片上传之后再补进去
            // uploadPicErr: req.flash('uploadPicErr').toString(),
            // pic: req.flash('pic').toString(),
            answerErr: req.flash('answerErr').toString(),
            answers: answers,
            myAnswer: answer,
            err: req.flash('err').toString(),
            isUp: isUp,
            isDown: isDown
          });
        });
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

