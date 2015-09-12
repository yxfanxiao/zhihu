var models = require('../models');
var Answer = models.Answer;
var Question = models.Question;
var eventproxy = require('eventproxy');

exports.newAnswerSave = function (question_id, author_id, author_name, author_avatar, content, callback) {
  var answer = new Answer();
  answer.question_id = question_id;
  answer.author_id = author_id;
  answer.author_name = author_name;
  answer.author_avatar = author_avatar;
  answer.content = content;
  answer.save(function (err, answer) {
    Question.findByIdAndUpdate(question_id, { $push: { comment_id: author_id }}, function (err, question) {
      callback(err, answer);
    });
  });
};

exports.findAnswerById = function (answer_id, callback) {
  Answer.findOne({ _id: answer_id }, callback);
};

exports.findAnswerByQuestionId = function (question_id, query, callback) {
  Answer.find({ 'question_id': question_id }, null, query, callback);
  // Answer.find({ 'question_id': question_id }, null, { sort: '-create_at' }, callback);
};

// 搜索是否回答过这个问题
// 感觉这样2个id索引后查询，要比判断整个docs里有无author_id快
exports.findIfHasAnswered = function (question_id, author_id, callback) {
  Answer.findOne({ 'question_id': question_id, 'author_id': author_id }, callback);
};

// 增加Up
exports.addUpByAnswerId = function (answer_id, user_id, callback) {
  Answer.update({ '_id': answer_id }, { $push:{ 'ups': user_id }, $inc:{ 'ups_number': 1 }}, callback);
};
// 撤销Up
exports.cancelUpByAnswerId = function (answer_id, user_id, callback) {
  Answer.update({ '_id': answer_id }, { $pull:{ 'ups': user_id }, $inc:{ 'ups_number': -1 }}, callback);
};

// 增加Down
exports.addDownByAnswerId = function (answer_id, user_id, callback) {
  Answer.update({ '_id': answer_id }, { $push:{ 'downs': user_id }}, callback);
};
// 撤销Down
exports.cancelDownByAnswerId = function (answer_id, user_id, callback) {
  Answer.update({ '_id': answer_id }, { $pull:{ 'downs': user_id }}, callback);
};

exports.findAllAnswerById = function (user_id, callback) {
  Answer.find({ 'author_id': user_id }, callback);
};


exports.findWholeAnswerById = function (user_id, callback) {
  Answer.find({ 'author_id': user_id }, null, { sort: '-ups_number' }, function (err, answers) {
    var ep = new eventproxy();
    answers.forEach(function(answer) {
      var questionAndAnswer = {};
      questionAndAnswer.answer = answer;
      Question.findOne({ '_id': answer.question_id }, function (err, question) {
        questionAndAnswer.question = question;
        ep.emit('find_question', questionAndAnswer);
      });
    });
    ep.after('find_question', answers.length, function (questionAndAnswer) {
      callback(null, questionAndAnswer);
    });
  });
};
