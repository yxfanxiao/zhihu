var models = require('../models');
var Question = models.Question;

exports.newQuestionSave = function (author_id, title, description, tags, callback) {
  var question = new Question();
  question.author_id = author_id;
  question.title = title;
  question.description = description;
  question.tags = tags;
  question.save(callback);
};

exports.findQuestionById = function (question_id, callback) {
  Question.findById(question_id, callback);
};