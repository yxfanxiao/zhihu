var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId  = Schema.ObjectId;

var QuestionSchema = new Schema({
  title: { type: String },
  author_id: { type: ObjectId },
  description: { type: String },
  tags: { type: Array },                                 // 标签
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  comment_id: [{ type: ObjectId }],
  // comments: [{
  //   create_at: { type: Date, default: Date.now },
  // }]
  deleted: { type: Boolean, default: false },           // 软删除
  pv: { type: Number, default: 0 }
});

QuestionSchema.plugin(BaseModel);

// UserSchema.index({ email: 1 }, { unique: true });
QuestionSchema.index({ title: 1 });
QuestionSchema.index({ author_id: 1 });
QuestionSchema.index({ tags: 1 });
QuestionSchema.index({ comment_id: 1 });

mongoose.model('Question', QuestionSchema);

