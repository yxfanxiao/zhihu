var Topic = require('../proxy').Topic;
var Question = require('../proxy').Question;
var eventproxy = require('eventproxy');

// 这里用eventproxy 顺序不对，但是用group 报错，尚未解决，换个方法
// exports.getAll = function (req, res, next) { 
//   // 这里嵌套了3层forEach。。分到proxy层去了2层。蛋疼
//   Topic.getAll(function (err, topics, tags) {
//     var ep = new eventproxy();
//     topics.forEach(function (topic) {
//       Question.findQuestionByTopic(topic, ep.done('get_questions'));
//     });
//     ep.after('get_questions', topics.length, function (list) {
//       console.log(topics.length)
//       console.log(tags)
//       console.log(list)
//       return res.render('topic/topic', {
//         topics: list,
//         tags: tags,
//         err: req.flash('err').toString()
//       });
//     })
//   });
// };   

exports.getAll = function (req, res, next) {
  Topic.getAllTag(function (err, tags) {
    res.render('topic/topic', {
      err: req.flash('err').toString(),
      tags: tags
    });
  });
};

exports.tag = function (req, res, next) {
  var tag = req.params.tag;
  Topic.findQuestionsByTag(tag, function (err, questions) {
    res.render('topic/tag', {
      err: req.flash('err').toString(),
      questions: questions,
      tag: tag
    });
  });
};