var mongoose = require('mongoose');
var configure = require('../configure');

mongoose.connect(configure.mongodb_url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('成功连上数据库！');
});

require('./user');
require('./question');
require('./answer');

exports.User = mongoose.model('User');
exports.Question = mongoose.model('Question');
exports.Answer = mongoose.model('Answer');