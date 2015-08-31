var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId  = Schema.ObjectId;

var AnswerSchema = new Schema({
  question_id: { type: ObjectId },
  author_id: { type: ObjectId },
  author_name: { type: String },
  author_avatar: { type: String },
  content: { type: String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  ups: [{ type: ObjectId }],
  downs: [{ type: ObjectId }],
  deleted: { type: Boolean, default: false }           // 软删除
});

AnswerSchema.plugin(BaseModel);

AnswerSchema.virtual('up_number').get(function () {
  return this.ups.length;
});

AnswerSchema.index({ question_id: 1 });
AnswerSchema.index({ author_id: 1 });
AnswerSchema.index({ comment_id: 1 });
AnswerSchema.index({ update_at: -1 });

mongoose.model('Answer', AnswerSchema);

