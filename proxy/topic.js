var models = require('../models');
var Topic = models.Topic;
var eventproxy = require('eventproxy');


exports.newTagSave = function (tag, question_id, callback) {
  var topic = new Topic();
  topic.tag = tag;
  topic.question_id = question_id;
  topic.save(callback);
};

// 得到所有tag
var getAll = exports.getAll =  function (callback) {
  Topic.distinct('tag', function (err, tags) {
    if (err) {
      return callback(err);
    }
    var ep = new eventproxy();
    tags.forEach(function (tag, index) {
      findQuestionByTag(tag, function (err, questions) {
        if (err) {
          return callback(err);
        }
        ep.emit('find_questions', questions);
      });
    });
    ep.after('find_questions', tags.length, function (topics) {
      callback(null, topics, tags);
    });
  });
};

// 得到每个tag下的所有问题,每个tag最多3个问题
var findQuestionByTag = exports.findQuestionByTag = function (tag, callback) {
  Topic.find({ 'tag': tag }, null, { limit: 3, sort: '-create_at' }, callback);
};

