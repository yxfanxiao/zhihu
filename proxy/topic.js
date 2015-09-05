var models = require('../models');
var Topic = models.Topic;


exports.newTagSave = function (tag, question_id, question_title, callback) {
  var topic = new Topic();
  topic.tag = tag;
  topic.question_id = question_id;
  topic.question_title = question_title;
  topic.save(callback);
};

exports.getAll = function (callback) {
  Topic.distinct('tag', callback);
}

exports.findQuestionByTag = function (tag, callback) {
  Topic.find({ 'tag': tag }, callback);
};