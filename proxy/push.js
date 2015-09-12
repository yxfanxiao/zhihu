var models = require('../models');
var Question = models.Question;
var Push = models.Push;
var eventproxy = require('eventproxy');

// 问题有新回答时的推送
exports.addPush = function (type,  question_id, answer_id, callback) {
  findQuestionNoPvById(question_id, function (err, question) {
    question.focus_id.forEach(function (focus) {
      var push = new Push();
      push.type = type;
      push.question_id = question_id;
      push.answer_id = answer_id;
      push.user_id = focus;
      push.save();
    });
    callback(err);
  });
};

// 话题查询时不加pv
var findQuestionNoPvById = function (question_id, callback) {
  Question.findById(question_id).exec(callback);
};

exports.findPush = function (user_id, page_limit, callback) {
  Push
    .find({ user_id: user_id })
    .sort('-create_at')
    .limit(page_limit)
    .exec(callback);
};