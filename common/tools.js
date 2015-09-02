var moment = require('moment')
moment.locale('zh-cn');           // 中文

exports.formatDate = function (date, friendly) {
  date = moment(date);
  // 转换时间格式
  return friendly ? date.fromNow() : date.format('YYYY-MM-DD HH:mm');
};
exports.formatDate_day = function (date) {
  date = moment(date);
  // 转换时间格式
  return date.format('YYYY-MM-DD');
};

exports.isToday = function (date) {
  return moment(date).calendar(null, {
    sameDay: 'HH:mm',
    nextDay: 'YYYY-MM-DD',
    nextWeek: 'YYYY-MM-DD',
    lastDay: '昨天 HH:mm',
    lastWeek: 'YYYY-MM-DD'
  });
};

exports.isEdited = function (create_at, update_at) {
  return moment(create_at).unix(Number) != moment(update_at).unix(Number); 
};
