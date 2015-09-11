var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId  = Schema.ObjectId;

var PushSchema = new Schema({
  // type:
  // 0: 关注问题后推送的回答
  // 1: 关注的人点的赞同
  // 2: 关注的人提的问题
  // 3: 关注的人的回答
  type: { type: ObjectId },     
  question_id: { type: ObjectId },
  answer_id: { type: ObjectId },
  user_id: { type: ObjectId },
  create_at: { type: Date, default: Date.now }
});

PushSchema.plugin(BaseModel);

PushSchema.index({ user_id: 1, create_at: -1 });

mongoose.model('Push', PushSchema);

