var configure = require('../configure');
var _ = require('lodash');
var Question = require('../proxy').Question;

// 发布问题
exports.post = function (req, res, next) {
  var title = req.body.title,
      description = req.body.description,
      tags = [req.body.tag1, req.body.tag2, req.body.tag3];
  tags = _.compact(tags);                            // 去掉undefined、''
  var user = req.session.user;
  if (!user) {
    res.redirect('/');                              // 未登录
  }
  Question.newQuestionSave(user._id, title, description, tags, function (err, question) {
    if (err) {
      res.send('提问出错了');  
    }
    res.render('question/question', {
      question: question
    });
  });
  
};