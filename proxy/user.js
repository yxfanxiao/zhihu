var models = require('../models');
var User = models.User;

exports.newUserSave = function (name, phoneOrEmail, password, callback) {
  // email 符合规则
  if (isEmail(phoneOrEmail)) {
    User.find({ email: phoneOrEmail }, function (err, user) {
      if (user.length > 0) {
        err = {};
        err.message = '该邮箱已被注册！';
        return callback(err, user);
      }
      // 没被注册
      var user = new User();
      user.name = name;
      user.email = phoneOrEmail;
      user.password = password;
      user.save(callback);
    });
  } 
  else if (isPhone(phoneOrEmail)) {
    User.find({ phone: phoneOrEmail }, function (err, user) {
      if (user.length > 0) {
        err = {};
        err.message = '该手机号已被注册！';
        return callback(err, user);
      }
      // 没被注册
      var user = new User();
      user.name = name;
      user.phone = phoneOrEmail;
      user.password = password;
      user.save(callback);
    });
  }
  else {
    var err = {};
    err.message = '邮箱或手机号码不正确！';
    callback(err, null);
  }
};

exports.login = function (phoneOrEmail, password, callback) {
  if (isEmail(phoneOrEmail)) {
    User.findOne({ email: phoneOrEmail }, function (err, user) {
      if (err) {
        err.message = '该邮箱未注册';
      }
      callback(err, user);
    });
  }
  else if (isPhone(phoneOrEmail)) {
    User.findOne({ phone: phoneOrEmail }, function (err, user) {
      if (err) {
        err.message = '该手机号未注册';
      }
      callback(err, user);
    });
  } 
  else {
    var err = {};
    err.message = '邮箱或手机格式不正确！';
    callback(err, null);    
  }
};

var isEmail = function (value) {
  var email_reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$','i');
  return email_reg.test(value);
};
var isPhone = function (value) {
  var phone_reg = new RegExp('^[0-9]{11}$');
  return phone_reg.test(value);
};

exports.getUserById = function (id, callback) {
  User.findOne({ _id: id }, callback);
};


exports.updateAvarar = function (user_id, avatar_path, callback) {
  User.findByIdAndUpdate(user_id, { $set:{ avatar: avatar_path }}, callback);
};

exports.updateName = function (user_id, user_name, callback) {
  User.findByIdAndUpdate(user_id, { $set:{ name: user_name }}, callback);
};

exports.updateEmail = function (user_id, edited_email, callback) {
  User.find({ email: edited_email }, function (err, email) {
    if (email.length > 0) {
      return callback('该邮箱已被注册！');
    } else {
      User.findByIdAndUpdate(user_id, { $set:{ email: edited_email }}, callback);
    }
  });
};
exports.updatePhone = function (user_id, edited_phone, callback) {
  User.find({ phone: edited_phone }, function (err, phone) {
    if (phone.length > 0) {
      return callback('该手机号已被注册！');
    } else {
      User.findByIdAndUpdate(user_id, { $set:{ phone: edited_phone }}, callback);
    }
  });
};

exports.updatePassword = function (user_id, edited_password, callback) {
  User.findByIdAndUpdate(user_id, { $set:{ password: edited_password }}, callback);
};
