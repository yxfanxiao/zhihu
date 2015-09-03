var configure = require('../configure');
var _ = require('lodash');
var Question = require('../proxy').Question;
var Answer = require('../proxy').Answer;
var upload = require('../common/upload').upload;

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
      return res.send('提问出错了');  
    }
    return res.redirect('/question/' + question._id);
  });
};

// 查看问题
exports.view = function (req, res, next) {
    var user = req.session.user,
        question_id = req.params.q_id;
    Question.findQuestionById(question_id, function (err, q) {
      if (err) {
        return res.send('找不到这个问题~~！');
      }
      Answer.findAnswerByQuestionId(question_id, function (err, answers) {
        if (err) {
          return res.send('你还没登录呀~~！');
        }
        Answer.findIfHasAnswered(question_id, user._id, function (err, answer) {
          return res.render('question/question', {
            question: q,
            // 图片上传之后再补进去
            // uploadPicErr: req.flash('uploadPicErr').toString(),
            // pic: req.flash('pic').toString(),
            answerErr: req.flash('answerErr').toString(),
            answers: answers,
            myAnswer: answer,
            err: req.flash('err').toString()
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

