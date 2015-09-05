var Topic = require('../proxy').Topic;
var eventproxy = require('eventproxy');

exports.getAll = function (req, res, next) {
  Topic.getAll(function (err, tags) {
    var ep = new eventproxy();
    tags.forEach(function (tag) {
      Topic.findQuestionByTag(tag, function (err,question) {
        ep.emit('find_question', question);
      });
    });
    ep.after('find_question', tags.length, function (topics) {
      return res.render('topic/topic', {
        topics: topics,
        err: req.flash('err').toString()
      });
    });
  });
};   

