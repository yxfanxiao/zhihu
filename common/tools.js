var moment = require('moment')
moment.locale('zh-cn');           // 中文

exports.formatDate = function (date, friendly) {
  date = moment(date);
  // 转换时间格式
  return friendly ? date.fromNow() : date.format('YYYY-MM-DD HH:mm');
};