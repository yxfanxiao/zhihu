var tools = require('../common/tools');
var moment = require('moment')
moment.locale('zh-cn');       

module.exports = function (schema) {
  // from now
  schema.methods.create_at_ago = function () {
    return tools.formatDate(this.create_at, true);
  };
  schema.methods.updated_at_ago = function () {
    return tools.formatDate(this.update_at, true);
  };

  // 精确到分 2015-09-01 09:17
  schema.methods.create_at_minute = function () {
    return tools.formatDate(this.create_at, false);
  };
  // 精确到分 2015-09-01 09:17
  schema.methods.update_at_minute = function () {
    return tools.formatDate(this.update_at, false);
  };

  // 精确到天 2015-09-01
  schema.methods.create_at_day = function () {
    return tools.formatDate_day(this.create_at);
  };
  // 精确到天 2015-09-01
  schema.methods.update_at_day = function () {
    return tools.formatDate_day(this.update_at);
  };

  // 格式：今天的显示【20:00】，昨天的显示【昨天20:00】，之前的显示【2015-08-31】
  schema.methods.create_at_isToday = function () {
    return tools.isToday(this.create_at);
  };
  schema.methods.update_at_isToday = function () {
    return tools.isToday(this.update_at);
  };

  schema.methods.isEdited = function () {
    return tools.isEdited(this.create_at, this.update_at);
  };

};