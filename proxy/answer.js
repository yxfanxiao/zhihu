var models = require('../models');
var Answer = models.Answer;

exports.newAnswerSave = function (question_id, author_id, author_name, author_avatar, content, callback) {
  var answer = new Answer();
  answer.question_id = question_id;
  answer.author_id = author_id;
  answer.author_name = author_name;
  answer.author_avatar = author_avatar;
  answer.content = content;
  answer.save(callback);
};

exports.findAnswerByQuestionId = function (question_id, callback) {
  Answer.find({ 'question_id': question_id },callback);
};