var configure = require('../configure');
var password_salt = configure.password_salt;
var upload = require('../common/upload').upload;
var User = require('../proxy').User;
var Question = require('../proxy').Question;
var Answer = require('../proxy').Answer;
var eventproxy = require('eventproxy');
var crypto = require('crypto');

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
      return res.redirect('/home');
    });
  });
};

exports.setting = function (req, res, next) {
  return res.render('user/setting', {
    err: req.flash('err').toString(),
    updateErr: req.flash('updateErr').toString(),
    success: req.flash('success').toString()
  });
};

exports.editName = function (req, res, next) {
  var user_id = req.session.user._id;
  var edited_name = req.body.name;
  User.updateName(user_id, edited_name, function (err, user) {    
    return res.redirect('back');
  });
};

exports.editEmail = function (req, res, next) {
  var user_id = req.session.user._id;
  var edited_email = req.body.email;
  User.updateEmail(user_id, edited_email, function (err, user) {  
    if (err) {
      req.flash('updateErr', err);
      return res.redirect('back')
    }  
    req.flash('success', '修改成功！');
    return res.redirect('back');
  });
};

exports.editPhone = function (req, res, next) {
  var user_id = req.session.user._id;
  var edited_phone = req.body.phone;
  User.updatePhone(user_id, edited_phone, function (err, user) {  
    if (err) {
      req.flash('updateErr', err);
      return res.redirect('back')
    }
    req.flash('success', '修改成功！');
    return res.redirect('back');
  });
};

exports.editPassword = function (req, res, next) {
  var user = req.session.user;
  var user_id = user._id;
  var original_password = req.body.originalPassword;
  var new_password = req.body.newPassword;
  var md5 = crypto.createHash('md5');
  var hexPassword = md5.update(original_password + password_salt).digest('hex');
  if (hexPassword !== user.password) {
    req.flash('updateErr', '原密码错误！');
    return res.redirect('back');
  } 
  var md5 = crypto.createHash('md5');
  var newPassword = md5.update(new_password + password_salt).digest('hex');
  User.updatePassword(user_id, newPassword, function (err, user) {    
    req.flash('success', '修改成功！');
    return res.redirect('back');
  });
};