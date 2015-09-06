var Topic = require('../proxy').Topic;
var Question = require('../proxy').Question;
var eventproxy = require('eventproxy');

exports.getAll = function (req, res, next) { 
  // 这里嵌套了3层forEach。。分到proxy层去了2层。蛋疼
  Topic.getAll(function (err, topics, tags) {
    var ep = new eventproxy();
    topics.forEach(function (topic) {
      Question.findQuestionByTopic(topic, ep.done('questions'));
    });
    ep.after('questions', topics.length, function (list) {
      return res.render('topic/topic', {
        topics: list,
        tags: tags,
        err: req.flash('err').toString()
      });
    })
  });
};   