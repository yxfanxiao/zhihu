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
  Answer.addUpByAnswerId(answer_id, user._id, function (err, doc) {
    // 插入成功 { ok: 1, nModified: 1, n: 1 }
    // 返回码1，1条选中，被编辑
    // 应该是没有错的...
    res.send(doc);
  });
};

exports.cancelUp = function (req, res, next) {
  var answer_id = req.params.a_id;
  var user = req.session.user;
  Answer.cancelUpByAnswerId(answer_id, user._id, function (err, doc) {
    console.log(doc)
    res.send(doc);
  });
};

exports.addDown = function (req, res, next) {
  var answer_id = req.params.a_id;
  var user = req.session.user;
  Answer.addDownByAnswerId(answer_id, user._id, function (err, doc) {
    res.send(doc);
  });
};
exports.cancelDown = function (req, res, next) {
  var answer_id = req.params.a_id;
  var user = req.session.user;
  Answer.cancelDownByAnswerId(answer_id, user._id, function (err, doc) {
    console.log(doc)
    res.send(doc);
  });
};
