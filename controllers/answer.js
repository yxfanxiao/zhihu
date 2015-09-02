var configure = require('../configure');
var _ = require('lodash');
var Answer = require('../proxy').Answer;


exports.answer = function (req, res, next) {
  var question_id = req.params.q_id,
      author_id = req.session.user._id,
      author_name = req.session.user.name,
      author_avatar = req.session.user.avatar,
      content = req.body.answer;
  if (content == '') {
    req.flash('answerErr', '提交内容不能为空！');
    return res.redirect('back');
  }
  Answer.newAnswerSave(question_id, author_id, author_name, author_avatar, content, function (err) {
    if (err) {
      req.flash('answerErr', '提交回答出错，请重新提交！');
    }
    return res.redirect('back');
  });
};

exports.addUp = function (req, res, next) {
  var answer_id = req.params.a_id;
  var user = req.session.user;
  Answer.getUpByAnswerId(answer_id, function (err, docs) {
    var answer = {
      a: docs.ups,
      b: docs.ups_number
    };
    res.send(answer);
  });
};