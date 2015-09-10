var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var ObjectId  = Schema.ObjectId;

var UserSchema = new Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  password: { type: String },
  avatar: { type: String, default: '/images/static/liukanshan.png' },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  focus_question: [{ type: ObjectId }]                                // 关注的问题
});

UserSchema.plugin(BaseModel);

// UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });

mongoose.model('User', UserSchema);

