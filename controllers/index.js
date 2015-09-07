var configure = require('../configure');
var upload = require('../common/upload').upload;
var User = require('../proxy').User;
var Question = require('../proxy').Question;
var Answer = require('../proxy').Answer;
var eventproxy = require('eventproxy');

// 推送首页
exports.index = function (req, res, next) {
  return res.render('question/index', {
    err: req.flash('err').toString()
  });
};

// 用户首页 
exports.home = function (req, res, next) {
  var user = req.session.user;
  var user_get_ups = 0;
  var ep = new eventproxy();
  ep.all('get_all_ups', 'get_questions', 'get_answers_number', 'get_answer_to_question',
          function (get_all_ups, get_questions, user_answers_number, get_answer_to_question) {
    return res.render('user/home', {
      err: req.flash('err').toString(),
      user_get_ups: get_all_ups,
      user_questions: get_questions,
      user_questions_number: get_questions.length,
      user_answer_to_question: get_answer_to_question, 
      user_answers_number: user_answers_number,
      uploadPicErr: req.flash('uploadPicErr').toString()
    });    
  });
  Answer.findAllAnswerById(user._id, function (err, answers) {
    answers.forEach(function (answer) {
      user_get_ups += answer.ups_number;
    });
    ep.emit('get_all_ups', user_get_ups);
  });
  Question.findQuestionsByUserId(user._id, function (err, questions) {
    ep.emit('get_questions', questions);
  });
  Answer.findAllAnswerById(user._id, function (err, answers) {
    ep.emit('get_answers_number', answers.length);
  });
  // questions + answer
  Answer.findWholeAnswerById(user._id, function (err, questionAndAnswer) {
    ep.emit('get_answer_to_question', questionAndAnswer);
  });
};


exports.updateAvatar = function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      req.flash('uploadPicErr', err);
      return res.redirect('back');
    }
    var path = req.file.path.replace('public','');
    User.updateAvarar(req.session.user._id, path, function (err, user) {
      User.getUserById(req.session.user._id, function (err, user) {
        req.session.user = user;
        return res.redirect('/home');
      });    
    });
  });
};
