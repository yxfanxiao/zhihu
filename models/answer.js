var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId  = Schema.ObjectId;

var AnswerSchema = new Schema({
  question_id: { type: ObjectId },
  author_id: { type: ObjectId },
  // 反规格化，造成了冗余，但是减少了查询次数
  // 查询数据量/查询IO VS 总数据量
  author_name: { type: String },
  author_avatar: { type: String },
  content: { type: String },
  update_at: { type: Date, default: Date.now },
  create_at: { type: Date, default: Date.now },
  ups: [{ type: ObjectId }],
  ups_number: { type: Number, default: 0 },
  downs: [{ type: ObjectId }],
  deleted: { type: Boolean, default: false }           // 软删除
});

AnswerSchema.plugin(BaseModel);

// AnswerSchema.virtual('up_number').get(function () {
//   return this.ups.length;
// });

AnswerSchema.index({ question_id: 1 });
AnswerSchema.index({ author_id: 1 });
AnswerSchema.index({ question_id: 1, author_id: 1 });
AnswerSchema.index({ ups_number: -1 });
AnswerSchema.index({ update_at: -1 });

mongoose.model('Answer', AnswerSchema);
